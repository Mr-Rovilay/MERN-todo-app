import express from "express";
import todoRoute from "./routes/todoRoute.js";
import "./db/db.js";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

app.use("/todo", todoRoute);

app.get("/", (req, res) => {
  res.send("OK...my message");
});

app.listen(process.env.PORT, () =>
  console.log("server listening on port " + process.env.PORT)
);
