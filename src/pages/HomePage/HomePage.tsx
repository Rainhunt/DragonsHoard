import './home-page.scss';
import styles from '../../styles/index.module.scss';
import { useEffect } from 'react';
import { useLayout } from '../../context/LayoutProvider';
import Scroll from '../../components/Scroll/Scroll';
import useBreakpoint from '../../hooks/useBreakpoints';
import LineBreak from '../../components/LineBreak/LineBreak';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routerModel';

const HomePage: React.FC = () => {
    const { setPagePerms, setBackgroundImage, setMainMarginPx } = useLayout();
    const navigate = useNavigate();

    const breakpoint = useBreakpoint();
    useEffect(() => {
        setPagePerms("all");
        setBackgroundImage("/background-placeholder.png");
        setMainMarginPx({
            desktop: "15%",
            tablet: "10%",
            phone: "7%"
        });
    }, []);

    return (
        <div className="home-page">
            <Scroll classNames={{ container: "header-scroll" }} width="100%" padding={
                breakpoint === "desktop" ? "20px 50px 30px" : "10px 25px 15px"}>
                <h1 className="home-header">Dragon's Hoard</h1>
                <h2 className="home-subheader">The complete D&D toolbox</h2>
                <LineBreak height="1px" margin="20px 0" color={styles.textLabel} />
                <p>
                    Welcome to Dragon's Hoard, your ultimate D&D toolbox, designed to streamline your gameplay and enhance your adventures. With powerful tools, a growing collection of SRD content, and a customizable experience, Dragon's Hoard is your all-in-one hub for creating, managing, and exploring your Dungeons & Dragons world.
                </p>
                <LineBreak height="1px" margin="20px 0" color={styles.textLabel} />
                <div className="links-container">
                    <Scroll width="100%" padding={breakpoint !== "phone" ? "20px" : "10px"}>
                        <h3>Codex</h3>
                        <p>
                            Find any resource in the 5e SRD! The most powerful tool for finding the monsters and rules you need.
                        </p>
                        <Button text="Codex" onClick={() => navigate(ROUTES.CODEX)} />
                    </Scroll>
                    <Scroll width="100%">
                        <h3>Play a Game</h3>
                        <p>
                            Use our VTT to easily create and run your games, using our intuitive, powerful UI.
                        </p>
                        <Button text="Games" />
                    </Scroll>
                </div>
            </Scroll>
            <Scroll classNames={{ container: "coming-soon" }} width="100%" padding={
                breakpoint === "desktop" ? "20px 50px 30px" : "10px 25px 15px"}>
                <h2>Coming Soon</h2>
                <p>
                    Exciting things are on the way for Dragon's Hoard! We're working hard to bring you the ultimate D&D toolbox, and here's a sneak peek at what's coming soon:
                </p>
                <ul>
                    <li>
                        <span>VTT (Virtual Tabletop)</span> - Our VTT is under development and will soon provide a seamless, interactive experience for your campaigns.
                    </li>
                    <li>
                        <span>Full SRD Access</span> - Currently featuring monsters, we'll soon expand to include the full SRD for spells, items, races, classes, and more!
                    </li>
                    <li>
                        <span>Customizable Site Themes</span> - Personalize your Dragon's Hoard experience with new themes to match your playstyle and preferences.
                    </li>
                </ul>
                <p> Stay tuned as we continue to build the ultimate companion for your adventures! </p>
            </Scroll>
        </div>
    )
}

export default HomePage;