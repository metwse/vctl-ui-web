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
                </div>
                <button>emergency</button>
            </div>
        </DropdownMenu>

        <DropdownMenu title="movement" minimized={minimized}>
            <div className={styles['children']}>
                <div>
                    <input type='number' placeholder='altitude' /> 
                    <button>takeoff</button>
                </div>
                <div>
                    <button>land</button>
                    <button>track</button>
                </div>
                <div>
                    <input type='number' placeholder='x' /> 
                    <input type='number' placeholder='y' /> 
                    <input type='number' placeholder='z' /> 
                    <input type='number' placeholder='velocity' /> 
                    <button>move</button>
                </div>
            </div>
        </DropdownMenu>
        </div>
    );
}


export default DroneControl;
