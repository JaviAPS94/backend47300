import { Router } from "express";

const router = Router();

//La arquitectura por capas no esta correctamente aplicada A04
router.get('/',(req,res)=>{
    res.render('register');
})

router.get('/login',(req,res)=>{
    res.render('login');
})
export default router;