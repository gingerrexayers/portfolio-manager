import { PortfolioManagerBaseCommand } from "./PortfolioManagerBaseCommand.js";
import { PortfolioManagerConnectionCommand } from "./PortfolioManagerConnectionCommand.js";
import { PortfolioManagerMeterCommand } from "./PortfolioManagerMeterCommand.js";
import { PortfolioManagerNotificationsCommand } from "./PortfolioManagerNotificationsCommand.js";
import { PortfolioManagerPropertyCommand } from "./PortfolioManagerPropertyCommand.js";
import { PortfolioManagerShareCommand } from "./PortfolioManagerShareCommand.js";

export class PortfolioManagerCommand extends PortfolioManagerBaseCommand {
  constructor() {
    super("portfolio-manager");
    this.description("Portfolio Manager CLI");
    this.version("TODO: read from package.json");

    this.addCommand(new PortfolioManagerConnectionCommand());
    this.addCommand(new PortfolioManagerMeterCommand());
    this.addCommand(new PortfolioManagerNotificationsCommand());
    this.addCommand(new PortfolioManagerPropertyCommand());
    this.addCommand(new PortfolioManagerShareCommand());
  }
}
