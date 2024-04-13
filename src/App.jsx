import React from 'react';
import RoutePages from './pages/RoutePages';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => (
  <div>
    <Router>
      <RoutePages />
    </Router>
  </div>
);

export default App;