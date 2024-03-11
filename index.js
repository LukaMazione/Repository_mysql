const { pool } = require('./utils/db');
const { TodoRecord } = require('./records/todo.record');
const { TodoRepositories } = require('./repositories/todo.repositories');

(async () => {
//   const firstTodoItem = new TodoRecord({
//     title: 'First item',
//   });
//   const newId = await firstTodoItem.insert();
//   console.log(`New Id: ${newId}`);
//   await firstTodoItem.delete();

  // const [allIds] = await pool.execute('SELECT `id`, `title` FROM `todos`');
  //
  // console.log(allIds);
  // const link = await TodoRecord.find('a3e5034e-6a1b-40f6-9009-c9b56579a683');
  // console.log(link);
  // await link.delete();

  // const createTodo = new TodoRecord({ title: 'Zrób to' });
  // findTodo.title = 'Zrób to';
  // await TodoRepositories.insert(createTodo);
  // await TodoRepositories.delete(findTodo);
  console.log(await TodoRepositories.findAll());

  await pool.end();
})();
