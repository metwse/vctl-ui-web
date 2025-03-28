import DropdownMenu from '../widgets/DropdownMenu.tsx';
import styles from './control.module.scss';
import { EventHandler } from "../../eventhandler.ts";
import { Arm, Disarm, Emergency, Takeoff, Land, Track, Move } from '../../api/protocol/droneCommand.ts';
import { useState } from 'react';

function DroneControl({ minimized }: { minimized?: boolean }) {
    const [values, setValues] = useState({
        altitude: 0,
        x: 0,
        y: 0,
        z: 0,
        velocity: 0
    });

    function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
        const {  id, value  } = event.target;

        setValues((prev) => ({
            ...prev,
            [id]: value === "" ? "" : Number(value)
        }) as typeof prev)
    }
    console.log(`The new set of values:`, values);

    return (
        <div className={styles['control']}>
        <DropdownMenu title="control" minimized={minimized}>
            <div>
                <div className={styles['arm']}>
                    <button onClick={() => EventHandler.emit(`arm`, {force: false} as Arm)}>arm</button>
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
