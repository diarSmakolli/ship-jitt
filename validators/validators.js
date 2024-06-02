const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        body('first_name')
            .trim()
            .notEmpty()
            .withMessage('First name is required')
            .isLength({ min: 1 })
            .withMessage('First name cannot be empty'),
        body('last_name')
            .trim()
            .notEmpty()
            .withMessage('Last name is required')
            .isLength({ min: 1 })
            .withMessage('Last name cannot be empty'),
        body('email')
            .trim()
            .isEmail()
            .withMessage('Valid email is required'),
        body('password')
            .trim()
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({
        status: 'error',
        statusCode: 400,
        errors: errors.array()
    });
};

module.exports = {
    userValidationRules,
    validate
};
