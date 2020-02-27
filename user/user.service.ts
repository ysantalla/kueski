import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User, Role } from './user.entity';
import { AuthService } from 'src/commons/services/auth.service';
import { TokenDto } from './dto/token.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) {}

  async signUp(user: User): Promise<TokenDto> {

    const userExist =  await this.userRepository.findOne({
      where: {
        email: user.email
      }
    });

    if (userExist) {
      throw new BadRequestException(`Error: User with email ${user.email} exist`);
    }

    user.password = await bcrypt.hash(user.password, 10);
    user.role = Role.USER;
    try {
      const newUser = await this.userRepository.save(user);
      const token: string = await this.authService.createToken(newUser);
      return {token};
    } catch (error) {
      throw new BadRequestException(error);
    }    
  }

  async login(email: string, password: string): Promise<TokenDto> {
    const user =  await this.userRepository.findOne({
      where: {
        email: email
      }
    });

    let isPasswordValid: boolean;
    if (user) {      
      try {
        isPasswordValid = await bcrypt.compare(password, user.password);
      } catch (error) {
        throw new InternalServerErrorException(`An error occured during password comparison: ${error.toString()}`);
      }
      if (isPasswordValid) {
        const token: string = await this.authService.createToken(user);
        return {token};
      } else {
        throw new BadRequestException('Invalid password');
      }
    } else {
      throw new NotFoundException(`User with email: ${email} does not exist`);
    }
  }
}
