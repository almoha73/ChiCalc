import { useThemeContext } from './context/ThemeContext';
import Calculator from './components/Calculator';

function App() {
  const { theme } = useThemeContext();
  
  return (
    <div className={`h-full md:min-h-screen transition-colors duration-300 flex items-center justify-center p-1 md:p-4 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-palette-1 via-palette-2 to-palette-3' 
        : 'bg-gradient-to-br from-palette-5 via-palette-4 to-palette-3'
    }`}>
      <Calculator />
    </div>
  );
}

export default App;