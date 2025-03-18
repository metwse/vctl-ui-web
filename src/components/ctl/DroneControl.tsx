import DropdownMenu from '../widgets/DropdownMenu.tsx';
import styles from './control.module.scss';


function DroneControl({ minimized }: { minimized?: boolean }) {
    return (
        <div className={styles['control']}>
        <DropdownMenu title="control" minimized={minimized}>
            <div>
                <div className={styles['arm']}>
                    <button>arm</button>
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
                    <input type='number' placeholder='altitude' />
                    <br />
                    <button>takeoff</button>
                    <button>land</button>
                    <button>track</button>
                </div>
                <div className={styles['movement-2']}>
                    <input type='number' placeholder='x' />
                    <input type='number' placeholder='y' />
                    <input type='number' placeholder='z' />
                    <br />
                    <input type='number' placeholder='velocity' />
                    <button>move</button>
                </div>
            </div>
        </DropdownMenu>
        </div>
    );
}


export default DroneControl;
