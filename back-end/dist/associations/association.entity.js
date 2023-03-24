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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Association = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
let Association = class Association {
    constructor(name, users) {
        this.name = name;
        this.users = users;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Association.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Association.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => user_entity_1.User, {
        eager: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Association.prototype, "users", void 0);
Association = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, Array])
], Association);
exports.Association = Association;
//# sourceMappingURL=association.entity.js.map