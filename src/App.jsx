import logo from './logo.svg';
import './main.css';
import { useEffect, useState } from 'react';
import TemplateGeneration from './Pages/TemplateGeneration';

function App() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    // Any effect logic can be added here if needed
  }, []);

  return (
    <div>
      <TemplateGeneration />
    </div>
  );
}

export default App;
