import express from "express";
import http from "http";
import { getRoutes } from "./routes.js";
import { getController } from "./factory.js";

const app = express();
const server = http.createServer(app);

app.use(getRoutes(getController()))

server
    .listen(3000)
    .on("listening", () => {
        console.log("server is running at 3000");
    })
