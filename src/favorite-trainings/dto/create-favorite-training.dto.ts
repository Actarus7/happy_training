import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";

export class CreateFavoriteTrainingDto {

    @ApiProperty()
    user: User;


    @ApiProperty()
    training: Training;


};
