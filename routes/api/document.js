const express = require('express');
const auth = require('../../middleware/auth');
const authRole = require('../../middleware/isAdmin');
const ROLES = require('../../models/Roles');

const router = express.Router();

const User = require('../../models/Users');
const Document = require('../../models/Documents');

const DOCUMENTS_PER_PAGE = 6;


// @route       POST api/documents
// @desc        Create a document
// @access      Private
router.post('/', auth, async (req, res) => {
    try {
        // console.log(req.body.name, req.body.data, req.user.id)
        const user = await User.findById(req.user.id).select('-password');


        const newDocument = new Document({
            name: req.body.name,
            author: user.name,
            // data: req.body.data,
            data: '',
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


// @route       GET api/documents/mine
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

        //User object also have record of user's documents in documents[] array.
        //The array contains the document id's the user has created.
        const user = await User.findById(req.user.id).select('-password');
        const indexToDelete = user.documents.findIndex(document => document._id.toString() === req.params.documentId);
        if (indexToDelete !== -1) {
            user.documents.splice(indexToDelete, 1);
        }
        await user.save();


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
      
        console.log('Document found:', document);

        //Now we check if the current user is the the author of the document
        //If so, then only we will allow for updating the document.
        if (req.user.id !== document.user.toString()) {
            return res.status(401).json({ message: 'User is not authorized to update this document!' })
        }

        //Getting the values from request body
        // const { name, data, sharedWith } = req.body;
        const { data, savedUsingButton } = req.body;

        console.log('Data in api/documents: ', data);
        console.log('Saved user in api/documents: ', savedUsingButton);

        // document.name = name;
        document.data = data;
        //We are adding to the edit history only if user updates by clicking on
        //the save button. We won't save edit history if autosaved by react, as
        //it will lead to countless editedWith of same user.
        if (savedUsingButton) {
            document.edited.push({
                user: req.user.id,
                name: req.user.name,
                date: Date.now()
            });
        }
    
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


// @route       GET api/documents/mine/all
// @desc        Get all documents of a user
// @access      Private
router.get('/mine/all', auth, async (req, res) => {
    try {
        //In our database, 'Users' collection contains all the users
        //Each 'user' document has 'documents' array which contains the
        //document id which the same user is associated with.

        //To get all the documents of current user, first we get the current user
        const user = await User.findById(req.user.id).select('-password');
        
        //Then, we can get the documents from the current user's object
        const documentIds = user.documents;

        let documents = [];
        for (let i = 0; i < documentIds.length; i++) {
            const documentInfo = await Document.findById(documentIds[i]._id);
            if (documentInfo !== null) {
                documents.push(documentInfo);
            } 
        }

        res.json(documents);

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error while retrieving documents of current user!' })
    }
})

/**
 * Only for Admin, as we don't want other to get all the documents.
 */
// @route       GET api/documents/users/all
// @desc        Get all documents of a user
// @access      Admin
router.get('/users/all', auth, authRole(ROLES.ADMIN), async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);

        // if (!currentUser.isAdmin) {
        //     return res.status(403).json({ message: 'User is not authorized!' });
        // }

        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : DOCUMENTS_PER_PAGE;

        const numberOfDocumentsToSkip = (page - 1) * limit;

        let documents = await Document.find().skip(numberOfDocumentsToSkip).limit(limit);

        res.json(documents);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error while retrieving all documents!' })
    }
})



// @route       GET api/documents/mine/select?page=:pageNumbner&limit=:limit
// @desc        Get specified number of documents of a user
// @access      Private
router.get('/mine/select', auth, async (req, res) => {
    try {
        //In our database, 'Users' collection contains all the users
        //Each 'user' document has 'documents' array which contains the
        //document id which the same user is associated with.

        //To get all the documents of current user, first we get the current user
        const user = await User.findById(req.user.id).select('-password');
        
        //Then, we can get the documents from the current user's object
        const documentIds = user.documents;

        //E.g. localhost:5000/api/documents/select?page=1&limit=5
        // Or localhost:5000/api/documents/mine/select?page=2
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : DOCUMENTS_PER_PAGE;

        let numberOfDocumentsToSkip = (page - 1) * limit;
        let endOfDocuments = numberOfDocumentsToSkip + limit;
        // let endOfDocuments = numberOfDocumentsToSkip + DOCUMENTS_PER_PAGE;
        if (endOfDocuments > documentIds.length) endOfDocuments = documentIds.length;

        let documents = [];
        for (numberOfDocumentsToSkip; numberOfDocumentsToSkip < endOfDocuments; numberOfDocumentsToSkip++) {
            const documentInfo = await Document.findById(documentIds[numberOfDocumentsToSkip]._id);
            if (documentInfo !== null) {
                documents.push(documentInfo);
            } 
        }
        /**
         * In the above code where we implemented pagination, we could also implement
         * by: await Document.find().skip(numberOfDocumentsToSkip).limit(limit);
         * providing the userId in the where clause, but once we start to have
         * thousands of documents, the find() will start to take much longer to
         * get the documents as it has to loop through thousands of documents
         * to reach the 'limit' that we provided.
         * 
         *  const query = Document.where({ user: req.user.id });
         *  documents = await query.find().skip(numberOfDocumentsToSkip).limit(limit);
         * 
         */

        const lastPage = Math.ceil(documentIds.length / limit);
        const hasNextPage = page < lastPage;
        const hasPreviousPage = page > 1 && page <= lastPage;
        
        res.json({ hasNextPage, hasPreviousPage, lastPage, documents });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error while retrieving documents of current user!' })
    }
})


module.exports = router;