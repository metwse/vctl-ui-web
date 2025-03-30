import Session from './api.ts';

import styles from './App.module.scss';
import { panes } from './tabs/tabs.ts';

import { useEffect, useState } from 'react';


function App({ session }: { session: Session }) {
    const [tabCount, setTabCount] = useState(0);
    const [activeTab, setActiveTab] = useState(panes.length);

    const tabbedNavButtons = panes.map(([text,, Icon], i) => (
        <a
            key={i}
            onClick={() => setActiveTab(i)}
            data-active={activeTab == i ? true : null}
        >
            <span>{text}</span>
            <Icon />
        </a>
    ));
    const sections = panes.map(([, tab]) => tab({ session }));

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

    return (
        <main>
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
        </main>
    );
}

export default App;
