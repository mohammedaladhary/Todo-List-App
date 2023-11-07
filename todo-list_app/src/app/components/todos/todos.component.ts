import { Component } from '@angular/core';

interface Todo {
  content: string;
  completed: boolean;
  postponed: boolean;
  editing: boolean;
  completedClass?: string;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todos: Todo[] = [];
  inputTodo = '';
  errorMessage: string = '';

  constructor() {
    // Initializing the todos array in the constructor
    this.todos = [
      {
        content: 'Deactivate my account',
        completed: false,
        postponed: false,
        editing: false,
        completedClass: ''
      },
      {
        content: 'Clean my car after the work',
        completed: false,
        postponed: false,
        editing: false,
        completedClass: ''
      }
    ];
  }

  toggleDone(id: number) {
    this.todos[id].completed = !this.todos[id].completed;
    this.todos[id].completedClass = this.todos[id].completed ? 'completed' : '';
  }

  deleteTodo(id: number) {
    this.todos.splice(id, 1);
  }

  markAsDone(id: number) {
    this.toggleDone(id);
  }

  postponeTodo(id: number) {
    // Toggling the postponed state of the todo
    this.todos[id].postponed = !this.todos[id].postponed;
  }

  cleanCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }

  restorePostponed() {
    // Set the postponed state to false for all todos
    this.todos.forEach((todo) => (todo.postponed = false));
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
  
    if (newTodoContent === '') {
      this.errorMessage = 'Please enter a to-do name.';
    } else if (this.todos.some((todo) => todo.content === newTodoContent)) {
      this.errorMessage = 'A to-do with the same name already exists.';
    } else {
      this.todos.push({
        content: newTodoContent,
        completed: false,
        postponed: false,
        editing: false,
        completedClass: ''
      });
  
      this.inputTodo = '';
      this.errorMessage = ''; // Clear the error message
    }
  }  
}