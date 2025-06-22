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
  } catch (error) {
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
  // Supprimer les espaces
  const expr = expression.replace(/\s/g, '');
  
  // Expression vide est invalide
  if (expr === '') return false;
  
  // Vérifier les opérateurs consécutifs
  if (/[+\-*/]{2,}/.test(expr)) return false;
  
  // Vérifier les opérateurs au début (sauf moins pour les nombres négatifs)
  if (/^[+*/]/.test(expr)) return false;
  
  // Vérifier les opérateurs à la fin
  if (/[+\-*/]$/.test(expr)) return false;
  
  // Vérifier les séquences de caractères invalides
  if (/[+\-*/]\)/.test(expr)) return false; // Opérateur avant parenthèse fermante
  if (/\([+*/]/.test(expr)) return false; // Opérateur invalide après parenthèse ouvrante
  
  return true;
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