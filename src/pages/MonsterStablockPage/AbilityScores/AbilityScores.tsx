import './ability-scores.scss';
import { useCallback } from "react";
import { useData } from "../../../context/DataProvider";
import { MonsterFullStatblock } from "../../../services/responseValidators/monsters/getMonster";

export default function AbilityScores() {
    const { data } = useData<MonsterFullStatblock>();

    const getModifier = useCallback((stat: number) => {
        const value = Math.floor((stat - 10) / 2);
        return value < 0 ? value : `+${value}`
    }, []);

    return (
        <div className="ability-scores-wrapper">
            {data && <>
                <div className="ability-scores-column">
                    <div className="score-title">
                        STR
                    </div>
                    <div className="score-value">
                        {`${data?.abilityScores.STR.value} (${getModifier(data?.abilityScores.STR.value)})`}
                    </div>
                </div>
                <div className="ability-scores-column">
                    <div className="score-title">
                        DEX
                    </div>
                    <div className="score-value">
                        {`${data?.abilityScores.DEX.value} (${getModifier(data?.abilityScores.DEX.value)})`}
                    </div>
                </div>
                <div className="ability-scores-column">
                    <div className="score-title">
                        CON
                    </div>
                    <div className="score-value">
                        {`${data?.abilityScores.CON.value} (${getModifier(data?.abilityScores.CON.value)})`}
                    </div>
                </div>
                <div className="ability-scores-column">
                    <div className="score-title">
                        INT
                    </div>
                    <div className="score-value">
                        {`${data?.abilityScores.INT.value} (${getModifier(data?.abilityScores.INT.value)})`}
                    </div>
                </div>
                <div className="ability-scores-column">
                    <div className="score-title">
                        WIS
                    </div>
                    <div className="score-value">
                        {`${data?.abilityScores.WIS.value} (${getModifier(data?.abilityScores.WIS.value)})`}
                    </div>
                </div>
                <div className="ability-scores-column">
                    <div className="score-title">
                        CHA
                    </div>
                    <div className="score-value">
                        {`${data?.abilityScores.CHA.value} (${getModifier(data?.abilityScores.CHA.value)})`}
                    </div>
                </div>
            </>}
        </div>
    )
}
