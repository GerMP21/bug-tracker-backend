const mongoose = require('mongoose');

//Create the mongoDB model for the Project
const ProjectSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);