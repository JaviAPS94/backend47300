import Users from "../dao/Mongo/Users.js"
//Una dependencia sin uso, A06
import { createHash } from "../utils.js";

const userService = new Users();

//Catching de errores no esta implementado A05
const getUsers = async(req,res) =>{
    const result = await userService.getUsers();
    res.send({status:"success",payload:result})
}

const getUser = async(req,res) =>{
    const id = req.params.uid;
    const user = await userService.getUserById(id);
    res.send({status:"success",payload:user})
}

export default {
    getUsers,
    getUser
}