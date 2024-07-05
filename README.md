# SKIH3113 (FINALASG) Sensor-Based System
## Smart Environmental Monitoring and AC Control System with Database Storage
<br>This project is a sensor-based system utilizing an ESP8266 microcontroller, DHT11 sensor, and ultrasonic distance sensor to monitor environmental conditions. The system reads temperature, humidity, and distance data from the sensors, sends the data to a MySQL database using PHP scripts, and displays the data on a web interface in both tabular and graphical formats. Error handling is implemented to show an error message in the serial monitor and skip database entry if sensor reading fails, ensuring efficient database usage.

The system connects to a Wi-Fi network and operates by acquiring sensor data at regular intervals (every 10 seconds). It then transmits the data to the server via HTTP POST requests. The data is stored in a structured database and can be viewed through a web page that fetches the data asynchronously and presents it using Chart.js for a dynamic and interactive user experience.

## Setup Requirements and Process
### Hardware Setup
- Connect the DHT11 sensor to the ESP8266 as follows:
<br>VCC to 3.3V, Data (OUT) to GPIO D4, GND to GND
- Connect the ultrasonic distance sensor to the ESP8266 as follows:
<br>VCC to 3.3V, Trig to GPIO D5, Echo to GPIO D6, GND to GND
- Connect the relay to the ESP8266 as follows:
<br>VCC to 3.3V, IN to GPIO D1, GND to GND
- Connect the ESP8266 to your computer using the micro USB cable.

### Software Setup
- **Arduino IDE Platform**
<br>1. Install the Arduino IDE from the official website.
<br>2. In the Arduino IDE, go to File > Preferences and add the following URL to the "Additional Boards Manager URLs" field: http://arduino.esp8266.com/stable/package_esp8266com_index.json.
<br>3. Install necessary libraries by going to Sketch > Include Library > Manage Libraries.
<br>4. Search for and install the following libraries:
DHT sensor library
Adafruit Unified Sensor
ESP8266WiFi
ESP8266HTTPClient

- **Setting Up the Database: PHPMyAdmin by XAMPP**
<br>1. Download and install XAMPP from the official website.
<br>2. Start the Apache and MySQL modules from the XAMPP Control Panel.
<br>3. Open PHPMyAdmin by navigating to http://localhost/phpmyadmin in your web browser.
<br>4. Create a new database and table to store sensor data. Use the following SQL commands to create the table:
```sql
CREATE TABLE `sensor_data` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `time` TIME NOT NULL,
  `temperature` FLOAT NOT NULL,
  `humidity` FLOAT NOT NULL,
  `distance` FLOAT NOT NULL,
  PRIMARY KEY (`id`)
);
```

- **Writing PHP Scripts**
<br>Create the following PHP scripts and place them in the htdocs directory of your XAMPP installation:
<br>writedata.php for writing data to the database.
<br>fetchdata.php for fetching data for the web interface.

- **Designing the web page (html, css, js)**
- **Uploading the Arduino Sketch**
- **Run the system**
<br>1. Open the serial monitor in the Arduino IDE to observe the system’s operation.
<br>2. Ensure that the ESP8266 successfully connects to the WiFi (change to your own wifi).
<br>3. Check the serial monitor for sensor values and any error messages.
<br>4. Access the web interface by navigating to the corresponding URL (change according to your laptop ipv4 address).
<br>5. Monitor the data being updated in real-time and verify that the relay operates according to the predefined thresholds.
