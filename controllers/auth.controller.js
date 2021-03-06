const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { generarJWT } = require("../helpers/generarJWT");

//login user
const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario/contraseña incorrectos",
      });
    }

    if (user.state === false) {
      return res.status(400).json({
        msg: "Usuario/contraseña incorrectos",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario/contraseña incorrectos",
      });
    }

    const token = await generarJWT(user.id);

    res.status(200).json({
      msg: "login ok",
      data: { token, user },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

//register user
const register = async (req = request, res = response) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: "Usuario ya existe",
      });
    }

    const NewUser = new User({ name, email, password });

    //encrypt password
    const salt = bcryptjs.genSaltSync();
    NewUser.password = bcryptjs.hashSync(password, salt);

    const token = await generarJWT(NewUser.id);
   
    await NewUser.save();
    res.status(200).json({
      msg: "Usuario creado",
      data: { token, NewUser },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

//revalidation token
const revalidarTWJ = async (req = request, res = response) => {
  const {_id } = req.user;
  // generar un nuevo token
  const token = await generarJWT(_id);
 
  res.json({
    msg:"token revalidado",
    data:{token, user:req.user}
  });
};


module.exports = {
  login,
  register,
  revalidarTWJ
};
