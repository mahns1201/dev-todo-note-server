import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GithubService } from './github.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/jwt/auth.guard';
import { User } from 'src/decorator/user.decorator';
import { jwtUserT } from 'src/constant/jwt.constant';

@Controller('github')
@UseGuards(AuthGuard)
@ApiTags('GITHUB')
@ApiBearerAuth('accessToken')
export class GithubController {
  constructor(
    private githubService: GithubService,
    private userService: UserService,
  ) {}

  @Get('repos')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '유저의 깃허브 레포지토리 리스트를 조회한다.' })
  async findGithubRepos(@User() user: jwtUserT) {
    const { id, username } = user;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });
    const input = { githubAccessToken, username };
    const { items: githubRepositories } = await this.githubService.findRepos(
      input,
    );
    return {
      httpStatus: HttpStatus.OK,
      message: '유저의 깃허브 리포지토리 리스트를 성공적으로 조회했습니다',
      items: githubRepositories,
    };
  }

  @Get('repos/:name')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'name',
    type: String,
    description: 'repoName',
  })
  @ApiOperation({ summary: '유저의 깃허브 레포지토리 리스트를 조회한다.' })
  async findOneRepo(@User() user: jwtUserT, @Param() param) {
    const { id, username } = user;
    const { name } = param;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });
    const input = { githubAccessToken, username, name };
    const { item: githubRepository } = await this.githubService.findOneRepo(
      input,
    );
    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 깃허브 ${name} 리포지토리를 성공적으로 조회했습니다`,
      item: githubRepository,
    };
  }

  @Get('/milestones')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'repoName',
  })
  @ApiOperation({
    summary: '유저의 깃허브 특정 리포지토리의 마일스톤 리스트를 조회한다.',
  })
  async findAllMilestones(@User() user: jwtUserT, @Query() query) {
    const { id, username } = user;
    const { name } = query;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });

    const input = { githubAccessToken, username, name };

    const { items: githubMilestones } = await this.githubService.findMilestones(
      input,
    );

    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 ${name} 리포지토리의 Milestone 리스트를 성공적으로 조회했습니다`,
      items: githubMilestones,
    };
  }

  @Get('/milestones/:number')
  @ApiQuery({
    name: 'repoName',
    type: String,
    description: 'repoName',
  })
  @ApiParam({
    name: 'number',
    type: String,
    description: 'milestoneNumber',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '유저의 깃허브 특정 리포의 특정 마일스톤을 조회한다.',
  })
  async findOneMilestone(
    @User() user: jwtUserT,
    @Query() query,
    @Param() param,
  ) {
    const { id, username } = user;
    const { name } = query;
    const { number } = param;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });

    const input = {
      githubAccessToken,
      username,
      name,
      number,
    };
    const { item: githubMilestone } = await this.githubService.findOneMilestone(
      input,
    );
    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 ${name} Repo의 ${number}번 Milestone을 성공적으로 조회했습니다`,
      item: githubMilestone,
    };
  }

  @Get('/issues')
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'repoName',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '유저의 깃허브 특정 리포지토리의 이슈 리스트를 조회한다.',
  })
  async findAllIssues(@User() user: jwtUserT, @Query() query) {
    const { name } = query;
    const { id, username } = user;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });

    const item = { githubAccessToken, username, name };
    const { items: githubIssues } = await this.githubService.findIssues(item);
    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 ${name} 리포지토리의 Issues 리스트를 성공적으로 조회했습니다`,
      items: githubIssues,
    };
  }

  @Get('/issues/:number')
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'repoName',
  })
  @ApiParam({
    name: 'number',
    type: String,
    description: 'issueNumber',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '유저의 깃허브 특정 리포지토리의 특정 이슈를 조회한다.',
  })
  async findOneIssue(@User() user: jwtUserT, @Query() query, @Param() param) {
    const { id, username } = user;
    const { name } = query;
    const { number } = param;

    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });

    const input = {
      githubAccessToken,
      username,
      name,
      number,
    };
    const { item: githubIssue } = await this.githubService.findOneIssue(input);
    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 ${name} 리포지토리의 Issues 리스트를 성공적으로 조회했습니다`,
      item: githubIssue,
    };
  }
}