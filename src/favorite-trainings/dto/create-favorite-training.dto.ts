import { ApiProperty } from "@nestjs/swagger";
import { Training } from "src/trainings/entities/training.entity";
import { User } from "src/users/entities/user.entity";

export class CreateFavoriteTrainingDto {


    @ApiProperty()
    training: number;


};
