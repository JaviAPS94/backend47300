import { Router as expressRouter } from 'express';
import jwt from 'jsonwebtoken';

export default class Router {
    constructor() {
        this.router = expressRouter();
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() {}

    get(path, policies, ...callbacks) {
        this.router.get(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks) 
        )
    }

    post(path, policies, ...callbacks) {
        this.router.post(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks) 
        )
    }

    put(path, policies, ...callbacks) {
        this.router.put(
            path,
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks) 
        )
    }

    handlePolicies = (policies) => (req, res, next) => {
        //["ADMIN"]
        //No validamos nada
        if(policies[0] === 'PUBLIC') return next();
        const authToken = req.headers['authorization'];
        if(!authToken)
            return res.status(401).json({ error: 'no token provide' });
        const token = authToken.split(" ")[1];

        const user = jwt.verify(token, 'secretCoder');

        if(!policies.includes(user.role.toUpperCase()))
            return res.status(403).json({ error: 'not permissions' })

        req.user = user;
        next();
    }

    generateCustomResponse = (req, res, next) => {
        res.sendSuccess = (data) => {
            res.status(200).json({ data })
        };

        res.sendServerError = (error) => {
            res.status(500).json({ error });
        };

        res.sendClientError = (error) => {
            res.status(400).json({ error });
        };

        next();
    }

    applyCallbacks(callbacks) {
        //mapear los calbacks 1 a 1, obtiendo sus parámetros
        return callbacks.map((callback) => async (...params) => {
            try {
                //apply, va a ejecutar la función callback, a la instancia de nuestra clase
                await callback.apply(this, params);
            } catch (error) { //[req, res, next]
                params[1].status(500).json({ status: 'error', message: error.message });
            }
        })
    }
}