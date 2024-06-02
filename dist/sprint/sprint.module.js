"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SprintModule = void 0;
const common_1 = require("@nestjs/common");
const sprint_controller_1 = require("./sprint.controller");
const sprint_service_1 = require("./sprint.service");
const typeorm_1 = require("@nestjs/typeorm");
const sprint_entity_1 = require("./sprint.entity");
const sprint_dao_1 = require("./sprint.dao");
const repo_module_1 = require("../repo/repo.module");
const repo_service_1 = require("../repo/repo.service");
const user_module_1 = require("../user/user.module");
const github_module_1 = require("../github/github.module");
const user_service_1 = require("../user/user.service");
const github_service_1 = require("../github/github.service");
let SprintModule = class SprintModule {
};
exports.SprintModule = SprintModule;
exports.SprintModule = SprintModule = __decorate([
    (0, common_1.Module)({
        imports: [
            repo_module_1.RepoModule,
            user_module_1.UserModule,
            github_module_1.GithubModule,
            typeorm_1.TypeOrmModule.forFeature([sprint_entity_1.SprintEntity]),
        ],
        controllers: [sprint_controller_1.SprintController],
        providers: [
            sprint_service_1.SprintService,
            sprint_dao_1.SprintDao,
            repo_service_1.RepoService,
            user_service_1.UserService,
            github_service_1.GithubService,
        ],
        exports: [sprint_dao_1.SprintDao],
    })
], SprintModule);
//# sourceMappingURL=sprint.module.js.map