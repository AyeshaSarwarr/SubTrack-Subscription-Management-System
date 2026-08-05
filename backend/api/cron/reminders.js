import { notifyRenewals } from "../services/notificationService.js";

export default async function handler(req, res) {
  try {
    console.log("Checking for renewals...");

    await notifyRenewals();

    return res.status(200).json({
      success: true,
      message: "Renewal check completed.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}