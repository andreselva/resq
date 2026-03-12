import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from 'src/dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Post()
    async createUser(@Body() dto: UserDTO) {
        await this.service.createUser(dto);
    }
}
