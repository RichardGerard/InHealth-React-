module.exports = {
  dependencies: {
    'some-unsupported-package': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
      },
    },
  },
  project: {
    // ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./assets/fonts/'], // stays the same
};
