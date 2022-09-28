// without this, got error like cannot read 'idb' something

const { getDefaultConfig } = require("expo/metro-config");
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push("cjs");
module.exports = defaultConfig;
