const request = require("supertest");
process.env.EXPRESS_SERVER_PORT = 5004;
const app  = require('../server');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzQ0YTYwNWUwN2YwOWE1ZjJjOTc3IiwibmFtZSI6IlRlc3QgVXNlciJ9LCJpYXQiOjE2ODY5MTYzMDIsImV4cCI6MTc3MzMxNjMwMn0.qZh6tqITd39PKRqO-jn3gw9Z3zSK8mSP1rki6Ss-T-M';
const tokenOfUnauthorizedUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZGQ4NDBkODQ3MDdhMjJkYWNiYmExIiwibmFtZSI6IkFub3RoZXIgVXNlciJ9LCJpYXQiOjE2ODYzNjA2MDQsImV4cCI6MTc3Mjc2MDYwNH0.qRNzZiVKGMR-3NgqRCGdi1Y6i499zRHC8XPE8g-pZ1A';
const tokenOfUserWithNoDocuments = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4ZDIzNDY1YmY3NjhhMzI0OTg1MmFhIn0sImlhdCI6MTY4Njk3MTIwNiwiZXhwIjoxNzczMzcxMjA2fQ.QPdzKxqBsHsFvHVd5gWbVdyJlr-2oQrc9PqPpZ2p4eo';
const tokenOfAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NzE0MzVkNDMwNDhkZWQ1NzBjNTQ1IiwibmFtZSI6IkFkbWluIn0sImlhdCI6MTY4NjU3NDk5NCwiZXhwIjoxNzcyOTc0OTk0fQ.qq3YwYuzUYP447ItnvI-qyt8YJ0dossEo1X6bpkWufg';
const tokenOfUserToShareDocumentsFrom = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4OTM2NDA2MjU4MmNkZjMyMGI3NWNjIiwibmFtZSI6Im1lb3cifSwiaWF0IjoxNjg2OTczNzQyLCJleHAiOjE3NzMzNzM3NDJ9.xfXG_ajQ3hMxGbj_592asq1762IIxiv76iVsVPQSuqc';
const emailOfUserToShareDocument = 'testuser@email.com';
const documentIdOfDocumentToShare = '64895b9c4b4c28ef3ee079e7';

const newDocumentToCreate = {
    name: "Document without any data",
    expiresAt: "2023-06-23"
}

const documentId = '648c75722e7cd25eab8e1ed9';
const nameOfDocument = 'Document without any data';
const userId = '648c44a605e07f09a5f2c977';
const documentIdToDelete = '648c754da46036db0e21c82b';
const contentsOfDocument = {
    data: 'She sells seashells by the seashore',
    updatedUsingButton: false 
}

describe('api/documents', () => {
    describe('POST request in api/documents', () => {
        describe('create a new document', () => {
            it('should create a new document and return status code 201', async () => {
                const response = await request(app)
                                        .post('/api/documents')
                                        .set('jwt-token', token)
                                        .send(newDocumentToCreate);

                expect(response.status).toBe(201);
                expect(response.body).toHaveProperty('user');
                expect(response.body).toHaveProperty('author');
                expect(response.body).toHaveProperty('name');
                expect(response.body.name).toEqual(newDocumentToCreate.name);
            }, 5000)
        })

        describe('create a new document without JWT', () => {
            it('should return status code 401', async () => {
                const response = await request(app)
                                        .post('/api/documents')
                                        .send(newDocumentToCreate);

                expect(response.status).toBe(401);
            })
        })
    })
})


describe('api/documents/mine', () => {
    describe('GET all document ids of current user', () => {
        describe('get all document ids', () => {
            it('should return all documents ids in an array', async () => {
                const response = await request(app)
                                        .get('/api/documents/mine')
                                        .set('jwt-token', token);

                expect(response.status).toBe(200);
                expect(Array.isArray(response.body)).toBeTruthy();
            }, 5000)
        })
    })
})


