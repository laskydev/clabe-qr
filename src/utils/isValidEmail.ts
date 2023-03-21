export function isValidEmail(email: string) {
    // Expresión regular para validar el formato de un email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}