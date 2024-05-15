
let DUMMY_USERS = [
    {
        id: 'u1',
        userName: 'User1',
        email: 'user@email.com'
    }
];

const getAllUsers = (req, res, next) => {
    users = DUMMY_USERS;
    res.status(200).json({users});
};

exports.getAllUsers = getAllUsers;
