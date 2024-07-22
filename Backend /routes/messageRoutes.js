const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

router.get('/:userId', auth, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [{ sender: req.params.userId }, { receiver: req.params.userId }]
        }).populate('sender receiver', 'username');
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', auth, async (req, res) => {
    const { sender, receiver, content } = req.body;
    const message = new Message({ sender, receiver, content });

    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
