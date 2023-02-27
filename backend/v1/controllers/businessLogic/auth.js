require('dotenv').config()
const { JWT_SECRET_APP } = process.env;
const bcrypt = require('bcrypt');
const userModel = require('../../models/user-model');
const jwt = require('jsonwebtoken');
const EmailValidator = require('email-validator');

const PASSWORD_LENGTH = 4;

//encode password
async function generatePassword(plainTextPassword) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
}

//generate jwt token
async function generateJWT(user) {
    return await jwt.sign(JSON.stringify(user), JWT_SECRET_APP);
}

//verify password and return boolean, ex: true for exact password
async function comparePasswords(plainTextPassword, hash) {
    return await bcrypt.compare(plainTextPassword, hash);
}


async function loginUser(req, res) {
    const { email, password } = req.body;
    //verify email
    try {
        //check not null email
        if (!email) {
            return res.status(400).send({
                status: 400,
                message: 'Email is required.',
                data: null
            });
        }

        //check valid email
        if (email && !EmailValidator.validate(email)) {
            return res.status(400).send({
                status: 400,
                message: 'Email is malformed.',
                data: null
            });
        }

        //check valid password
        if (!password) {
            return res.status(400).send({
                status: 400,
                message: 'Password is require',
                data: null
            });
        }
        else if (password.length < PASSWORD_LENGTH) {
            return res.status(400).send({
                status: 400,
                message: `Password must be ${PASSWORD_LENGTH} Characters`,
                data: null
            });
        }

        const user = await userModel.findOne({ email: email });
        if (user) {
            //verify password (2)
            const verifyPassword = await comparePasswords(password, user.password);
            if (verifyPassword) {
                //generate token if (1) and (2) are success
                const jwt = await generateJWT(user);

                //return token

                res.status(201).json({
                    status: 201,
                    message: "User authenticate successfully",
                    data: {
                        user,
                        token: jwt
                    }
                });
            } else {
                res.status(401).json({
                    status: 401,
                    message: "User cannot be authentify, wrong password"
                });
            }

        }
        else {
            res.status(401).json({
                status: 401,
                message: "User cannot be authentify, wrong email"
            });
        }
    }
    catch (e) {
        res.status(500).json({
            status: 500,
            message: `An error server try occurred, Please again or check the message error ${e.message}!`,
            data: e.message
        })
    }

}


module.exports = {
    generatePassword: generatePassword,
    generateJWT: generateJWT,
    loginUser: loginUser
}
