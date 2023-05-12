export default (req, res, next) => {
    if (req.body.password !== "secretpaswd") {
        res.status(401).send("Dostęp zabroniony");
        return;
    }
    next();
};
