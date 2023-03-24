"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const users_input_1 = require("./users.input");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let UsersController = class UsersController {
    constructor(service) {
        this.service = service;
    }
    async getAll() {
        return await this.service.getUsers();
    }
    async getById(param) {
        const user = await this.service.get(+param.id);
        if (user === null) {
            throw new common_1.HttpException(`Could not find a user with the id ${param.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    create(input) {
        return this.service.add(input.firstname, input.lastname, +input.age, input.password);
    }
    async update(input, param) {
        const user = await this.service.get(+param.id);
        if (user === null) {
            throw new common_1.HttpException(`Could not find a user with the id ${param.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return this.service.update(+param.id, input.firstname, input.lastname, +input.age, input.password);
    }
    async delete(param) {
        const user = await this.service.get(+param.id);
        if (user === null) {
            throw new common_1.HttpException(`Could not find a user with the id ${param.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return this.service.delete(+param.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'All the users has been successfully returned.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'User unique id',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The user has been successfully returned.',
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The user has been successfully created.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_input_1.UserInput]),
    __metadata("design:returntype", user_entity_1.User)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The user has been successfully updated.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'User unique id',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_input_1.UserInput, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The user has been successfully deleted.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'User unique id',
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map