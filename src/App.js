import React, { useEffect } from "react";
import DynamicForm from "./components/DynamicForm";
import formData from "./data.json";

function App() {
  return (
    <div className="App">
      <DynamicForm formData={formData} />
    </div>
  );
}

export default App;