describe('api/documents/:documentId', () => {
    describe('GET document by its id', () => {
        describe('given a valid document id return document', () => {
            it('should return a document by its id', async () => {
                const response = await request(app)
                                        .get(`/api/documents/${documentId}`)
                                        .set('jwt-token', token);

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('name');
                expect(response.body).toHaveProperty('_id');
                expect(response.body).toHaveProperty('author');

                expect(response.body.user).toEqual(userId);
            }, 5000);
        })

        describe('given an invalid document id return error', () => {
            it('should return 404', async () => {
                const response = await request(app)
                                        .get('/api/documents/64893d6f8a9d090aaad70dde')
                                        .set('jwt-token', token);

                expect(response.status).toBe(404);
                expect(response.body.message).toBe('Document does not exists!');
            }, 5000);
        })

        describe('given a JWT of unauthorized user it should not let user to view document', () => {
            it('should return 403', async () => {
                const response = await request(app)
                                        .get(`/api/documents/${documentId}`)
                                        .set('jwt-token', tokenOfUnauthorizedUser);

                expect(response.status).toBe(403);
                expect(response.body.message).toBe('The user is not authorized to view this document!');
            }, 5000);
        })
    })

    describe('DELETE document by its id', () => {
        describe('given an unauthorized user JWT do not delete document', () => {
            it('should return 403', async () => {
                const response = await request(app)
                                        .delete(`api/documents/${documentIdToDelete}`)
                                        .set('jwt-token', tokenOfUnauthorizedUser);

                expect(response.status).toBe(403);
                expect(response.body.message).toBe('User is not authorized to delete this document!')
            }, 5000);
        })

        describe('given a valid document id delete that document', () => {
            it('should delete document and return 200 status code', async () => {
                const response = await request(app)
                                        .delete(`api/documents/${documentIdToDelete}`)
                                        .set('jwt-token', token);

                expect(response.status).toBe(200);
                expect(response.body.message).toBe('Document deleted!');
            }, 5000);
        })

        describe('given an invalid document id get an error', () => {
            it('should return 404', async () => {
                const response = await request(app)
                                        .delete('api/documents/64893d6f8a9d090aaad70dde')
                                        .set('jwt-token', token);

                expect(response.status).toBe(404);
                expect(response.body.message).toBe('Document does not exists!');
            }, 5000);
        })

    })
})



describe('api/documents/:documentID', () => {
    describe('UPDATE document by its id', () => {
        describe('given a valid document id and body update the document', () => {
            it('should update the document', async () => {
                const response = await request(app)
                                        .post(`/api/documents/${documentId}`)
                                        .set('jwt-token', token)
                                        .send(contentsOfDocument);

                expect(response.status).toBe(200);
                expect(response.body.data).toBe(contentsOfDocument.data);
            }, 5000);
        })


        describe('given an invalid document id return error', () => {
            it('should return 404', async () => {
                const response = await request(app)
                                        .post('/api/documents/64893d6f8a9d090aaad70dde')
                                        .set('jwt-token', token)
                                        .send(contentsOfDocument);

                expect(response.status).toBe(404);
                expect(response.body.message).toBe('Document does not exists!');
            }, 5000);
        })


        describe('given an unauthorized user JWT it should not let document update', () => {
            it('should return 403', async () => {
                const response = await request(app)
                                        .post(`/api/documents/${documentId}`)
                                        .set('jwt-token', tokenOfUnauthorizedUser);

                expect(response.status).toBe(403);
                expect(response.body.message).toBe('User is not authorized to update this document!');
            }, 5000);
        })
    })
})



describe('/api/documents/name/:documentId', () => {
    describe('GET document name by document Id', () => {
        describe('given valid document Id return its name', () => {
            it('should return document name', async () => {
                const response = await request(app)
                                        .get(`/api/documents/name/${documentId}`)
                                        .set('jwt-token', token);

                expect(response.status).toBe(200);
                expect(response.body.name).toBe(nameOfDocument);
            }, 5000);
        })

        describe('given an invalid document Id return error', () => {
            it ('should return 404', async () => {
                const response = await request(app)
                                        .get('/api/documents/name/64893d6f8a9d090aaad70dde')
                                        .set('jwt-token', token);

                expect(response.status).toBe(404);
                expect(response.body.message).toBe('Document does not exists!');
            }, 5000);
        })

        describe('given a JWT of unauthorized user return error', () => {
            it('should return 403', async () => {
                const response = await request(app)
                                        .get(`/api/documents/name/${documentId}`)
                                        .set('jwt-token', tokenOfUnauthorizedUser);

                expect(response.status).toBe(403);
                expect(response.body.message).toBe('User is not authorized to retrieve this document!');
            }, 5000);
        })
    })
})


describe('/api/documents/mine/all', () => {
    describe('GET all documents of a user with its contents', () => {
        describe('given JWT of user return documents associated with the user', () => {
            it('should return all documents in an array', async () => {
                const response = await request(app)
                                        .get('/api/documents/mine/all')
                                        .set('jwt-token', token);

                expect(response.status).toBe(200);
                expect(Array.isArray(response.body)).toBeTruthy();
                
                if (response.body.length > 0) {
                    expect(response.body[0].user).toBe(userId);
                }
            }, 7000);
        })

        describe('given user who does not have documents return an empty array', () => {
            it('should return an empty array', async () => {
                const response = await request(app)
                                        .get('/api/documents/mine/all')
                                        .set('jwt-token', tokenOfUserWithNoDocuments);

                expect(response.status).toBe(200);
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toBe(0);
            }, 5000);
        })
    })
})


