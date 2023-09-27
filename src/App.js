import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutePages from './components/RoutePages';

const App = () => (
  <div>
    <Router>
      <RoutePages />
    </Router>
  </div>
);

export default App;