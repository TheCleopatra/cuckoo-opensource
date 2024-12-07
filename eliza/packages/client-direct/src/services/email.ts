import nodemailer from "nodemailer";
import { config } from "../config/env.config";

const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: true,
    auth: {
        user: config.email.user,
        pass: config.email.password,
    },
});

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export const emailService = {
    generateVerificationCode(): string {
        return Math.random().toString().slice(2, 8);
    },

    async sendVerificationCode(email: string): Promise<void> {
        const code = this.generateVerificationCode();
        await this.sendVerificationEmail(email, code);
    },

    async sendVerificationEmail(email: string, code: string): Promise<void> {
        const mailOptions = {
            from: config.email.user,
            to: email,
            subject: "注册验证码 - Cuckoo AI",
            html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>欢迎注册 Cuckoo AI</h2>
          <p>您的验证码是:</p>
          <h1 style="color: #4F46E5; font-size: 32px; letter-spacing: 5px;">${code}</h1>
          <p>验证码有效期为5分钟，请尽快完成注册。</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);
    },

    async sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
        const mailOptions = {
            from: config.email.user,
            to,
            subject,
            html,
        };
        await transporter.sendMail(mailOptions);
    },
};
