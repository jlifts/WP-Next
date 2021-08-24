/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
