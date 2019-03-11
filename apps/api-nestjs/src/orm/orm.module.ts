import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@app/shared/config.service'
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService): Promise<MongoConnectionOptions> => ({
                type: 'mongodb',
                host: configService.mongoDb.host,
                port: configService.mongoDb.port,
                database: configService.mongoDb.database,
                synchronize: false,
                entities: ['src/**/**.entity{.ts,.js}'],
                loggerLevel: 'error'
            }),
            inject: [ConfigService]
        }),
    ],
})
export class OrmModule {
}
