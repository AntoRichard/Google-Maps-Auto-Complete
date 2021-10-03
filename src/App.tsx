import React from 'react';
import AutoComplete from './shared/components/AutoComplete';

const GOOGLE_MAPS_API_KEY = "";

const App = () => {
  return (
      <div className="App">
        <AutoComplete apiKey={GOOGLE_MAPS_API_KEY}/>
      </div>
  );
}

export default App;
