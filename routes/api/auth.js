const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/Users');

const router = express.Router();


// @route       GET api/auth
// @desc        Get user info
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Server Error! Could not retrieve user info' });
    }
})


// @route       POST api/auth
// @desc        Authenticate user and get jwt
// @access      Private
router.post('/', [
    check('email', 'Email is required!').isEmail(),
    check('password', 'Please enter a valid password').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //Only execute that there are errors when validating user input
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    console.log('Checking user input', { name, email, password });

    try {
        let user = await User.findOne({ email });

        //Check if the user exists
        if (!user) {
            return res.status(400).json({ errors: [{ message: 'Invalid Credentials!' }] });
        }

        //Then checking if the has of the password provided by user 
        //is same as the hashed password value saved in our database.
        const hashMatches = await bcrypt.compare(password, user.password);

        if (!hashMatches) {
            return res.status(400).json({ errors: [{ message: 'Invalid Credentials!' }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        //Finally after all the checks, we can say that the user exists.
        //So, we can create JWT and sign it using our JWT Secret.
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 86400000 },
            (error, token) => {
                if (error) throw error;
                //Sending JWT to end user
                res.json({ 
                        // 'id': user.id,
                        token        
                    });
            }
        )
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error! Could not create JWT.')
    }
})


module.exports = router;