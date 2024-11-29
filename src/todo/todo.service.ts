import { Injectable } from '@nestjs/common';
import { TodoDTO, PartialTodoDTO } from './dto';

@Injectable()
export class TodoService {
  create(dto: TodoDTO) {
    return 'This action adds a new todo';
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, dto: PartialTodoDTO) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
