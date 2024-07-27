import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import swaggerUI  from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
const app = express();
config({ path: "./.env" });

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
const options={
  definition:{
    openapi:"3.0.0",
    info:{
      title:"Libarary Api",
      version:"1.0.0",
      description:"A simple Express Library API"
    },
    servers:[{
      url:"http://localhost:3000"
    }
    ],
  },
    apis:["./router/*.js"]
}
const specs= swaggerJsDoc(options);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(specs))
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

dbConnection();

app.use(errorMiddleware);
export default app;
