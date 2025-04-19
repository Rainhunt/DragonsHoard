import { Request } from "../../Request";
import { getMonsterResponseSchema } from "./responseValidator";

export default async function getMonster(id: string) {
    try {
        const response = await new Request(`monsters/${id}`).get();
        return getMonsterResponseSchema.parse(response);
    } catch (err) {
        console.log(`Error getting monsters: ${err}`);
    }
}