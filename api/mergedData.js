// for merged promises. Merging the data for both promises together
import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

// TODO: Get data for viewBook
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE BOOK
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
  // GET AUTHOR
  // Create an object that has book data and an object named authorObject
});

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

// TODO: Get data for viewBook
const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE BOOK
  getSingleAuthor(firebaseKey).then((authorObject) => { // returns single author object
    getAuthorBooks(authorObject.firebaseKey) // we nest this promise so that we can use the author object
      .then((authorBooksArray) => resolve({ authorBooksArray, authorObject }));
  }).catch(reject);
});

export {
  getBookDetails,
  getAuthorDetails,
  deleteAuthorBooksRelationship,
};
