import { Router } from 'express';

const router = Router();

const users = [];

//La arquitectura por capas no esta correctamente aplicada A04
router.post('/register',(req,res)=>{
    //Validación de campos del usuario, que sea oblogatorio el nombre, apelliod, correo, password A04
    const user = req.body;
    console.log(user);
    if(users.length===0) user.id = 1;
    else user.id = users[users.length-1].id+1;
    //Antes de guardar el usuario debemos hashear la contraseña, nunca alamacenar en texto A07
    users.push(user);
    res.send({status:"success",payload:user})
})

export default router;