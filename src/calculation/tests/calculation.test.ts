import Calculation from "../calculation";
import { ServiceType } from "../../constants/service-type";
import { ServiceYear } from "../../constants/service-year";

describe("different service types", () => {
  test("should set unique services", () => {
    const calculation = Calculation.create(2020, ["VideoRecording", "Photography", "WeddingSession", "BlurayPackage", "TwoDayEvent", "WeddingSession"]);
    expect(calculation.services.length).toBe(5);
  }),
    test("should set empty array", () => {
      const calculation = Calculation.create(2020, ["BlurayPackage", "TwoDayEvent"]);
      expect(calculation.services.length).toBe(0);
    })
});



describe.each([
  [2020, ["VideoRecording", "Photography"], 2200, 3400],
  [2021, ["VideoRecording", "Photography", "WeddingSession", "BlurayPackage", "TwoDayEvent"], 3600, 4900],
  [2022, [],0,0],

])('Calculation correct data', (year: ServiceYear, services: ServiceType[], reducedPrice: number, fullPrice: number) => {
  let calculation: Calculation;

  beforeEach(() => {
    calculation = Calculation.create(year, services);
  });

  it('should create an instance of Calculation', () => {
    expect(calculation).toBeInstanceOf(Calculation);
  });

  it('should set year correctly', () => {
    expect(calculation.year).toBe(year);
  });

  it('should set services correctly', () => {
    const serviceTypes = calculation.services.map(s => s.serviceType);
    expect(serviceTypes).toEqual(expect.arrayContaining(services));
  });

  it('should set full price correctly', () => {
    calculation.calculate()
    expect(calculation.fullPrice).toBe(fullPrice);
  });

  it('should calculate the reduced price correctly', () => {
    calculation.calculate()
    expect(calculation.reducedPrice).toBe(reducedPrice);
  }); 
});
