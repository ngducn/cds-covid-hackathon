const express = require("express");
const requestController = require("../controllers/request.controller");

const router = express.Router();

/**
 * @Path : localhost:5000/request
 * @Method : GET
 * @Access : public
 * @Description : Get requests
 */

router.get("/", requestController.getRequests);

/**
 * @Path : localhost:5000/request
 * @Method : POST
 * @Access : public
 * @Description : Create a request
 */

router.post("/", requestController.createNewRequest);

/**
 * @Path : localhost:5000/request
 * @Method : PUT
 * @Access : Admin
 * @Description : Update the request status
 */

router.put("/", requestController.updateRequestStatus);

module.exports = router;