// src/domain/models/Libro.js
export class Libro {
    constructor({ id, title, author, year }) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.year = year;
    }
  }