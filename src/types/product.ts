export interface RootProduct {
    message: boolean
    details: MessageProduct[]
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
    _idInRequest: number,
    __v: number
}
