import { MessageStores, RootStores } from "@/types/stores";
import { processEnv } from "./cookies";
import { getAllFetchDataValues } from "./api";

export class GetDatas {
  stores?: MessageStores[];

  constructor() {}

  async getAllStores(): Promise<MessageStores[] | null> {
    try {
      const allStores = await getAllFetchDataValues(
        `${processEnv.back}tiendas`
      );
      
      // if (!allStores.ok) {
      //   throw new Error("Error");
      // }
      
      this.stores = allStores.message;
      return allStores.message || null;
    } catch (error) {
      console.error("Error en este lol: ",error);
      return null;
    }
  }
}
