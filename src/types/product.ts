export interface RootProduct {
    message: MessageProduct[]
    details: boolean
}

export interface MessageProduct {
    _id: string
    productName: string
    productDescription: string
    productPrice: number
    productIsSold: boolean,
    productIdScan: number,
    amount: number,
    amountCurrent: number,
    __v: number
}
