import ServiceNames from "../constants/service-names";
import { ServiceType } from "../constants/service-type";

export default class ServicesFilter {
  private _services: Set<ServiceType> = new Set<ServiceType>();
  private get services(){
    return Array.from(this._services);
  }
  private set services(value){
    this._services = new Set(value);
  }

  private constructor(serviceTypes: ServiceType[]) {
    this.services = serviceTypes;    
  }

  public static create(serviceTypes:ServiceType[]){
    return new ServicesFilter(serviceTypes);
  }

  public handle(): ServiceType[]{
    return this.handleInternal();
  }

  public addService(serviceType: ServiceType){   
    this._services.add(serviceType);
    this.handleInternal();
    return this.services;
  }

  public removeService(serviceType: ServiceType){
    this.removeServiceInternal(serviceType);
    this.handleInternal();
    return this.services;
  }

  private handleInternal(): ServiceType[] {  
    const isVideo = this.services.some(s => s === ServiceNames.VIDEO_RECORDING);
    const isPhotography = this.services.some(s => s === ServiceNames.PHOTOGRAPHY);

    if (!isVideo) {
      this.removeServiceInternal(ServiceNames.BLURAY_PACKAGE);
    }

    if (!isVideo && !isPhotography) {
      this.removeServiceInternal(ServiceNames.TWO_DAY_EVENT);
    }

    return this.services;
  } 

  private removeServiceInternal(serviceType: ServiceType) {
    this.services = this.services.filter(s => s !== serviceType);
  }
}

