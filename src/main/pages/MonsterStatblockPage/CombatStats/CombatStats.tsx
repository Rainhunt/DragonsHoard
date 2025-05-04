import Tooltip from '../../../components/Tooltip/Tooltip';
import { MonsterSchema } from '../../../services/requests/monsters/getMonster/responseValidator';

type CombatStatsProps = {
    monster: MonsterSchema | undefined;
}

export default function CombatStats({ monster }: CombatStatsProps) {
    return (
        <>
            <Tooltip className="initial-stat" tooltip={`${monster?.armorClass.base.map(mod => `${mod.value} (${mod.source})`).join(" + ")}
            ${monster?.armorClass.modifiers.length === 0 ? "" : "+"}
            ${monster?.armorClass.modifiers.map(mod => `${mod.value} (${mod.source})`).join("+")}`}>
                <span className="stat-title">Armor Class</span>{monster?.armorClass.value}
            </Tooltip>
            <div className="stat-wrapper">
                <span className="stat-title">Hit Points</span>{monster?.hitPoints.max} ({monster?.hitPoints.sources[0].source})
            </div>
            <Tooltip className="inline-stat" tooltip={`${monster?.speed.find(speed => speed.type === "walk")?.base.map(mod => `${mod.value} (${mod.source})`).join(" + ")}
            ${monster?.speed.find(speed => speed.type === "walk")?.modifiers.length === 0 ? "" : " + "}
            ${monster?.speed.find(speed => speed.type === "walk")?.modifiers.map(mod => `${mod.value} (${mod.source})`).join(", ")}`}>
                <span className="stat-title">Speed</span>{monster?.speed.find(speed => speed.type === "walk")?.value}ft.
                {monster?.speed.some(speed => speed.type !== "walk") && ","}
            </Tooltip>
            {monster?.speed.filter(speed => speed.type !== "walk").map((speed, index, arr) =>
                <Tooltip key={speed.type} className="inline-stat" tooltip={`${speed.base.map(mod => `${mod.value} (${mod.source})`).join(" + ")}
                ${speed.modifiers.length === 0 ? "" : " + "}
                ${speed.modifiers.map(mod => `${mod.value} (${mod.source})`).join(", ")}`}>
                    {speed.type} {speed.value}ft.
                    {index + 1 < arr.length && ","}
                </Tooltip>
            )}
        </>
    )
}