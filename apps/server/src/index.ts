import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import path from "path";
import express from "express";

import GithubRouter from "./routes/github";

const pathName = path.join(__dirname, "/../../client/dist");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(express.static(pathName));
app.use(cors());

app.get("/", (_req, res) => {
  res.sendFile(path.join(pathName, "index.html"));
});

app.use("/api", GithubRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
