#!/usr/bin/env node

const Session = require("../models/Session");

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, SessionChannel) {
        if (error1) {
            throw error1;
        }
        var queue = 'toSession';

        SessionChannel.assertQueue(queue, {durable: false});
		SessionChannel.prefetch(1);
		console.log(' [*] Waiting for messages. To exit press CTRL+C');
		SessionChannel.consume(queue, function reply(msg) {
			console.log("Data ", JSON.parse(msg.content));
			
			var data = JSON.parse(msg.content);
			var user_id = Object.values(data)[0];
			console.log("User ID ", user_id);
			Session.find({"User_Id" : user_id}, function(error2, res) {
				if (error2) {
					console.log("Error finding session")
				}
				if (res == undefined) {
					console.log(res);
				}
					else{
						console.log("User data retrived: ", res);
						SessionChannel.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(res)), {
							correlationId: msg.properties.correlationId
						});
					}
				SessionChannel.ack(msg);
			});
		});
	});
});

		/* SessionChannel.consume(queue, function(msg) {
			console.log("Data ", JSON.parse(msg.content));
			
			var data = JSON.parse(msg.content);
			var user_id = Object.values(data)[0];
			var queuee = 'fromSession';
			console.log("User ID ", user_id);
			Session.find({"User_Id" : user_id}, function(error2, res) {
				if (error2) {
					console.log("Error finding session")
				}
				if (res == undefined) {
					console.log(res);
				}
					else{
						console.log("User data retrived: ", res);
						SessionChannel.assertQueue(queuee, {durable: false});
						SessionChannel.sendToQueue(queuee, Buffer(JSON.stringify(res)));
					}
			});
			SessionChannel.ack(msg)
		});
	});
}); */