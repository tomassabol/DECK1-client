// apollo.config.js
module.exports = {
  client: {
    service: {
      name: "Deck1-DispatchApp",
      // URL to the GraphQL API
      url: "https://api.deck1.sk",
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js", "src/**/*.ts"],
  },
};
