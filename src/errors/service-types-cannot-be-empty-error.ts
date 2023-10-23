export default class ServiceTypesCannotBeEmptyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServiceTypesCannotBeEmptyError";
  }
}






