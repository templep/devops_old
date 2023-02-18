import { ApiProperty } from "@nestjs/swagger"

export class RoleUpdate {

    @ApiProperty({
        description: 'The new name of the role of the given user in the given association',
        example: "President",
        type: String,
    })
    public name: string;
}