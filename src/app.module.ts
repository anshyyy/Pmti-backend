import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { CountryModule } from './country/country.module';
import typeorm from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BcryptService } from './common/util/bcrypt.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        // refering this file from config/typeorm.ts
        configService.get('typeorm'),
      inject: [ConfigService],
    }),
    AdminModule,
    StudentModule,
    AuthModule,
    CountryModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
