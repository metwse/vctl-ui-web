import Session from './api.ts';

import styles from './App.module.scss';
import { panes } from './tabs/tabs.ts';

import { useCallback, useEffect, useRef, useState } from 'react';


function App({ session }: { session: Session }) {
    const tabbed = {
        elements: useRef<HTMLElement[]>([]),
        buttons: useRef<HTMLAnchorElement[]>([]),
        tabbedSection: useRef<HTMLElement>(null),
        nav: useRef<HTMLElement>(null),
        tabs: useRef<HTMLDivElement>(null),
    };

    const [currentTab, setCurrentTab] = useState(-1);

    const main = useRef<HTMLElement>(null);

    const deactivateTab = useCallback((i: number) => {
        tabbed.elements.current[i].removeAttribute('data-active');
        tabbed.buttons.current[i].removeAttribute('data-active');
    }, [tabbed.elements, tabbed.buttons])

    const activateTab = useCallback((i: number) => {
        if (currentTab != -1)
            deactivateTab(currentTab);

        tabbed.elements.current[i].setAttribute('data-active', '');
        tabbed.buttons.current[i].setAttribute('data-active', '');
        setCurrentTab(i);
    }, [tabbed.elements, tabbed.buttons, currentTab, deactivateTab])

    useEffect(
        () => {
            const elements = tabbed.elements.current;
            const tabbedSection = tabbed.tabbedSection.current!;
            const tabs = tabbed.tabs.current!;
            const app = main.current!;
            const buttons = tabbed.buttons.current!;

            const handleResize = () => {
                let tabCount = panes.length - Math.min(
                    Math.floor(window.innerWidth / (window.rem * 40)),
                    panes.length,
                );

                // Disable tabbed view if only one tab exists.
                if (tabCount < 2) {
                    tabCount = 0;
                    tabbedSection.style.display = 'none';
                } else
                    tabbedSection.style.display = '';

                const currentTabCount = tabs.children.length;

                // Pushes elements into the tabbed section.
                for (let i = currentTabCount; i < tabCount; i++) {
                    app.removeChild(elements[i]);
                    tabs.appendChild(elements[i]);
                    buttons[i].style.display = ''

                    if (currentTabCount === 0)
                        activateTab(tabCount - 1);
                }

                for (let i = tabCount; i < currentTabCount; i++) {
                    tabs.removeChild(elements[i]);
                    app.appendChild(elements[i]);
                    buttons[i].style.display = 'none'

                    if (elements[i].hasAttribute('data-active')) {
                        deactivateTab(i);

                        if (tabCount === 0)
                            setCurrentTab(-1);
                        else
                            activateTab(tabCount - 1);
                    }
                }
            };

            handleResize();
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
       },
       [
           tabbed.buttons, tabbed.tabs,
           tabbed.tabbedSection,
           tabbed.elements, main,
           activateTab, deactivateTab
       ]
    );

    return (
        <main ref={main}>
            <section ref={tabbed.tabbedSection} className={styles['tabs']}>
                <nav ref={tabbed.nav}>
                    {
                        ...panes.map(([text,, Icon], i) => (
                            <a
                                ref={(ref) => {
                                    tabbed.buttons.current[i] = (ref!);
                                }}
                                style={{ display: 'none' }}
                                key={i}
                                onClick={() => activateTab(i)}
                            >
                                <span>{text}</span>
                                <Icon />
                            </a>
                        ))
                    }
                </nav>
                <div ref={tabbed.tabs}></div>
            </section>
            {
                ...panes.map(([, tab], i) => tab({
                    session,
                    ref: (ref) => tabbed.elements.current[i] = ref
                }))
            }
        </main>
    );
}

export default App;
