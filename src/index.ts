export * from "./PortfolioManager.js";
export * from "./PortfolioManagerApi.js";
export * from "./cli/index.js";
export * from "./types/index.js";

import { PortfolioManagerCommand } from "./cli/PortfolioManagerCommand.js";

async function main() {
  const cli = new PortfolioManagerCommand();
  cli.parse(process.argv);
}

// Auto-run main when this file is executed directly
// Detection works for both CommonJS and ESM
const argv1 = process.argv[1];
if (argv1 && (
  argv1.endsWith('portfolio-manager') || 
  argv1.endsWith('index.js') ||
  argv1.includes('portfolio-manager')
)) {
  main();
}
