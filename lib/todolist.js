const Todo = require("./todo.js")

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (todo instanceof Todo) {
      this.todos.push(todo);
    } else {
      throw new TypeError("Not a to-do object");
    }
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0]
  }

  last() {
    return this.todos[this.size() - 1];
  }

  _validateIndex(idx) {
    if (!(idx in this.todos)) {
      throw new ReferenceError(`Invalid Index: ${idx}`);
    }
  }

  itemAt(idx) {
    this._validateIndex(idx)
    return this.todos[idx];
  }

  markDoneAt(idx) {
    this._validateIndex(idx)
    this.itemAt(idx).markDone();
  }

  markUndoneAt(idx) {
    this._validateIndex(idx)
    this.itemAt(idx).markUndone();
  }

  isDone() {
    return this.todos.every(todo => {
      return todo.isDone();
    })
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }
  
  removeAt(idx) {
    this._validateIndex(idx);
    return this.todos.splice(idx, 1);
  }

  toString() {
    let title = `---- Today's Todos ----`;
    let list = this.todos.map(todo => todo.toString()).join(`\n`);
    return `${title}\n${list}`;
  }

  forEach(cb) {
    this.todos.forEach(todo => cb(todo));
  }

  filter(cb) {
    // return this.todos.filter(todo => cb(todo)); => suboptimal: introduces additional dependency
    let filteredTodos =  new TodoList(this.title);
    this.forEach(todo => {
      if (cb(todo)) {
        filteredTodos.add(todo);
      }
    })
    return filteredTodos;
  }

  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo !== undefined) todo.markDone();
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return [...this.todos];
  }

  }

module.exports = TodoList;
