import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HomePage } from '../features/home';
import './App.css';

export function App() {
  return (
    <div className="app-root">
      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Persistent Floating Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <HomePage />

      {/* Enterprise Footer */}
      <Footer />
    </div>
  );
}

export default App;
