import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/services/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '7d'
        }
      }),
      inject: [ConfigService]
    })],
  providers: [AuthService, JwtStrategy, GoogleStrategy, PrismaService],
  controllers: [AuthController],
  exports: [JwtStrategy]
})
export class AuthModule { }
