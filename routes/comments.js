const Comment = require('../models/Comment');
const router = require('express').Router();
const basicAuthentication = require('../middleware/basicAuthentication');

//Get all comments on a ticket
router.get('/t/:id', async (req, res) => {
    try {
        const comments = await Comment.find({ ticket: req.params.id });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//Create a new comment
router.post('/', basicAuthentication, async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//Update a comment by id
router.put('/:id', basicAuthentication, async (req, res) => {
    //Check if the comment to update was made by the user updating it
    const comment = await Comment.findById(req.params.id);
    if (comment.user == req.userId || req.isAdmin) {
        try {
            comment.update(req.body);
            res.status(200).json(comment);
        } catch (err) {
            res.status(500).json(err.message);
        }
    } else {
        res.status(401).json('Unauthorized');
    }
});

//Delete a comment
router.delete('/:id', basicAuthentication, async (req, res) => {
    //Check if the comment to delete was made by the user deleting it
    const comment = await Comment.findById(req.params.id);
    if (comment.user == req.userId || req.isAdmin) {
        try {
            comment.remove();
            res.status(200).json(comment);
        } catch (err) {
            res.status(500).json(err.message);
        }
    } else {
        res.status(401).json('Unauthorized');
    }
});

module.exports = router;