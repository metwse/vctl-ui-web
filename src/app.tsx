import DroneControl from './components/ctl/DroneControl.tsx';
import EnvironmentControl from './components/ctl/EnvironmentControl.tsx';
import DropdownMenu from './components/widgets/DropdownMenu.tsx';
import styles from './app.module.scss';


function App() {
    return (
        <>
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
        </>
    );
}


export default App;
