import { command } from '../../api/protocol';
import { TabArgs } from '../tabs';

import styles from './InitializeEnvironemnt.module.scss';

import { useState } from 'react';


export default function InitializeEnvironment({ session }: TabArgs) {
    const [droneCount, setDroneCount] = useState('');

    const initializeEnvironment = async () => {
        const count = parseInt(droneCount);
        if (!count)
            return alert('Please enter a valid number!');

        session.lock();

        await session.send(command.Op.InitializeEnvironment, {
            droneCount: count,
            force: false,
        });
    }

    return (
        <section
            id="initialize-environment"
            className={styles['initialize-environment']}
        >
            <h2>No simulation environment has been initialized yet.</h2>
            To begin, enter the drone count and initialize the environment.
            <div>
                <input
                    value={droneCount}
                    onChange={({ target: { value }}) => setDroneCount(value)}
                    placeholder='drone count'
                    type='number'
                />
                <button onClick={initializeEnvironment}>
                    initialize environment
                </button>
            </div>
        </section>
    )
}
