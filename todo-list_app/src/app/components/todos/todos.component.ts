import { Component } from '@angular/core';
import { Todo } from 'src/app/models/todos.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todos: Todo[] = [];
  postponedTodos: Todo[] = [];
  inputTodo = '';
  errorMessage: string = '';

  constructor() {
    this.todos = [
      new Todo('Deactivate my account', false, false, false, ''),
      new Todo('Clean my car after work', false, false, false, '')
    ];
  }

  isDisabled(): boolean {
    return this.inputTodo.trim() === '';
  }

  toggleDone(id: number) {
    this.todos[id].completed = !this.todos[id].completed;
    this.todos[id].completedClass = this.todos[id].completed ? 'completed' : '';
  }


  markAsDone(id: number) {
    this.toggleDone(id);
  }

  deleteTodo(id: number) {
    this.todos.splice(id, 1);
  }

  postponeTodo(id: number) {
    const todoToPostpone = this.todos[id];
    this.todos.splice(id, 1);
    this.postponedTodos.push(todoToPostpone);
  }

  cleanCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }

  restorePostponed(id: number) {
    // Move the postponed todo back to the main todos array
    const todoToRestore = this.postponedTodos[id];
    this.postponedTodos.splice(id, 1); // Remove it from the postponedTodos array
    this.todos.push(todoToRestore); // Add it to the main todos array
  }
  
  

  editTodo(id: number) {
    this.todos[id].editing = true;
  }

  saveTodo(id: number) {
    const updatedContent = this.todos[id].content.trim();
  
    if (updatedContent === '') {
      this.errorMessage = 'Please enter a to-do name.';
    } else if (this.todos.some((todo, index) => index !== id && todo.content === updatedContent)) {
      this.errorMessage = 'A to-do with the same name already exists.';
    } else {
      this.todos[id].editing = false;
      this.errorMessage = ''; // Clear the error message
    }
  }  

  cancelEdit(id: number) {
    this.todos[id].editing = false;
  }

  addTodo() {
    const newTodoContent = this.inputTodo.trim();
  
    if(newTodoContent === '') {
      this.errorMessage = 'Please enter a to-do name.';
    } 
    else if (this.todos.some((todo) => todo.content === newTodoContent)) {
      this.errorMessage = 'A to-do with the same name already exists.';
    }
    else {
      this.todos.push({
        content: newTodoContent,
        completed: false,
        postponed: false,
        editing: false,
        completedClass: '',
        isDisabled: function (): boolean {
          throw new Error('Function not implemented.');
        }
      });
      this.inputTodo = '';
    }
  }
    
}