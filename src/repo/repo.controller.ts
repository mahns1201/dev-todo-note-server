import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RepoService } from './repo.service';
import { CreateRepoDto } from './dto/create-repo.dto';

@UseGuards(JwtAuthGuard)
@Controller('repo')
export class RepoController {
  constructor(private repoService: RepoService) {}
  @Post()
  async createRepo(@Request() req, @Body() body: CreateRepoDto) {
    const result = await this.repoService.createRepo({
      ...body,
      userId: req.user.id,
    });
    return result;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findUserRepo(@Request() req, @Param() param) {
    const result = await this.repoService.findRepo({
      id: param.id,
      userId: req.user.id,
    });
    return result;
  }

  // @Get('list')
  // @HttpCode(HttpStatus.OK)
  // async findUserRepos(
  //   @User() user: jwtUserT,
  //   @Query() query: PagingRequestDto,
  // ) {
  //   const { page, limit } = query;
  //   const { items, totalCount } = await this.repoService.find({
  //     id: user.id,
  //     page,
  //     limit,
  //   });

  //   return {
  //     httpStatus: HttpStatus.OK,
  //     message: `${page}p 레포지토리 리스트를 성공적으로 조회했습니다.`,
  //     currentPage: page,
  //     limit,
  //     totalCount,
  //     items,
  //   };
  // }
}
