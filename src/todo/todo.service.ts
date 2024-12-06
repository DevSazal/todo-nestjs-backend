import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TodoDTO, PartialTodoDTO } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: Model<TodoDocument>,
  ){}

  async create(dto: TodoDTO): Promise<TodoDocument> {
    const todo = await this.todoModel.create(dto);
    if (!todo) throw new NotFoundException(`faild to create todo!`);
    return todo;
  }

  async readBatch(latest: boolean = false): Promise<TodoDocument[]> {
    const todos =  await this.todoModel.find().exec();
    return latest ? todos.reverse() : todos; // reverse if the flag is true
  }

  async read(id: string): Promise<TodoDocument> {
    const todo = await this.todoModel.findById(id);
    if (!todo) throw new NotFoundException(`todo not found!`);
    return todo;
  }

  async update(id: string, dto: PartialTodoDTO): Promise<TodoDocument>  {
    const { _id } = await this.read(id);
    const todo = await this.todoModel.findByIdAndUpdate(_id, dto, {
      new: true,
    });

    if (!todo) throw new NotFoundException(`failed to update todo!`);
    return todo;
  }

  async delete(id: string): Promise<HttpException> {
    const subscriber = await this.todoModel.findByIdAndDelete(id);
    if (!subscriber) throw new NotFoundException(`failed to delete todo!`);
    throw new HttpException('The data has been deleted successfully', HttpStatus.OK);
  }
}
