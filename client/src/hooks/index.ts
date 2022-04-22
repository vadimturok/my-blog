import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store";
import React from "react";

export const useAuth = () => {
    return !!localStorage.getItem('token');
}

export const useTitle = (title: string): void => {
    React.useEffect(() => {
        const prevTitle = document.title;
        document.title = title;

        return () => {
            document.title = prevTitle;
        };
    }, [title]);
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector