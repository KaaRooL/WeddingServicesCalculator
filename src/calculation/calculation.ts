import PricesConfiguration from "../configuration/prices-configuration";
import ServiceNames from "../constants/service-names";
import { ServiceType } from "../constants/service-type";
import { ServiceYear } from "../constants/service-year";
import Discount from "../models/discount";
import Price from "../models/price";
import Service from "../models/service";
import DiscountRulesManager from "./discount-manager";
import ServicesFilter   from "./services-filter";

export default class Calculation {    
    private _services: Set<Service> = new Set();;
    private readonly _year: ServiceYear;
    private readonly _priceConfig: Price[];
    private readonly _discountConfig: Discount[];
    private readonly _discountManager: DiscountRulesManager;
    private _fullPrice: number;
    private _reducedPrice: number;
    private _discount: Discount;

    public get reducedPrice(): number {
        return this._reducedPrice;
    }

    public get fullPrice(): number {
        return this._fullPrice;
    }

    public get services(): Service[] {
        return Array.from(this._services);
    }

    public get year(): ServiceYear {
        return this._year;
    }

    public get isVideo(): boolean {
        return this.services.some(s => s.serviceType === ServiceNames.VIDEO_RECORDING);
    }

    public get isPhotography(): boolean {
        return this.services.some(s => s.serviceType === ServiceNames.PHOTOGRAPHY);
    }

    public get isWeddingSession(): boolean {
        return this.services.some(s => s.serviceType === ServiceNames.WEDDING_SESSION);
    }

    public get discountConfig(): Discount[] {
        return this._discountConfig;
    }

    private constructor(year: ServiceYear, serviceTypes: ServiceType[]) {
        this._year = year;
        this._priceConfig = PricesConfiguration.prices[this._year];
        this._discountConfig = PricesConfiguration.discount[this._year];
        this._discountManager = DiscountRulesManager.createWithRules(PricesConfiguration.discountRules);
        this.addServices(serviceTypes);
    }

    public static create(year: ServiceYear, serviceTypes: ServiceType[]) {      
        return new Calculation(year, serviceTypes);
    }

    public calculate() {
        this.calculateDiscounts();
        this._fullPrice = this.services.map(s => s.price).reduce((acc, val) => acc + val, 0);
        this._reducedPrice = this.fullPrice - (this._discount?.value ?? 0);
    }
   
    private addServices(serviceTypes: ServiceType[]) {
        const redundantServicesRemover = ServicesFilter.create(serviceTypes);
        const servicesToAdd = redundantServicesRemover.handle(); 
        servicesToAdd.forEach(st => this.addService(st));
        return this;
    }    

    private calculateDiscounts() {
        this._discount = this._discountManager.calculateHighestDiscount(this);
    }

    private addService(serviceType: ServiceType) {
        const price = this._priceConfig.filter(p => p.serviceType === serviceType)[0].value;            
        this.addSerivceInternal({ serviceType, price });
    }

    private addSerivceInternal(service: Service) {
        this._services.add(service);
    }
}


