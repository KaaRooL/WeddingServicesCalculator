import Calculation from "../calculation";
import DiscountNames from "../../constants/discount-names";
import Discount from "../../models/discount";
import IDiscountRule from "../../models/discount-rule";

export class WeddingSession2022DiscountRule implements IDiscountRule {
  calculateDiscount(calculation: Calculation): Discount {
    let discount: Discount;
    if (calculation.isWeddingSession && calculation.isPhotography && calculation.year === 2022) {
      discount = calculation.discountConfig.filter(p => p.discountType === DiscountNames.SPECIAL_WEDDING_SESSION_DISCOUNT)[0];
    }
    return discount;
  }
}
