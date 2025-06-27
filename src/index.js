import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from '@clerk/express'

import userRoutes from "./routes/user.route.js"
import adminRoutes from "./routes/admin.route.js"
import authRoutes from "./routes/auth.route.js"
import songsRoutes from "./routes/songs.route.js"
import albumsRoutes from "./routes/albums.route.js"
import statsRoutes from "./routes/stats.route.js"
import fileUpload from "express-fileupload";
import path from "path"

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT;

app.use(express.json()); // to parse req.body
app.use(clerkMiddleware()); // this will add auth to request obj => req.auth.userId
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB max file size
    }
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/stats", statsRoutes);

// error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message });
});



app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port " + PORT);
    
});


// todo: socket.io