class TodoRecord {
  // active record
  constructor(obj) {
    this.title = obj.title;
    this.id = obj.id;
    this._validate();
  }

  _validate() {
    if (this.title.trim().length < 5) {
      throw new Error('Todo title should be at least 5 characters');
    }

    if (this.title.length > 150) {
      throw new Error('Todo title is too long, should be max 150 characters');
    }
  }
}

module.exports = {
  TodoRecord,
};
