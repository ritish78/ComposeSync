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

        //Once the new document is saved in MongoDB, the _id is generated
        //and we can use _id to add it to documents array in 'user' object
        user.documents.unshift(newDocument._id);

        //Then, updating the current user after adding new document's id
        await user.save();

        res.status(201).json(newDocument);

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error while creating a new document!' })
    }
});


// @route       GET api/documents
// @desc        Get all documents of a user
// @access      Private
router.get('/mine', auth, async (req, res) => {
    try {
        //In our database, 'Users' collection contains all the users
        //Each 'user' document has 'documents' array which contains the
        //document id which the same user is associated with.

        //To get all the documents of current user, first we get the current user
        const user = await User.findById(req.user.id).select('-password');
        
        //Then, we can get the documents from the current user's object
        const documents = user.documents;

        console.log({ documents });

        res.json(documents);

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error while retrieving documents of current user!' })
    }
})


module.exports = router;