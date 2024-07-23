export const limitarTexto = (text, maxPalabras) => {
    const palabras = text.split(" ");
    if (palabras.length > maxPalabras) {
      return palabras.slice(0, maxPalabras).join(" ") + "...";
    }
    return text;
  };