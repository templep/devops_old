import { ApiProperty } from "@nestjs/swagger"

export class RoleInput {
    @ApiProperty({
        description: 'The name of the role of the given user in the given association',
        example: "President",
        type: String,
    })
    public name: string;

    @ApiProperty({
        description: 'The id of the user',
        example: "1",
        type: Number,
    })
    public idUser: number;

    @ApiProperty({ 
        description: 'The id of the association',
        example: "1",
        type: Number,
    })
    public idAssociation: number
}