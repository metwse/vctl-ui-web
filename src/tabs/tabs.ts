import Session from '../api.ts';

import General from './general/General.tsx';
import Telemetry from './telemetry/Telemetry.tsx';
import Debug from './debug/Debug.tsx';
import PaintArea from './paint-area/PaintArea.tsx';

import { ReactNode } from 'react';
import * as icons from 'react-bootstrap-icons';


export interface TabArgs {
    session: Session,
}

export const panes:
    // Title, title icon, and function respectively.
    [string, icons.Icon, (kwargs: TabArgs) => ReactNode][] = [
    ['Debug', icons.Terminal, Debug],
    ['Paint Area', icons.Easel2, PaintArea],
    ['General', icons.Sliders2, General],
    ['Telemetry', icons.Info, Telemetry],
];
