/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

const { default: pg } = require('pg');

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const up = (pgm) => {
    // membuat user baru
    pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES('old_notes', 'old_notes', 'old_notes', 'old_notes')");

    // mengubah nilai owner yang null pada tabel notes
    pgm.sql("UPDATE notes SET owner='old_notes' WHERE owner IS NULL");

    // membuat relasi antara notes dan users
    pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const down = (pgm) => {
    // menghapus constraint pada tabel notes
    pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

    // mengubah nilai owner old_notes menjadi null
    pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");

    // menghapus users old_notes
    pgm.sql("DELETE FROM users WHERE id ='old_notes'");
};

module.exports = { up, down }
