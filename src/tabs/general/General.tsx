import { event } from '../../api/protocol.ts';
import { TabArgs } from '../tabs.ts';

import DroneControl from '../../components/ctl/DroneControl.tsx';
import DropdownMenu from '../../components/widgets/DropdownMenu.tsx';

import styles from './General.module.scss';

import { useEffect, useState } from 'react';


export default function General({ session }: TabArgs) {
    const [droneCount, setDroneCount] = useState(session.droneCount);

    useEffect(() => {
        const syncUi = ({ droneCount }: event.SyncUi) =>
            setDroneCount(droneCount ?? 0)

        session.event.addListener(event.Op.SyncUi, syncUi);

        return () => { session.event.removeListener(event.Op.SyncUi, syncUi) };
    })

    return (
        <section id="general">
            <div className={styles['control']}>
                <DropdownMenu title="swarm control">
                    <DroneControl />
                </DropdownMenu>

                <DropdownMenu title="individual control">
                    <div className={styles['individual-control']}>
                        {
                            new Array(droneCount).fill(0).map((_, i) => (
                                <DropdownMenu title={`drone ${i + 1}`} minimized key={i}>
                                    <DroneControl />
                                </DropdownMenu>
                            ))
                        }
                    </div>
                </DropdownMenu>
            </div>
        </section>
    )
}
