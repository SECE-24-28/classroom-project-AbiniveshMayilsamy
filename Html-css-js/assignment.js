const books = [
  {
    bookName: "JavaScript Guide",
    author: "John Doe",
    pages: 350,
    price: 499,
    rating: 4.3,
    category: "Programming",
    publishedYear: 2019,
  },
  {
    bookName: "React Mastery",
    author: "Siddharth Sharma",
    pages: 280,
    price: 599,
    rating: 4.8,
    category: "Programming",
    publishedYear: 2023,
  },
  {
    bookName: "History of India",
    author: "R. Sharma",
    pages: 420,
    price: 399,
    rating: 4.1,
    category: "History",
    publishedYear: 2015,
  },
  {
    bookName: "CSS Basics",
    author: "Meena Gupta",
    pages: 180,
    price: 199,
    rating: 3.9,
    category: "Design",
    publishedYear: 2020,
  },
  {
    bookName: "Node.js Deep Dive",
    author: "Alex Ron",
    pages: 510,
    price: 699,
    rating: 4.7,
    category: "Programming",
    publishedYear: 2021,
  },
];

// 1. Get all books name with rating greater than 4.5
// 2. Get the names of all books published after 2020
// 3. Calculate the total price of all Programming books
// 4. Find the average number of pages of all books in the Design category
// 5. Get a list of authors who have written books with a rating less than 4.0
// 6. Find the most expensive book in the collection
// 7. Get all books that have more than 300 pages and are priced below 500
// 8. Create a new array with book names and their respective authors

// 1. Get all books name with rating greater than 4.5
const b = books.filter((book) => book.rating > 4.5);
console.log("1.All books name with book.rating > 4.5 ", b);
console.log("-----------------------------------------------");

//2.Get the names of all books published after 2020
const c = books.filter((book) => book.publishedYear > 2020);

console.log("2.names of all books published after 2020", c);
console.log("------------------------------------");

//3. Calculate the total price of all Programming books
const d = books
  .filter((book) => book.category === "Programming")
  .reduce((total, book) => total + book.price, 0);

console.log("3.The total price of all Programming books", d);
console.log("-------------------------------");

//4. Find the average number of pages of all books in the Design category
const e = books
  .filter((book) => book.category === "Design")
  .reduce((total, book, index, array) => {
    total += book.pages / array.length;
    return total;
  }, 0);

console.log(
  "4.The average number of pages of all books in the Design category",
  e
);
console.log("-----------------------------------------");

// 5. Get a list of authors who have written books with a rating less than 4.0
const f = books.filter((book) => book.rating < 4.0).map((book) => book.author);
console.log(
  "5.list of authors who have written books with a rating less than 4.0",
  f
);

console.log("-----------------------------------------------");

//6.find the most expensive book in the collection
const g = books.reduce((maxBook, currentBook) => {
  return currentBook.price > maxBook.price ? currentBook : maxBook;
}, books[0]);
console.log("6.Most Expensive book in the collection", g);

console.log("----------------------------------------------");

// 7. Get all books that have more than 300 pages and are priced below 500
const h = books.filter((book) => book.pages > 300 && book.price < 500);
console.log("The books more than 300 pages and price less than 500 are:", h);

console.log("----------------------------------------------");

// 8. Create a new array with book names and their respective authors
const i = books.map((book) => ({ title: book.bookName, author: book.author }));

console.log("Array with book names and their repective authors", i);

console.log("----************************************----");
