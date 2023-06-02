const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();

const User = require('../../models/Users');
const Document = require('../../models/Documents');
