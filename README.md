# Brent Oil Change Point Analysis Dashboard

🛢️ A full-stack data intelligence application that detects and visualizes structural regime shifts in Brent Crude Oil prices using Bayesian Inference (PyMC) and React.

##  Quick Start

### 1. Clone & Environment Setup
```bash
git clone https://github.com/Feven-TH/brent-oil-change-point-analysis.git
cd brent-oil-change-point-analysis
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 2. Start the Backend (Flask)
Open a terminal and run:
```bash
cd backend
python app.py
```
The API will be live at [http://127.0.0.1:5000](http://127.0.0.1:5000)

### 3. Start the Frontend (React)
Open a new terminal tab and run:
```bash
cd frontend
npm install
npm start
```
The Dashboard will open at [http://localhost:3000](http://localhost:3000)

## 📊 Project Architecture
- **Phase 1: Bayesian Modeling**
  - Model: Implemented a Numba-accelerated Sigmoid Change-Point model using PyMC.
  - Key Finding: Identified a significant regime shift on June 8, 2021.
  - Statistical Impact: Detected a -49.66% shift in price averages between regimes.
- **Phase 2: API Development (Flask)**
  - RESTful endpoints providing real-time data to the frontend.
  - CORS-enabled for secure communication with React.
  - Dynamic CSV processing using Pandas.
- **Phase 3: Data Visualization (React)**
  - Interactive Charting: Built with Recharts for high-performance time-series rendering.
  - KPI Intelligence: Dynamic cards showing Pre-Shift vs. Post-Shift price averages.
  - Visual Evidence: Vertical Reference Line indicating the exact point of the detected regime shift.

## 🛠️ Tech Stack
| Component | Technologies |
| --- | --- |
| Frontend | React.js, Recharts|
| Backend | Flask, Flask-CORS |
| Data Science | Python, PyMC, Numba, Pandas, Matplotlib |
| Version Control | Git |

## 📝 Analysis Notes
The dashboard highlights the transition from a period of high volatility and rising prices (early 2021) into a more stabilized lower-average regime detected mid-year. This 7-day lag analysis was performed to correlate global demand surges with physical oil price shifts.
