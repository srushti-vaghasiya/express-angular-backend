import "dotenv/config";
import "reflect-metadata";
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { AppDataSource } from "@config/data-source";
import routes from "@routes/index";
import { errorHandler } from "@middleware/errorMiddleware";

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use("/api", routes);
app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  })
  .catch((err) => console.error(err));
