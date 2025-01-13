import './about-page.scss';
import { useEffect } from "react";
import { useLayout } from "../../context/LayoutProvider";
import Scroll from '../../components/Scroll/Scroll';
import LineBreak from '../../components/LineBreak/LineBreak';
import useBreakpoint from '../../hooks/useBreakpoints';

export default function AboutPage() {
    const { setPagePerms, setBackgroundImage, setMainMarginPx } = useLayout();
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
        <Scroll classNames={{ container: "about-page" }} width="100%" padding={
            breakpoint === "desktop" ? "20px 50px 30px" : "10px 25px 15px"}>
            <h1>Dragon's Hoard</h1>
            <h2>About Us</h2>
            <p>
                We are Dragon's Hoard, the ultimate one-stop app for everything you need to play and enjoy 5th edition D&D. Whether you're a seasoned dungeon master or a new player starting off on your journey, you want to run written modules or you're a writer with grand ideas and grander sandbox adventures, we provide everything you need in a beautifully designed, easy to use package.
            </p>
            <LineBreak height="1px" margin="20px 0" color="#800000" />
            <h3>Your Complete D&D Toolbox</h3>
            <section>
                <p>
                    Dragon's Hoard was created to be simple to understand, but powerful, with every tool you could need offered in an easily accessible fashion. The pillars in our toolbox are:
                </p>
                <span>Comprehensive Encyclopedia</span>
                <p>
                    Access every {/*rule, item, */}monster{/*, spell, class, race, and more*/} available in the 5e SRD, organized and easily searchable.
                </p>
                {/* <span>The VTT</span>
                <p>
                    The VTT is the beating heart of Dragon's Hoard. It is designed to handle the game for you fuss free, easily resolving actions, tracking resources, and reminding you of rules, while giving you the option to take full control and/or modify any outcome when necessary.
                </p> */}
            </section>
            <LineBreak height="1px" margin="20px 0" color="#800000" />
            <h3>User Centered Design</h3>
            <p>
                D&D is meant to be fun, and imaginative. That is the core philosophy that was employed when creating Dragon's Hoard. Our focus is on the user experience and polish. It is meant to provide the perfect balance between simplicity and depth. It is powerful enough to handle all of your needs, while simple enough to not let you get lost in a sea of features. No steep learning curves, no clutter - just the tools you need to enjoy the game.
            </p>
            <LineBreak height="1px" margin="20px 0" color="#800000" />
            <h3>Contact Us</h3>
            <p>
                Have questions, feedback, or suggestions? We'd love to hear from you! Reach out to us anytime via any of our socials linked below.
            </p>
        </Scroll>
    )
}
