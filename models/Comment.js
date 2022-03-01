const mongoose = require('mongoose');

//Create the mongoDB model for the Project
const ProjectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }
);

module.exports = mongoose.model('Project', ProjectSchema);