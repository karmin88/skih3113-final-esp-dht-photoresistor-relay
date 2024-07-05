<?php
$servername = "localhost";
$username = "root";      // MySQL username
$password = "";          // MySQL password
$dbname = "sensordb";    // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if 'temperature', 'humidity', and 'distance' are set in the POST request
if (isset($_POST['temperature']) && isset($_POST['humidity']) && isset($_POST['distance'])) {
    $temperature = $_POST['temperature'];
    $humidity = $_POST['humidity'];
    $distance = $_POST['distance'];

    // Insert data into database
    $sql = "INSERT INTO sensortable (date, time, temperature, humidity, distance)
            VALUES (CURDATE(), CURTIME(), '$temperature', '$humidity', '$distance')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Temperature, humidity, and distance data not received.";
}

$conn->close();
?>
