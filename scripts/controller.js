// basic functionalities

$(document).ready(function() {
	var rowNumber = 1;
	var topicArray = [];

	$("#btn-connect").click (function() {
		client = mqtt.connect($("#address-input").val());
		client.on("connect", function(){
		    console.log("Successfully connected");
		    console.log("address: "+$("#address-input").val());
		})
		$("#connected-btn").val("Connected!");
		client.on("message", function (topic, payload) {
			console.log("Received { topic:"+topic+"; payload: "+payload+" }");
			$('tbody').append('<tr><td>' + topic + '<td>' + payload + '<td>'+moment().format('MMMM Do YYYY, h:mm:ss a') + '</td></tr>');
			rowNumber++;
		})
	})

	$("#btn-disconnect").click (function() {		
		client.end();
		$("#connected-btn").val("Disconnected!");
	});

	$("#btn-subscribe").click (function() {
		var topic = $("#topicSubscribe-input").val();
		client.subscribe(topic);	
		console.log("Subscribed { topic:" + topic+ " }");
		topicArray.push(topic);
		$("#subscribed-btn").val("Subscribed!");
	})

	$("#btn-unsubscribe").click (function() {
		var topic = $("#topicSubscribe-input").val();
		client.unsubscribe(topic);
		console.log("Unsubscribed { topic:" + topic+ " }");
		$("#subscribed-btn").val("Unsubscribed!");
	})

	$("#btn-publish").click (function() {
		var topic = $("#topicPublish-input").val();
		var payload = $("#payload-input").val();
		client.publish(topic, payload);
		console.log("Published { topic:"+topic+"; payload: "+payload+" }");
	})

	$("#btn-clear").click (function() {
		for (var i=rowNumber-1; i>=1; i--) {
			document.getElementById("table").deleteRow(i);
		}
		rowNumber = 1;
	})
})




// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })
