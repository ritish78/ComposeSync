const express = require('express');
const dotenv = require('dotenv');

const auth = require('../../middleware/auth');

const router = express.Router();

const Profile = require('../../models/Profile');


// @route       GET api/profile/me
// @desc        Get current user's profile
// @access      Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile
                                .findOne({ user: req.user.id })
                                .populate('user', ['name', 'email']);
        
        if (!profile) {
            return res.status(400).json({ message: 'No profile found of requested user!' });
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Could not get profile!' });
    }
})



// @route       POST api/profile
// @desc        Create user's profile
// @access      Private
router.post('/', auth, async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
     
        console.log('Profile of current user', { profile });

        await profile.save();

        res.status(201).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }

})


module.exports = router;