"use strict";

var express = require('express');

var auth = require('../../middleware/auth');

var authRole = require('../../middleware/isAdmin');

var ROLES = require('../../models/Roles');

var router = express.Router();

var User = require('../../models/Users');

var Document = require('../../models/Documents');

var _require = require('../../config/constants'),
    DOCUMENTS_PER_PAGE = _require.DOCUMENTS_PER_PAGE;

var _require2 = require('../../permissions/DocumentPermissions'),
    canViewDocument = _require2.canViewDocument,
    canDeleteDocument = _require2.canDeleteDocument,
    canEditDocument = _require2.canEditDocument,
    canShareDocument = _require2.canShareDocument; // @route       POST api/documents
// @desc        Create a document
// @access      Private


router.post('/', auth, function _callee(req, res) {
  var user, newDocument;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 3:
          user = _context.sent;
          console.log(user);

          if (user) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(404).send({
            message: 'User does not exists to create new document!'
          }));

        case 7:
          console.log(req.body);
          console.log(req.body.name);
          console.log(req.body.expiresAt);
          newDocument = new Document({
            name: req.body.name,
            author: user.name,
            // data: req.body.data,
            data: '',
            user: req.user.id,
            expiresAt: req.body.expiresAt
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(newDocument.save());

        case 13:
          //Once the new document is saved in MongoDB, the _id is generated
          //and we can use _id to add it to documents array in 'user' object
          user.documents.unshift(newDocument._id); //Then, updating the current user after adding new document's id

          _context.next = 16;
          return regeneratorRuntime.awrap(user.save());

        case 16:
          res.status(201).json(newDocument);
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);
          res.status(500).send({
            message: 'Error while creating a new document!'
          });

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
}); // @route       GET api/documents/mine
// @desc        Get all documents of a user
// @access      Private

router.get('/mine', auth, function _callee2(req, res) {
  var user, documents;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 3:
          user = _context2.sent;
          //Then, we can get the documents from the current user's object
          documents = user.documents;
          console.log({
            documents: documents
          });
          res.json(documents);
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0.message);
          res.status(500).send({
            message: 'Error while retrieving documents of current user!'
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // @route       GET api/documents/:documentId
// @desc        Get document by its id
// @access      Private

router.get('/:documentId', auth, function _callee3(req, res) {
  var document, user, isUserAllowedToView;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Document.findById(req.params.documentId));

        case 3:
          document = _context3.sent;

          if (document) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Document does not exists!'
          }));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 8:
          user = _context3.sent;
          _context3.next = 11;
          return regeneratorRuntime.awrap(canViewDocument(user, document));

        case 11:
          isUserAllowedToView = _context3.sent;

          if (!isUserAllowedToView) {
            _context3.next = 16;
            break;
          }

          return _context3.abrupt("return", res.json(document));

        case 16:
          return _context3.abrupt("return", res.status(403).json({
            message: 'The user is not authorized to view this document!'
          }));

        case 17:
          _context3.next = 25;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0.message);

          if (!(_context3.t0.kind === 'ObjectId')) {
            _context3.next = 24;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Document does not exists!'
          }));

        case 24:
          res.status(500).send({
            message: 'Could not retrieve document by the provided id'
          });

        case 25:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 19]]);
}); // @route       DELETE api/documents/:documentId
// @desc        Delete a document by its id
// @access      Private

