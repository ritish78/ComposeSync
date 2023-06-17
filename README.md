# ComposeSync
A web app to compose and sync documents.

# What is ComposeSync:
ComposeSync is a powerful and intuitive web application built with cutting-edge technologies, including Node.js, Express, MongoDB, Socket.io, Redis and React. With ComposeSync, users can effortlessly create, save, and edit documents online, all from the comfort of their web browser.

Designed to streamline your document management experience, ComposeSync offers a seamless and user-friendly interface. Whether you're a professional writer, a student, or someone who simply enjoys organizing their thoughts, this web app provides the perfect solution for your document creation and editing needs.

Key Features of ComposeSync:

1. Document Creation: Effortlessly create new documents with a click of a button. ComposeSync offers a clean and distraction-free writing environment, allowing you to focus solely on your content.

2. Document Editing: Edit your documents with ease using a comprehensive set of editing tools. Add images, format paragraphs, code blocks and more to make your documents visually appealing and professional.

3. Auto-Save: ComposeSync automatically saves your work every 60 seconds which can be changed in `\client\src\actions\constant.js`, ensuring you never lose your progress. Additionally, the app maintains a edit history.

5. Collaboration and Sharing: Collaborate with others by inviting them to edit or comment on your documents. Seamlessly share documents with colleagues, classmates, or clients to facilitate effective collaboration.

6. Cloud Storage: All your documents are securely stored in the cloud, ensuring accessibility from any device with an internet connection. Say goodbye to the hassle of transferring files between devices.


# How to install:
1. First, clone the repo using the command:
```
git clone https://github.com/ritish78/ComposeSync.git
```
2. Then in the same terminal:
```
cd ComposeSync
```
3. Then, install all the dependencies.
```
npm install
```
4. You will also need to install the dependencies inside `client` folder.
```
cd client
npm install
```
5. You will need to have MongoDB URI. Also add a `JWT Secret` and port for Express server in `.env` file.
6. Then run this command to start the server:
```
npm run dev
```

# Tech Stack used
* Backend: `Node.js` as Runtime, `express` for server, `express-validator` for validating user input
* Frontend: `React` Library which runs using `Javascript`. `Redux` is used for state management
* Database: `MongoDB` and `Redis`. `Mongoose` npm package is used to interact with MongoDB. `Redis` is hosted on `Upstash`. 
* Security: `Bcrypt` for hashing password, `JWT` for verifying current user
* Websocket: `Socket.io` package is used for realtime communication using `websocket` to edit same document from more than one users.
* Test: `Jest` along with `Supertest` is used for testing. `Supertest` provides easy interaction with `express` to test the API.

# Usage: 
* You can use app like Postman or Insomnia to use API.
* Or, you can visit the `localhost:3000` which will redirect you to `login` page.

# API Rate Limiting:
* In this project, Redis DB is used as rate limiter. The key-value pair is essential for fast storage and retrieval of number of requests made by a user.
* In the case of user who is not signed in, the `MAX_REQ_ALLOWED_OF_NOT_SIGNEDIN_PER_MINUTE` is 30 requests.
* In the case of user is logged in and has a valid `JWT` token, the `MAX_REQ_ALLOWED_OF_AUTH_USER_PER_MINUTE` is 100 requests. 
* Whether the user is logged in or not, the API access window for rate limiter to reset itself (`WINDOW_SIZE_IN_SECONDS`) is 60 seconds.
* User's IP address and User ID itself is stored as `key` in Redis. If user is not signed in, their's IP is stored as key, and User ID is stored as key if they are signed in.

![ComposeSync Redis rate limiter excalidraw](https://github.com/ritish78/ComposeSync/assets/36816476/27fd2e77-bd27-4161-9267-18e6740af7c6)



# Screenshot:
* Login Page: <br> ![Updated login page](https://github.com/ritish78/ComposeSync/assets/36816476/3df1ca40-bdc9-40c1-8365-94dff53a2e79)
* Dashboard: <br> ![Updated Dashboardpng](https://github.com/ritish78/ComposeSync/assets/36816476/98a7e07d-cd05-47ae-80ca-4658220ef962)
* While creating a new document, you can also set an expiry date to document. Once the document reaches expiry, it will be deleted. <br> ![Create document and you can set expiry of that document](https://github.com/ritish78/ComposeSync/assets/36816476/e4524a26-0043-46c2-a29f-29aeb59451b7)
* You can create more documents and add contents to it.
* Example of a document with contents: <br> ![Clicking in one of the documents](https://github.com/ritish78/ComposeSync/assets/36816476/de8d9436-9524-43b0-bed3-34bf468109cd)
* Another example: <br> ![Another example of document](https://github.com/ritish78/ComposeSync/assets/36816476/f9a9f6a7-18bf-4ace-951f-47225b7639b0)
* Sharing document with another user using their email. You can also set permissions for them to `view` or `view and edit`. <br>  ![Share document with other users and assign permissions](https://github.com/ritish78/ComposeSync/assets/36816476/c4a68868-eea0-4894-86df-ae887706418e)
* Dashboard gets updated with `Shared With: 1 other user(s)` <br> ![Dashboard updated with Shared With 1 other users](https://github.com/ritish78/ComposeSync/assets/36816476/5b48c538-175d-4573-864b-ef0c46caa74d)
* If the document has been shared with you, then you can't delete the document. Only the `author` or `admin` can delete it. There is no `delete` button for this user. <br> ![If the document has been shared with you, then you are not able to delete the document](https://github.com/ritish78/ComposeSync/assets/36816476/77e80e01-48fa-4686-9eb9-9b7a00f775bd)
* Author can delete the document that they have created. <br> ![Author of document can delete the document](https://github.com/ritish78/ComposeSync/assets/36816476/afc620b5-e75e-4b6f-a0ab-edef3cf2554e)
* Edit History: <br> ![View Last Edited By user](https://github.com/ritish78/ComposeSync/assets/36816476/86246aaa-53ff-415b-8a84-31ad30692cf9)
* You can also export your document as PDF. <br> ![Export document as PDF](https://github.com/ritish78/ComposeSync/assets/36816476/39901a4c-d9e9-4d37-869a-41a7bf9f268b)
* Editing a same document with two different instances. This GIF is showing old UI which did not have export as PDF: <br> ![ComposeSync](https://github.com/ritish78/ComposeSync/assets/36816476/c7b6525c-2efa-4ed1-8a22-0cf9b3785c60)

# Image Credits:
<a href="https://unsplash.com/photos/q10VITrVYUM">Photo</a>


