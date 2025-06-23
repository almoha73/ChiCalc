import { useThemeContext } from './context/ThemeContext';
import Calculator from './components/Calculator';

function App() {
  const { resolvedTheme } = useThemeContext();
  
  return (
    <div className={`w-screen h-screen min-h-0 min-w-0 max-w-full max-h-screen overflow-hidden transition-colors duration-300 flex items-center justify-center p-0 sm:p-2 lg:p-4 ${
      resolvedTheme === 'dark' 
        ? 'bg-gradient-to-br from-palette-1 via-palette-2 to-palette-3' 
        : 'bg-gradient-to-br from-palette-5 via-palette-4 to-palette-3'
    }`}>
      <Calculator />
    </div>
  );
}

export default App;