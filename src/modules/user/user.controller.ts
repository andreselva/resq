import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from 'src/dtos/user.dto';

@Controller('user')
export class UserController {
    @Post()
    async createUser(@Body() dto: UserDTO) {
        
    }
}
