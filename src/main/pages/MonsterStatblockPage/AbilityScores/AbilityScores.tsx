import './ability-scores.scss';
import { useCallback } from 'react';
import { MonsterSchema } from '../../../services/requests/monsters/getMonster/responseValidator';

type AbilityScoresProps = {
    monster: MonsterSchema | undefined;
}

export default function AbilityScores({ monster }: AbilityScoresProps) {
    const getModifier = useCallback((abilityScore: number) => {
        const value = Math.floor((abilityScore - 10) / 2);
        return value < 0 ? value : `+${value}`
    }, []);
    return monster ? (
        <div className="ability-scores-wrapper">
            <div className="ability-scores-column">
                <h3>STR</h3>
                {monster.abilityScores.STR.value} ({getModifier(monster.abilityScores.STR.value)})
            </div>
            <div className="ability-scores-column">
                <h3>DEX</h3>
                {monster.abilityScores.DEX.value} ({getModifier(monster.abilityScores.DEX.value)})
            </div>
            <div className="ability-scores-column">
                <h3>CON</h3>
                {monster.abilityScores.CON.value} ({getModifier(monster.abilityScores.CON.value)})
            </div>
            <div className="ability-scores-column">
                <h3>INT</h3>
                {monster.abilityScores.INT.value} ({getModifier(monster.abilityScores.INT.value)})
            </div>
            <div className="ability-scores-column">
                <h3>WIS</h3>
                {monster.abilityScores.WIS.value} ({getModifier(monster.abilityScores.WIS.value)})
            </div>
            <div className="ability-scores-column">
                <h3>CHA</h3>
                {monster.abilityScores.CHA.value} ({getModifier(monster.abilityScores.CHA.value)})
            </div>
        </div>
    ) : <div>AS Loading Component</div>
}