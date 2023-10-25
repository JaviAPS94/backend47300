import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PRIVATE_KEY_JWT } from './config/contants.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export {
    isValidPassword,
    generateToken,
    createHash,
    __dirname
}