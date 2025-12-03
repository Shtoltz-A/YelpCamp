import ExpressError from "../utils/ExpressError.js";

export const validateCampground = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const msg = error.details.map(el => el.message).join(', ');
            throw new ExpressError(msg, 400);
        };
        next();
    };
};