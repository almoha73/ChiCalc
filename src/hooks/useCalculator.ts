import { useState, useCallback, useEffect } from 'react';
import { evaluateExpression, formatNumber } from '../utils/calculator';

interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

type StoredHistoryItem = Omit<HistoryItem, 'timestamp'> & { timestamp: string };

const isOperator = (char: string) => ['+', '-', '*', '/'].includes(char);

const isUnaryMinus = (expression: string, index: number) => {
  if (expression[index] !== '-') {
    return false;
  }

  if (index === 0) {
    return true;
  }

  const previous = expression[index - 1];
  return previous !== ')' && (isOperator(previous) || previous === '(');
};

const getCurrentNumberSegment = (expression: string) => {
  let segment = '';

  for (let i = expression.length - 1; i >= 0; i -= 1) {
    const char = expression[i];

    if (/\d/.test(char)) {
      segment = char + segment;
      continue;
    }

    if (char === '.') {
      segment = char + segment;
      continue;
    }

    if (char === '-' && isUnaryMinus(expression, i)) {
      segment = char + segment;
      continue;
    }

    break;
  }

  return segment;
};

export const useCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [isResult, setIsResult] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedHistory = window.localStorage.getItem('calculator-history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory) as StoredHistoryItem[];
        const historyWithDates = parsed.map(item => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(historyWithDates);
      } catch (error) {
        console.error('Error loading history:', error);
      }
    }
  }, []);

  // Save history to localStorage whenever history changes
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem('calculator-history', JSON.stringify(history));
  }, [history]);

  const addToHistory = useCallback((expr: string, result: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      expression: expr,
      result,
      timestamp: new Date()
    };
    
    setHistory(prev => {
      const newHistory = [newItem, ...prev.slice(0, 49)]; // Garder seulement les 50 derniers
      return newHistory;
    });
  }, []);

  const handleButtonClick = useCallback((value: string) => {
    if (value === 'C') {
      setDisplay('0');
      setExpression('');
      setLastResult(null);
      setIsResult(false);
      return;
    }

    if (value === '⌫') {
      if (isResult) {
        // If showing result, clear everything
        setDisplay('0');
        setExpression('');
        setIsResult(false);
      } else if (expression.length <= 1) {
        setDisplay('0');
        setExpression('');
      } else {
        const newExpression = expression.slice(0, -1);
        setExpression(newExpression);
        setDisplay(newExpression || '0');
      }
      return;
    }

    if (value === '=') {
      if (!expression) return;
      
      try {
        const result = evaluateExpression(expression);
        const formattedResult = formatNumber(result);
        setDisplay(formattedResult);
        setLastResult(formattedResult);
        addToHistory(expression, formattedResult);
        setExpression('');
        setIsResult(true);
      } catch {
        setDisplay('Error');
        setTimeout(() => {
          setDisplay('0');
          setExpression('');
          setIsResult(false);
        }, 1500);
      }
      return;
    }

    // Handle operators and numbers
    let newExpression = expression;

    // If we just calculated something and user enters a number or decimal, start fresh
    if (isResult && (/^\d$/.test(value) || value === '.')) {
      newExpression = '';
      setLastResult(null);
      setIsResult(false);
    }

    if (value === '.') {
      const currentSegment = getCurrentNumberSegment(newExpression);

      if (currentSegment.includes('.')) {
        return;
      }

      const needsLeadingZero = currentSegment === '' || currentSegment === '-';
      const updatedExpression = newExpression + (needsLeadingZero ? '0.' : '.');

      setExpression(updatedExpression);
      setDisplay(updatedExpression);
      setIsResult(false);
      return;
    }

    // If we just calculated something and user enters an operator, continue with result
    if (isResult && ['+', '-', '×', '÷'].includes(value)) {
      newExpression = lastResult || '';
      setLastResult(null);
      setIsResult(false);
    }

    // Convert display symbols to calculation symbols for internal use
    const calcValue = value === '×' ? '*' : value === '÷' ? '/' : value;
    newExpression += calcValue;

    setExpression(newExpression);
    setDisplay(newExpression);
    setIsResult(false);
  }, [expression, lastResult, isResult, addToHistory]);

  // Keyboard support - Fixed version
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't prevent default for all keys, only for calculator keys
      const key = event.key;
      
      // Number keys
      if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        handleButtonClick(key);
        return;
      }
      
      // Operator keys
      const operatorMap: { [key: string]: string } = {
        '+': '+',
        '-': '-',
        '*': '×',
        '/': '÷',
        '(': '(',
        ')': ')',
        '.': '.',
        'Enter': '=',
        ' ': '=', // Space bar for equals
        '=': '=',
        'Escape': 'C',
        'Backspace': '⌫',
        'Delete': 'C'
      };
      
      if (operatorMap[key]) {
        event.preventDefault();
        handleButtonClick(operatorMap[key]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleButtonClick]); // Add handleButtonClick as dependency

  const clearHistory = useCallback(() => {
    setHistory([]);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('calculator-history');
    }
  }, []);

  const loadFromHistory = useCallback((item: HistoryItem) => {
    setExpression(item.expression);
    setDisplay(item.expression);
    setLastResult(null);
    setIsResult(false);
  }, []);

  return {
    display,
    expression,
    history,
    handleButtonClick,
    clearHistory,
    loadFromHistory
  };
};