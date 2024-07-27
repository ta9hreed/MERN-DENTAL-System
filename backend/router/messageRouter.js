import express from "express";
import {
  getAllMessages,
  sendMessage,
  deletemesage,
  updatemesage,
  getmessageById
} from "../controller/messageController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
      /** POST Methods */
      /**
     * @openapi
     * '/api/v1/message':
     *  post:
     *     tags:
     *     - Message Controller
     *     summary: create a new message
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *             
     *            properties:
     *              
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        desccription: Server Error
     */

router.post("/send", sendMessage);
    /** GET Methods */
    /**
     * @openapi
     * '/api/v1/message':
     *  get:
     *     tags:
     *     - Message Controller
     *     summary: Get all massage
     *     parameters:
     *  
     *        required: true
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */

router.get("/getall", isAdminAuthenticated, getAllMessages);
    /** GET Methods */
    /**
     * @openapi
     * '/api/v1/message/:id':
     *  get:
     *     tags:
     *     - Message Controller
     *     summary: Get massage by id
     *     parameters:
     *  
     *        required: true
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */

router.get("/get/:id", getmessageById);
/** DELETE Methods */
    /**
     * @openapi
     * '/api/v1/message/:Id':
     *  delete:
     *     tags:
     *     - Message Controller
     *     summary: Delete message by Id
     *     parameters:
     *      - name: Id
     *        in: path
     *        description: The unique Id of the message
     *        required: true
     *     responses:
     *      200:
     *        description: Removed
     *      400:
     *        description: Bad request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.delete("/:id", isAdminAuthenticated, deletemesage);
export default router;
