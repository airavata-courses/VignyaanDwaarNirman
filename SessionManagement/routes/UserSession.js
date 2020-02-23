const express = require("express");
const sessions = express.Router();
const cors = require("cors");

const Session = require("../models/Session");
sessions.use(cors());

process.env.SECRET_KEY = "secret";

sessions.post("/sessions", (req, res) => {
  console.log("sessions me agaya hu ");
  console.log(req.body.user_id);

  Session.find({ user_id: req.body.user_id }, function(error2, data) {
    console.log(data);
    res.send({ data });
    if (error2) {
      res.json({ error: "No Data Found" });
      handleError(error2);
    }
  });
});
module.exports = sessions;

// #!/usr/bin/env node

// const Session = require("../models/Session");

// var amqp = require('amqplib/callback_api');

// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }
//         var queue = 'toSession';
//         console.log("In Session");

//         channel.assertQueue(queue, {durable: false});
//                        channel.prefetch(1);
//                        channel.log(' [*] Waiting for messages. To exit press CTRL+C');
//                        channel.consume(queue, function reply(msg) {
//                                      console.log("Data in Session", JSON.parse(msg.content));

//                                      var data = JSON.parse(msg.content);
//                                      var user_id = Object.values(data)[0];
//                                      console.log("User ID ", user_id);
//                                      Session.find({"user_id" : user_id}, function(error2, res) {
//                                                   if (error2) {
//                                                                 console.log("Error finding session")
//                                                   }
//                                                   if (res == undefined) {
//                                                                 console.log(res);
//                                                   }
//                                                                 else{
//                                                                               console.log("User data retrived: ", res);
//                                                                               channel.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(res)), {
//                                                                                            correlationId: msg.properties.correlationId
//                                                                               });
//                                                                 }
//                                                   channel.ack(msg);
//                                      });
//                        });
//          });
// });

//                        /* SessionChannel.consume(queue, function(msg) {
//                                      console.log("Data ", JSON.parse(msg.content));

//                                      var data = JSON.parse(msg.content);
//                                      var user_id = Object.values(data)[0];
//                                      var queuee = 'fromSession';
//                                      console.log("User ID ", user_id);
//                                      Session.find({"User_Id" : user_id}, function(error2, res) {
//                                                   if (error2) {
//                                                                 console.log("Error finding session")
//                                                   }
//                                                   if (res == undefined) {
//                                                                 console.log(res);
//                                                   }
//                                                                 else{
//                                                                               console.log("User data retrived: ", res);
//                                                                               SessionChannel.assertQueue(queuee, {durable: false});
//                                                                               SessionChannel.sendToQueue(queuee, Buffer(JSON.stringify(res)));
//                                                                 }
//                                      });
//                                      SessionChannel.ack(msg)
//                        });
//          });
// }); */

// amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, SessionChannel) {
//         if (error1) {
//             throw error1;
//         }
//         var queue = 'toSession';
//         SessionChannel.assertQueue(queue, {durable: true});
//                            SessionChannel.consume(queue, function(msg) {
//                                          console.log("Data Session: ", JSON.parse(msg.content));

//                                          var data = JSON.parse(msg.content);
//                                          var user_id = Object.values(data);
//                                          console.log("User ID ", user_id);
//                                          var queuee = "fromSession";
//                                          Session.find({"user_id" : user_id}, function(error2, res) {
//                                                        if (error2) {
//                                                                     console.log("Error finding session")
//                                                        }
//                                                        if (res == undefined) {
//                                                                     console.log(res);
//                                                        }
//                                                                     else{
//                                                                                   console.log("User data retrived: ", res);
//                                                                                   SessionChannel1.assertQueue(queuee, {durable: true});
//                                                                                   SessionChannel1.sendToQueue(queuee, new Buffer(JSON.stringify(res)));
//                                                                                   console.log("Data Sent ", JSON.stringify(res));
//                                                                     }
//                                          });
//                                          SessionChannel1.ack(msg);
//                            });
//               });
// });
