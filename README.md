# SKIH3113 (FINALASG) Sensor-Based System
**Smart Environmental Monitoring and AC Control System with Database Storage**
<br>
<br>This project is a sensor-based system utilizing an ESP8266 microcontroller and a DHT11 sensor to monitor environmental conditions. The system reads temperature and humidity data from the sensor, sends the data to a MySQL database using PHP scripts, and displays the data on a web interface in both tabular and graphical formats. Error handling is implemented to show an error message in the serial monitor and skip database entry if sensor reading fails, ensuring efficient database usage.

The system connects to a Wi-Fi network and operates by acquiring sensor data at regular intervals. It then transmits the data to the server via HTTP POST requests. The data is stored in a structured database and can be viewed through a web page that fetches the data asynchronously and presents it using Chart.js for a dynamic and interactive user experience.
