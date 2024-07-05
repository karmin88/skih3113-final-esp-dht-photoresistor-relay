function fetchAverages() {
  fetch('fetchdata.php')
    .then(response => response.json())
    .then(data => {
      // Get the latest 20 records
      const latestData = data.slice(-20);

      // Calculate averages
      const avgTemp = latestData.reduce((acc, item) => acc + parseFloat(item.temperature), 0) / latestData.length;
      const avgHum = latestData.reduce((acc, item) => acc + parseFloat(item.humidity), 0) / latestData.length;
      const avgDistance = latestData.reduce((acc, item) => acc + parseFloat(item.distance), 0) / latestData.length;

      // Calculate min and max
      const minTemp = Math.min(...latestData.map(item => parseFloat(item.temperature)));
      const maxTemp = Math.max(...latestData.map(item => parseFloat(item.temperature)));
      const minHum = Math.min(...latestData.map(item => parseFloat(item.humidity)));
      const maxHum = Math.max(...latestData.map(item => parseFloat(item.humidity)));
      const minDistance = Math.min(...latestData.map(item => parseFloat(item.distance)));
      const maxDistance = Math.max(...latestData.map(item => parseFloat(item.distance)));

      // Update averages display
      document.getElementById('temperatureAvg').innerText = `Temperature:\nAverage: ${avgTemp.toFixed(2)} °C\nMin: ${minTemp} °C\nMax: ${maxTemp} °C`;
      document.getElementById('humidityAvg').innerText = `Humidity:\nAverage: ${avgHum.toFixed(2)} %\nMin: ${minHum} %\nMax: ${maxHum} %`;
      document.getElementById('distanceAvg').innerText = `Distance:\nAverage: ${avgDistance.toFixed(2)} cm\nMin: ${minDistance} cm\nMax: ${maxDistance} cm`;

      // Update insights display
      const latestRecord = latestData[latestData.length - 1];
      const temperatureInsight = `Temperature is ${latestRecord.temperature}°C (${latestRecord.temperature > 25 ? "hot" : (latestRecord.temperature < 15 ? "cold" : "normal")})`;
      const humidityInsight = `Humidity is ${latestRecord.humidity}% (${latestRecord.humidity > 50 ? "high" : (latestRecord.humidity < 30 ? "low" : "normal")})`;
      const distanceInsight = `Distance is ${latestRecord.distance} cm (${latestRecord.distance < 10 ? "very close" : (latestRecord.distance <= 30 ? "close" : (latestRecord.distance <= 50 ? "far" : "very far"))})`;

      document.getElementById('insights').innerText = `Insights:\nCurrent Date Time: ${latestRecord.date} ${latestRecord.time}\n${temperatureInsight}\n${humidityInsight}\n${distanceInsight}\n\nNote: If temperature > 25°C and distance < 30 cm, the air conditioner will turn on.`;
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Automatically refresh data every 2 seconds on the main page
fetchAverages();
setInterval(fetchAverages, 2000);

// Fetch data and display on the details page
function fetchDataAndDisplay() {
  fetch('fetchdata.php')
    .then(response => response.json())
    .then(data => {
      // Sort data by date and time
      data = data.sort((a, b) => {
        return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
      });

      // Get the latest 20 records
      const latestData = data.slice(-20);

      // Update table
      var tableBody = document.querySelector('#sensorDataTable tbody');
      tableBody.innerHTML = '';
      latestData.reverse().forEach(item => {
        var row = `<tr>
                    <td>${item.id}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.temperature}</td>
                    <td>${item.humidity}</td>
                    <td>${item.distance}</td>
                  </tr>`;
        tableBody.innerHTML += row;
      });

      // Prepare data for charts
      var dates = latestData.map(item => item.date + " " + item.time);
      var temperatures = latestData.map(item => item.temperature);
      var humidities = latestData.map(item => item.humidity);
      var distances = latestData.map(item => item.distance);

      // Update Temperature Chart
      temperatureChart.data.labels = dates;
      temperatureChart.data.datasets[0].data = temperatures;
      temperatureChart.update();

      // Update Humidity Chart
      humidityChart.data.labels = dates;
      humidityChart.data.datasets[0].data = humidities;
      humidityChart.update();

      // Update Distance Chart
      distanceChart.data.labels = dates;
      distanceChart.data.datasets[0].data = distances;
      distanceChart.update();
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Automatically refresh data every 2 seconds on the details page
if (document.getElementById('sensorDataTable')) {
  fetchDataAndDisplay();
  setInterval(fetchDataAndDisplay, 2000);
}

// Initialize Temperature, Humidity, and Distance Charts for details page
var tempCtx = document.getElementById('temperatureChart').getContext('2d');
var temperatureChart = new Chart(tempCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperature (°C)',
      data: [],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'minute'
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

var humCtx = document.getElementById('humidityChart').getContext('2d');
var humidityChart = new Chart(humCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Humidity (%)',
      data: [],
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'minute'
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

var distanceCtx = document.getElementById('distanceChart').getContext('2d');
var distanceChart = new Chart(distanceCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Distance (cm)',
      data: [],
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'minute'
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
