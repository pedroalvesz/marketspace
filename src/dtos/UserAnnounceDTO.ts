export type UserAnnounceDTO = {
  id: string,
  name: string,
  description: string,
  is_new: boolean,
  price: number,
  accept_trade: boolean,
  user_id: string,
  is_active: boolean,
  product_images: [
    {
      path: string,
      id: string,
    },
    {
      path: string,
      id: string,
    },
    {
      path: string,
      id: string,
    }
  ],
  payment_methods: [
    {
      key: string,
      name: string,
    },
    {
      key: string,
      name: string,
    },
    {
      key: string,
      name: string,
    }
  ]
}