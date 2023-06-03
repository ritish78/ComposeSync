const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const auth = require('../../middleware/auth');
const User = require('../../models/Users');


// @route       POST api/users
// @desc        Register user
// @access      Public
router.post('/', [
    check('name', 'Username is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        //If the validation of user input results in error
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, avatar, password } = req.body;
    console.log('Registering user with:', { name, email, avatar, password });

    try {
        let user = await User.findOne({ email });
     
        //If the user who wants to create a new account is already
        //registered to our services, we return an error with 400 status code
        if (user) {
            return res.status(400).json({ errors: [{ message: 'User already exists!' }] });
        }

        const regexForUrl = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9]+\.[a-zA-Z]{2,}(:[0-9]+)?(\/.*)?$/;
        let userAvatar = `https://eu.ui-avatars.com/api/?name=${name.split(' ').join('+')}&size=150`;

        if (avatar) {
            const avatarUrlExists = regexForUrl.test(avatar);
            if (avatarUrlExists) {
                userAvatar = avatar;
            }
        }

        console.log('User avatar url:', userAvatar);

        //We are creating a user object. We are not saving the user
        //before we hash the password.
        user = new User({
            name,
            email,
            avatar: userAvatar,
            password
        });

        //Hasing the password
        //First, we generate salt. Here, we are using 10 rounds of salt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //After hashing the password, now we can save the user to our database
        await user.save();

        //Payload for JWT
        //We are using MongoDB, so the user's id is generated automatically
        //Mongo creates unique id for every document and its child
        const payload = {
            user: {
                id: user.id
            }
        }


        //Once the user is created and we can return JWT to user so that
        //the user can use the token to login
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 86400000 },
            (error, token) => {
                if (error) throw err;
                
                console.log('Token from api/users:', { token });

                res.json({ 
                    token 
                });
            }

        )

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error while registering user!' });
    }
})


module.exports = router;