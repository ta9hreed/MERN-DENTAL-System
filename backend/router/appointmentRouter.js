import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
  getAppcount
} from "../controller/appointmentController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();
      /** POST Methods */
      /**
     * @openapi
     * '/api/v1/appointment':
     *  post:
     *     tags:
     *     - Appointment Controller
     *     summary: create a new appointment
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

router.post("/post", isPatientAuthenticated, postAppointment);
    /** GET Methods */
    /**
     * @openapi
     * '/api/user':
     *  get:
     *     tags:
     *     - Appointment Controller
     *     summary: Get all appointment
     *     parameters:
     *      - name: username
     *        in: path
     *        description: The username of the user
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

router.get("/getall", isAdminAuthenticated, getAllAppointments);
    /** GET Methods */
    /**
     * @openapi
     * '/api/user/count':
     *  get:
     *     tags:
     *     - Appointment Controller
     *     summary: Get count of appointment
     *     parameters:
     *      - name: username
     *        in: path
     *        description: The username of the user
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

router.get("/count", isAdminAuthenticated, getAppcount);
/** PUT Methods */
    /**
     * @openapi
     * '/api/v1/appointment/update':
     *  put:
     *     tags:
     *     - Appointment Controller
     *     summary: Modify a appointment
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - userId
     *            
     *     responses:
     *      200:
     *        description: Modified
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */

router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
/** DELETE Methods */
    /**
     * @openapi
     * '/apiv1//appointment/{Id}':
     *  delete:
     *     tags:
     *     - Appointment Controller
     *     summary: Delete Appointment by Id
     *     parameters:
     *      - name: Id
     *        in: path
     *        description: The unique Id of the appointment
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
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;
