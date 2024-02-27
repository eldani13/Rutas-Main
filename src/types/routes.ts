export interface RootRoute {
    message: MessageRoute[]
    details: boolean
}

export interface MessageRoute {
    _id: string
    empleado: string
    vehicle: string
    start: number[]
    end: number[]
    status: boolean
    amountOfMerchandise: number
    LastMinuteSale: string
    __v: number
}
