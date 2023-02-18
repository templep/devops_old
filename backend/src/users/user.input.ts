import { ApiProperty } from "@nestjs/swagger";

export class UserInput {

    @ApiProperty({
        description: 'The firstname of the user',
        example: "John",
        type: String,
    })
    public firstname: string;

    @ApiProperty({
        description: 'The lastname of the user',
        example: "Doe",
        type: String,
    })
    public lastname: string;

    @ApiProperty({
        description: 'The age of the user',
        minimum: 18,
        default: 18,
        type: Number,
    })
    public age: number;

    @ApiProperty({
        description: 'The password of the user',
        example: "donkeykong001",
        type: String,
    })
    public password: string
}