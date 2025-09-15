
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './Auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/Auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UploadModule } from './upload/upload.module';
import { BullModule } from '@nestjs/bullmq';
import { minutes, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { InteractionsModule } from './Interactions/interaction.module';
import { CollectionModule } from './Collections/collection.module';
import { StatisticsModule } from './statistics/statistics.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    AuthModule,
    UploadModule,
    InteractionsModule,
    CollectionModule,
    StatisticsModule,
    ContentModule,
    ConfigModule.forRoot({
      envFilePath: "./.env",
      isGlobal: true,

    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get<string>("MONGODB_URL")
        }
      }
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          connection: {
            host: config.get<string>('BULL_HOST'),
            port: config.get<number>('BULL_PORT'),
          },
        }
      }
    }
    ),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (config: ConfigService) => {
        return [
          {
            ttl: minutes(config.get<number>('THROTTLE_TTL')),
            limit: config.get('THROTTLE_LIMIT'),
            blockDuration: minutes(1),
           
          }
        ]
      }

    })
  ],
  controllers: [],
  providers: [

    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    JwtService,
  ],
})



export class AppModule { }