router["delete"]('/:documentId', auth, function _callee4(req, res) {
  var document, user, isUserAllowedToDeleteDocument, indexToDelete;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Document.findById(req.params.documentId));

        case 3:
          document = _context4.sent;

          if (document) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Document does not exists!'
          }));

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 8:
          user = _context4.sent;
          _context4.next = 11;
          return regeneratorRuntime.awrap(canDeleteDocument(user, document));

        case 11:
          isUserAllowedToDeleteDocument = _context4.sent;

          if (isUserAllowedToDeleteDocument) {
            _context4.next = 14;
            break;
          }

          return _context4.abrupt("return", res.status(403).json({
            message: 'User is not authorized to delete this document!'
          }));

        case 14:
          //User object also have record of user's documents in documents[] array.
          //The array contains the document id's the user has created.
          indexToDelete = user.documents.findIndex(function (document) {
            return document._id.toString() === req.params.documentId;
          });

          if (indexToDelete !== -1) {
            user.documents.splice(indexToDelete, 1);
          }

          _context4.next = 18;
          return regeneratorRuntime.awrap(user.save());

        case 18:
          _context4.next = 20;
          return regeneratorRuntime.awrap(Document.findByIdAndDelete(req.params.documentId));

        case 20:
          res.json({
            message: 'Document deleted!'
          });
          _context4.next = 29;
          break;

        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);

          if (!(_context4.t0.kind === 'ObjectId')) {
            _context4.next = 28;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Error while trying to delete document by its id!'
          }));

        case 28:
          res.status(500).send({
            message: 'Server error while trying to delete document by its id!'
          });

        case 29:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 23]]);
}); // @route       POST api/documents/:documentId
// @desc        Update document
// @access      Private

router.post('/:documentId', auth, function _callee5(req, res) {
  var document, user, isUserAllowedToUpdateDocument, _req$body, data, savedUsingButton;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Document.findById(req.params.documentId));

        case 3:
          document = _context5.sent;

          if (document) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Document does not exists!'
          }));

        case 6:
          console.log('Document found:', document); //Now we check if the current user is the the author of the document
          //If so, then only we will allow for updating the document.

          _context5.next = 9;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 9:
          user = _context5.sent;
          _context5.next = 12;
          return regeneratorRuntime.awrap(canEditDocument(user, document));

        case 12:
          isUserAllowedToUpdateDocument = _context5.sent;

          if (isUserAllowedToUpdateDocument) {
            _context5.next = 15;
            break;
          }

          return _context5.abrupt("return", res.status(403).json({
            message: 'User is not authorized to update this document!'
          }));

        case 15:
          //Getting the values from request body
          // const { name, data, sharedWith } = req.body;
          _req$body = req.body, data = _req$body.data, savedUsingButton = _req$body.savedUsingButton;
          console.log('Data in api/documents: ', data);
          console.log('Saved user in api/documents: ', savedUsingButton); // document.name = name;

          document.data = data; //We are adding to the edit history only if user updates by clicking on
          //the save button. We won't save edit history if autosaved by react, as
          //it will lead to countless editedWith of same user.

          if (savedUsingButton) {
            document.edited.push({
              user: req.user.id,
              name: req.user.name,
              date: Date.now()
            });
          }

          _context5.next = 22;
          return regeneratorRuntime.awrap(document.save());

        case 22:
          return _context5.abrupt("return", res.status(200).json(document));

        case 25:
          _context5.prev = 25;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0.message);

          if (!(_context5.t0.kind === 'ObjectId')) {
            _context5.next = 30;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Could not find the document to update'
          }));

        case 30:
          return _context5.abrupt("return", res.status(500).send({
            message: 'Server Error while trying to update document!'
          }));

        case 31:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 25]]);
}); // @route       GET api/documents/name/:documentId
// @desc        Get document name by its id
// @access      Private

router.get('/name/:documentId', auth, function _callee6(req, res) {
  var document, user, isUserAllowedToViewDocument;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Document.findById(req.params.documentId));

        case 3:
          document = _context6.sent;

          if (document) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: 'Document does not exists!'
          }));

        case 6:
          _context6.next = 8;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 8:
          user = _context6.sent;
          _context6.next = 11;
          return regeneratorRuntime.awrap(canViewDocument(user, document));

        case 11:
          isUserAllowedToViewDocument = _context6.sent;

          if (!isUserAllowedToViewDocument) {
            _context6.next = 16;
            break;
          }

          return _context6.abrupt("return", res.status(200).json({
            name: document.name
          }));

        case 16:
          return _context6.abrupt("return", res.status(403).json({
            message: 'User is not authorized to retrieve this document!'
          }));

        case 17:
          _context6.next = 25;
          break;

        case 19:
          _context6.prev = 19;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0.message);

          if (!(_context6.t0.kind === 'ObjectId')) {
            _context6.next = 24;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: 'Could not fetch the document!'
          }));

        case 24:
          return _context6.abrupt("return", res.status(500).send({
            message: 'Server Error while trying to fetch the document!'
          }));

        case 25:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 19]]);
}); // @route       GET api/documents/mine/all
// @desc        Get all documents of a user
// @access      Private

