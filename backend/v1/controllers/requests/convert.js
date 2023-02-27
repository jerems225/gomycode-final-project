require('dotenv').config();
const userModel = require("../../models/user-model");
const visitorModel = require("../../models/visitor-model");
const { checkRequestLimit } = require("../businessLogic/convert/checkRequestLimit");
const { convertService } = require("../businessLogic/convert/convertService");

async function convert(req, res) {
    try {
        const { amount, from, to, userId, deviceAddress, isLogged } = req.body;
        if (isLogged) {
            //run convert service
            const result = await convertService(amount, from, to)

            //update user requests array
            await userModel.findOneAndUpdate({ _id: userId }, {
                $push: {
                    requests: {
                        amount: amount,
                        form: from,
                        to: to,
                        resutl: result
                    }
                }
            });

            res.status(201).json({
                status: 201,
                message: `the value of ${from} in ${to}`,
                data: {
                    from: {
                        name : from,
                        value: amount
                    },
                    to: {
                        name : to,
                        value: result
                    },
                }
            });
        }
        else {
            //visitor...
            //Check request Limit
            const checkLimit = await checkRequestLimit(deviceAddress);
            if (checkLimit) {
                //run convert service
                const result = await convertService(amount, from, to)

                //update user requests array
                await visitorModel.findOneAndUpdate({ deviceAddress }, {
                    $push: {
                        requests: {
                            amount: amount,
                            form: from,
                            to: to,
                            result: result
                        }
                    }
                });
                res.status(201).json({
                    status: 201,
                    message: `the value of ${from} in ${to}`,
                    data: {
                        from: {
                            name : from,
                            value: amount
                        },
                        to: {
                            name : to,
                            value: result
                        },
                    }
                });
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: `You cannot convert again, you reach the number of requests for visitor, please you need to create an account and try again`,
                    data: null
                });
            }
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
    convert: convert
}