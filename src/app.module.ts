import {Module} from '@nestjs/common';
import {PrismaModule} from './prisma/prisma.module';
import {ArticlesModule} from './articles/articles.module';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {ThrottlerModule, ThrottlerGuard} from '@nestjs/throttler';
import {APP_GUARD} from '@nestjs/core';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        ArticlesModule,
        UsersModule,
        ThrottlerModule.forRoot([
            { name: 'short', ttl: 10000, limit: 5 },
        ]),
    ],
    providers: [
        { provide: APP_GUARD, useClass: ThrottlerGuard },
    ],
})
export class AppModule {}