import { TabArgs } from '../tabs.ts';

import EnvironmentControl from '../../components/ctl/EnvironmentControl.tsx';
import DroneControl from '../../components/ctl/DroneControl.tsx';
import DropdownMenu from '../../components/widgets/DropdownMenu.tsx';

import styles from './General.module.scss';


export default function General({ session }: TabArgs) {
    return (
        <section id="general">
            <div className={styles['control']}>
                <EnvironmentControl />

                <DropdownMenu title="swarm control">
                    <DroneControl />
                </DropdownMenu>

                <DropdownMenu title="individual control">
                    <div className={styles['individual-control']}>
                        <DropdownMenu title="drone 1" minimized>
                            <DroneControl />
                        </DropdownMenu>
                        <DropdownMenu title="drone 2" minimized>
                            <DroneControl />
                        </DropdownMenu>
                    </div>
                </DropdownMenu>
            </div>
        </section>
    )
}
