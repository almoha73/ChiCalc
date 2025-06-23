import { useThemeContext } from './context/ThemeContext'; // Changé ici
import Calculator from './components/Calculator';

function App() {
  const { resolvedTheme } = useThemeContext(); // Changé ici
  
  return (
    <div className={`min-h-screen transition-colors duration-300 flex items-center justify-center p-2 lg:p-4 ${
      resolvedTheme === 'dark' 
        ? 'bg-gradient-to-br from-palette-1 via-palette-2 to-palette-3' 
        : 'bg-gradient-to-br from-palette-5 via-palette-4 to-palette-3'
    }`}>
      <Calculator />
    </div>
  );
}

export default App;