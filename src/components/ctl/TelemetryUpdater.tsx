import DropdownMenu from "../widgets/DropdownMenu.tsx";
import styles from './control.module.scss';
import { EventHandler } from "../../eventHandler.ts";
import { useEffect, useState } from "react";
import { Telemetry } from '../../api/protocol/event.ts'


function TelemetryUpdater({ minimized }: { minimized?: boolean }){
    const [telemetry, setTelemetry] = useState([[0, 0, 0], [0, 0, 0]]);

    function updatePosition(payload: Telemetry['telemetry'])  {
        setTelemetry(() => {
            const [[, DroneTelemetry]] = payload;
            return [DroneTelemetry.position, DroneTelemetry.velocity];
        })
    }

    //! A good example of useState.
    useEffect(() => {
        EventHandler.on('telemetry', updatePosition);

        return () => {
            EventHandler.off('telemetry', updatePosition)
        }
    }, [])

    //! TODO: style
    return(
        <div className={styles['control']}>
        <DropdownMenu title="telemetry" minimized={minimized}>
            <div className={styles['children']}>
                <div className={styles['telemetry']}>
                    <h1>Position</h1>
                    <p>{telemetry[0][0]} {telemetry[0][1]} {telemetry[0][2]}</p>
                    <h2>Velocity</h2>
                    <p>{telemetry[1][0]} {telemetry[1][1]}  {telemetry[1][2]}</p>
                </div>
            </div>

        </DropdownMenu>
        </div>
    )
}

export default TelemetryUpdater;
