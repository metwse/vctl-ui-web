import Session from '../api.ts';

import Formations from './Formations.tsx';
import General from './General.tsx';
import Telemetry from './Telemetry.tsx';
import TextCommand from './TextCommand.tsx';
import PaintArea from './PaintArea.tsx';

import { ReactNode } from 'react';
import * as icons from 'react-bootstrap-icons';


export interface TabArgs {
    ref: (ref: HTMLElement) => void,
    session: Session,
}

export const panes:
    // Title, tab, and title icon respectively.
    [string, (a: TabArgs) => ReactNode, icons.Icon][] = [
    ['Text Command', TextCommand, icons.Terminal],
    ['Paint Area', PaintArea, icons.Easel2],
    ['Formations', Formations, icons.Diagram3],
    ['General', General, icons.Sliders2],
    ['Telemetry', Telemetry, icons.Info],
];
