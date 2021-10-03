import React from 'react';
import AutoComplete from './shared/components/AutoComplete';

const GOOGLE_MAPS_API_KEY = "AIzaSyB9mKR0qCp5UNqTXjsvZm_FE2E-LEsPN-c";

const App = () => {
  return (
      <div className="App">
        <AutoComplete apiKey={GOOGLE_MAPS_API_KEY}/>
      </div>
  );
}

export default App;
