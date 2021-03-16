const main = require("../index");
describe("Testing the movies API", () => {
  it("tests our testing framework if it works", () => {
    var servers = [
      { url: "https://jsonplaceholder.typicode.com/users", priority: 2 },
      { url: "https://jsonplaceholder.typicode.com/todos/1", priority: 1 },
      {
        url: "https://jsonplaceholder.typicode.com/posts/2000/comment",
        priority: 5,
      },
      {
        url: "https://jsonplaceholder.typicode.com/posts/1/comments",
        priority: 4,
      },
    ];
    expect(main.findServers(servers)).resolves.toBe(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
  });
});
describe("Testing the movies API", () => {
  it("tests our testing framework if it works", () => {
    var servers = [
      {
        url: "https://jsonplaceholder.typicode.com/posts/2000/comment",
        priority: 2,
      },
      {
        url: "https://jsonplaceholder.typicode.com/posts/2000/comment",
        priority: 1,
      },
      {
        url: "https://jsonplaceholder.typicode.com/posts/2000/comment",
        priority: 5,
      },
      {
        url: "https://jsonplaceholder.typicode.com/posts/2000/comment",
        priority: 4,
      },
    ];
    expect(main.findServers(servers)).resolves.toBe("All Servers are offline");
  });
});
