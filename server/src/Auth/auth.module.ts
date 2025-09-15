
import { Module } from '@nestjs/common';
import { AuthControllers } from './auth.controllers';
import { AuthServices } from './auth.services';
import { UserModule } from 'src/Users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({
  providers: [AuthServices],
  controllers: [AuthControllers],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          global: true,
          signOptions: { expiresIn: '30d' },
        }
      }
    })
  ]
})

export class AuthModule { }
