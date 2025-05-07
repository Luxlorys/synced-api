export const generateRandomCode = (length: number) => {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let item = 0; item < length; item++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
};
