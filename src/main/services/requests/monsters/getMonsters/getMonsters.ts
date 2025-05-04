import retryWithBackoff from "../../../../../utils/retryWithBackoff";
import { Request } from "../../Request";
import { monstersSchema } from "./responseValidator";

export default async function getMonsters() {
    try {
        const request = new Request("monsters");
        const response = await retryWithBackoff(request.get.bind(request));
        return monstersSchema.parse(response);
    } catch (err) {
        console.log(`Error getting monsters: ${err}`);
    }
}