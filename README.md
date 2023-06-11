# ComposeSync
A web app to compose and sync.
👉 The app is under development.

# What is ComposeSync:
ComposeSync is a powerful and intuitive web application built with cutting-edge technologies, including Node.js, Express, MongoDB, Socket.io React. With ComposeSync, users can effortlessly create, save, and edit documents online, all from the comfort of their web browser.

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

# Usage: 
* There are Rest APIs available. Will add a few later.
* Or, you can visit the `localhost:3000` which will redirect you to `login` page.

# Screenshot:
* Login Page: <br>![Login Page SS](https://github.com/ritish78/ComposeSync/assets/36816476/dcdc0861-37f1-4a53-858a-3a3ae5021bed)
* Dashboard: <br>![Dashboard SS](https://github.com/ritish78/ComposeSync/assets/36816476/4938ba5f-e49e-4017-8acd-89c3307448cd)
* Edit History: <br> ![Edit History of document](https://github.com/ritish78/ComposeSync/assets/36816476/1d9977d8-f1b5-43e9-89a9-dc4720ed22f0)
* Editing a same document with two different instances: <br> ![ComposeSync](https://github.com/ritish78/ComposeSync/assets/36816476/c7b6525c-2efa-4ed1-8a22-0cf9b3785c60)

# Image Credits:
<a href="https://unsplash.com/photos/q10VITrVYUM">Photo</a>


