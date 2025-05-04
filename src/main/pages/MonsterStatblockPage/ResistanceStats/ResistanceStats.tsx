import { MonsterSchema } from '../../../services/requests/monsters/getMonster/responseValidator';

type ResistanceStatsProps = {
    monster: MonsterSchema | undefined;
}

export default function ResistanceStats({ monster }: ResistanceStatsProps) {
    return (
        <>
            {monster?.proficiencies.savingThrows.length !== 0 && <>
                {/* <span className="stat-title">Saving Throws</span>{monster?.proficiencies.savingThrows.map(savingThrow => )} */}
            </>}
        </>
    )
}