import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ScheduleModule.forRoot(), UserModule],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
