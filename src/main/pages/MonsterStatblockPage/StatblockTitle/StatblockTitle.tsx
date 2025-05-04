import { MonsterSchema } from '../../../services/requests/monsters/getMonster/responseValidator';
import './statblock-title.scss';

type StatblockTitleProps = {
    monster: MonsterSchema | undefined;
}

export default function StatblockTitle({ monster }: StatblockTitleProps) {
    return (
        <>
            <h2 className="statblock-name">{monster?.name}</h2>
            <h3 className="statblock-subheader">{`${monster?.size} ${monster?.type}, ${monster?.alignment}`}</h3>
        </>
    )
}