const { User } = require('../db/models');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


const restoreUser = async (req, res, next) => {
    // console.log(req.session);

    if (req.session.user) {
        const { userId } = req.session.user;

        try {
            const user = await User.findByPk(userId);

            if (user) {
                res.locals.authenticated = true;
                res.locals.user = user;
                next();
            }
        } catch (err) {
            res.locals.authenticated = false;
            next(err);
        }
    } else {
        res.locals.authenticated = false;
        next();
    }
};


module.exports = {
    restoreUser,
    asyncHandler
};
