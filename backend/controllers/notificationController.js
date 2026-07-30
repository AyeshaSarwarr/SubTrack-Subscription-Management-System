import { notifyRenewals } from "../services/notificationService.js";

export async function sendNotifications(req, res) {

    try {

        await notifyRenewals();

        res.json({
            message: "Emails sent successfully."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}