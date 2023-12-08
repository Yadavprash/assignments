/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
    todos = [];
    add(item){
        this.todos.push(item);
    }
    remove(index){
        this.todos.splice(index,1);
    }
    update(index,updatedTodo){
        if(index < this.todos.length){
        let tempArr = this.todos.slice(0,index);
        tempArr.push(updatedTodo);
        tempArr.push(...this.todos.slice(index+1))
        this.todos = tempArr;
        }
    }
    getAll(){
        return this.todos;
    }
    get(indexOfTodo){
        if(indexOfTodo >= this.todos.length){
            return null;
        }
        return this.todos[indexOfTodo];
    }
    clear(){
        this.todos=[];
    }
}
// const does = new Todo();
// does.add("Go to bed");000000000
// does.add("Have crazy sex");
// const res = does.getAll();
// console.log(res);
module.exports = Todo;
