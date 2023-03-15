import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.get<string>('database.postgres.host'),
      port: this.configService.get<number>('database.postgres.port'),
      username: this.configService.get<string>('database.postgres.user'),
      password: this.configService.get<string>('database.postgres.password'),
      database: this.configService.get<string>('database.postgres.database'),
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/../**/*.entity.{ts,js}'],
    };
  }
}
