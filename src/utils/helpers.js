export function generateRandomToken(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    token += charset[randomIndex];
  }
  return token;
}

export function toFixed(num, fixed) {
  if (typeof num === "string") {
    if (isNaN(parseFloat(num))) {
      return num;
    }
    num = parseFloat(num);
  }
  let rounded = num.toFixed(fixed);
  rounded = rounded.replace(/0+$/, "");
  rounded = rounded.replace(/\.$/, "");
  return rounded;
}
