"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookByIdHandler = exports.editBookByIdHandler = exports.getBookByIdHandler = exports.getAllBookHandler = exports.addBooksHandler = void 0;
const nanoid_1 = require("nanoid");
const books_1 = require("./books");
const addBooksHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading, } = request.payload;
    if (name === undefined || name === "") {
        return h
            .response({
                status: "fail",
                message: "Gagal menambahkan buku. Mohon isi nama buku",
            })
            .code(400);
    }
    if (readPage > pageCount) {
        return h
            .response({
                status: "fail",
                message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
            })
            .code(400);
    }
    const id = (0, nanoid_1.nanoid)(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };
    books_1.books.push(newBook);
    return h
        .response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            },
        })
        .code(201);
};
exports.addBooksHandler = addBooksHandler;
const getAllBookHandler = (request) => {
    let filteredBooks = [...books_1.books];
    const { name, reading, finished } = request.query;
    if (name) {
        const queryName = name.toLowerCase();
        filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(queryName));
    }
    if (reading !== undefined) {
        const isReading = parseInt(reading, 10) === 1;
        filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
    }
    if (finished !== undefined) {
        const isFinished = parseInt(finished, 10) === 1;
        filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
    }
    return {
        status: "success",
        data: {
            books: filteredBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    };
};
exports.getAllBookHandler = getAllBookHandler;
const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books_1.books.filter((b) => b.id === bookId)[0];
    if (book) {
        return {
            status: "success",
            data: {
                book,
            },
        };
    }
    return h
        .response({
            status: "fail",
            message: "Buku tidak ditemukan",
        })
        .code(400);
};
exports.getBookByIdHandler = getBookByIdHandler;
const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading, } = request.payload;
    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();
    const index = books_1.books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        if (name === undefined || name === "") {
            return h
                .response({
                    status: "fail",
                    message: "Gagal memperbarui buku. Mohon isi nama buku",
                })
                .code(400);
        }
        if (readPage > pageCount) {
            return h
                .response({
                    status: "fail",
                    message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
                })
                .code(400);
        }
        books_1.books[index] = Object.assign(Object.assign({}, books_1.books[index]), {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            finished,
            readPage,
            reading,
            updatedAt
        });
        return h
            .response({
                status: "success",
                message: "Buku berhasil diperbarui",
            })
            .code(200);
    }
    return h
        .response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan",
        })
        .code(404);
};
exports.editBookByIdHandler = editBookByIdHandler;
const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books_1.books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        books_1.books.splice(index, 1);
        return h
            .response({
                status: "success",
                message: "Buku berhasil dihapus",
            })
            .code(200);
    }
    return h
        .response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        .code(404);
};
exports.deleteBookByIdHandler = deleteBookByIdHandler;



