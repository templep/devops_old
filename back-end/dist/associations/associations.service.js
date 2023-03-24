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
exports.AssociationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const association_entity_1 = require("./association.entity");
const users_service_1 = require("../users/users.service");
let AssociationsService = class AssociationsService {
    constructor(repository, service) {
        this.repository = repository;
        this.service = service;
    }
    async getAssociations() {
        return this.repository.find();
    }
    async get(id) {
        return this.repository.findOne({ where: { id } });
    }
    async getMembers(id) {
        const association = await this.get(id);
        return association.users;
    }
    async add(name, usersId) {
        const usersIdNumber = this.toNumber(usersId);
        const users = new Array();
        for (let i = 0; i < usersIdNumber.length; i++) {
            users.push(await this.service.get(usersIdNumber[i]));
        }
        const association = this.repository.create({
            name,
            users,
        });
        this.repository
            .save(association)
            .catch((error) => console.log(`Error while attempting to add user {${name}, ${users}}`));
        return association;
    }
    async update(id, name, usersId) {
        if (!(usersId == undefined && name == undefined)) {
            const association = await this.get(id);
            if (usersId != undefined) {
                const users = new Array();
                for (let i = 0; i < usersId.length; i++) {
                    users.push(await this.service.get(usersId[i]));
                }
                association.users = users;
                await this.repository.save(association);
            }
            if (name != undefined) {
                await this.repository.update({ id }, {
                    name: name,
                });
            }
        }
        return this.get(id);
    }
    toNumber(ids) {
        const ret = [];
        for (let i = 0; i < ids.length; i++) {
            ret.push(+ids[i]);
        }
        console.log(ret);
        return ret;
    }
    async delete(id) {
        const association = await this.get(id);
        try {
            await this.repository.delete(id);
            return association;
        }
        catch (error) {
            console.log(error);
            `Error while attempting to delete association with id ${id}`;
        }
    }
};
AssociationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(association_entity_1.Association)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], AssociationsService);
exports.AssociationsService = AssociationsService;
//# sourceMappingURL=associations.service.js.map