import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GithubOauthModule } from './auth/github/github-oauth.module';
import { RepoModule } from './repo/repo.module';
import { AuthModule } from './auth/jwt/auth.module';
import { TaskModule } from './task/task.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./config/.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT, 10),
        database: process.env.MYSQL_DATABASE,
        username: process.env.MYSQL_ROOT_USER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    GithubOauthModule,
    UserModule,
    RepoModule,
    TaskModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
