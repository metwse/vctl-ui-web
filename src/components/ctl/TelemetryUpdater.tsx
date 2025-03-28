import DropdownMenu from "../widgets/DropdownMenu.tsx";
import styles from './control.module.scss';

function TelemetryUpdater({ minimized }: { minimized?: boolean }){
    //! TODO: style
    return(
        <div className={styles['control']}>
        <DropdownMenu title="telemetry" minimized={minimized}>
            <div className={styles['children']}>
                <div className={styles['telemetry']}>
                    <h1>Position</h1>
                    <p>unset</p>
                    <h2>Velocity</h2>
                    <p>unset</p>
                </div>
            </div>

        </DropdownMenu>
        </div>
    )
}

export default TelemetryUpdater;
