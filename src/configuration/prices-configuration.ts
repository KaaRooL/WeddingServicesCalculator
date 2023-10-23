import DiscountNames from "../constants/discount-names";
import ServiceNames from "../constants/service-names";
import { ServiceYear } from "../constants/service-year";
import IDiscountRule from "../models/discount-rule";
import { WeddingSession2022DiscountRule } from "../calculation/discount-rules/wedding-session-20220-discount-rule";
import { WeddingSessionDiscountRule } from "../calculation/discount-rules/wedding-session-discounr-rule";
import { PhotoVideoDiscountRule } from "../calculation/discount-rules/photo-video-discount-rule";
import Discount from "../models/discount";
import Price from "../models/price";

export default class CalculationConfiguration {
    public static discounts: Record<ServiceYear, Discount[]> = {
        2020: [
            { discountType: DiscountNames.PHOTO_PLUS_VIDEO_DISCOUNT, value: 1200 },
            { discountType: DiscountNames.WEDDING_SESSION_DISCOUNT, value: 300 },
        ],
        2021: [
            { discountType: DiscountNames.PHOTO_PLUS_VIDEO_DISCOUNT, value: 1300 },
            { discountType: DiscountNames.WEDDING_SESSION_DISCOUNT, value: 300 },
        ],
        2022: [
            { discountType: DiscountNames.PHOTO_PLUS_VIDEO_DISCOUNT, value: 1300 },
            { discountType: DiscountNames.WEDDING_SESSION_DISCOUNT, value: 300 },
            { discountType: DiscountNames.SPECIAL_WEDDING_SESSION_DISCOUNT, value: 600 },
        ],
    };

    public static prices: Record<ServiceYear, Price[]> = {
        2020: [
            { serviceType: ServiceNames.PHOTOGRAPHY, value: 1700 },
            { serviceType: ServiceNames.VIDEO_RECORDING, value: 1700 },
            { serviceType: ServiceNames.BLURAY_PACKAGE, value: 300 },
            { serviceType: ServiceNames.TWO_DAY_EVENT, value: 400 },
            { serviceType: ServiceNames.WEDDING_SESSION, value: 600 },
        ],
        2021: [
            { serviceType: ServiceNames.PHOTOGRAPHY, value: 1800 },
            { serviceType: ServiceNames.VIDEO_RECORDING, value: 1800 },
            { serviceType: ServiceNames.BLURAY_PACKAGE, value: 300 },
            { serviceType: ServiceNames.TWO_DAY_EVENT, value: 400 },
            { serviceType: ServiceNames.WEDDING_SESSION, value: 600 },
        ],
        2022: [
            { serviceType: ServiceNames.PHOTOGRAPHY, value: 1900 },
            { serviceType: ServiceNames.VIDEO_RECORDING, value: 1900 },
            { serviceType: ServiceNames.BLURAY_PACKAGE, value: 300 },
            { serviceType: ServiceNames.TWO_DAY_EVENT, value: 400 },
            { serviceType: ServiceNames.WEDDING_SESSION, value: 600 },
        ],
    };

    public static discountRules: IDiscountRule[] = [
        new PhotoVideoDiscountRule(),
        new WeddingSessionDiscountRule(),
        new WeddingSession2022DiscountRule()]
}
