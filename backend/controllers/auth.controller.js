class AuthController {
    static signUp(req, res, next) {
        console.log(req.body)
        res.json({ message : "coucou ! "})
    }
}

module.exports = AuthController;