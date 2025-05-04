import retryWithBackoff from "../../../../../utils/retryWithBackoff";
import { Request } from "../../Request";
import { getMonsterResponseSchema } from "./responseValidator";

export default async function getMonster(id: string) {
    try {
        const request = new Request(`monsters/${id}`);
        const response = await retryWithBackoff(request.get.bind(request));
        return getMonsterResponseSchema.parse(response);
    } catch (err) {
        console.log(`Error getting monsters: ${err}`);
    }
}