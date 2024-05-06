export interface MessageVehicle {
    _id: string
    marca: string
    modelo: number
    lastOilChange: string
    nextOilChange: string
    kilometraje: number,
    __v: number
}

export interface RootVehicle {
    [x: string]: any
    message: MessageVehicle[]
    details: boolean
}
