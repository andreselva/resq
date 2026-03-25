import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dtos/user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from 'src/entities/user-entity';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}
  async createUser(dto: UserDTO) {
    const entity = UserEntity.fromDTO(dto);
    await this.repository.saveUser(entity);
  }
}
