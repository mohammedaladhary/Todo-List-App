export class Todo {
    content: string;
    completed: boolean;
    postponed: boolean;
    editing: boolean;
    completedClass?: string;
  
    constructor(content: string, completed: boolean, postponed: boolean, editing: boolean, completedClass?: string) {
      this.content = content;
      this.completed = completed;
      this.postponed = postponed;
      this.editing = editing;
      this.completedClass = completedClass;
    }

    isDisabled(): boolean {
        return (
          this.content === "" || this.completed === undefined || this.postponed === undefined || this.editing === undefined
        );
      }
  }  