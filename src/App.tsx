import DroneControl from './components/ctl/DroneControl';
import EnvironmentControl from './components/ctl/EnvironmentControl';
import DropdownMenu from './components/widgets/DropdownMenu';
import styles from './App.module.scss';
import TelemetryUpdater from './components/ctl/TelemetryUpdater';


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
                            <TelemetryUpdater />
                        </DropdownMenu>
                        <DropdownMenu title="drone 2" minimized>
                            <DroneControl />
                            <TelemetryUpdater  />
                        </DropdownMenu>
                    </div>
                </DropdownMenu>
            </div>
        </>
    );
}


export default App;
