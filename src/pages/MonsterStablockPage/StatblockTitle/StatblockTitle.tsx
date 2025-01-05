import './statblock-title.scss'
import React from "react"
import { useData } from "../../../context/DataProvider"
import { MonsterFullStatblock } from "../../../services/responseValidators/getMonster"

const StatblockTitle: React.FC = () => {
    const { data } = useData<MonsterFullStatblock>();

    return (
        <>
            <h1 className="statblock-name">{data?.name}</h1>
            <h2 className="statblock-subheader">{`${data?.size} ${data?.type}, ${data?.alignment}`}</h2>
        </>
    )
}

export default StatblockTitle;