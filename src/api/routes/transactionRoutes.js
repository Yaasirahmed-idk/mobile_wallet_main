// Import necessary modules
import express from 'express';
const router = express.Router();
import Transaction from '../../models/transecionModel.js'; // fetching Transaction model
import User from '../../models/userModel.js'; // fetching User model

// Top-up endpoint
router.post('/top-up', async (req, res) => {
    try {
        const { username, amount } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a top-up transaction
        const transaction = new Transaction({
            type: 'top-up',
            amount,
            sender: user._id
        });

        // Save the transaction
        await transaction.save();

        // Update user balance
        user.balance += amount;
        await user.save();

        return res.status(200).json({ message: 'Top-up successful', balance: user.balance });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Transfer endpoint
router.post('/transfer', async (req, res) => {
    try {
        const { senderUsername, receiverUsername, amount } = req.body;
        const sender = await User.findOne({ username: senderUsername });
        const receiver = await User.findOne({ username: receiverUsername });

        if (!sender || !receiver) {
            return res.status(404).json({ message: 'Sender or receiver not found' });
        }

        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Create a transfer transaction
        const transaction = new Transaction({
            type: 'transfer',
            amount,
            sender: sender._id,
            receiver: receiver._id
        });

        // Save the transaction
        await transaction.save();

        // Update sender and receiver balances
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save();
        await receiver.save();

        return res.status(200).json({ message: 'Transfer successful', senderBalance: sender.balance, receiverBalance: receiver.balance });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Withdraw endpoint
router.post('/withdraw', async (req, res) => {
    try {
        const { username, amount } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Create a withdrawal transaction
        const transaction = new Transaction({
            type: 'withdraw',
            amount,
            sender: user._id
        });

        // Save the transaction
        await transaction.save();

        // Update user balance
        user.balance -= amount;
        await user.save();

        return res.status(200).json({ message: 'Withdrawal successful', balance: user.balance });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
