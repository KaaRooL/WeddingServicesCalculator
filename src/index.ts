import Calculation from "./calculation/calculation";
import { ServiceType } from "./constants/service-type";
import { ServiceYear } from "./constants/service-year";
import ServicesFilter from "./calculation/services-filter";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
    const servicesFilter = ServicesFilter.create(previouslySelectedServices);

    switch (action.type) {
        case "Select":
            return servicesFilter.addService(action.service);            
        case "Deselect":
            return servicesFilter.removeService(action.service);
        default:
            return previouslySelectedServices;
    };
}

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => {
    const calculation = Calculation.create(selectedYear, selectedServices);
    calculation.calculate();
    return ({ basePrice: calculation.fullPrice, finalPrice: calculation.reducedPrice });
};


