//Libraries
#include <DHT.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// WiFi credentials
const char* ssid = "minnn";
const char* password = "0125658452minnn";

// Server URL
const char* serverName = "http://192.168.50.123/finalsensor/writedata.php";

// DHT11 sensor
#define DHTPIN D4          // Pin where the DHT sensor is connected
#define DHTTYPE DHT11      // Type of DHT sensor
DHT dht(DHTPIN, DHTTYPE);  // DHT sensor object

// Ultrasonic sensor
const int trigPin = D5;
const int echoPin = D6;

#define RELAY_PIN D1        // Pin for the relay

void setup() {
  Serial.begin(115200);    // Initialize serial communication
  while (!Serial);         // Wait for Serial to initialize
  dht.begin();             // Initialize DHT sensor
  pinMode(trigPin, OUTPUT); // Set trigPin as output
  pinMode(echoPin, INPUT);  // Set echoPin as input
  pinMode(RELAY_PIN, OUTPUT); // Set relay pin as output
  digitalWrite(RELAY_PIN, LOW); // Ensure relay is off initially
  
  Serial.print("Connecting to WiFi...");
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");
}

void loop() {
  // Read sensor data
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int distance = measureDistance();

  // Validate sensor readings
  if (isnan(humidity) || isnan(temperature) || distance < 2 || distance > 500) {
    Serial.println("Failed to read valid sensor data! Skipping data save.");
    delay(10000); // Delay 10 seconds before next reading
    return;
  }

  // Print sensor readings
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C");
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  // Check WiFi connection
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    Serial.println("Starting HTTP POST request...");

    // Prepare HTTP request data
    String httpRequestData = "temperature=" + String(temperature) +
                             "&humidity=" + String(humidity) +
                             "&distance=" + String(distance);

    // Send HTTP POST request
    http.begin(client, serverName);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    int httpResponseCode = http.POST(httpRequestData);

    // Check HTTP response
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("HTTP Response: " + response);

      // Control relay based on conditions after successful data upload
      if (temperature > 25 && distance < 30) {
        digitalWrite(RELAY_PIN, HIGH); // Turn on relay
        Serial.println("Relay ON");
      } else {
        digitalWrite(RELAY_PIN, LOW); // Turn off relay
        Serial.println("Relay OFF");
      }
    } else {
      Serial.print("Error on HTTP POST request: ");
      Serial.println(http.errorToString(httpResponseCode));
    }

    http.end(); // Close HTTP connection
  } else {
    Serial.println("WiFi not connected!");
  }

  // Debug: Check relay pin state
  Serial.print("Relay pin state: ");
  Serial.println(digitalRead(RELAY_PIN));

  delay(10000); // Delay before next sensor reading
}

int measureDistance() {
  // Clear the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  // Set the trigPin HIGH for 10 microseconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Read the echoPin, and calculate the duration of the pulse
  long duration = pulseIn(echoPin, HIGH);

  // Calculate the distance in cm
  int distance = duration * 0.034 / 2;

  return distance;
}
