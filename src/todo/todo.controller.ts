import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { PartialTodoDTO, TodoDTO } from './dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  postTodo(@Body() dto: TodoDTO) {
    return this.todoService.create(dto);
  }

  @Get()
  getTodos() {
    return this.todoService.readBatch();
  }

  @Get(':id')
  getTodo(@Param('id') id: string) {
    return this.todoService.read(+id);
  }

  @Patch(':id')
  patchTodo(@Param('id') id: string, @Body() dto: PartialTodoDTO) {
    return this.todoService.update(+id, dto);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.delete(+id);
  }
}
