import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path from "path";

dotenv.config({ path: "./.env" });
const app = express();

/* CONSTANTS */
const PORT = process.env.PORT || 5000;
/* MIDDLEWARES */
app.use(express.json({ limit: "7mb" }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "7mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "7mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the filename
  },
});

const upload = multer({ storage, limits: { fileSize: 7 * 1024 * 1024 } });

app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      res.json({ message: "Ошибка при загрузке файла" });
    } else {
      res.status(200).json({ message: "Успешно" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка" });
  }
});

/* START FUNCTION */
async function start() {
  try {
    app.listen(PORT, (err) => {
      if (err) return console.log("App crashed: ", err);
      console.log(`Server started successfully! Port: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
