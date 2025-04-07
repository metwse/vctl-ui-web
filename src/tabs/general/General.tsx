import { event } from '../../api/protocol.ts';

import { TabArgs } from '../tabs.ts';
import DroneCtl from './DroneCtl.tsx';
import DropdownMenu from '../../components/dropdown-menu/DropdownMenu.tsx';

import styles from './General.module.scss';

import { useEffect, useState } from 'react';
import { droneCommand } from '../../api/protocol/command.ts';


export default function General({ session }: TabArgs) {
    const [droneCount, setDroneCount] = useState(session.droneCount);
    const [swarmDrones, setSwarmDrones] = useState<number[] | 'all'>('all')

    useEffect(() => {
        const syncUi = ({ droneCount }: event.SyncUi) =>
            setDroneCount(droneCount ?? 0)

        session.event.addListener(event.Op.SyncUi, syncUi);

        return () => { session.event.removeListener(event.Op.SyncUi, syncUi) };
    })

    return (
        <section id="general" className={styles['section']}>
            <div className={styles['swarm-control']}>
                <h2>Swarm Control</h2>

                <DroneCtl session={session} drones={swarmDrones}/>

                <div className={styles['formations']}>
                    <h3>Formations</h3>
                    <div>
                        <button onClick={() => session.sendDroneCommand(
                            droneCommand.Op.Formation,
                            swarmDrones,
                            { formation: 'V' }
                        )}>
                            V
                        </button>
                        <button onClick={() => session.sendDroneCommand(
                            droneCommand.Op.Formation,
                            swarmDrones,
                            { formation: 'LINE' }
                        )}>
                            Line
                        </button>
                        <button onClick={() => session.sendDroneCommand(
                            droneCommand.Op.Formation,
                            swarmDrones,
                            { formation: 'INVERSE_V' }
                        )}>
                            Λ
                        </button>
                    </div>
                </div>

                <DropdownMenu title="selected drones">
                    <div className={styles['select-drones']}>
                        <button
                            data-selected={
                                swarmDrones == 'all' ? true : null
                            }
                            onClick={() => setSwarmDrones('all')}
                        >
                            all
                        </button>
                        {
                            new Array(droneCount).fill(0).map((_, i) => (
                                <button
                                    key={i}
                                    data-selected={
                                        swarmDrones != 'all' &&
                                        swarmDrones.includes(i) ?
                                        true : null
                                    }
                                    onClick={
                                        () => {
                                            if (swarmDrones == 'all')
                                                setSwarmDrones([i])
                                            else if (swarmDrones.includes(i))
                                                setSwarmDrones(
                                                    swarmDrones.filter(
                                                        v => v != i
                                                    )
                                                )
                                            else
                                                setSwarmDrones(
                                                    [...swarmDrones, i]
                                                )
                                        }
                                    }
                                >
                                    {i + 1}
                                </button>
                            ))
                        }
                    </div>
                </DropdownMenu>
            </div>
            <div className={styles['individual-control']}>
                <h2>Individual Control</h2>
                {
                    new Array(droneCount).fill(0).map((_, i) => (
                        <DropdownMenu
                            title={`Drone ${i + 1}`}
                            minimized
                            key={i}
                        >
                            <DroneCtl session={session} drones={[i]}/>
                        </DropdownMenu>
                    ))
                }
           </div>
        </section>
    )
}
