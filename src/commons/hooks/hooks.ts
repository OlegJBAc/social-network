import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { appDispatchType, RootState } from "../../redux/store";


export const useAppDispatch = () => useDispatch<appDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector