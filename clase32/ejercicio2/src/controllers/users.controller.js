import CustomError from "../middlewares/errors/CustomError.js";
import EErrors from "../middlewares/errors/enums.js";
import { generateUserErrorInfo } from "../middlewares/errors/info.js";

const saveUser = async (req, res) => {
    try {
        
    } catch (error) {
        if(typeof error === StockInvalid) {
            
        }
    }
    const { first_name, last_name, email } = req.body;
    if(first_name || !last_name || !email) {
        throw CustomError.createError({
            name: 'UserError',
            cause: generateUserErrorInfo({
                first_name,
                last_name,
                email
            }),
            message: 'Error trying to create user',
            code: EErrors.INVALID_TYPE_ERROR
        })
    }

    res.send({
        status: 'success',
        payload: { first_name, last_name, email }
    })
}

export default saveUser;