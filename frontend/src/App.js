import React from 'react';
import Dashboard from './components/Dashboard';
// import './App.css'; // Optional styling

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ 
        backgroundColor: '#282c34', 
        padding: '20px', 
        color: 'white',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1>Selam Analytics: Oil Price Intelligence</h1>
      </header>
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Dashboard />
      </main>

      <footer style={{ textAlign: 'center', marginTop: '50px', padding: '20px', color: '#666' }}>
        <p>© 2024 Brent Oil Change Point Analysis - Confidential Report</p>
      </footer>
    </div>
  );
}

export default App;