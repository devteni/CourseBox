import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
  } from 'react-redux';
import type {
    AppDispatch,
    RootState,
  } from '../store';
import useAuth from './useAuth';
  
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAuth, useAppDispatch, useAppSelector };
