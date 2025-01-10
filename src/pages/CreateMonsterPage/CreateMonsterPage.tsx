import './create-monster-page.scss';
import { useEffect } from "react";
import { useLayout } from "../../context/LayoutProvider";
import CreateMonsterForm from '../../forms/CreateMonsterForm/CreateMonsterForm';
import Scroll from '../../components/Scroll/Scroll';

export default function CreateMonsterPage() {
    const { setPagePerms, setBackgroundImage } = useLayout();
    useEffect(() => {
        setPagePerms("user");
        setBackgroundImage("/background-placeholder.png");
    }, []);

    return (
        <div className="create-monster-page">
            <h1>Create New Monster</h1>

            <Scroll width="80%">
                <CreateMonsterForm />
            </Scroll>
        </div>
    )
}