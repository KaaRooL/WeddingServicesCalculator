import { ServiceType } from "../constants/service-type";


export default interface Service {

    serviceType: ServiceType;
    price: number;
}
