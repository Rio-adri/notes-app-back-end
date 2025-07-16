const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title, tags, body, id, createdAt, updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Catatan Gagal Ditambahkan');
    }

    return id;
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const result = this._notes.filter((note) => note.id === id)[0];

    if (!result) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    return result;
  }

  editNoteById(id, { title, body, tags }) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Catatn tidak ditemukan');
    }

    const updateAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      title,
      body,
      tags,
      updateAt,
    };
  }

  deleteNoteBydId(id) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Catatn tidak ditemukan');
    }

    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;
