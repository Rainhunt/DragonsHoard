import './combat-stats.scss'
import React from "react"
import { useData } from "../../../context/DataProvider"
import { MonsterFullStatblock } from "../../../services/responseValidators/monsters/getMonster"
import ToolTip from '../../../components/ToolTip/ToolTip'

const CombatStats: React.FC = () => {
    const { data } = useData<MonsterFullStatblock>();

    return (
        <div className="combat-stats-wrapper">
            {data && data.damageTypes.resistances.length > 0 &&
                <div>
                    <span className="stat-title">Damage Resistances</span>
                    <span className="stat-details">{data.damageTypes.resistances.map((resistance, index) => (
                        <>
                            <ToolTip tooltip={resistance.source} left>{resistance.value}</ToolTip>
                            {index < data.damageTypes.resistances.length - 1 && ", "}
                        </>
                    ))}</span>
                </div>}
            {data && data.damageTypes.immunities.length > 0 &&
                <div>
                    <span className="stat-title">Damage Immunities</span>
                    <span className="stat-details">{data.damageTypes.immunities.map((immunity, index) => (
                        <>
                            <ToolTip tooltip={immunity.source} left>{immunity.value}</ToolTip>
                            {index < data.damageTypes.immunities.length - 1 && ", "}
                        </>
                    ))}</span>
                </div>}
            {data && data.damageTypes.vulnerabilities.length > 0 &&
                <div>
                    <span className="stat-title">Damage Vulnerabilities</span>
                    <span className="stat-details">{data.damageTypes.vulnerabilities.map((vulnerability, index) => (
                        <>
                            <ToolTip tooltip={vulnerability.source} left>{vulnerability.value}</ToolTip>
                            {index < data.damageTypes.vulnerabilities.length - 1 && ", "}
                        </>
                    ))}</span>
                </div>}
        </div>
    )
}

export default CombatStats;