import Session from '../../api';
import { command, event } from '../../api/protocol';

import DropdownMenu from '../../components/dropdown-menu/DropdownMenu';
import styles from './TelemetrySubscriber.module.scss';

import { useEffect, useState } from 'react';


function TelemetrySubscriber({
    drone, session
}: {
    drone: number,
    session: Session
}) {
    const [telemetry, setTelemetry] = useState<event.DroneTelemetry>(
        { pos: [0, 0, 0], v: 0 }
    );

    const toggleSubscription = (subscribed: boolean) => {
        if (subscribed)
            session.send(command.Op.DroneTelemetry, {
                drones: [drone]
            } as command.DroneTelemetry)
        else
            session.send(
                command.Op.UnsubscribeDroneTelemetry, {
                    drones: [drone]
                } as command.DroneTelemetry
            )
    };

    useEffect(() => {
        const handleTelemetry = (
            {
                telemetry: [[, telemetry]]
            }: {
                telemetry: [[number, event.DroneTelemetry]]
            }
        ) => setTelemetry(telemetry);

        session.event.addListener(event.Op.Telemetry, handleTelemetry);

        return () => { session.event.removeListener(
            event.Op.Telemetry, handleTelemetry
        ); };
    }, [session.event]);

    return (
        <DropdownMenu
            title={`Drone ${drone + 1}`}
            minimized={true}
            onToggle={toggleSubscription}
        >
            <div className={styles['telemetry-subscriber']}>
                <div>
                    <span>x</span>
                    <span>{telemetry.pos[0]}</span>
                    <span>y</span>
                    <span>{telemetry.pos[1]}</span>
                    <span>z</span>
                    <span>{telemetry.pos[2]}</span>
                </div>
                <div>
                    <span>v</span>
                    <span>{telemetry.v}</span>
                </div>
            </div>
        </DropdownMenu>
    )
}


export default TelemetrySubscriber;
