import './key-stats.scss'
import React from "react"
import { useData } from "../../../context/DataProvider"
import { MonsterFullStatblock } from "../../../services/responseValidators/monsters/getMonster"
import ToolTip from '../../../components/ToolTip/ToolTip'

const KeyStats: React.FC = () => {
    const { data: monster } = useData<MonsterFullStatblock>();

    return (
        <div className="key-stats-wrapper">
            {monster &&
                <>
                    <div>
                        <span className="stat-title">Armor Class</span>
                        <span className="stat-details">
                            <ToolTip tooltip={
                                `${monster.armorClass.base.map(value => `${value.value} (${value.source})`).join(" + ")}
                                ${monster.armorClass.modifiers.length > 0 ? " + " : ""}
                                ${monster.armorClass.modifiers.map(value => `${value.value} (${value.source})`).join(", ")}`
                            } left>{monster.armorClass.value}</ToolTip>
                        </span>
                    </div>
                    <div>
                        <span className="stat-title">Hit Points</span>
                        <span className="stat-details">{`${monster.hitPoints.max} (${monster.hitPoints.sources[0].source})`}</span>
                    </div>
                    <div>
                        <span className="stat-title">Speed</span>
                        <span className="stat-details">{
                            <>
                                <ToolTip tooltip={
                                    `${monster.speed.find(speed => speed.type === "walk")?.base.map(value => `${value.value} (${value.source})`).join(" + ")}
                                    ${monster.speed.find(speed => speed.type === "walk")?.base.length !== 0 ? "" : " + "}
                                    ${monster.speed.find(speed => speed.type === "walk")?.modifiers.map(value => `${value.value} (${value.source})`).join(", ")}`
                                } left>
                                    {`${monster.speed.find(speed => speed.type === "walk")?.value}ft.`}
                                </ToolTip>
                                {monster.speed.filter(speed => speed.type !== "walk").map(speed => (
                                    <>
                                        {", "}
                                        <ToolTip tooltip={
                                            `${speed.base.map(value => `${value.value} (${value.source})`).join(" + ")}
                                            ${speed.base.length !== 0 ? "" : " + "}
                                            ${speed.modifiers.map(value => `${value.value} (${value.source})`).join(", ")}`
                                        } left>
                                            {speed.type} {speed.value}ft.
                                        </ToolTip>
                                    </>
                                ))}
                            </>
                        }</span>
                    </div>
                </>
            }
        </div>
    )
}

export default KeyStats;