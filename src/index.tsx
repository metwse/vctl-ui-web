import { createRoot } from 'react-dom/client';
import App from './App';
import Session from './api';


window.onload = async function () {
    const initialLoad = document.getElementById('initial-load');
    initialLoad!.remove();

    window.session = await Session.connect('changeme', 'http://localhost:3000/');

    const root = createRoot(document.body);

    root.render(
        <App></App>
    );
}
