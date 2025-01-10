import './name-container.scss';
import { useData } from "../../../context/DataProvider";
import { GetUserResponse } from "../../../services/responseValidators/users/getUser";

export default function NameContainer() {
    const { data } = useData<GetUserResponse>();
    return (
        <div className="name-container">
            <div>{data?.firstName}</div>
            {data?.middleName && <div>{data.middleName}</div>}
            <div>{data?.lastName}</div>
        </div>
    )
}
