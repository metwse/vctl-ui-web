import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';


window.onload = function () {
    const initialLoad = document.getElementById('initial-load');
    if (initialLoad) 
        initialLoad.remove();

    const root = createRoot(document.body);

    root.render(
        <App></App>
    );
}
