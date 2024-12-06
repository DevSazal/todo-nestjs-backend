import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe } from '@nestjs/common';
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
  getTodos(@Query('latest', new ParseBoolPipe({ optional: true })) latest = false) {
    return this.todoService.readBatch(latest);
  }

  @Get(':id')
  getTodo(@Param('id') id: string) {
    return this.todoService.read(id);
  }

  @Patch(':id')
  patchTodo(@Param('id') id: string, @Body() dto: PartialTodoDTO) {
    return this.todoService.update(id, dto);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
