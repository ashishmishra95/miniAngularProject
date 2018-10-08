import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularFire2/database'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDoList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) { }
  gettoDoList(){
    this.toDoList = this.firebasedb.list('titles');
    return this.toDoList;
  }
  //Adding new items in list
  addTitle(title: string){
    this.toDoList.push({
      title: title,
      isChecked: false
    });
  }
  //Unique key  to identify items in the list
  checkOrUncheckTitle($key: string,flag: boolean){
    this.toDoList.update($key, {isChecked: flag});

  }
  removeTitle($key: string){
    this.toDoList.remove($key);
  }


}
 