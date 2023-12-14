import bcrypt from 'bcrypt';
import {fileURLToPath} from 'url';
import path from 'path';

export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}

export const passwordValidation = async(user,password) => bcrypt.compare(password,user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); //c://coderhouse/comision47300/clase39/recursosbackend/src/utils
const __mainDirname = path.join(__dirname, '..', '..') //c://coderhouse/comision47300/clase39/recursosbackend

export default __mainDirname;