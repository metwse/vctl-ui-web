import { createRoot } from 'react-dom/client';
import React from 'react';


window.onload = function () {
    const initialLoad = document.getElementById('initial-load');
    if (initialLoad) 
        initialLoad.remove();

    const root = createRoot(document.body);

    root.render(
        <>Hello, world!</>
    );
}
