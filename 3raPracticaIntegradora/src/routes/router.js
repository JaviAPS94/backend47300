import { Router as expressRouter } from 'express';
import { passportStrategiesEnum } from '../config/enums.js';
import passport from 'passport';

export default class Router {
    constructor() {
        this.router = expressRouter();
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() {}

    get(path, policies, passportStrategy, ...callbacks) {
        this.router.get(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks) 
        )
    }

    post(path, policies, passportStrategy, ...callbacks) {
        this.router.post(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks) 
        )
    }

    put(path, policies, passportStrategy, ...callbacks) {
        this.router.put(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomResponse,
            this.applyCallbacks(callbacks) 
        )
    }

    applyCustomPassportCall = (strategy) => (req, res, next) => {
        if (strategy === passportStrategiesEnum.JWT) {
            passport.authenticate(strategy, function (err, user, info) {
                if (err) return next(err);

                if(!user) {
                    return res.status(401).send({
                        error: info.messages ? info.messages : info.toString()
                    })
                }

                req.user = user;
                next();
            })(req, res, next);
        } else {
            next();
        }
    }

    handlePolicies = (policies) => (req, res, next) => {
        //["ADMIN"]
        //No validamos nada
        if(policies[0] === 'PUBLIC') return next();

        const user = req.user;

        if(!policies.includes(user.role.toUpperCase()))
            return res.status(403).json({ error: 'not permissions' })

        next();
    }

    generateCustomResponse = (req, res, next) => {
        res.sendSuccess = (data) => {
            res.status(200).json({ data })
        };

        res.sendSuccessNewResource = (data) => {
            res.status(201).json({ data })
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