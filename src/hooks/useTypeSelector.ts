import { useSelector, type TypedUseSelectorHook } from "react-redux";
import { type RootState } from "../redux/reducers/combine";
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
