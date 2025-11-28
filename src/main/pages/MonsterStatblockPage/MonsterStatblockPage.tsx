import './monster-statblock-page.scss';
import { useEffect, useState } from "react";
import Scroll from "../../components/Scroll/Scroll";
import { useParams } from "react-router-dom";
import getMonster from "../../services/requests/monsters/getMonster/getMonster";
import LineBreak from "../../components/LineBreak/LineBreak";
import StatblockTitle from './StatblockTitle/StatblockTitle';
import { MonsterSchema } from '../../services/requests/monsters/getMonster/responseValidator';
import CombatStats from './CombatStats/CombatStats';
import { useLayout } from '../../layout/Layout';
import AbilityScores from './AbilityScores/AbilityScores';
import ResistanceStats from './ResistanceStats/ResistanceStats';

export default function MonsterStatblockPage() {
    const { id } = useParams();
    const [monster, setMonster] = useState<MonsterSchema>();
    const { page } = useLayout();
    useEffect(() => {
        async function fetch(id: string) {
            const monster = await getMonster(id);
            if (monster) setMonster(monster)
        }
        page.reset();
        page.alignPageContent = "center";
        page.backgroundImage = `url(${import.meta.env.BASE_URL}background-placeholder.png)`;
        if (id) fetch(id);
    }, []);

    return (
        <Scroll className="monster-statblock">
            <div className="first-column">
                <StatblockTitle monster={monster} />
                <LineBreak taper="right" fade="right" margin="0.5rem 0" />
                <CombatStats monster={monster} />
                <LineBreak taper="right" fade="right" margin="0.5rem 0" />
                <AbilityScores monster={monster} />
                <LineBreak taper="right" fade="right" margin="0.5rem 0" />
                <ResistanceStats monster={monster} />
            </div>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem sit eum corrupti inventore tempora suscipit, veritatis maiores ipsum totam culpa corporis officia dolorum, magnam labore eius minima. Hic deserunt nam accusantium ea sint natus architecto, laboriosam veritatis error voluptatem repellendus perspiciatis! Accusamus deserunt aliquid ipsum, velit officia impedit, eum repellendus eveniet alias facilis facere rem eos similique at dolorum quaerat ad odio enim beatae voluptas provident quam! Quaerat provident, fugiat deleniti obcaecati ut possimus quo unde enim eveniet explicabo culpa quidem fugit excepturi magni. Inventore, consectetur ipsum? Cumque dolores ut voluptas unde rerum accusantium atque ipsa eaque officiis. Accusantium necessitatibus temporibus ratione perspiciatis deleniti voluptatem hic doloremque? Harum autem error odit adipisci. Similique commodi maiores alias excepturi consequuntur illum impedit. Facilis ipsa aut, corrupti velit omnis commodi deserunt tempora reprehenderit iste distinctio dolor quis dolorem sequi qui numquam! Debitis voluptatem sequi in explicabo numquam, ipsa ullam dolor laboriosam, voluptatum, architecto pariatur perspiciatis. Deserunt tempore est incidunt error, ea officiis cumque vitae molestias autem optio! Sit, quae, non nemo dolore veniam necessitatibus facilis minus asperiores aspernatur optio ad a voluptates rerum, numquam magnam praesentium ea nulla odio natus! Fuga, voluptatem. Saepe reprehenderit quas animi architecto iure voluptas atque labore id velit.
            </div>
        </Scroll>
    )
}