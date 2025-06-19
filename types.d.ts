import { Connection } from "mongoose"

declare global {
    var global:{
        connection: Connection | null,
        promise: Promise<Connection> | null,
    }
}

export {}