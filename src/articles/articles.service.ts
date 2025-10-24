import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateArticleDto} from './dto/create-article.dto';
import {UpdateArticleDto} from './dto/update-article.dto';
import {PrismaService} from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
    constructor(private prisma: PrismaService) {
    }

    create(createArticleDto: CreateArticleDto) {
        return this.prisma.article.create({ data: createArticleDto });
    }

    findAll() {
        return this.prisma.article.findMany({ where: { published: true } });
    }

    findDrafts() {
        return this.prisma.article.findMany({ where: { published: false } });
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
