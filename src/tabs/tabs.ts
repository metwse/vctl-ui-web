import Session from '../api.ts';

import Formations from './formations/Formations.tsx';
import General from './general/General.tsx';
import Telemetry from './telemetry/Telemetry.tsx';
import TextCommand from './text-command/TextCommand.tsx';
import PaintArea from './paint-area/PaintArea.tsx';

import { ReactNode } from 'react';
import * as icons from 'react-bootstrap-icons';


export interface TabArgs {
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
