const fs = require("fs");

class QuizFileStore {
  constructor(file = "Data.json") {
    this.file = file;
  }

  getAll() {
    try {
      return JSON.parse(fs.readFileSync(this.file));
    } catch (e) {
      return [];
    }
  }

  getById(id) {
    return this.getAll().find((q) => String(q.id) === String(id));
  }

  create(data) {
    const quizzes = this.getAll();
    const newQuiz = { id: quizzes.length + 1, ...data };
    quizzes.push(newQuiz);
    fs.writeFileSync(this.file, JSON.stringify(quizzes, null, 2));
    return newQuiz;
  }

  update(id, data) {
    const quizzes = this.getAll();
    const index = quizzes.findIndex((q) => String(q.id) === String(id));
    if (index === -1) return null;
    quizzes[index] = { ...quizzes[index], ...data };
    fs.writeFileSync(this.file, JSON.stringify(quizzes, null, 2));
    return quizzes[index];
  }

  delete(id) {
    const quizzes = this.getAll();
    const index = quizzes.findIndex((q) => String(q.id) === String(id));
    if (index === -1) return false;
    quizzes.splice(index, 1);
    fs.writeFileSync(this.file, JSON.stringify(quizzes, null, 2));
    return true;
  }
}

module.exports = QuizFileStore;
