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
        user.documents.unshift({
            document_id: newDocument._id,
            document_name: newDocument.name
        });

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


// @route       GET api/documents/:documentId
// @desc        Get document by its id
// @access      Private
router.get('/:documentId', auth, async (req, res) => {
    try {
        const document = await Document.findById(req.params.documentId);

        if (!document) {
            return res.status(404).json({ message: 'Document does not exists!' })
        }

        //Now checking if the document belongs to the current user
        if (req.user.id == document.user) {
            return res.json(document);
        } else {
            return res.status(401).json({ message: 'The user is not authorized to view this document!' });
        }

        /**
        TODO:
            Currently we are only checking the 'user' field in document which
            corresponds to the author of the document. If the current user is
            also the author of the document, then we are allowing them to view
            the document. However, we will need to implement another method which
            will check if the 'sharedWith' array also contains the user id of the
            current user. If so, we will allow them to view the document.
         */

    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Document does not exists!' })
        }
        res.status(500).send({ message: 'Could not retrieve document by the provided id' })
    }
})


// @route       DELETE api/documents/:documentId
// @desc        Delete a document by its id
// @access      Private
router.delete('/:documentId', auth, async (req, res) => {
    try {
        const document = await Document.findById(req.params.documentId);

        if (!document) {
            return res.status(404).json({ message: 'Document does not exists!' })
        }

        //Now we check if the current user is the the author of the document
        //If so, then only we will allow for deleting the document.
        if (req.user.id !== document.user.toString()) {
            return res.status(401).json({ message: 'User is not authorized to delete this document!' })
        }

        //Finally, after checking if the document exists and then checking if the
        //current user is the author of the document, we can delete the document
        await Document.findByIdAndDelete(req.params.documentId);

        res.json({ message: 'Document deleted!' });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Error while trying to delete document by its id!' })
        }
        res.status(500).send({ message: 'Server error while trying to delete document by its id!' })
    }
})


// @route       POST api/documents/:documentId
// @desc        Update document
// @access      Private
router.post('/:documentId', auth, async (req, res) => {
    try {

        const document = await Document.findById(req.params.documentId);
        if (!document) {
            return res.status(404).json({ message: 'Document does not exists!' })
        }
      

        //Now we check if the current user is the the author of the document
        //If so, then only we will allow for updating the document.
        if (req.user.id !== document.user.toString()) {
            return res.status(401).json({ message: 'User is not authorized to update this document!' })
        }

        //Getting the values from request body
        const { name, data, sharedWith } = req.body;

        document.name = name;
        document.data = data;
        document.edited.push({
            user: req.user.id,
            date: Date.now()
        });
        document.sharedWith = sharedWith;
    
        await document.save();

        return res.status(200).json(document);

    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Could not find the document to update' })
        }
        return res.status(500).send({ message: 'Server Error while trying to update document!' })
    }
})



// @route       GET api/documents/name/:documentId
// @desc        Get document name by its id
// @access      Private
router.get('/name/:documentId', auth, async (req, res) => {
    try {

        const document = await Document.findById(req.params.documentId);

        if (!document) {
            return res.status(404).json({ message: 'Document does not exists!' })
        }
      

        //Now we check if the current user is the the author of the document
        //If so, then only we will allow for viewing the document.
        if (req.user.id == document.user) {
            return res.status(200).json({ name: document.name })
        } else {
            return res.status(401).json({ message: 'User is not authorized to retrieve this document!' })
        }

    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Could not fetch the document!' })
        }
        return res.status(500).send({ message: 'Server Error while trying to fetch the document!' })
    }
})

module.exports = router;