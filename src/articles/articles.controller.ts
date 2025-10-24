import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe, UseGuards,
    Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";


@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: ArticleEntity })
    async create(@Body() createArticleDto: CreateArticleDto) {
        return new ArticleEntity(
            await this.articlesService.create(createArticleDto),
        );
    }


    //pagination ici :

    @Get()
    @ApiOkResponse({ type: ArticleEntity, isArray: true })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        const { data, total } = await this.articlesService.findAll(page, limit);
        return {
            articles: data.map((article) => new ArticleEntity(article)),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }


    @Get('drafts')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: ArticleEntity, isArray: true })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    async findDrafts(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        const { data, total } = await this.articlesService.findDrafts(page, limit);
        return {
            data: data.map((draft) => new ArticleEntity(draft)),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }


    @Get(':id')
    @ApiOkResponse({ type: ArticleEntity })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return new ArticleEntity(await this.articlesService.findOne(id));
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: ArticleEntity })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateArticleDto: UpdateArticleDto,
    ) {
        return new ArticleEntity(
            await this.articlesService.update(id, updateArticleDto),
        );
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: ArticleEntity })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return new ArticleEntity(await this.articlesService.remove(id));
    }
}