describe('/api/documents/users/all', () => {
    describe('GET first 6 documents of all users', () => {
        describe('given JWT of admin return first 6 documents of all users', () => {
            it('should return 6 documents', async () => {
                const response = await request(app)
                                    .get('/api/documents/users/all')
                                    .set('jwt-token', tokenOfAdmin);

                expect(response.status).toBe(200);
                expect(Array.isArray(response.body.documents)).toBeTruthy();
                expect(response.body.documents.length).toBe(6);
            }, 7000);
        })

        describe('given JWT of non admin do not provide access to this endpoint', () => {
            it('should return 403', async () => {
                const response = await request(app)
                                        .get('/api/documents/users/all')
                                        .set('jwt-token', token);

                expect(response.status).toBe(403);
                expect(response.body.message).toBe('User is not authorized!');
            }, 5000);
        })
    })


    describe('GET first 10 documents of all users', () => {
        describe('given JWT of admin return first 10 documents of all users', () => {
            it('should return 10 documents', async () => {
                const response = await request(app)
                                        .get('/api/documents/users/all?page=1&limit=10')
                                        .set('jwt-token', tokenOfAdmin);

                expect(response.status).toBe(200);
                expect(Array.isArray(response.body.documents)).toBeTruthy();
                expect(response.body.documents.length).toBe(10);
            }, 7000);
        })
    })
})


describe('/api/documents/mine/select', () => {
    describe('GET specified number of documents of a user', () => {
        describe('given page and limit return number of documents within limit', () => {
            it('should return first 6 documents', async () => {
                const response = await request(app)
                                        .get('/api/documents/mine/select')
                                        .set('jwt-token', token);

                expect(response.status).toBe(200);
                expect(Array.isArray(response.body.documents)).toBeTruthy();
                expect(response.body.documents.length).toBe(6);
            }, 7000);


            it('should return first 5 documents', async () => {
                const response = await request(app)
                                        .get('/api/documents/mine/select?page=1&limit=5')
                                        .set('jwt-token', token);

                expect(resonse.status).toBe(200);
                expect(Array.isArray(response.body.documetns)).toBeTruthy();
                expect(reponse.body.documents.length).toBe(5);
            }, 7000);
        })
    })
});


describe('/api/documents/share/:documentId/:userEmail', () => {
    describe('POST share document with another user using user email', () => {
        describe('given authorized user and valid document Id share document with another user', () => {
            it('should share document with another user', async () => {
                const response = await request(app)
                                        .get(`/api/documents/share/${documentIdOfDocumentToShare}/${emailOfUserToShareDocument}`)
                                        .set('jwt-token', tokenOfUserToShareDocumentsFrom);

                expect(response.status).toBe(200);
                expect(response.body.message).toBe(`${emailOfUserToShareDocument} is now able to access the document.`);
            }, 5000);


            it('should return document already shared', async () => {
                const response = await request(app)
                                        .get(`/api/documents/share/${documentIdOfDocumentToShare}/${emailOfUserToShareDocument}`)
                                        .set('jwt-token', tokenOfUserToShareDocumentsFrom);

                expect(response.status).toBe(409);
                expect(response.body.message).toBe('User aleady has access to the document!');
            }, 5000);
        })


        describe('given invalid document Id return error', () => {
            it('should return 404', async () => {
                const response = await request(app)
                                        .get(`/api/documents/share/64893d6f8a9d090aaad70dde/${emailOfUserToShareDocument}`)
                                        .set('jwt-token', tokenOfUserToShareDocumentsFrom);

                expect(response.status).toBe(404);
                expect(response.body.message).toBe('Document does not exists to share!');
            }, 5000);
        })

        descibe('given invalid user email return error', () => {
            it('should return 404', async () => {
                const response = await request(app)
                                        .get(`/api/documents/share/${documentIdOfDocumentToShare}/somerandomemail@email.com`)
                                        .set('jwt-token', tokenOfUserToShareDocumentsFrom);

                expect(response.status).toBe(404);
                expect(response.body.message).toBe('Receipient user does not exists!');
            }, 5000);
        })


        describe('given unauthorized user it should not share document', () => {
            it('should return 403', async () => {
                const response = await request(app)
                                        .get(`/api/documents/share/${documentIdOfDocumentToShare}/${emailOfUserToShareDocument}`)
                                        .set('jwt-token', tokenOfUnauthorizedUser);

                expect(response.status).toBe(403);
                expect(response.body.message).toBe('User is not allowed to share document! Contact author of document for it.');
            }, 5000);
        })
    })  
})