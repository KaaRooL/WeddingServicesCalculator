import Calculation from "../calculation";
import DiscountNames from "../../constants/discount-names";
import DiscountManager from "../discount-manager";
import { PhotoVideoDiscountRule } from "../discount-rules/photo-video-discount-rule";
import { WeddingSession2022DiscountRule } from "../discount-rules/wedding-session-20220-discount-rule";

describe("Discount Manager tests", () => {
  test("should throw error, empty discount rules", () => {
    
    expect(()=>DiscountManager.createWithRules([])).toThrow("There should be at least one discount rule provided to calculate discount.");
  }),
    test("should calculate highest discount (photo plus video)", () => {
      const discountManager = DiscountManager.createWithRules([new PhotoVideoDiscountRule(), new WeddingSession2022DiscountRule()]);
      const discoutn = discountManager.calculateHighestDiscount(Calculation.create(2022,["VideoRecording", "Photography", "WeddingSession"]));
      expect(discoutn.discountType).toBe(DiscountNames.PHOTO_PLUS_VIDEO_DISCOUNT);
    })
});
