import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Session from './api.ts';


window.session = await Session.connect('changeme', 'http://localhost:3000/');
console.log(window.session)

document.getElementById('initial-load')!.remove();

createRoot(document.body).render(<App></App>);

