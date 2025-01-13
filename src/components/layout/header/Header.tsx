import './header.scss';
import LeftNav from './LeftNav/LeftNav';
import RightNav from './RightNav/RightNav';

export default function Header() {
    return (
        <nav>
            <LeftNav />
            <RightNav />
        </nav>
    )
}
