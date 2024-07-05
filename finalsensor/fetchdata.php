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

// Fetch the latest 20 records from the database
$sql = "SELECT id, date, time, temperature, humidity, distance FROM sensortable ORDER BY id DESC LIMIT 20";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    echo "0 results";
}

echo json_encode(array_reverse($data));  // Reverse the data array to show the latest data last
$conn->close();
?>
