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
exports.AssociationsController = void 0;
const common_1 = require("@nestjs/common");
const associations_input_1 = require("./associations.input");
const associations_service_1 = require("./associations.service");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
let AssociationsController = class AssociationsController {
    constructor(service) {
        this.service = service;
    }
    async getAll() {
        return await this.service.getAssociations();
    }
    async getById(param) {
        const association = await this.service.get(+param.id);
        if (association === null) {
            throw new common_1.HttpException(`Could not find a user with the id ${param.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return association;
    }
    async getMembers(parameter) {
        return this.service.getMembers(parameter.id);
    }
    async create(input) {
        const ids = [];
        for (let i = 0; i < input.users.length; i++) {
            if (!isNaN(input.users[i])) {
                ids.push(input.users[i]);
            }
        }
        console.log(ids);
        return await this.service.add(input.name, ids);
    }
    async update(input, param) {
        const association = await this.service.get(+param.id);
        if (association === null) {
            throw new common_1.HttpException(`Could not find a user with the id ${param.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        console.log(input.users);
        return this.service.update(+param.id, input.name, input.users);
    }
    async delete(param) {
        const association = await this.service.get(+param.id);
        if (association === null) {
            throw new common_1.HttpException(`Could not find an association with the id ${param.id}`, common_1.HttpStatus.NOT_FOUND);
        }
        return this.service.delete(+param.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'All the associations has been successfully returned.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Association unique id',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The association has been successfully returned.',
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)(':id/members'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Association unique id',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: "The association's users has been successfully returned.",
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "getMembers", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The association has been successfully created.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [associations_input_1.AssociationsInput]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The association has been successfully updated.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Association unique id',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [associations_input_1.AssociationsInput, Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The association has been successfully deleted.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'number',
        description: 'Association unique id',
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationsController.prototype, "delete", null);
AssociationsController = __decorate([
    (0, common_1.Controller)('associations'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiTags)('associations'),
    __metadata("design:paramtypes", [associations_service_1.AssociationsService])
], AssociationsController);
exports.AssociationsController = AssociationsController;
//# sourceMappingURL=associations.controller.js.map