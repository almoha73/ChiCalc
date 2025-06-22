// Safe evaluation of mathematical expressions
export const evaluateExpression = (expression: string): number => {
  if (!expression || expression.trim() === '') {
    return 0;
  }

  // Clean the expression
  let cleanExpression = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/[^0-9+\-*/.() ]/g, ''); // Remove any invalid characters

  // Check for valid parentheses
  if (!hasValidParentheses(cleanExpression)) {
    throw new Error('Invalid parentheses');
  }

  // Check for valid expression pattern
  if (!isValidExpression(cleanExpression)) {
    throw new Error('Invalid expression');
  }

  try {
    // Use Function constructor for safe evaluation
    const result = new Function(`"use strict"; return (${cleanExpression})`)();
    
    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Invalid calculation result');
    }
    
    return result;
  } catch (error) {
    throw new Error('Calculation error');
  }
};

// Check if parentheses are balanced and valid
const hasValidParentheses = (expression: string): boolean => {
  let count = 0;
  for (const char of expression) {
    if (char === '(') count++;
    if (char === ')') count--;
    if (count < 0) return false; // Closing before opening
  }
  return count === 0; // Must be balanced
};

// Validate expression structure
const isValidExpression = (expression: string): boolean => {
  // Remove spaces
  const expr = expression.replace(/\s/g, '');
  
  // Empty expression is invalid
  if (expr === '') return false;
  
  // Check for consecutive operators
  if (/[+\-*/]{2,}/.test(expr)) return false;
  
  // Check for operators at the beginning (except minus for negative numbers)
  if (/^[+*/]/.test(expr)) return false;
  
  // Check for operators at the end
  if (/[+\-*/]$/.test(expr)) return false;
  
  // Check for invalid character sequences
  if (/[+\-*/]\)/.test(expr)) return false; // Operator before closing parenthesis
  if (/\([+*/]/.test(expr)) return false; // Invalid operator after opening parenthesis
  
  return true;
};

// Format number for display
export const formatNumber = (num: number): string => {
  if (!isFinite(num)) {
    return 'Error';
  }
  
  // Handle very large numbers
  if (Math.abs(num) > 1e15) {
    return num.toExponential(6);
  }
  
  // Handle very small numbers
  if (Math.abs(num) < 1e-10 && num !== 0) {
    return num.toExponential(6);
  }
  
  // Round to avoid floating point precision issues
  const rounded = Math.round(num * 1e10) / 1e10;
  
  // Format with appropriate decimal places
  if (Number.isInteger(rounded)) {
    return rounded.toString();
  }
  
  // Limit decimal places and remove trailing zeros
  return parseFloat(rounded.toFixed(10)).toString();
};