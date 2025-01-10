import './email-container.scss';
import { useData } from "../../../context/DataProvider";
import { GetUserResponse } from "../../../services/responseValidators/users/getUser";

export default function EmailContainer() {
    const { data } = useData<GetUserResponse>();
    return (
        <div className="email-container">
            {data?.email}
        </div>
    )
}
