import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password, salt);

    data.password = hashPassword;
    const user = this.usersRepository.create(data);

    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find({
      select: {
        name: true,
        email: true,
      },
    });
  }
}
