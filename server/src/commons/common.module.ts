import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { RolesGuard } from './guards/roles.guard';


@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {        
        return {
          secret: configService.get('SECRET'),
        } as JwtModuleOptions;
      },
      
    }),
  ],
  providers: [AuthService, RolesGuard],
  exports: [AuthService, RolesGuard],
})
export class CommonModule {}
