const { Router } = require('express');
const { localLogger, localLoggerValidation, validateUserID, passwordValidation } = require('../middleware/middleware');
const usersArray = require("./usersArray");


// Create Router by invoking router method
const router = require('express').Router();

router.get('/', localLogger, (req, res) => {
    res.status(200).json(usersArray);
})

router.get('/:id', validateUserID, (req, res) => {
    let id = req.params.id;
    let user = usersArray[id - 1];
    res.status(200).json(user);
})

// | POST | /api/register | Creates a user from { username, password } in the `request body`, responds with newly created user.
router.post('/register', localLoggerValidation, (req, res) => {
    let newUser = { "id": (usersArray.length + 1), "username": req.body.username, "password": req.body.password }
    usersArray.push(newUser)
    console.log(req.body, "req.body")
    res.status(201).json(newUser)
})

//     | POST   | /api/login    | Checks { username, password } in the `request body`, responds with a welcome message.               |
router.post('/login', localLoggerValidation, passwordValidation, (req, res) => {
    console.log(req.body, "req.body of login");
    res.status(200).json({ message: `Welcome ${req.body.username}, to HEROKU! You are who you say you are!` })
})


// export the router
module.exports = router;