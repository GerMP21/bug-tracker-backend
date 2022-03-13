const mongoose = require('mongoose');

//Create the mongoDB model for the User
const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        assignedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
        assignedTickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }]
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
