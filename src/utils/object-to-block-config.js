function objectToBlockConfig(obj) {
  return Object.keys(obj).map(key => {
    const value = obj[key];
    return { key, value };
  });
}

module.exports = objectToBlockConfig;
