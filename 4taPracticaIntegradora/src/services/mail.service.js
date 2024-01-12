import { transporter } from "../utils/utils.js"

export const sendEmail = async (email) => {
    await transporter.sendMail({
        from: 'CoderHouse 47300',
        to: email.to,
        subject: email.subject,
        html: email.html
    })
}