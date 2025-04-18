from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)  # Corrected
CORS(app)

API_KEY = "62a5dd10dee4f8b1826de2c62b4cece5"

@app.route('/get-weather', methods=['POST'])
def get_weather():
    data = request.json
    location = data.get("location")

    if not location:
        return jsonify({"error": "No location provided"}), 400

    url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={API_KEY}&units=metric"
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "Location not found"}), 404

    weather_data = response.json()
    result = {
        "location": weather_data["name"],
        "temperature": weather_data["main"]["temp"],
        "humidity": weather_data["main"]["humidity"],
        "wind_speed": weather_data["wind"]["speed"],
        "description": weather_data["weather"][0]["description"]
    }

    return jsonify(result)

if __name__ == '__main__':  # Corrected
    app.run(debug=True)
