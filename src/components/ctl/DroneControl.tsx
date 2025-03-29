import DropdownMenu from '../widgets/DropdownMenu.tsx';

import styles from './control.module.scss';
import { command } from '../../api/protocol.ts';


function DroneControl({ minimized }: { minimized?: boolean }) {
    //! The element should capture telemetry events and send command payloads.
    // Event emitting should be handled in the Session class to send UI updates,
    // such as telemetry data or UI locks.
    //! Having a placeholder that clearly indicates the purpose of the input is
    // the idiomatic approach. A placeholder string with `String(values)`,
    // which results in `[object Object]`, is neither helpful nor standard.
    return (
        <div className={styles['control']}>
        <DropdownMenu title="control" minimized={minimized}>
            <div>
                <div className={styles['arm']}>
                    <button onClick={
                        () => window.session.send(
                            command.Op.DroneControl,
                            {
                                commandType: command.droneCommand.Op.Arm,
                                commandArguments: { force: true }
                            }
                        )
                    }>
                        arm
                    </button>
                    <button>force arm</button>
                    <button>disarm</button>
                    <button>force disarm</button>
                    <button>emergency</button>
                </div>
            </div>
        </DropdownMenu>

        <DropdownMenu title="movement" minimized={minimized}>
            <div className={styles['children']}>
                <div className={styles['movement-1']}>
                    <br />
                    <input placeholder="altitude" type="number" />
                    <br />
                    <button>takeoff</button>
                    <button>land</button>
                    <button>track</button>
                </div>
                <div className={styles['movement-2']}>
                    <input placeholder="x" type="number" />
                    <input placeholder="y" type="number" />
                    <input placeholder="z" type="number" />
                    <br />
                    <input placeholder="velocity" type="number" />
                    <button>move</button>
                </div>
            </div>
        </DropdownMenu>
        </div>
    );
}


export default DroneControl;
