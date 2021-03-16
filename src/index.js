const fetch = require("node-fetch");

async function findServers(servers) {
  
  var fetchArr = servers.map((obj) => {
    return fetch(obj.url);
  });
  //initializing empty array for future use
  var filteredArray = [];
  var finalArr = [];

  var result = await Promise.all(fetchArr)
    .then(function (responses) {
      // Get a JSON object from each of the responses
      // We map over all the responses from the fetchArr promises array and return an object
      // containing status and url of the response
      return Promise.all(
        responses.map(function (response) {
          return { status: response.status, url: response.url };
        })
      );
    })
    .then(function (data) {
      let count = 0;

      // We check if the servers are offline
      for (var status of data) {
        if (status.status > 299) {
          count++;
        }
      }

      // If all the servers are offline then we reject the promise
      if (count == data.length) {
        return Promise.reject("All Servers are offline");
      }

      // We filter out all the servers that are online to this filteredArray
      filteredArray = data.filter((obj) => {
        if (obj.status >= 200 && obj.status <= 299) {
          return obj;
        }
      });

      // Here we compare with the servers array with the filteredArray and check which all
      // url were online and push them to the finalArr
      for (var obj1 of servers) {
        for (var obj2 of filteredArray) {
          if (obj1.url == obj2.url) {
            finalArr.push(obj1);
          }
        }
      }

      //We finally sort the finalArr according to the priorities
      finalArr.sort((a, b) => {
        if (a.priority > b.priority) {
          return 1;
        } else {
          return -1;
        }
      });

      // We finally return the online server with the lowest priority since that will be
      // at the 1st index of this array
      return finalArr[0].url;
    })
    .catch(function (error) {
      // if there's an error, log it
    //   console.log(error);
    return error
    });
  // console.log(result)
  return result
};

(async function main(){
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
  var result = await findServers(servers)
//   if(result!=undefined)
//     console.log(result)
// console.log(result)
  
})()

exports.findServers = findServers;