router.get('/mine/all', auth, function _callee7(req, res) {
  var user, documentIds, documents, i, documentInfo;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 3:
          user = _context7.sent;
          //Then, we can get the documents from the current user's object
          documentIds = user.documents;
          documents = [];
          i = 0;

        case 7:
          if (!(i < documentIds.length)) {
            _context7.next = 15;
            break;
          }

          _context7.next = 10;
          return regeneratorRuntime.awrap(Document.findById(documentIds[i]._id));

        case 10:
          documentInfo = _context7.sent;

          if (documentInfo !== null) {
            documents.push(documentInfo);
          } // else {
          //     //Removing the document id in User object if the document Id
          //     //does not correspond to any document. Done to remove document
          //     //Id which has been deleted by TTL(expiresAt) 
          //     documentIds.splice(i, 1);
          //     i--;
          // }


        case 12:
          i++;
          _context7.next = 7;
          break;

        case 15:
          // user.documents = documentIds;
          // await user.save();
          res.json(documents);
          _context7.next = 22;
          break;

        case 18:
          _context7.prev = 18;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0.message);
          res.status(500).send({
            message: 'Error while retrieving documents of current user!'
          });

        case 22:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 18]]);
});
/**
 * Only for Admin, as we don't want other to get all the documents.
 */
// @route       GET api/documents/users/all
// @desc        Get all documents of a user
// @access      Admin

router.get('/users/all', auth, authRole(ROLES.ADMIN), function _callee8(req, res) {
  var page, limit, numberOfDocumentsToSkip, documents, documentsCount, lastPage, hasNextPage, hasPreviousPage;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          page = req.query.page ? parseInt(req.query.page) : 1;
          limit = req.query.limit ? parseInt(req.query.limit) : DOCUMENTS_PER_PAGE;
          numberOfDocumentsToSkip = (page - 1) * limit;
          _context8.next = 6;
          return regeneratorRuntime.awrap(Document.find().skip(numberOfDocumentsToSkip).limit(limit));

        case 6:
          documents = _context8.sent;
          _context8.next = 9;
          return regeneratorRuntime.awrap(Document.count());

        case 9:
          documentsCount = _context8.sent;
          lastPage = Math.ceil(documentsCount / limit);
          hasNextPage = page < lastPage;
          hasPreviousPage = page > 1 && page <= lastPage;
          res.json({
            hasNextPage: hasNextPage,
            hasPreviousPage: hasPreviousPage,
            lastPage: lastPage,
            documentsCount: documentsCount,
            documents: documents
          });
          _context8.next = 20;
          break;

        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0.message);
          res.status(500).send({
            message: 'Error while retrieving all documents!'
          });

        case 20:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 16]]);
}); // @route       GET api/documents/mine/select?page=:pageNumber&limit=:limit
// @desc        Get specified number of documents of a user
// @access      Private

