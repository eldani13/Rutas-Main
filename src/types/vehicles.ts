export interface MessageVehicle {
    _id: string
    marca: string
    modelo: number
    lastOilChange: string
    nextOilChange: string
    __v: number
}

export interface RootVehicle {
    message: MessageVehicle[]
    details: boolean
}
