import { configDotenv } from "dotenv";
import { Resend } from "resend";
configDotenv();

export async function sendVerificationEmail(email: string, token: string) {
    // Send verification email
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
        from: 'No-Reply <noreply@wobble.social>',
        to: [email],
        subject: 'Verify your email',
        text: 'Verify your email \n \n Click the link to verify your email \n ' + token,
        html: 'Verify your email <br><br> Click the link to verify your email <br>' + token,
    });

    hhtps://www.example.com/api/v1/users/verify/token

    if (error) throw error;
    return data;
}