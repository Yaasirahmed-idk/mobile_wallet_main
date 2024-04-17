import mongoose from'mongoose';

// Defining transaction schema
const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['top-up', 'transfer', 'withdraw'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to User model
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to  User model
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

// Export Transaction model
export default Transaction;
