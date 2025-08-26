import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import path from "path";
import client from "prom-client";
import express from "express";

import GithubRouter from "./routes/github";
import { pushMetrics } from "./services/metrics";

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

pushMetrics();

const pathName = path.join(__dirname, "/../../client/dist");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(express.static(pathName));
app.use(cors());

app.get("/", (_req, res) => {
  res.sendFile(path.join(pathName, "index.html"));
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Metrics endpoint
app.get("/metrics", async (_req, res) => {
  try {
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.end(metrics);
  } catch (err) {
    res.status(500).end(err);
  }
});

app.use("/api", GithubRouter);

const server = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Shutting down...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
