import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;


async function main() {
    // create two dummy users
    const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
    const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

    const user1 = await prisma.user.upsert({
        where: { email: 'sabin@adams.com' },
        update: {
            password: passwordSabin,
        },
        create: {
            email: 'sabin@adams.com',
            name: 'Sabin Adams',
            password: passwordSabin,
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'alex@ruheni.com' },
        update: {
            password: passwordAlex,
        },
        create: {
            email: 'alex@ruheni.com',
            name: 'Alex Ruheni',
            password: passwordAlex,
        },
    });

    // create three dummy articles
    const post1 = await prisma.article.upsert({
        where: { title: 'Prisma Adds Support for MongoDB' },
        update: {
            authorId: user1.id,
        },
        create: {
            title: 'Prisma Adds Support for MongoDB',
            body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
            description:
                "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
            published: false,
            authorId: user1.id,
        },
    });

    const post2 = await prisma.article.upsert({
        where: { title: "What's new in Prisma? (Q1/22)" },
        update: {
            authorId: user2.id,
        },
        create: {
            title: "What's new in Prisma? (Q1/22)",
            body: 'Our engineers have been working hard, issuing new releases with many improvements...',
            description:
                'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
            published: true,
            authorId: user2.id,
        },
    });

    const post3 = await prisma.article.upsert({
        where: { title: 'Prisma Client Just Became a Lot More Flexible' },
        update: {},
        create: {
            title: 'Prisma Client Just Became a Lot More Flexible',
            body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
            description:
                'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
            published: true,
        },
    });

    // TypeScript
    const post4 = await prisma.article.upsert({
        where: { title: 'Understanding Prisma Relations' },
        update: { authorId: user1.id },
        create: {
            title: 'Understanding Prisma Relations',
            body: 'Relations in Prisma allow you to model connections between tables...',
            description: 'Guide pratique des relations 1-1, 1-n et n-n avec Prisma.',
            published: true,
            authorId: user1.id,
        },
    });

    const post5 = await prisma.article.upsert({
        where: { title: 'NestJS + Prisma: Best Practices' },
        update: { authorId: user2.id },
        create: {
            title: 'NestJS + Prisma: Best Practices',
            body: 'Learn how to structure modules, services, and repositories with Prisma...',
            description: 'Architecture, transactions, validation et tests e2e.',
            published: true,
            authorId: user2.id,
        },
    });

    const post6 = await prisma.article.upsert({
        where: { title: 'Transactions in Prisma: A Deep Dive' },
        update: {},
        create: {
            title: 'Transactions in Prisma: A Deep Dive',
            body: 'Prisma provides $transaction for atomic operations across multiple queries...',
            description: 'Quand et comment utiliser interactive transactions.',
            published: false,
            authorId: user1.id,
        },
    });

    const post7 = await prisma.article.upsert({
        where: { title: 'Seeding Strategies for Development' },
        update: {},
        create: {
            title: 'Seeding Strategies for Development',
            body: 'Design your seed to be idempotent with upsert and unique fields...',
            description: 'Idempotence, jeux de données, et environnements.',
            published: true,
            authorId: user2.id,
        },
    });

    const post8 = await prisma.article.upsert({
        where: { title: 'Optimizing Prisma Queries' },
        update: { published: true },
        create: {
            title: 'Optimizing Prisma Queries',
            body: 'Select and include can drastically reduce payload size...',
            description: 'select/include, pagination, indexation SQL.',
            published: true,
            authorId: user1.id,
        },
    });

    const post9 = await prisma.article.upsert({
        where: { title: 'Handling Migrations Safely' },
        update: {},
        create: {
            title: 'Handling Migrations Safely',
            body: 'Use migrate dev in development and migrate deploy in CI/CD...',
            description: 'Stratégies de rollback et données de prod.',
            published: false,
            authorId: user2.id,
        },
    });

    const post10 = await prisma.article.upsert({
        where: { title: 'Prisma Middlewares Explained' },
        update: {},
        create: {
            title: 'Prisma Middlewares Explained',
            body: 'Middlewares let you hook into query execution for logging, RBAC...',
            description: 'Exemples de logging et soft-delete.',
            published: true,
            authorId: user1.id,
        },
    });

    const post11 = await prisma.article.upsert({
        where: { title: 'Soft Delete with Prisma' },
        update: {},
        create: {
            title: 'Soft Delete with Prisma',
            body: 'Implement soft deletes using a deletedAt column and query filters...',
            description: 'Patterns et pièges à éviter.',
            published: true,
            authorId: user2.id,
        },
    });

    const post12 = await prisma.article.upsert({
        where: { title: 'Validating Data with class-validator' },
        update: {},
        create: {
            title: 'Validating Data with class-validator',
            body: 'Combine DTOs in NestJS with class-validator to ensure input quality...',
            description: 'Decorators, pipes, et messages d’erreur.',
            published: true,
            authorId: user1.id,
        },
    });

    const post13 = await prisma.article.upsert({
        where: { title: 'Deploying Prisma Apps' },
        update: {},
        create: {
            title: 'Deploying Prisma Apps',
            body: 'From environment variables to connection pooling with PgBouncer...',
            description: 'Checklists de déploiement et observabilité.',
            published: false,
            authorId: user2.id,
        },
    });

    console.log("seed done");
}
// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });

