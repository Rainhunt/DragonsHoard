import './delete-monster-button.scss';
import Button from "../../../components/Button/Button";
import { useData } from "../../../context/DataProvider";
import { useUser } from "../../../context/UserProvider";
import { MonsterFullStatblock } from "../../../services/responseValidators/monsters/getMonster";
import { useCallback } from 'react';
import { Request } from '../../../services/requests';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routerModel';

export default function DeleteMonsterButton() {
    const { jwt, user } = useUser();
    const { data } = useData<MonsterFullStatblock>();
    const navigate = useNavigate();

    const deleteMonster = useCallback(async (id: string) => {
        try {
            if (jwt) {
                const request = new Request(`monsters/${id}`);
                request.Headers = { ["x-auth-token"]: jwt }
                await request.delete();
                navigate(ROUTES.MY_MONSTERS);
            }
        } catch (err) {
            console.log(`Error fetching monsters: ${err}`);
        }
    }, [jwt]);

    return (
        <>
            {user && data && (user?._id === data?.createdBy || user.isAdmin) && <Button className="delete-monster-button" text="Delete" onClick={() => deleteMonster(data?._id)
            } />}
        </>
    )
}
