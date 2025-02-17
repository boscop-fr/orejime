import {createContext} from 'preact';
import Manager from '../../core/Manager';
import type {Config} from '../types';

export interface ContextType {
	config: Config;
	manager: Manager;
}

export default createContext<ContextType>({} as ContextType);
