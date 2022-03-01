const mongoose = require('mongoose');

//Create the mongoDB model for the Ticket
const TicketSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, required: true },
        priority: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Ticket', TicketSchema);