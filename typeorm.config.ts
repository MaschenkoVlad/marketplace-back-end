import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST', 'localhost'),
  port: configService.get<number>('POSTGRES_PORT', 5432),
  username: configService.get<string>('POSTGRES_USER', 'postgres'),
  password: configService.get<string>('POSTGRES_PASSWORD', 'postgres'),
  database: configService.get<string>('POSTGRES_DB_NAME'),
  entities: ['./src/**/*.entity.ts'],
  migrations: ['./db/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;

// yarn run migration:generate -- src/migrations/<migration_name>
//     "migration:generate": "typeorm migration:generate -d ts-node ./typeorm.config.ts",
