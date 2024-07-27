import express from "express";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,
  patientRegister,
  getCountDoctors,
  updateUser,
  deleteUser,
  getUserById,
  getAllPatients,
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";
const router = express.Router();

/** POST Methods */
    /**
     * @openapi
     * '/api/v1/user/register':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Create a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - email
     *              - password
     *            properties:
     *              username:
     *                type: string
     *                default: johndoe 
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.post("/patient/register", patientRegister);

    /**
     * @openapi
     * '/api/v1/user/login':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Login as a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - password
     *            properties:
     *              username:
     *                type: string
     *                default: johndoe
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.post("/login", login);

    /**
     * @openapi
     * '/api/user/add new Admin':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: add new Admin
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - password
     *            properties:
     *              username:
     *                type: string
     *                default: johndoe
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
/** POST Methods */
    /**
     * @openapi
     * '/api/v1/user/addNewDoctor':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Create a Doctor
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - email
     *              - password
     *            properties:
     *              username:
     *                type: string
     *                default: johndoe 
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
/** GET Methods */
    /**
     * @openapi
     * '/api/v1/user/getalldoctors':
     *  get:
     *     tags:
     *     - User Controller
     *     summary: Get all Docters
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
router.get("/doctors", getAllDoctors);
/** GET Methods */
    /**
     * @openapi
     * '/api/v1/user/Allpatients':
     *  get:
     *     tags:
     *     - User Controller
     *     summary: Get all patients
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
router.get("/patients", getAllPatients);
/** GET Methods */
    /**
     * @openapi
     * '/api/v1/user/count':
     *  get:
     *     tags:
     *     - User Controller
     *     summary: Get count of Doctors
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
router.get("/count", getCountDoctors);

router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.put("/update/:id", isAdminAuthenticated, updateUser);
router.delete("/delete/:id", isAdminAuthenticated, deleteUser);
/** PUT Methods */
    /**
     * @openapi
     * '/api/user/update':
     *  put:
     *     tags:
     *     - User Controller
     *     summary: Modify a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - userId
     *            properties:
     *              userId:
     *                type: string
     *                default: ''
     *              firstName:
     *                type: string
     *                default: ''
     *              lastName:
     *                type: string
     *                default: ''
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
router.put("/patient/update/:id", isPatientAuthenticated, updateUser);
/** DELETE Methods */
    /**
     * @openapi
     * '/api/v1/user/{userId}':
     *  delete:
     *     tags:
     *     - User Controller
     *     summary: Delete user by Id
     *     parameters:
     *      - name: userId
     *        in: path
     *        description: The unique Id of the user
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
router.delete("/patient/delete/:id", isPatientAuthenticated, deleteUser);

    /** GET Methods */
    /**
     * @openapi
     * '/api/v1/user/{username}':
     *  get:
     *     tags:
     *     - User Controller
     *     summary: Get a user by username
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
router.get("/getUserById/:id", isPatientAuthenticated, getUserById);
export default router;
