import './monster-statblock-page.scss';
import styles from '../../styles/index.module.scss';
import { useCallback, useEffect } from 'react';
import { useLayout } from '../../context/LayoutProvider';
import { Request } from '../../services/requests';
import Scroll from '../../components/Scroll/Scroll';
import { useParams } from 'react-router-dom';
import { MonsterFullStatblock, monsterFullStatblockSchema } from '../../services/responseValidators/monsters/getMonster';
import DataProvider from '../../context/DataProvider';
import StatblockTitle from './StatblockTitle/StatblockTitle';
import LineBreak from '../../components/LineBreak/LineBreak';
import CombatStats from './CombatStats/CombatStats';
import KeyStats from './KeyStats/KeyStats';
import AbilityScores from './AbilityScores/AbilityScores';

export default function MonsterStatblockPage() {
    const { setPagePerms, setBackgroundImage, setMainMarginPx } = useLayout();
    const { id } = useParams();

    useEffect(() => {
        setPagePerms("all");
        setBackgroundImage("/download.jpeg");
        setMainMarginPx({
            desktop: "15%",
            tablet: "10%",
            phone: "7%"
        });
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
            <Scroll classNames={{ container: "monster-statblock" }} width="100%">
                <div className="statblock-column">
                    <StatblockTitle />
                    <LineBreak color={styles.textLabel} taper fade />
                    <KeyStats />
                    <LineBreak color={styles.textLabel} taper fade />
                    <AbilityScores />
                    <LineBreak color={styles.textLabel} taper fade />
                    <CombatStats />

                </div>
                {/* <div className="statblock-column">

                </div> */}
            </Scroll>
        </DataProvider>
    )
}
