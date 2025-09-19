const isOperator = (char: string) => ['+', '-', '*', '/'].includes(char);

// Évaluation sécurisée des expressions mathématiques
export const evaluateExpression = (expression: string): number => {
  if (!expression || expression.trim() === '') {
    return 0;
  }

  // Nettoyer l'expression
  let cleanExpression = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/[^0-9+\-*/.() ]/g, ''); // Supprimer les caractères invalides

  while (cleanExpression.includes('--')) {
    cleanExpression = cleanExpression.replace(/--/g, '- -');
  }

  // Vérifier les parenthèses valides
  if (!hasValidParentheses(cleanExpression)) {
    throw new Error('Parenthèses invalides');
  }

  // Vérifier le format de l'expression
  if (!isValidExpression(cleanExpression)) {
    throw new Error('Expression invalide');
  }

  try {
    // Utiliser le constructeur Function pour une évaluation sécurisée
    const result = new Function(`"use strict"; return (${cleanExpression})`)();

    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Résultat de calcul invalide');
    }

    return result;
  } catch {
    throw new Error('Erreur de calcul');
  }
};

// Vérifier si les parenthèses sont équilibrées et valides
const hasValidParentheses = (expression: string): boolean => {
  let count = 0;
  for (const char of expression) {
    if (char === '(') count++;
    if (char === ')') count--;
    if (count < 0) return false; // Fermeture avant ouverture
  }
  return count === 0; // Doit être équilibré
};

// Valider la structure de l'expression
const isValidExpression = (expression: string): boolean => {
  const expr = expression.replace(/\s/g, '');

  if (expr === '') {
    return false;
  }

  let expectingOperand = true;
  let decimalUsedInCurrentNumber = false;

  for (let i = 0; i < expr.length; i += 1) {
    const char = expr[i];

    if (/\d/.test(char)) {
      expectingOperand = false;
      continue;
    }

    if (char === '.') {
      if (decimalUsedInCurrentNumber) {
        return false;
      }

      decimalUsedInCurrentNumber = true;
      continue;
    }

    if (char === '(') {
      if (!expectingOperand) {
        return false;
      }

      expectingOperand = true;
      decimalUsedInCurrentNumber = false;
      continue;
    }

    if (char === ')') {
      if (expectingOperand) {
        return false;
      }

      expectingOperand = false;
      decimalUsedInCurrentNumber = false;
      continue;
    }

    if (isOperator(char)) {
      if (expectingOperand) {
        if (char === '-') {
          decimalUsedInCurrentNumber = false;
          continue;
        }

        return false;
      }

      expectingOperand = true;
      decimalUsedInCurrentNumber = false;
      continue;
    }

    return false;
  }

  return !expectingOperand;
};

// Formater le nombre pour l'affichage
export const formatNumber = (num: number): string => {
  if (!isFinite(num)) {
    return 'Erreur';
  }
  
  // Gérer les très grands nombres
  if (Math.abs(num) > 1e15) {
    return num.toExponential(6);
  }
  
  // Gérer les très petits nombres
  if (Math.abs(num) < 1e-10 && num !== 0) {
    return num.toExponential(6);
  }
  
  // Arrondir pour éviter les problèmes de précision des nombres flottants
  const rounded = Math.round(num * 1e10) / 1e10;
  
  // Formater avec le nombre approprié de décimales
  if (Number.isInteger(rounded)) {
    return rounded.toString();
  }
  
  // Limiter les décimales et supprimer les zéros de fin
  return parseFloat(rounded.toFixed(10)).toString();
};