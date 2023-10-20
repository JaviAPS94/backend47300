import Router from "./router.js";

export default class UsersRouter extends Router {
    init() {
        this.get('/', ['ADMIN','USER_PREMIUM','USER'], (req, res) => {
            // res.sendSuccess('Hola coders custom response');
            res.sendClientError('Error del cliente');
        })
    }
}
