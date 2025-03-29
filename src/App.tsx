import Session from './api.ts';

import Formations from './tabs/Formations.tsx';
import General from './tabs/General.tsx';
import Telemetry from './tabs/Telemetry.tsx';
import styles from './App.module.scss';

import { useEffect, useRef } from 'react';


const tabFunctions = [Formations, General, Telemetry];

function App({ session }: { session: Session }) {
    const tabbed = {
        elements: useRef<HTMLElement[]>([]),
        tabbedSection: useRef<HTMLElement>(null),
        reactElements: tabFunctions.map((tab, i) => tab({
            session,
            ref: (ref) => tabbed.elements.current[i] = ref
        })),
        nav: useRef<HTMLElement>(null),
        tabs: useRef<HTMLDivElement>(null),
    };

    const main = useRef<HTMLElement>(null);

    useEffect(
        () => {
            const elements = tabbed.elements.current;
            const tabbedSection = tabbed.tabbedSection.current!;
            const tabs = tabbed.tabs.current!;
            const app = main.current!;
            // TODO: tab navbar
            const nav = tabbed.nav.current!;

            const handleResize = () => {
                let tabCount = tabFunctions.length - Math.min(
                    Math.floor(window.innerWidth / (window.rem * 32)),
                    tabFunctions.length,
                );

                // Disable tabbed view if only one tab exists.
                if (tabCount < 2) {
                    tabCount = 0;
                    tabbedSection.style.display = 'none';
                } else
                    tabbedSection.style.display = '';

                const currentTabCount = tabs.children.length;

                // Pushes elements into the tabbed section.
                for (let i = currentTabCount; i < tabCount; i++)
                    tabs.appendChild(app.removeChild(elements[i]));

                for (let i = tabCount; i < currentTabCount; i++)
                    app.appendChild(tabs.removeChild(elements[i]));
            };

            handleResize();
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
       },
       [tabbed.nav, tabbed.tabs, tabbed.tabbedSection, tabbed.elements, main]
    )

    return (
        <main ref={main}>
            <section ref={tabbed.tabbedSection} className={styles['tabs']}>
                <nav ref={tabbed.nav}></nav>
                <div ref={tabbed.tabs}></div>
            </section>
            {...tabbed.reactElements}
        </main>
    );
}

export default App;
