import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import Session from './api.ts';


window.rem = parseFloat(
    getComputedStyle(document.documentElement).fontSize
);

window.session = await Session.connect('changeme', 'http://localhost:3000/');

document
    .getElementById('initial-load')!
    .remove();

createRoot(document.body)
    .render(<App session={window.session} />);

