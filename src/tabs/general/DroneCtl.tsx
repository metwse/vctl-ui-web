import Session from '../../api.ts';
import { command } from '../../api/protocol.ts';
import { droneCommand } from '../../api/protocol/command';

import styles from './DroneCtl.module.scss';

import { FormEvent } from 'react';


export default function DroneCtl(
    { session, drones }: { session: Session, drones: number[] | 'all' }
) {
    const sendDroneCommand = (
        droneCommand: droneCommand.Op, commandArgs?: object
    ) => {
        const payload: command.DroneControl = {
            command: droneCommand,
            commandArgs,
            drones,
        }

        session.send(command.Op.DroneControl, payload)
    }

    const takeoff = (e: FormEvent) => {
        const formData = new FormData(e.target as HTMLFormElement);
        e.preventDefault()
        const altitude = +formData.get('altitude')!;
        sendDroneCommand(droneCommand.Op.Takeoff, { altitude })
    };

    const move = (e: FormEvent) => {
        const formData = new FormData(e.target as HTMLFormElement);
        e.preventDefault()
        sendDroneCommand(
            droneCommand.Op.Takeoff,
            Object.fromEntries(
                Array.from(formData.entries())
                    .map(([k, v]: [string, FormDataEntryValue]) => [k, +v])
            )
        )
    };

    return (
        <div className={styles['drone-ctl']}>
            <h3>General</h3>
            <div className={`${styles['general']} ${styles['grid']}`}>
                <button onClick={() => sendDroneCommand(
                    droneCommand.Op.Arm,
                    { force: false }
                )}>
                    arm
                </button>
                <button onClick={() => sendDroneCommand(
                    droneCommand.Op.Arm,
                    { force: true }
                )}>
                    force arm
                </button>
                <button onClick={() => sendDroneCommand(
                    droneCommand.Op.Disarm,
                    { force: false }
                )}>
                    disarm
                </button>
                <button onClick={() => sendDroneCommand(
                    droneCommand.Op.Disarm,
                    { force: true }
                )}>
                    force disarm
                </button>
                <button
                    className={styles['emergency-button']}
                    onClick={() => sendDroneCommand(droneCommand.Op.Emergency)}
                >
                    emergency
                </button>
                <br />
                <button onClick={() => sendDroneCommand(droneCommand.Op.Land)}>
                    land
                </button>
                <button onClick={() => sendDroneCommand(droneCommand.Op.Track)}>
                    track
                </button>
            </div>

            <h3>Movement</h3>
            <form
                className={`${styles['takeoff']} ${styles['grid']}`}
                onSubmit={takeoff}
            >
                <input
                    name="altitude"
                    placeholder="altitude"
                    type="number"
                    step="any"
                />
                <button>takeoff</button>
            </form>

            <form
                className={`${styles['movement']} ${styles['grid']}`}
                onSubmit={move}
            >
                <input name="x" placeholder="x" type="number" step="any" />
                <input name="y" placeholder="y" type="number" step="any" />
                <input name="z" placeholder="z" type="number" step="any" />
                <br />
                <input name="v" placeholder="v" type="number" step="any" />
                <button>move</button>
            </form>
        </div>
    )
}
