import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
    constructor(private prisma: PrismaService) {
    }

    create(createArticleDto: CreateArticleDto) {
        return this.prisma.article.create({ data: createArticleDto });
    }

    async findAll(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const [data, total] = await this.prisma.$transaction([
            this.prisma.article.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                where: { published: true },
            }),
            this.prisma.article.count({ where: { published: true } }),
        ]);

        return { data, total };
    }


    async findDrafts(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const [data, total] = await this.prisma.$transaction([
            this.prisma.article.findMany({
                where: { published: false },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.article.count({ where: { published: false } }),
        ]);

        return { data, total };
    }

    async findOne(id: number) {
        const article = await this.prisma.article.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });

        if (!article) {
            throw new NotFoundException(`Article with ID ${id} not found`);
        }

        return article;
    }

    update(id: number, updateArticleDto: UpdateArticleDto) {
        return this.prisma.article.update({
            where: { id },
            data: updateArticleDto,
        });
    }

    remove(id: number) {
        return this.prisma.article.delete({ where: { id } });
    }
}
