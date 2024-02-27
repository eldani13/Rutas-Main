export interface MessageEmployees {
    _id: string
    user: string
    username: string
    lastnames: string
    role: string
    password: string
    __v: number
}

export interface RootEmployees {
    message: MessageEmployees[]
    details: boolean
}
