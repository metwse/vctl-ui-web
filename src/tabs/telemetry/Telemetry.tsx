import { useEffect, useState } from 'react';
import { TabArgs } from '../tabs';
import { event } from '../../api/protocol';

import TelemetrySubscriber from './TelemetrySubscriber';
import styles from './Telemetry.module.scss';


export default function Telemetry({ session }: TabArgs) {
    const [droneCount, setDroneCount] = useState(session.droneCount);

    useEffect(() => {
        const syncUi = ({ droneCount }: event.SyncUi) =>
            setDroneCount(droneCount ?? 0)

        session.event.addListener(event.Op.SyncUi, syncUi);

        return () => { session.event.removeListener(event.Op.SyncUi, syncUi) };
    })

    return (
        <section id="telemetry" className={styles['section']}>
            <h2>Telemetry</h2>
            {
                new Array(droneCount).fill(0).map((_, i) =>
                    <TelemetrySubscriber drone={i} session={session} key={i} />
                )
            }
        </section>
    )
}
