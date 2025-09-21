
// test suite 1
describe("TodoList Class", () => {
  let todoList;
  
  beforeEach(() => {
    todoList = new TodoList(...args)
    // more SET UP...
  }) 

  test("test 1", () => {
    // execution and assertions related to TodoList class behavior
  })

  test("test 2", () => {
    // execution and assertions related to TodoList class behavior
  })
})

// test suite 2
describe("Todo Class", () => {
  let todo1;
  let todo2;

  beforeEach(() => {
    todo1 = new Todo(...args)
    todo2 = new Todo(...differentArgs)
  })

  test("test 1", () => {
    // execution and assertions related to Todo class behavior
    todo1.markDone()
    expect(todo1.isDone).toBe(true)
  })

  test("test 2", () => {
    // execution and assertions related to Todo class behavior
  })
})