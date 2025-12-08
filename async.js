setTimeout(() => {
  console.log("setTimeout Function");
}, 2000);

//callback AND timer

console.log("Hello World");

// callback hell
//nested callbacks

setTimeout(() => {
  console.log("setTimeout Function 1");
  setTimeout(() => {
    console.log("setTimeout Function 2");
    setTimeout(() => {
      console.log("setTimeout Function 3");
      setTimeout(() => {
        console.log("setTimeout Function 4");
        setTimeout(() => {
          console.log("setTimeout Function 5");
        }, 2000);
      }, 2000);
    }, 2000);
  }, 2000);
}, 2000);
