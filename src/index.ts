export * from "./PortfolioManager.js";
export * from "./PortfolioManagerApi.js";
export * from "./cli/index.js";
export * from "./types/index.js";

import { PortfolioManagerCommand } from "./cli/PortfolioManagerCommand.js";

async function main() {
  const cli = new PortfolioManagerCommand();
  cli.parse(process.argv);
}

if (require.main === module) {
  main();
}