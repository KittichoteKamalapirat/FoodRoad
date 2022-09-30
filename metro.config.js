const { getDefaultConfig } = require("expo/metro-config");
const defaultConfig = getDefaultConfig(__dirname);

// for react-native-svg-transformer
const { transformer, resolver } = defaultConfig;

defaultConfig.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};
defaultConfig.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
};

// without this, got error like cannot read 'idb' something
defaultConfig.resolver.sourceExts.push("cjs");

module.exports = defaultConfig;
