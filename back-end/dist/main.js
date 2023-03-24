"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const swagger_themes_1 = require("swagger-themes");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Gestion des Associations')
        .setDescription('Descriptions des APIs de la gestion des associations')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const theme = new swagger_themes_1.SwaggerTheme('v3');
    const options = {
        explorer: true,
        customCss: theme.getBuffer('dark'),
    };
    swagger_1.SwaggerModule.setup('api', app, document, options);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map