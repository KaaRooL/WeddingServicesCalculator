export default class DiscountRulesCannotBeEmptyError extends Error {
  constructor() {
    super("There should be at least one discount rule provided to calculate discount.");
    this.name = "DiscountRulesCannotBeEmptyError";
  }
}



