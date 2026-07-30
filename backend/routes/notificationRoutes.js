import { sendNotifications } from "../controllers/notificationController.js";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();


router.use(authMiddleware);

router.post("/renewals", sendNotifications);

export default router;