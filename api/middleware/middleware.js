module.exports = { logger, localLogger, localLoggerValidation, validateUserID, passwordValidation }
const usersArray = require("../users/usersArray");

function logger(req, res, next) {
    const timeRightNow = new Date()

    console.log("Request Method: ", req.method)
    console.log("Request URL: ", req.originalUrl)
    console.log("Time and Date: ", timeRightNow.toGMTString())
    next();
}

function localLogger(req, res, next) {
    console.log("This is localMiddleware")

    next();
}

function localLoggerValidation(req, res, next) {
    console.log("This is localMiddleware that checks for a request body")
    if (!req.body.username && !req.body.password) {
        res.status(400).json({ message: "missing required field" })
    } else {
        next();
    }
    next();
}

function validateUserID(req, res, next) {
    // DO YOUR MAGIC
    let id = req.params.id
    if (!usersArray[id - 1]) {
        res.status(400).json({ message: "No User With That ID" })
    } else {
        next();
    }
}

function passwordValidation(req, res, next) {
    const currentUser = usersArray.find(user => { if (user.username === req.body.username) return user })
    console.log(currentUser.username, "current User");
    console.log(currentUser.password, "expected pw")
    if (currentUser.username && (currentUser.password === req.body.password)) {
        next()
    } else {
        res.status(400).json({ message: "User and Password don't match" })
    }
}
