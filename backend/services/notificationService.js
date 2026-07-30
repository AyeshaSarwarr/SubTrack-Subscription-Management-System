import prisma from "../config/prisma.js";
import { sendRenewalEmail } from "./mailService.js";
import { getRenewingSubscriptions } from "./subscriptionService.js"

export async function notifyRenewals() {

    try {
        const subscriptions = await getRenewingSubscriptions(7);

        if (subscriptions.length === 0) {
            console.log("No subscriptions renewing in the next 7 days.");
            return;
        }
        const user = await prisma.user.findFirst();
        await sendRenewalEmail(user.email, subscriptions);
        
        console.log(`Sent renewal reminder for ${subscriptions.length} subscription(s).`);
    } catch (error) {
        console.error(error)
    }
}