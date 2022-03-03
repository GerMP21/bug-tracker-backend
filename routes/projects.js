const router = require('express').Router();
const Project = require('../models/Project');

//POST request for creating a new project
router.post('/', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const project = await newProject.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//GET request for getting all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//GET request for getting a project by id
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//PUT request for updating a project
router.put('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//DELETE request for deleting a project
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;