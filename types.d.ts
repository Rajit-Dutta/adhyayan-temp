import { Connection } from "mongoose";

declare global {
  var connection: Connection | null;
  var promise: Promise<Connection> | null;
}

declare module "*.css";

export {};
