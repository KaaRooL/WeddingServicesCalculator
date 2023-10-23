import Calculation from "./calculation";
import Discount from "../models/discount";
import IDiscountRule  from "../models/discount-rule";
import DiscountRulesCannotBeEmptyError from "../errors/discount-rules-cannot-be-empty-error";


export default class DiscountManager {
  private _discountRules: IDiscountRule[];  
  private constructor(discountRules: IDiscountRule[]) {
    this._discountRules = discountRules;
  }
  
  public static createWithRules(discountRules: IDiscountRule[]){
    if(discountRules.length === 0){
      throw new DiscountRulesCannotBeEmptyError();
    }
    return new DiscountManager(discountRules);
  }

  public calculateHighestDiscount(calculation: Calculation): Discount {
    let discounts: Discount[] =[];
    this._discountRules.forEach(d => {
      const discount = d.calculateDiscount(calculation);
      discounts.push(discount);
    })

    return discounts.sort((first,second) => second.value - first.value)[0]
  }

 
}
