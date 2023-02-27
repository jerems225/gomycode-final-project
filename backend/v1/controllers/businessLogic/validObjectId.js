const { default: mongoose } = require("mongoose");

function validateId(uuid)
{
    const validId = mongoose.isValidObjectId(uuid);

    return validId ? true : false;
}

module.exports = {
    validateId : validateId
}