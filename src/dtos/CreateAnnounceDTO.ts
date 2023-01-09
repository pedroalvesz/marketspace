export type CreateAnnounceDTO = {
  data: {
    title : string,
    description : string,
    productUsage : string,
    price : string,
    isTradable : boolean,
    paymentMethods : string[],
  }
}