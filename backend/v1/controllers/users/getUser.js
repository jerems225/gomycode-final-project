const userModel = require("../../models/user-model");
const { validateId } = require("../businessLogic/validObjectId");

async function getUser(req, res) {
    try {
        const uuid = req.params.uuid;
        const validId = validateId(uuid);
        if (validId) {
            const user = await userModel.findById(uuid);
            if (user) {
                res.status(201).json({
                    status: 201,
                    message: "User found !",
                    data: user
                });
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "User not found !",
                    data: null
                });
            }
        }
        else {
            res.status(500).json({
                status: 500,
                message: "Invalid ID",
                data: null
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
    getUser: getUser
}