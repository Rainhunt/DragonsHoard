import './monster-statblock-page.scss'
import React, { useCallback, useEffect } from 'react'
import { useLayout } from '../../context/LayoutProvider'
import { Request } from '../../services/requests'
import Scroll from '../../components/Scroll/Scroll'
import { useParams } from 'react-router-dom'
import { MonsterFullStatblock, monsterFullStatblockSchema } from '../../services/responseValidators/getMonster'
import DataProvider from '../../context/DataProvider'
import StatblockTitle from './StatblockTitle/StatblockTitle'
import LineBreak from '../../components/LineBreak/LineBreak'
import ToolTip from '../../components/ToolTip/ToolTip'
import CombatStats from './CombatStats/CombatStats'
import KeyStats from './KeyStats/KeyStats'

const MonsterStatblockPage: React.FC = () => {
    const { setBackgroundImage, setMainMarginPx } = useLayout();
    const { id } = useParams();

    useEffect(() => {
        if (setBackgroundImage) {
            setBackgroundImage("./download.jpeg");
        }
        if (setMainMarginPx) {
            setMainMarginPx(300);
        }
    }, []);

    const getMonster = useCallback(async (id: string) => {
        try {
            const response = await new Request(`monsters/${id}`).get();
            const validatedMonster = monsterFullStatblockSchema.parse(response);
            return validatedMonster;
        } catch (err) {
            console.log(`Error fetching monsters: ${err}`);
        }
    }, []);

    return (
        <DataProvider<MonsterFullStatblock> fetch={() => {
            return getMonster(id ? id : "");
        }}>
            <Scroll className="monster-statblock" width="100%">
                <div className="statblock-column">
                    <StatblockTitle />
                    <LineBreak color="#800000" taper />
                    <KeyStats />
                    <LineBreak color="#800000" taper />
                    <CombatStats />
                </div>
                <div className="statblock-column">
                    <ToolTip tooltip="TEST 123" right>
                        Hello World
                    </ToolTip>
                </div>
            </Scroll>
        </DataProvider>
    )
}

export default MonsterStatblockPage;