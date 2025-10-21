import { useParams } from "react-router-dom";

export default function GamePortalPage() {
    const { id } = useParams();

    return (
        <div>
            The Game Portal: {id}
        </div>
    )
}