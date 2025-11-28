import './home-page.scss';
import { useEffect } from "react";
import { useLayout } from "../../layout/Layout";
import Scroll from "../../components/Scroll/Scroll";
import LineBreak from "../../components/LineBreak/LineBreak";
import Button from "../../components/Button/Button";

export default function HomePage() {
    const { page } = useLayout();
    useEffect(() => {
        page.reset();
        page.backgroundImage = `url(${import.meta.env.BASE_URL}background-placeholder.png)`;
        page.alignPageContent = "center";
    }, []);

    return (
        <div className="home-page">
            <Scroll className="main">
                <h1>Dragon's Hoard</h1>
                <h2>The Complete D&D Toolbox</h2>
                <LineBreak height="1px" margin="1rem" />
                <p>
                    Welcome to Dragon's Hoard, your ultimate D&D toolbox, designed to streamline your gameplay and enhance your adventures. With powerful tools, a growing collection of SRD content, and a customizable experience, Dragon's Hoard is your all-in-one hub for creating, managing, and exploring your Dungeons & Dragons world.
                </p>
                <LineBreak height="1px" margin="1rem" />
                <div className="links">
                    <Scroll>
                        <h3>Play a Game</h3>
                        <p>
                            Use our VTT to easily create and run your games, with our intuitive, powerful UI.
                        </p>
                        <Button text="My Games" />
                    </Scroll>
                    <Scroll>
                        <h3>Codex</h3>
                        <p>
                            Find any resource in the 5e SRD! The most powerful tool for finding and referencing the rules you need!
                        </p>
                        <Button text="Monsters" />
                    </Scroll>
                </div>
            </Scroll>
            <Scroll className="coming-soon">
                <h3>Coming Soon</h3>
                <p>
                    Exciting things are on the way for Dragon's Hoard! We're working hard to bring you the ultimate D&D toolbox, and here's a sneak peek at what's coming soon:
                </p>
                <ul>
                    <li>
                        <strong>VTT (Virtual Tabletop)</strong> - Our VTT is under continuous development and will continue to add features that provide a seamless, interactive experience for your campaigns.
                    </li>
                    <li>
                        <strong>Full SRD Access</strong> - Currently featuring monsters, we'll soon expand to include the full SRD for spells, items, races, classes, and more!
                    </li>
                    <li>
                        <strong>Customizable Site Themes</strong> - Personalize your Dragon's Hoard experience with new themes to match your playstyle and preferences.
                    </li>
                </ul>
                Stay tuned as we continue to build the ultimate companion for your adventures!
            </Scroll>
        </div>
    )
}