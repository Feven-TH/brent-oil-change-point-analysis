import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);
  const [summary, setSummary] = useState(null);
  const [dates, setDates] = useState({ start: '2020-01-01', end: '2022-12-31' });

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/prices?start=${dates.start}&end=${dates.end}`)
      .then(res => res.json()).then(setData);
    
    fetch('http://127.0.0.1:5000/api/events')
      .then(res => res.json()).then(setEvents);

    fetch('http://127.0.0.1:5000/api/summary')
      .then(res => res.json()).then(setSummary);
  }, [dates]); // Re-fetch when dates change

  return (
    <div style={{ padding: '30px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#1e293b' }}>Brent Oil Intelligence Dashboard</h1>
        {/* DATE RANGE FILTER */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <input type="date" value={dates.start} onChange={(e) => setDates({...dates, start: e.target.value})} />
          <input type="date" value={dates.end} onChange={(e) => setDates({...dates, end: e.target.value})} />
        </div>
      </header>

      {/* KPI INDICATORS */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div className="card"><h3>Pre-Shift</h3><p>${summary?.pre_avg}</p></div>
        <div className="card"><h3>Post-Shift</h3><p>${summary?.post_avg}</p></div>
      </div>

      <div style={{ width: '100%', height: 500, backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="Date" tick={{fontSize: 12}} minTickGap={30} />
            <YAxis yAxisId="left" orientation="left" stroke="#2563eb" label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" label={{ value: 'Volatility', angle: 90, position: 'insideRight' }} />
            <Tooltip />
            <Legend />

            {/* EVENT HIGHLIGHTS */}
            {events.map((ev, i) => (
              <ReferenceLine yAxisId="left" key={i} x={ev.Date} stroke="#94a3b8" strokeDasharray="5 5" label={{ value: ev.Event, position: 'top', fontSize: 10, fill: '#64748b' }} />
            ))}

            {/* REGIME SHIFT LINE */}
            <ReferenceLine yAxisId="left" x="2021-06-08" stroke="red" strokeWidth={2} label={{ value: 'REGIME SHIFT', fill: 'red', fontWeight: 'bold' }} />

            <Line yAxisId="left" type="monotone" dataKey="Price" stroke="#2563eb" dot={false} strokeWidth={2} name="Oil Price" />
            <Line yAxisId="right" type="monotone" dataKey="Volatility" stroke="#f59e0b" dot={false} strokeDasharray="3 3" name="7-Day Volatility" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;