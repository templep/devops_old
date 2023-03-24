import { ApiProperty } from '@nestjs/swagger';

export class AssociationsInput {
  @ApiProperty({
    description: 'The name of the association',
    example: 'Super cool association',
    type: String,
  })
  public name: string;

  @ApiProperty({
    description: 'The users in the association',
    type: [Number],
  })
  public users: number[];
}
