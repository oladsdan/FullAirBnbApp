import axios  from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useRefreshToken = () => {
    const {setAuthUser} = useContext(AuthContext);

    const refresh = async () => {
        const response = await axios.get('/api/refresh', {
            withCredentials: true
        });
        setAuthUser(prev => {
            return {...prev, Accesstoken: response.data.Accesstoken }
        })
        return response.data.Accesstoken;
    }
    return refresh;
};
export default useRefreshToken;