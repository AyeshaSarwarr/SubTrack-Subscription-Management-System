import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendRenewalEmail(to, subscriptions) 
{
    let htmlString = `<h2>Renewal Reminder</h2>
                    <p>The following subscriptions require your attention:</p>
                    <ul>`;
    for (const sub of subscriptions) {

        htmlString +=
            `
        <li>
            <b>${sub.name}</b>
            — renews on
            ${sub.endDate.toDateString()}
        </li>
        `  
    }
    htmlString += `</ul>
    <p>Don't forget to renew or cancel it if needed.</p>`
    
    await transporter.sendMail({
        from: `"SubTrack" <${process.env.EMAIL_USER}>`,
        to,

        subject: "Subscription Renewal Reminder",

        html: htmlString,
    });
}