import { ApiProperty } from "@nestjs/swagger";

export class UserInput {

    @ApiProperty({
        description: 'Firstname of the user',
        example: "Jean-Luc",
        type: String,
    })
    public firstname: string;

    @ApiProperty({
        description: 'Lastname of the user',
        example: "Mélanchon",
        type: String,
    })
    public lastname: string;

    @ApiProperty({
        description: 'The age of the users',
        example: "71",
        type: [Number],
    })
    public age: number;

    @ApiProperty({
        description: 'The email of the users',
        example: "email@email.com",
        type: String
    })
    public email: string;

    @ApiProperty({
        description: 'The password of the users',
        example: "123456",
        type: String,
    })
    public password: string;

}