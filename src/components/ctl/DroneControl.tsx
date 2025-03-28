import { useState } from 'react';

import DropdownMenu from '../widgets/DropdownMenu.tsx';
import { EventHandler } from "../../eventHandler.ts";
import { Arm, Disarm, Emergency, Takeoff, Land, Track, Move } from '../../api/protocol/droneCommand.ts';

import styles from './control.module.scss';
import { command } from '../../api/protocol.ts';


function DroneControl({ minimized }: { minimized?: boolean }) {
    const [values, setValues] = useState({
        altitude: 0,
        x: 0, y: 0, z: 0,
        velocity: 0 //! TODO: velocity is vectorial
    });

    function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
        const {  id, value  } = event.target;

        setValues((prev) => ({
            ...prev,
            [id]: value === "" ? "" : Number(value)
        }) as typeof prev)
    }
    console.log(`The new set of values:`, values);

    //! Never use an ID for a component that is used more than once, as it may
    // result in undefined behavior.
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
                            command.Op.DroneControl, { commandType: command.droneCommand.Op.Arm, commandArguments: { force: true } }
                        )
                    }>
                        arm
                    </button>
                    <button onClick={() => EventHandler.emit(`force_arm`, {force: true} as Arm)}>force arm</button>
                    <button onClick={() => EventHandler.emit(`disarm`, {force: false} as Disarm)}>disarm</button>
                    <button onClick={() => EventHandler.emit(`force_disarm`, {force: true} as Disarm)}>force disarm</button>
                    <button onClick={() => EventHandler.emit(`emergency`, null as Emergency)}>emergency</button>
                </div>
            </div>
        </DropdownMenu>

        <DropdownMenu title="movement" minimized={minimized}>
            <div className={styles['children']}>
                <div className={styles['movement-1']}>
                    <br />
                    <input value={values.altitude} type='number' id='altitude' placeholder={String(values)} onChange={changeValue}/>
                    <br />
                    <button onClick={() => EventHandler.emit(`takeoff`, {altitude: values.altitude} as Takeoff)}>takeoff</button>
                    <button onClick={() => EventHandler.emit(`land`, null as Land)}>land</button>
                    <button onClick={() => EventHandler.emit(`track`, null as Track)}>track</button>
                </div>
                <div className={styles[`movement-2`]}>
                    <input value={values.x} type='number' id='x' placeholder='x' onChange={changeValue}/>
                    <input value={values.y} type='number' id='y' placeholder='y' onChange={changeValue}/>
                    <input value={values.z} type='number' id='z' placeholder='z' onChange={changeValue}/>
                    <br />
                    <input value={values.velocity} type='number' id='velocity' placeholder='velocity' onChange={changeValue}/>
                    <button onClick={() => EventHandler.emit(`move`, {x:values.x, y: values.y, z: values.z, v: values.velocity} as Move)}>move</button>
                </div>
            </div>
        </DropdownMenu>
        </div>
    );
}


export default DroneControl;
