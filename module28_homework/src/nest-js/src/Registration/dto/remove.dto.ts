import { IsNotEmpty } from 'class-validator';

export class removeDto {

    @IsNotEmpty()
    photosDoc: any

}