const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();

const User = require('../../models/Users');
const Document = require('../../models/Documents');


// @route       POST api/documents
// @desc        Create a document
// @access      Private
router.post('/', auth, async (req, res) => {
    try {
        // console.log(req.body.name, req.body.data, req.user.id)
        const user = await User.findById(req.user.id).select('-password');

        console.log(req.user);

        const newDocument = new Document({
            name: req.body.name,
            data: req.body.data,
            user: req.user.id
        });

        await newDocument.save();

        res.status(201).json(newDocument);

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error while creating a new document!' })
    }
})


module.exports = router;