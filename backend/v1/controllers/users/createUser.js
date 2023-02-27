const userModel = require('../../models/user-model');
const { generatePassword, generateJWT } = require('../businessLogic/auth');

async function createUser(req, res) {
    try {
        const { fullName, email, password } = req.body
        const user = await userModel.findOne({ email: email });
        if (user) {
            res.status(401).json({
                status: 401,
                message: "This email is already in used, try another one",
                data: null
            });
        }
        else {
            const user = {
                fullName: fullName,
                email: email,
                password: await generatePassword(password),
                role: "user",
                createdAt: new Date(),
            }

            //add data in database
            const data = new userModel(user);
            data.save(async (err, result) => {
                if (err) {
                    res.status(500).json({
                        status: 500,
                        message: "Somethings wrong, try again or check the error message",
                        data: err.message
                    });
                }
                else {
                    res.status(201).json({
                        status: 201,
                        message: "user created successfully",
                        data: {
                            user: result,
                            token: await generateJWT(result)
                        }
                    });
                }
            });
        }
    }
    catch (e) {
        res.status(500).json({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }


}

module.exports = {
    createUser: createUser
}