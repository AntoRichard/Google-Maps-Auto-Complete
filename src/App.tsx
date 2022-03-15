import React from "react";
import AutoComplete from "./components/AutoComplete";

const GOOGLE_MAPS_API_KEY = "AIzaSyD37UizytAiQ7AefQr-4WqfcWFa6FZajw0";

const App = () => {
  return (
    <div className="App">
      <AutoComplete
        apiKey={GOOGLE_MAPS_API_KEY}
        errorHandler={(error) => {
          console.log(error);
        }}
      />
    </div>
  );
};

export default App;
