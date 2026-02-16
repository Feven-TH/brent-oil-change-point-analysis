import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, '..', 'data', 'BrentOilPrices.csv')

@app.route('/api/prices', methods=['GET'])
def get_prices():
    df = pd.read_csv(DATA_PATH)
    df['Date'] = pd.to_datetime(df['Date']).dt.strftime('%Y-%m-%d')
    
    # CALCULATE VOLATILITY: 7-day rolling standard deviation
    df['Volatility'] = df['Price'].rolling(window=7).std().fillna(0)
    
    # Handle Date Filtering from Frontend
    start_date = request.args.get('start', '2020-01-01')
    end_date = request.args.get('end', '2022-12-31')
    df = df[(df['Date'] >= start_date) & (df['Date'] <= end_date)]
    
    return df.to_json(orient='records')

@app.route('/api/events', methods=['GET'])
def get_events():
    # Mock events for demonstration (or load from your events.csv)
    events = [
        {"Date": "2020-04-20", "Event": "WTI Negative Price"},
        {"Date": "2021-03-23", "Event": "Suez Canal Blockage"},
        {"Date": "2022-02-24", "Event": "Ukraine Conflict Start"}
    ]
    return jsonify(events)

@app.route('/api/summary', methods=['GET'])
def get_summary():
    return jsonify({
        "change_point": "2021-06-08",
        "pre_avg": 94.06,
        "post_avg": 47.35,
        "impact_percent": -49.66
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)