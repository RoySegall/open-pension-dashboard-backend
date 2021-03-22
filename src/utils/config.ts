function safeGet(name: string, defaultValue) {
  return process.env[name] || defaultValue;
}

export function getPort() {
  return safeGet('PORT', 4000);
}
