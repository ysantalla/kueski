import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


interface Token {
    accessToken: string;
    expiresIn: string;
}

enum Role {
    ADMIN = 'admin',
    USER = 'user',
  }

interface User {
    email: string;
    firstname: string;
    lastname: string;
    role: Role;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async createToken(user: User): Promise<string> {
    const token = await this.jwtService.signAsync({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role
    }, {
      expiresIn: this.configService.get('TOKEN_EXPIRESIN')
    });

    return new Promise((resolve, rejects) => {
        resolve(token);
    });
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token)
  }
}