router.get('/mine/select', auth, function _callee9(req, res) {
  var user, documentIds, page, limit, numberOfDocumentsToSkip, endOfDocuments, documents, documentInfo, lastPage, hasNextPage, hasPreviousPage;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 3:
          user = _context9.sent;
          //Then, we can get the documents from the current user's object
          documentIds = user.documents; //E.g. localhost:5000/api/documents/select?page=1&limit=5
          // Or localhost:5000/api/documents/mine/select?page=2

          page = req.query.page ? parseInt(req.query.page) : 1;
          limit = req.query.limit ? parseInt(req.query.limit) : DOCUMENTS_PER_PAGE;
          numberOfDocumentsToSkip = (page - 1) * limit;
          endOfDocuments = numberOfDocumentsToSkip + limit; // let endOfDocuments = numberOfDocumentsToSkip + DOCUMENTS_PER_PAGE;

          if (endOfDocuments > documentIds.length) endOfDocuments = documentIds.length;
          documents = [];
          numberOfDocumentsToSkip;

        case 12:
          if (!(numberOfDocumentsToSkip < endOfDocuments)) {
            _context9.next = 20;
            break;
          }

          _context9.next = 15;
          return regeneratorRuntime.awrap(Document.findById(documentIds[numberOfDocumentsToSkip]._id));

        case 15:
          documentInfo = _context9.sent;

          if (documentInfo !== null) {
            documents.push(documentInfo);
          }

        case 17:
          numberOfDocumentsToSkip++;
          _context9.next = 12;
          break;

        case 20:
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
          lastPage = Math.ceil(documentIds.length / limit);
          hasNextPage = page < lastPage;
          hasPreviousPage = page > 1 && page <= lastPage;
          res.json({
            hasNextPage: hasNextPage,
            hasPreviousPage: hasPreviousPage,
            lastPage: lastPage,
            documents: documents
          });
          _context9.next = 30;
          break;

        case 26:
          _context9.prev = 26;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0.message);
          res.status(500).send({
            message: 'Error while retrieving documents of current user!'
          });

        case 30:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 26]]);
}); // @route       POST api/documents/share/:documentId/:userEmail
// @desc        Share a document with another user by another user's email
// @access      Private

router.post('/share/:documentId/:userEmail', auth, function _callee10(req, res) {
  var documentId, userEmail, role, document, currentUser, isUserAllowedToShareDocument, sharedToUser, indexOfUser;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          documentId = req.params.documentId;
          userEmail = req.params.userEmail;
          role = req.body.role;
          _context10.next = 6;
          return regeneratorRuntime.awrap(Document.findById(documentId));

        case 6:
          document = _context10.sent;
          _context10.next = 9;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 9:
          currentUser = _context10.sent;

          if (document) {
            _context10.next = 12;
            break;
          }

          return _context10.abrupt("return", res.status(404).send({
            message: 'Document does not exists to share!'
          }));

        case 12:
          _context10.next = 14;
          return regeneratorRuntime.awrap(canShareDocument(currentUser, document));

        case 14:
          isUserAllowedToShareDocument = _context10.sent;

          if (isUserAllowedToShareDocument) {
            _context10.next = 17;
            break;
          }

          return _context10.abrupt("return", res.status(403).send({
            message: 'User is not allowed to share document! Contact author of document for it.'
          }));

        case 17:
          _context10.next = 19;
          return regeneratorRuntime.awrap(User.findOne({
            email: userEmail
          }));

        case 19:
          sharedToUser = _context10.sent;

          if (sharedToUser) {
            _context10.next = 22;
            break;
          }

          return _context10.abrupt("return", res.status(404).send({
            message: 'Receipient user does not exists!'
          }));

        case 22:
          if (!(document.sharedWith.length > 0)) {
            _context10.next = 26;
            break;
          }

          indexOfUser = document.sharedWith.findIndex(function (userInfo) {
            return userInfo.user.toString() === sharedToUser._id.toString();
          });

          if (!(indexOfUser != -1)) {
            _context10.next = 26;
            break;
          }

          return _context10.abrupt("return", res.status(409).send({
            message: 'User aleady has access to the document!'
          }));

        case 26:
          document.sharedWith.push({
            user: sharedToUser._id,
            role: role
          });
          sharedToUser.documents.unshift(document._id);
          _context10.next = 30;
          return regeneratorRuntime.awrap(document.save());

        case 30:
          _context10.next = 32;
          return regeneratorRuntime.awrap(sharedToUser.save());

        case 32:
          return _context10.abrupt("return", res.status(200).send({
            message: "".concat(userEmail, " is now able to access the document.")
          }));

        case 35:
          _context10.prev = 35;
          _context10.t0 = _context10["catch"](0);
          console.error(_context10.t0.message);
          res.status(500).send({
            message: 'Could not share the document with another user!'
          });

        case 39:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 35]]);
});
module.exports = router;