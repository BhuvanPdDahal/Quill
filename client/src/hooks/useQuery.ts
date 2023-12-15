import { useLocation } from "react-router-dom";

const useQuery = () => {
    const location = useLocation();
    const search = location.search;
    const params = new URLSearchParams(search);
    const name = params.get("name");
    const query = { name };
    return query;
};

export default useQuery;