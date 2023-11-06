import MongoSingleton from "./singleton.js";

const firstInstance = MongoSingleton.getInstance();
const secondInstance = MongoSingleton.getInstance();
const thirdInstance = MongoSingleton.getInstance();

//clase usuario Alex, Lucas, Robert
const usuarioAlex = new User();
const usuarioLucas = new User();
const usuarioRobert = new User();
//Lucas

