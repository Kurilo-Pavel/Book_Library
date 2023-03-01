const fs = require("fs");
const path = require("node:path");
const http = require("http");
const port = 3001;
const url = require("url");

let nameDirectory = "";
let selectFile = "";

const server = http.createServer((request, response) => {
    console.log("server work");
    let urlRequest = url.parse(request.url, true);
    nameDirectory = urlRequest.path.slice(urlRequest.path.indexOf("/files") + "/files/".length);

    // open Directory
    if (urlRequest.path.lastIndexOf("/files/") !== -1) {
      const filePath = path.join(__dirname, nameDirectory)
      fs.readdir(filePath, {encoding: "utf-8", withFileTypes: true}, (err, files) => {
          if (err) throw err;
          if (files.length > 0) {
            let allFiles = [];
            files.forEach(file => {
              if (file.isDirectory()) {
                allFiles = [...allFiles, {name: file.name, isFile: false}];
              } else {
                allFiles = [...allFiles, {name: file.name, isFile: true}];
              }
            });
            response.end(JSON.stringify({path: nameDirectory, files: allFiles}));
          }
        }
      )
    }

    //read File
    if (urlRequest.path.lastIndexOf("/readFile/") !== -1 && response.req.method === "GET") {
      let data = "";
      selectFile = urlRequest.path.slice(urlRequest.path.indexOf("/readFile") + "/readFile/".length);
      const readFile = fs.createReadStream(path.join(__dirname, selectFile), 'utf-8');
      readFile.on("data", chunk => data += chunk);
      readFile.on("end", () => {
        response.end(JSON.stringify(data));
      })
    }

    // write to File
    if (request.url === "/writeFile/" && response.req.method === "POST") {
      let data = "";
      let id = 0;
      let dataFile = "";

      request.on("data", chunk => {
        data += chunk;
      });

      const readFile = fs.createReadStream(path.join(__dirname, "library/documents/books.txt"), 'utf-8');
      readFile.on("data", chunk => dataFile += chunk);
      readFile.on("end", () => {
          let allId = [0]
          if (dataFile) {
            allId = dataFile.split("/").map(value => {
              if (value) {
                return JSON.parse(value).id * 1;
              }
            })
          }
          id = allId.sort((a, b) => b - a)[0];
          let dataCopy = JSON.parse(data);
          dataCopy.id = (id + 1).toString();
          data = JSON.stringify(dataCopy);
          const writeFile = fs.createWriteStream(path.join(__dirname, "library/documents/books.txt"), {flags: "a"});
          writeFile.write(data + "/");
        }
      )
      response.end("Данные успешно получены");
    }

    //delete book
    if (urlRequest.path.lastIndexOf("/deleteBook/") !== -1 && response.req.method === "DELETE") {
      const bookId = urlRequest.path.slice(urlRequest.path.indexOf("/deleteBook") + "/deleteBook/".length);

      let data = "";
      const readFile = fs.createReadStream(path.join(__dirname, "library/documents/books.txt"), 'utf-8');
      readFile.on("data", chunk => data += chunk);
      readFile.on("end", () => {
        let books = [];
        if (data) {
          const arrayBooks = data.split("/");
          books = arrayBooks.filter(book => {
              if (book) {
                return JSON.parse(book).id !== bookId;
              }
            }
          )
        }
        const writeFile = fs.createWriteStream(path.join(__dirname, "library/documents/books.txt"), {flags: "w"});
        const allBooks = books.join("/");
        writeFile.write(allBooks + "/");
        response.end(JSON.stringify(allBooks));
      })
    }

    // Edet book
    if (urlRequest.path.lastIndexOf("/editBook/") !== -1 && response.req.method === "PUT") {
      const bookId = urlRequest.path.slice(urlRequest.path.lastIndexOf("/editBook") + "/editBook/".length);
      let data = "";
      let dataFile = "";

      request.on("data", chunk => {
        data += chunk;
      });
      request.on("end", () => {
        const readFile = fs.createReadStream(path.join(__dirname, "library/documents/books.txt"), 'utf-8');
        readFile.on("data", chunk => dataFile += chunk);
        readFile.on("end", () => {
          if (dataFile) {
            const allBooks = dataFile.split("/").map(book => {
              if (book) {
                if (JSON.parse(book).id === bookId) {
                  return JSON.stringify(book = {
                    id: bookId,
                    name: JSON.parse(data).name,
                    author: JSON.parse(data).author,
                    date: JSON.parse(book).date
                  });
                } else {
                  return book
                }
              }
            });
            const writeFile = fs.createWriteStream(path.join(__dirname, "library/documents/books.txt"), {flags: "w"});
            writeFile.write(allBooks.join("/") + "/");
            response.end(JSON.stringify(allBooks.join("/")));
          }
        })
      })
    }

  }
)
server.listen(port);

