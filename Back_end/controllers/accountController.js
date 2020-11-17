const db = require('../models');
const data = require('../dataimport');
const expressAsyncHandler =  require('express-async-handler');
const bcrypt = require('bcryptjs');
const {generateToken} = require('../utlis');


module.exports.seed =  expressAsyncHandler(async (req, res) => {
    const create = await db.users.bulkCreate(data.users);
    res.send({create});
});

module.exports.singin =    expressAsyncHandler(async (req, res) => {
    const user = await db.users.findOne({
        where: {
            userEmail: req.body.email
        }
    });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.userPassword)){
            res.send({
                id: user.idUser,
                Fname: user.userFname,
                Lname: user.userLname,
                email: user.userEmail,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({message: "Không đúng tài khoản hoặc mật khẩu"});
}
)
