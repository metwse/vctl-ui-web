import Session from './api.ts';
import { event} from './api/protocol.ts';

import styles from './App.module.scss';
import { panes } from './tabs/tabs.ts';

import { useEffect, useState } from 'react';

import InitializeEnvironment from
    './tabs/initialize-environment/InitializeEnvironment.tsx';


function App({ session }: { session: Session }) {
    const [tabCount, setTabCount] = useState(0);
    const [activeTab, setActiveTab] = useState(panes.length);

    const [isUiLocked, setIsUiLocked] = useState(session.isLocked);
    const [isEnvironmentInitialized, setIsEnvironmentInitialized] =
        useState(session.isInitialized);

    const tabbedNavButtons = panes.map(([text, Icon], i) => (
        <a
            key={i}
            onClick={() => setActiveTab(i)}
            data-active={activeTab == i ? true : null}
        >
            <span>{text}</span>
            <Icon />
        </a>
    ));
    const sections = panes.map(([,, tab]) => tab({ session }));


    useEffect(() => {
        const syncUi = (d: event.SyncUi) => {
            setIsUiLocked(d.uiLocked);
            setIsEnvironmentInitialized(d.initialized);
        }

        session.event.addListener(event.Op.SyncUi, syncUi)

        return () => { session.event.removeListener(event.Op.SyncUi, syncUi) };
    }, [isUiLocked, isEnvironmentInitialized, session.event])

    useEffect(
        () => {
            const handleResize = () => {
                let count = panes.length -
                    Math.floor(window.innerWidth / (window.rem * 32));

                if (count < panes.length)
                    count += 1;

                if (count >= 2 && activeTab >= count)
                    setActiveTab(count - 1)

                setTabCount(count < 2 ? 0 : count);
            };

            handleResize();
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
       }, [tabCount, activeTab]
    );


    // Drone control interface is rendered if the environment is initialized.
    const droneControl = (
        <>
            {tabCount ?
                <div className={styles['tabs']}>
                    <nav>
                        {...tabbedNavButtons.slice(0, tabCount)}
                    </nav>
                    <div>
                        {sections[activeTab]}
                    </div>
                </div>
            : null}
            {...sections.slice(tabCount)}
        </>
    )

    // If the environment is not initialized, then render the initialization UI.
    const initializeEnvironment = (
        <InitializeEnvironment session={session}/>
    )

    return (
        <main>
            {isUiLocked ?
                <div className={styles['ui-lock']}>
                    please wait...
                </div>
            : null}
            {isEnvironmentInitialized ? droneControl : initializeEnvironment}
        </main>
    );
}

export default App;
