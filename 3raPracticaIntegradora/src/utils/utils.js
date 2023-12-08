import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PRIVATE_KEY_JWT } from '../config/contants.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createHash = password => 
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (plainPassword, hashedPassword) =>
    bcrypt.compareSync(plainPassword, hashedPassword);

const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY_JWT, { expiresIn: '24h' });
    return token;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.userNodemailer,
        pass: config.passwordNodemailer
    }
})

export {
    isValidPassword,
    generateToken,
    createHash,
    __dirname,
    transporter
}