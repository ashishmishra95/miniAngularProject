import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';

import * as firebase from 'firebase';
export interface TODO {
  title: string;
  dateAdded: number;
  isChecked: boolean;
}

@Component({
  selector: 'app-my-todo-list',
  templateUrl: './my-todo-list.component.html',
  styleUrls: ['./my-todo-list.component.css']
})
export class MyTodoListComponent implements OnInit {
  iD: string;
  todoList: TODO[] = [];
  filteredList: TODO[][] = [];
  constructor(private todo: TodoService) {}

  ngOnInit() {
    this.iD = firebase.auth().currentUser.uid;
    this.todo
      .gettoDoList(this.iD)
      .snapshotChanges()
      .subscribe(item => {
        this.todoList = [];
        item.forEach(element => {
          const x = element.payload.val();
          x['$key'] = element.key;
          this.todoList.push(x);
        });
        // sort array isChecked false --> true
        this.todoList.sort((a, b) => {
          return b.dateAdded - a.dateAdded;
        });
        const temp: TODO[] = [];
        let d = this.todoList[0].dateAdded;
        this.todoList.forEach(td => {
          if (td.dateAdded === d) {
            temp.push(td);
          } else {
            this.filteredList.push(temp);
          }
          d = td.dateAdded;
        });
        this.filteredList.push(temp);
      });
  }
}
