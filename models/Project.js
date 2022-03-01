const mongoose = require('mongoose');

//Create the mongoDB model for the Project
const ProjectSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
        assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }
);

module.exports = mongoose.model('Project', ProjectSchema);