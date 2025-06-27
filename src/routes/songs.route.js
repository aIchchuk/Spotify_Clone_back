import { Router } from "express";
import {protectRoute, requireAdmin} from "../middleware/auth.middleware.js"
import { getAllSongs, getFeaturedSongs, getTrendingSongs, getMadeForYouSongs } from "../controller/song.controller.js";

const router = Router();

router.get('/', protectRoute, requireAdmin, getAllSongs);
router.get('/featured', getFeaturedSongs);
router.get('/trending', getTrendingSongs);
router.get('/made-for-you', getMadeForYouSongs);




export default router