import {
  BadRequestException,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { UserService } from 'src/user/user.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}

  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_7AM)
  @Post()
  async sendEMail() {
    try {
      const users = await this.userService.findAll();

      const recipients = users.map((user) => ({
        name: user.name,
        address: user.email,
      }));

      const dto = {
        recipients,
        subject: 'Hackathon',
        html: `<p><strong>Hi Student </strong>, Don't forget to participate in the hackathon event</p>`,
      };

      await this.mailService.sendMail(dto);
      return {
        status: HttpStatus.OK,
        message: 'Scheduled email sent successfully!',
      };
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }
}
