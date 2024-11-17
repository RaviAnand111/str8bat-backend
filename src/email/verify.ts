import { configDotenv } from 'dotenv';
import { Resend } from 'resend';
import { User } from '../schema/user.schema';
configDotenv();

export async function sendVerificationEmail(email: string, token: string, user: User) {
    const mailTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      background-color: #28a745;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .logo-section {
      text-align: center;
      padding: 20px 0;
    }
    .logo-section img {
      max-width: 150px;
      height: auto;
    }
    .email-body {
      padding: 20px;
    }
    .email-body p {
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .email-button {
      display: block;
      text-align: center;
      margin: 30px 0;
    }
    .email-button a {
      background-color: #28a745;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
    }
    .email-footer {
      background-color: #f4f4f4;
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #777;
    }
    .email-footer a {
      color: #28a745;
      text-decoration: none;
    }
    img {
      width: 300px;
      display: flex;
      justify-content: center;
      margin: 0 auto;
    }
    @media (max-width: 600px) {
      .email-container {
        margin: 10px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
   
    <!-- Email Header -->
    <div class="email-header">
      <h1>Email Verification</h1>
    </div>

    <!-- Logo Section -->
    <div className="flex justify-center">
    <img               
      src="https://www.str8bat.com/cdn/shop/files/Logo.png?v=1677442424&width=500"
      alt="str8bat logo"
      width={50}
     />
    </div>
    
    <!-- Email Body -->
    <div class="email-body">
      <p>Hi <strong>${user?.name}</strong>,</p>
      <p>
        Thank you for signing up with us! Please confirm your email address to complete your registration.
      </p>
      <div class="email-button">
        <a href="http://localhost:5173/verify/email?token=${token}" target="_blank">Verify Email Address</a>
      </div>
      <p>
        If you didn’t create an account, you can safely ignore this email.
      </p>
      <p>Thank you,<br>str8bat</p>
    </div>

    <!-- Email Footer -->
    <div class="email-footer">
      <p>
        Need help? <a href="mailto:help@str8bat.com">Contact Support</a>
      </p>
      <p>&copy; 2024 str8bat . All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

    // Send verification email
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
        from: 'No-Reply <noreply@wobble.social>',
        to: [email],
        subject: 'Verify your email',
        text: 'Verify your email \n \n Click the link to verify your email \n ' + token,
        html: mailTemplate,
    });

    //www.example.com/api/v1/users/verify/token

    hhtps: if (error) throw error;
    return data;
}
