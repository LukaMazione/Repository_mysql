const { v4: uuid } = require('uuid');
const { pool } = require('../utils/db');
const { TodoRecord } = require('../records/todo.record');

// repository, nie active class
class TodoRepositories {
  // eslint-disable-next-line no-underscore-dangle
  static _checkRecord(record) {
    if (!(record instanceof TodoRecord)) {
      throw new Error('record must be an instance of TodoRecord');
    }
  }

  static async insert(record) {
    TodoRepositories._checkRecord(record);
    // eslint-disable-next-line no-param-reassign
    record.id = record.id ?? uuid();

    await pool.execute('INSERT INTO `todos` VALUES (:id, :title)', {
      id: record.id,
      title: record.title,
    });

    return record.id;
  }

  static async delete(record) {
    TodoRepositories._checkRecord(record);

    if (!record.id) {
      throw new Error('Nie można usunąć rekordu bez ID');
    } else {
      await pool.execute('DELETE FROM `todos` WHERE `id` = :id', {
        id: record.id,
      });
    }
  }

  static async update(record) {
    TodoRepositories._checkRecord(record);

    if (!record.id) {
      throw new Error('Todo item has no ID!');
    }
    record._validate();
    await pool.execute('UPDATE `todos` SET `title` = :title WHERE `id` = :id', {
      title: record.title,
      id: record.id,
    });

    return record.id;
  }

  static async find(id) {
    // metoda statyczna nie ma dostępu do this
    // metoda statyczna nie ma await oo return
    const [results] = await pool.execute(
      'SELECT * FROM `todos` WHERE `id` = :id',
      {
        id,
      },
    );
    return results.length === 1 ? new TodoRecord(results[0]) : null;
  }

  static async findAll() {
    const [results] = await pool.execute('SELECT * FROM `todos`');
    console.log(Array.isArray(results));
    return results.map((result) => new TodoRecord(result));
  }
}

module.exports = {
  TodoRepositories,
};
