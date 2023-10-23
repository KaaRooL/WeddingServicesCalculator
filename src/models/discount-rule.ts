import Calculation from "../calculation/calculation";
import Discount from "./discount";

export default interface IDiscountRule {
  calculateDiscount(calculation: Calculation): Discount;
}
