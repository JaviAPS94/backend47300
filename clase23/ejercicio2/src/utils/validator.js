import expressJoiValidation from 'express-joi-validation';

const validator = expressJoiValidation.createValidator({
    passError: false
});

export default validator;