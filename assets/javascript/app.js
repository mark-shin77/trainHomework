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
        db.ref().push(newTrain);

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
    db.ref().on('child_added', function(childSnapshot){
        console.log(childSnapshot.val());

        // Making variable for info
        var trainName = childSnapshot.val().Train;
        var destinationName = childSnapshot.val().Destination;
        var firstTrain = childSnapshot.val().FirstTrainTime;
        var frequency = childSnapshot.val().Frequency;

        // Test
        console.log(trainName);
        console.log(destinationName);
        console.log(firstTrain);
        console.log(frequency);

        // Making New Rows
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destinationName),
            $("<td>").text(frequency),
            $("<td>").text(""),
            $("<td>").text(""),
        );

        // Adding to Table
        $('#train-table').append(newRow);



    });



});