import { Monster } from '../../../services/responseValidators/monsters/getMonsters'
import Scroll from '../../Scroll/Scroll'
import './statblock-classic.scss'

type StatblockClassicProps = {
    creature: Monster
}

const StatblockClassic = ({ creature }: StatblockClassicProps) => {
    return (
        <Scroll width={"100%"} className="statblock-classic">
            Hello World
        </Scroll>
    )
}

export default StatblockClassic;