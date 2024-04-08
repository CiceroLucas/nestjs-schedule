import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendMailDto } from './dto/mail.dto';
import { Mail } from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    return transporter;
  }

  template(html: string, replacements: Record<string, string>) {
    return html.replace(/%(\w*)%/g, function (m, key) {
      return replacements.hasOwnProperty(key) ? replacements[key] : '';
    });
  }

  async sendMail(dto: SendMailDto) {
    const { from, recipients, subject } = dto;
    const html = dto.placeholderReplacements
      ? this.template(dto.html, dto.placeholderReplacements)
      : dto.html;

    const transport = this.mailTransport();

    const options: Mail.Options = {
      from: from ?? {
        name: process.env.NAME,
        address: process.env.DEFAULT_MAIL_FROM,
      },
      to: recipients,
      subject,
      html,
    };

    try {
      const result = await transport.sendMail(options);
      return result;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }
}
