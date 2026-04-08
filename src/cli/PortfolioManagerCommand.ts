import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PortfolioManagerBaseCommand } from "./PortfolioManagerBaseCommand.js";
import { PortfolioManagerConnectionCommand } from "./PortfolioManagerConnectionCommand.js";
import { PortfolioManagerMeterCommand } from "./PortfolioManagerMeterCommand.js";
import { PortfolioManagerNotificationsCommand } from "./PortfolioManagerNotificationsCommand.js";
import { PortfolioManagerPropertyCommand } from "./PortfolioManagerPropertyCommand.js";
import { PortfolioManagerShareCommand } from "./PortfolioManagerShareCommand.js";

function getPackageVersion(): string {
  // TODO: embed at build time instead of reading from file at runtime
  try {
    // Try to find package.json relative to this file
    const packageJsonPath = resolve(__dirname, "../../package.json");
    const packageJsonRaw = readFileSync(packageJsonPath, "utf8");
    const packageJson = JSON.parse(packageJsonRaw) as { version?: string };
    return packageJson.version || "0.0.0";
  } catch {
    return "0.0.0";
  }
}

export class PortfolioManagerCommand extends PortfolioManagerBaseCommand {
  constructor() {
    super("portfolio-manager");
    this.description("Portfolio Manager CLI");
    this.version(getPackageVersion());

    this.addCommand(new PortfolioManagerConnectionCommand());
    this.addCommand(new PortfolioManagerMeterCommand());
    this.addCommand(new PortfolioManagerNotificationsCommand());
    this.addCommand(new PortfolioManagerPropertyCommand());
    this.addCommand(new PortfolioManagerShareCommand());
  }
}
