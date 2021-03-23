function safeGet(name: string, defaultValue) {
  return process.env[name] || defaultValue;
}

export function getPort() {
  return safeGet('PORT', 4000);
}

export function getMongoURL() {
  return safeGet('dbURL', 'mongodb://127.0.0.1/test');
}
