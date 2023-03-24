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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(repository) {
        this.repository = repository;
    }
    async getUsers() {
        return this.repository.find();
    }
    async get(id) {
        return this.repository.findOne({ where: { id } });
    }
    add(firstname, lastname, age, password) {
        if (typeof age === 'number') {
            const user = this.repository.create({
                age,
                lastname,
                firstname,
                password,
            });
            this.repository
                .insert(user)
                .catch((error) => console.log(`Error while attempting to add user {${firstname}, ${lastname}, ${age} ${password}`));
            return user;
        }
        else {
            throw new TypeError('Age should be a number');
        }
    }
    async update(id, firstname, lastname, age, password) {
        if (!(firstname == undefined &&
            lastname == undefined &&
            age == undefined &&
            password == undefined)) {
            const user = await this.get(id);
            if (firstname != undefined) {
                await this.repository.update({ id }, {
                    firstname: firstname,
                });
            }
            if (lastname != undefined) {
                await this.repository.update({ id }, {
                    lastname: lastname,
                });
            }
            if (age != undefined) {
                await this.repository.update({ id }, {
                    age: age,
                });
            }
            if (password != undefined) {
                await this.repository.update({ id }, {
                    password: password,
                });
            }
        }
        return this.get(id);
    }
    async delete(id) {
        const user = await this.get(id);
        this.repository
            .delete(id)
            .catch((error) => console.log(`Error while attempting to delete user with id ${id}`));
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map