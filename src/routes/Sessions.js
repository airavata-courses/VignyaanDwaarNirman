#!/usr/bin/env node

const Session = require("../models/Session");

var amqp = require("amqplib/callback_api");

amqp.connect("amqp://rabbitmq-service", function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "sessionData";

    channel.assertQueue(queue, { durable: false });
    console.log(" [*] Waiting for messages. To exit press CTRL+C");
    channel.consume(
      queue,
      function(msg) {
		var data = JSON.parse(msg.content);
        var data = Object.values(data)[1];
        console.log("Data ", data);

        var user = JSON.parse(msg.content);
        var user_id = Object.values(user)[0];
        var new_session = new Session(user);
        console.log("User id", user_id);
        new_session.save(function(error3, res) {
          if (error3) {
            console.log("Error creating session");
          }
        });
      },
      { noAck: true }
    );
  });
});
module.exports = Session;
