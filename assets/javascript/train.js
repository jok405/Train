// Pseudo - Pseudo:
/*
1. Review how to create Firebase link
2. Compose initial train data
3. On-click button for additional trains - then update the html + update the database
4. Ask how to retrieve trains from the list.
5. Calculate the time: frequency: Start time: Current time.
*/

// Link to Firebase
var steampunktrain = new Firebase("https://steampunktrain.firebaseio.com/");



// Grabs user input
$("#submit").on('click', function(){
	var train = $("#train_name").val().trim();
	var destination = $("#destination").val().trim();
	var frequency = $("#frequency").val().trim();
	var firstTrain = $("#firstTrain").val().trim();

	// Train application submitted to firebase
	steampunktrain.push({
		nameTrain: train,
		destination: destination,
		frequency: frequency,
		firstTrain: firstTrain
	})
})

// Calculation from application
steampunktrain.on('child_added', function(childSnapshot) {

	var trainfrequency = childSnapshot.val().frequency;
	var changeDate = moment(childSnapshot.val().firstTrain, 'hh:mm').subtract(1, 'years');
	var tTime = moment(changeDate).format('HH:mm');
	var currentTime = moment();
	var initChange = moment(tTime,'hh:mm').subtract(1, 'years');
	var timeDiff = moment().diff(moment(initChange), "minutes");
	var tRemaining = timeDiff % trainfrequency;
	var tMinTrain = trainfrequency - tRemaining;

	var nextTrain = moment().add(tMinTrain, 'minutes').format('HH:mm')


$("#schedule").append("<tr><td>" + childSnapshot.val().nameTrain + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + tTime + "</td><td>" + tMinTrain + "</td></tr>")
	};
	})

	// Logs everything to console
	//console.log(Train.name);
	//console.log(Train.destination); 
	//console.log(firstTrain);
	//console.log(Train.frequency)
	// Alert
	//alert("Train added");