import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";

export class AssociationInput {

    @ApiProperty({
        description: 'The id of the users',
        example: "1,2,3",
        type: [Number],
    })
    public idUsers : number[];

    @ApiProperty({
        description: 'The name of the association',
        example: "Super association",
        type: String,
    })
    public name : string;
}