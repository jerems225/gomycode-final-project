const visitorModel = require("../../models/visitor-model");

async function saveVisitor(deviceAddress)
{
    try{
        const newVisitor = await visitorModel.create({
            deviceAddress : deviceAddress,
        });
        newVisitor.save((err, result) => {
            return err ? false : true;
        })

    }
    catch(e)
    {
        return false;
    }
}

module.exports = {
    saveVisitor : saveVisitor
}