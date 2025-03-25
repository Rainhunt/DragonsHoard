import { useEffect } from "react";
import Button from "../../components/Button/Button";
import DropDown from "../../components/DropDown/DropDown";
import Input from "../../components/Input/Input";
import LineBreak from "../../components/LineBreak/LineBreak";
import Scroll from "../../components/Scroll/Scroll";
import ScrollingContainer from "../../components/ScrollingContainer/ScrollingContainer";
import SearchBar from "../../components/SearchBar/SearchBar";
import Slider from "../../components/Slider/Slider";
import Tooltip from "../../components/Tooltip/Tooltip";
import { useLayout } from "../../layout/Layout";

export default function HomePage() {
    const { theme, page } = useLayout();
    useEffect(() => {
        page.reset();
        page.margins = "10rem";
        page.alignPageContent = "center";
    }, []);

    return (
        <>
            <Input id="test" label={{
                text: "My Incredibly Loooooooooooooongggggg Label"
            }} error={{
                validators: [
                    {
                        message: "Name must be longer than 2 characters",
                        condition: (input) => input.length > 2
                    },
                    {
                        message: "Name must contain a 'w'",
                        condition: (input) => input.includes("w")
                    },
                ]
            }} />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <Button text="My Button" onClick={() => theme.hideHeaderOnScroll = !theme.hideHeaderOnScroll} />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <Scroll justifyContent="center">
                <div>
                    Ha
                </div>
            </Scroll>
            <ScrollingContainer items={[
            ]} onEmpty={"Nothing to see here"} />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <SearchBar onEnter={(value) => console.log(value)} placeholder="Search..." />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <Slider min={1} max={200} thumbSize="1rem" init={{ leftIndex: 100, rightIndex: 205 }} />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <DropDown label={<label>Mialma</label>} openOn="hover" position="right" align="top">
                {[
                    <Tooltip key={"test"} tooltip="A Cool Tooltip" position="bottom" alignPercent={50} tailAlignPercent={50}>
                        <Scroll width="500px">Ha</Scroll>
                    </Tooltip>,
                    <Tooltip key={"test2"} tooltip="A Cool Tooltip" position="bottom" alignPercent={50} tailAlignPercent={50}>
                        <Scroll width="500px">Ha</Scroll>
                    </Tooltip>
                ]}
            </DropDown >
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <LineBreak margin="20px 0" taper="right" fade="right" color="green" />
            <Input id="garb" label={{
                text: "Number?",
                isIdle: "hidden",
                isActive: "floatAbove"
            }} error={{
                display: "first",
                validators: [
                    {
                        message: "Name must low red",
                        condition: (input) => {
                            console.log(input);
                            return input.startsWith("#ff");
                        }
                    }
                ]
            }} attributes={{ type: "date" }} />
        </>
    )
}