import DropdownMenu from '../widgets/DropdownMenu.tsx';
import styles from './Control.module.scss';


function Control() {
    return (
        <div className={styles['control']}>
            <DropdownMenu title="environment">
                <>
                    _count_ change_drone_count<br />
                    init_environment
                </>
            </DropdownMenu>

            <DropdownMenu title="bulk controls">
                <>
                    [force] arm<br />
                    [force] disarm<br />
                    emergency
                </>
            </DropdownMenu>

            <DropdownMenu title="movement">
                <>
                    _altitude_ takeoff<br />
                    land<br />
                    track<br />
                    _x_ _y_ _z_ _v_ move_swarm
                </>
            </DropdownMenu>
        </div>
    );
}


export default Control;
