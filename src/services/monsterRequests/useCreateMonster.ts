import { useCallback } from "react";
import { Request } from "../requests";
import { useUser } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routerModel";
import { CreateMonsterRequest } from "../requestValidators/createMonster";
import { monsterFullStatblockSchema } from "../responseValidators/monsters/getMonster";

export default function useCreateMonster() {
    const { jwt } = useUser();
    const navigate = useNavigate();

    return useCallback(async (monsterData: CreateMonsterRequest) => {
        try {
            if (jwt) {
                const request = new Request(`monsters`);
                request.Body = monsterData;
                request.Headers = { ["x-auth-token"]: jwt }
                const response = await request.post();
                const validatedMonster = monsterFullStatblockSchema.parse(response);
                navigate(`${ROUTES.MONSTER_STATBLOCK}/${validatedMonster._id}`);
            }
        } catch (err) {
            return `Error creating monster: ${err}`;
        }
    }, [jwt]);
}