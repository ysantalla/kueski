import { Controller, Post, HttpStatus, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { User } from './user.entity';
import { AuthSignUpDto } from './dto/auth-sign-up.sto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserService } from './user.service';
import { TokenDto } from './dto/token.dto';


@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiBody({description: 'AuthSingUp', type: AuthSignUpDto})
  @ApiOperation({description: 'Register user. Returns a valid JWT.'})
  @ApiResponse({ description: 'Success!', status: HttpStatus.OK, type: TokenDto })
  @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
  public async signUp(@Body() user: AuthSignUpDto): Promise<TokenDto> {

    let entity: User;
    entity.email = user.email;
    entity.firstname = user.firstname;
    entity.lastname = user.lastname;
    entity.password = user.password;

    return await this.userService.signUp(entity);
  }

  @Post('login')
  @ApiBody({description: 'AuthLogin', type: AuthLoginDto})
  @ApiOperation({ description: 'Login user. Generate a new valid JWT.' })
  @ApiResponse({ description: 'JWT successfully created.', status: HttpStatus.CREATED, type: TokenDto })
  @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
  public async login(@Body() body: AuthLoginDto): Promise<TokenDto> {
    return await this.userService.login(body.email, body.password);
  }

}
