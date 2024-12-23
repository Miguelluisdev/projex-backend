import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { enviroment } from 'src/aplication/config/enviroment';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: enviroment.SMTP_HOST, // Ex: 'smtp.@exemplo.com'
      port: Number(enviroment.SMTP_PORT),
      secure: enviroment.SMTP_PORT,
      auth: {
        user: enviroment.SMTP_USER,
        pass: enviroment.SMTP_PASS,
      },
    } as nodemailer.TransportOptions);
  }
  async sendMail(to: string, subject: string, text: string, html?: string) {
    try {
      await this.transporter.sendMail({
        from: `"No-Reply" <${enviroment.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
      });
      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw error;
    }
  }
}
