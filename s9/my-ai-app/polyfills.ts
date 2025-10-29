// Polyfill pour structuredClone dans React Native
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = function <T>(value: T): T {
    // Utilise JSON.parse/stringify comme fallback simple
    // Note: Cette implémentation ne gère pas tous les cas comme les fonctions,
    // les symboles, etc., mais fonctionne pour les objets simples
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (error) {
      // Fallback pour les cas où JSON.stringify échoue
      if (value === null || value === undefined) {
        return value;
      }
      
      if (typeof value !== 'object') {
        return value;
      }
      
      // Pour les objets plus complexes, on fait une copie superficielle
      if (Array.isArray(value)) {
        return [...value] as T;
      }
      
      return { ...value } as T;
    }
  };
}