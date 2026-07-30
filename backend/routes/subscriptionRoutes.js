import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
    getRenewalSubscriptions
} from "../controllers/subscriptionController.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createSubscription);
router.get("/", getAllSubscriptions);
router.get("/:id", getSubscriptionById);
router.get("/renewing-soon", getRenewalSubscriptions);
router.put("/:id", updateSubscription);
router.delete("/:id", deleteSubscription);

export default router;