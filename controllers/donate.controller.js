const utilHelpers = require("../helpers/util.helper")
const { catchAsync, AppError } = require("../helpers/util.helper")


const Request = require("../models/Request")
const User = require("../models/Request")

const donateController = {};

donateController.createDonate = catchAsync(async (req, res, next) => {
    req.body.target = "610fbc2b1657ee204464dfdb"
    req.body.author = "610fbc2b1657ee204464dfda"

    const donate = await Request.create({... req.body})
    
    return utilHelpers.sendResponse(
        res,
        200,
        true,
        {donate},
        null,
        "Create donate success"
      );
})

donateController.getAllDonate = catchAsync(async (req, res, next) => {
    const donate = await Request.find()
})

donateController.getSingleDonate = catchAsync(async(req, res, next) => {
    const donate = await Request.findById({_id: req.params.id})
})

module.exports = donateController;