import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import App from './App.tsx';
import Session from './api.ts';


window.rem = parseFloat(
    getComputedStyle(document.documentElement).fontSize
);

(async function () {
    try {
        const session = await Session.connect('http://localhost:3000/');
        window.session = session;

        session.ws.onclose = () => {
            location.reload();
        }

        document
            .getElementById('initial-load')!
            .remove();

        createRoot(document.body)
            .render(
                <StrictMode>
                    <App session={window.session} token="changeme" />
                </StrictMode>
            );
    } catch {
        createRoot(document.body)
        .render(
            <div id="connection-loss">
                <p>
                    Cannot establish a server connection. Perhaps the server is
                    offline or the credentials provided are invalid.
                </p>
                <button onClick={() => location.reload()}>reload</button>
            </div>
        );
    }
})()
