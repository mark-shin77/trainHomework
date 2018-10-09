// Initialize Firebase
var config = {
apiKey: "AIzaSyB5pRVp3tUB4XWxFXoxDfrtZileKBkJwSY",
authDomain: "train-homework-24bf1.firebaseapp.com",
databaseURL: "https://train-homework-24bf1.firebaseio.com",
projectId: "train-homework-24bf1",
storageBucket: "",
messagingSenderId: "40239820778"
};
firebase.initializeApp(config);

var db = firebase.database();

$(document).ready(function(){
    //Button function to add more trains
    $('#add-train-btn').on('click', function(event){
        event.preventDefault();

        // Getting User input
        var trainName = $('#train-name-input').val().trim();
        var destinationName = $('#destination-input').val().trim();
        var firstTrain = $('#first-train-input').val().trim();
        var frequency = $('#frequency-input').val().trim();

        // Object to hold info
        var newTrain = {
            Train: trainName,
            Destination: destinationName,
            FirstTrainTime: firstTrain,
            Frequency: frequency
        }

        // Pushing info to firebase
        db.ref('/trains').push(newTrain);

        // Test
        // console.log(newTrain.Train);
        // console.log(newTrain.Destination);
        // console.log(newTrain.FirstTrainTime);
        // console.log(newTrain.Frequency);

        alert("Train Successfully Added!");

        // Clear Text Boxes
        $('#train-name-input').val("");
        $('#destination-input').val("");
        $('#first-train-input').val("");
        $('#frequency-input').val("");
    });

    // Generating Data From Firebase to HTML
    db.ref('/trains').on('child_added', function(childSnapshot){

        //Test
        // console.log(childSnapshot.val());

        // Making variable for info
        var trainName = childSnapshot.val().Train;
        var destinationName = childSnapshot.val().Destination;
        var firstTrain = childSnapshot.val().FirstTrainTime;
        var frequency = childSnapshot.val().Frequency;

        // Test
        // console.log(trainName);
        // console.log(destinationName);
        // console.log(firstTrain);
        // console.log(frequency);

        var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, 'years');
        console.log(firstTrainConverted);

        var currentTime = moment();
        console.log('current time: ' + moment(currentTime).format('MMMM Do YYYY, hh:mm a'));

        var diffTime = moment().diff(moment(firstTrainConverted), 'minutes');
        console.log('difference in time: ' + diffTime);

        var tRemaining = diffTime % frequency;
        console.log(tRemaining);

        var minutesTillNextTrain = frequency - tRemaining;
        console.log('minutes till train: ' + minutesTillNextTrain);

        var nextTrain = moment().add(minutesTillNextTrain, 'minutes');
        console.log("arrival time: " + moment(nextTrain).format('MMMM Do YYYY, hh:mm a'));

        // Making New Rows
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destinationName),
            $("<td>").text(frequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minutesTillNextTrain),
        );

        // Adding to Table
        $('#train-table').append(newRow);
    });



});