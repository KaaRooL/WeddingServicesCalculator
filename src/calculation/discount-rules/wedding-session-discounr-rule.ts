import Calculation from "../calculation";
import DiscountNames from "../../constants/discount-names";
import Discount from "../../models/discount";
import IDiscountRule from "../../models/discount-rule";

export class WeddingSessionDiscountRule implements IDiscountRule {
  calculateDiscount(calculation: Calculation): Discount {
    let discount: Discount;
    if (calculation.isWeddingSession && (calculation.isPhotography || calculation.isVideo)) {
      discount = calculation.discountConfig.filter(p => p.discountType === DiscountNames.WEDDING_SESSION_DISCOUNT)[0];
    }
    return discount;
  }
}
