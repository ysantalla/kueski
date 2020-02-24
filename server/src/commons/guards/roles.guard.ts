import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return false
    }

    const authHeader: string  = context.switchToHttp().getRequest().headers.authorization;

    if (authHeader) {
      const token: string = authHeader.replace('Bearer ', '');
      const decodeToken = this.authService.decodeToken(token);

      if (decodeToken) {        
        return roles.some(role => role == decodeToken.role);
      }
    }

    return false;
  }
}
