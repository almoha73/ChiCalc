import { useThemeContext } from './context/ThemeContext';
import Calculator from './components/Calculator';

function App() {
  const { resolvedTheme } = useThemeContext();

  return (
    <div
      className={`min-h-[100dvh] w-full min-w-0 max-w-full transition-colors duration-300 flex flex-col items-center justify-start sm:justify-center px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-10 overflow-x-hidden ${
        resolvedTheme === 'dark'
          ? 'bg-gradient-to-br from-palette-1 via-palette-2 to-palette-3'
          : 'bg-gradient-to-br from-palette-5 via-palette-4 to-palette-3'
      }`}
    >
      <Calculator />
    </div>
  );
}

export default App;