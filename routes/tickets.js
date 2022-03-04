const router = require('express').Router();
const Ticket = require('../models/Ticket');

//POST request for creating a new ticket
router.post('/', async (req, res) => {
    try {
        const newTicket = new Ticket(req.body);
        const ticket = await newTicket.save();
        res.send(ticket);
    } catch (err) {
        res.status(400).send(err);
    }
});

//GET request for all tickets from a project
router.get('/p/:project', async (req, res) => {
    try {
        const tickets = await Ticket.find({project: req.params.project});
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//GET request for all tickets assigned to a user
router.get('/u/:user', async (req, res) => {
    try {
        const tickets = await Ticket.find({assignedUsers: req.params.user});
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//GET request for a single ticket
router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        res.status(200).json(ticket);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//PUT request for updating a ticket
router.put('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id,{ $set: req.body });
        res.status(200).json(ticket);
    } catch (err) {
        res.status(500).json(err.message);
    }   
});

//DELETE request for deleting a ticket
router.delete('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        res.status(200).json(ticket);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;