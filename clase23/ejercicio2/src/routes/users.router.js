import Router from "./router.js";
import validator from "../utils/validator.js";
import { postSchema, getByIdSchema } from "../schemas/users.schema.js";

export default class UsersRouter extends Router {
    init() {
        this.get('/', ['ADMIN','USER_PREMIUM','USER'], (req, res) => {
            // res.sendSuccess('Hola coders custom response');
            res.sendClientError('Error del cliente');
        })

        this.post('/', ['ADMIN','USER_PREMIUM','USER'], validator.body(postSchema), (req, res) => {
            // {
            //     name: "Robert", //obligatorio, string
            //     last_name: "Mendoza", //obligatorio, string
            //     email: "rm@gmail.com" //oobligatorio, string estructura de un correo ****@coder.com
            // }
            // res.sendSuccess('Hola coders custom response');
            res.sendClientError('Error del cliente');
        })

        this.get('/path-param/:id', ['ADMIN','USER_PREMIUM','USER'], validator.params(getByIdSchema), (req, res) => {
            // res.sendSuccess('Hola coders custom response');
            res.sendClientError('Error del cliente');
        })

        this.put('/validator-mixed/:id', ['ADMIN','USER_PREMIUM','USER'], validator.params(getByIdSchema), validator.body(postSchema), (req, res) => {
            // res.sendSuccess('Hola coders custom response');
            res.sendClientError('Error del cliente');
        })
    }
}
