const uuid = require('uuid');
const HttpError = require('../models/http-error');

let DUMMY_USERS = [
    {
        id: 'u1',
        name: 'User1',
        email: 'user@email.com',
        password: 'tester'
    }
];

const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS});
};

const signup = (req, res, next) => {
    const { name, email, password} = req.body;
    const createdUser = {
        id: uuid.v4(),
        name,
        email,
        password
    };
    DUMMY_USERS.push(createdUser);
    res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
    const {email, password} = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.id === email);
    if (!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Could not identify user, credentials seem to be wrong', 401);
    }
    res.json({message:'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
