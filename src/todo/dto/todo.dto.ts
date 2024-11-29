import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class TodoDTO {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsBoolean()
    completed: boolean;
}

export class PartialTodoDTO extends PartialType(TodoDTO) {}
