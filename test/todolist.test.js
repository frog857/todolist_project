const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');


describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test("todolist size has a size of 3", () => {
    expect(list.size()).toBe(3);
  })

  test("toArray method returns all items,", () => {
    expect(typeof list.toArray()).toBe("object");
    expect(list.size()).toBe(3);
  })

  test("first method to return first todo", () => {
    expect(list.first()).toEqual(todo1);
  })

  test("last to return last todo", () => {
    expect(list.last()).toEqual(todo3);
  })

  test("shift removes and returns first item in the list", () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.first()).toEqual(todo2);
  })

  test("pop removes and return the last last todo", () => {
    expect(list.pop()).toEqual(todo3);
    expect(list.size()).toBe(2);
  })

  test("isDone method returns true if all items are done", () => {
    expect(list.isDone()).toBe(false);
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  })

  test("add method should not allow non to-dos", () => {
    expect(() => list.add(3)).toThrow(TypeError);
  })

  test("add method should add todos", () => {
    let todo4 = new Todo("kill the messenger");
    list.add(todo4);
    expect(list.size()).toBe(4);
    expect(list.last()).toEqual(todo4);
  })

  test("itemAt should return the todo at index specified", () => {
    expect(list.itemAt(2)).toEqual(todo3);
    expect(list.itemAt(0)).toEqual(todo1);
  })

  test("itemAt should throw a reference error when index isn't valid", () => {
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
  })

  test("markDoneAt should mark a todo done when not done", () => {
    list.markDoneAt(0)
    expect(list.itemAt(0).isDone()).toBe(true);
    expect(list.itemAt(2).isDone()).toBe(false);
  })

  test("markDoneAt should raise a Reference Error when invalid index", () => {
    expect(() => list.markDoneAt(4)).toThrow(ReferenceError);
  })

  test("markUndoneAt should mark a todo undone", () => {
    list.markAllDone();
    list.markUndoneAt(0)
    expect(list.itemAt(0).isDone()).toBe(false);
    expect(list.itemAt(2).isDone()).toBe(true);
  })

  test("markUndoneAt should raise a Reference Error when invalid index", () => {
    expect(() => list.markUndoneAt(4)).toThrow(ReferenceError);
  })

  test("markAllDone should mark all items on list as done", () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  })

  test("removeAt should remove an item from list", () => {
    list.removeAt(0);
    expect(list.size()).toBe(2);
  })

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

   
  test("toString returns string rep when some todos done", () => {
    list.markDoneAt(0);
    list.markDoneAt(2);

    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[X] Go to the gym`;
    expect(list.toString()).toBe(string);
  });

  test("toString returns string rep when some todos done", () => {
    list.markAllDone();

    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
    expect(list.toString()).toBe(string);
  });

  test('forEach iterates over all todos', () => {
    let result = [];
    list.forEach(todo => result.push(todo));

    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('filter returns new TodoList object with filtered todos', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);

    expect(newList.title).toBe(list.title);

    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());

  });

  test("findByTitle() should return a todo, given it's title", () => {
    let todo1Copy = list.findByTitle("Buy milk");

    expect(todo1Copy).toEqual(todo1);
  })

  test("allDone should return true if all items are done", () => {
    expect(list.allDone()).toBe(false);
    list.markAllDone();
    expect(list.allDone()).toBe(true);
  })

  
});