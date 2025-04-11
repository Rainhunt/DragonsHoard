import { Request } from "../../Request";
import { monstersSchema } from "./responseValidator";

export default async function getMonsters() {
    try {
        const response = await new Request("monsters").get();
        return monstersSchema.parse(response);
    } catch (err) {
        console.log(`Error getting monsters: ${err}`);
    }
}