import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store";

export const useAuth = () => {
    return !!localStorage.getItem('token');
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector