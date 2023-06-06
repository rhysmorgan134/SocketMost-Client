const net = require('net')

let client = net.createConnection("/tmp/SocketMost.sock");

client.on("connect", function() {
    console.log("connected")
});

client.on("data", function(data) {
    console.log("Data", data.toString())
});