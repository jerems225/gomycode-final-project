require('dotenv').config();
const { VISITOR_REQUEST_LIMIT } = process.env;
const visitorModel = require("../../../models/visitor-model");
const { saveVisitor } = require("../../visitors/saveVisitor");

async function checkRequestLimit(deviceAddress) {
    const visitor = await visitorModel.findOne({ deviceAddress: deviceAddress });
    if (visitor) {
        return visitor.requests.length < VISITOR_REQUEST_LIMIT ? true : false;
    }
    else {
        //save visitor
        await saveVisitor(deviceAddress);
        return true;
    }
}

module.exports = {
    checkRequestLimit: checkRequestLimit
}