import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dtos/user.dto';

@Injectable()
export class UserService {
    async createUser(dto: UserDTO) {
        
    }
}
