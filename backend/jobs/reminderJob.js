// jobs/reminderJob.js

import cron from "node-cron";
import { notifyRenewals } from "../services/notificationService.js";

cron.schedule("0 8 * * *", async () => {
    console.log("Checking for renewals...");

    await notifyRenewals();
});