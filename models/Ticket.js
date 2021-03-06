const mongoose = require('mongoose');

//Create the mongoDB model for the Ticket
const TicketSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, required: true },
        priority: { type: String, required: true },
        project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
        assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Ticket', TicketSchema);