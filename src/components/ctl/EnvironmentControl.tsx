import DropdownMenu from "../widgets/DropdownMenu.tsx";
import styles from './control.module.scss';


function EnvironmentControl() {
    return (
        <div className={styles['control']}>
            <DropdownMenu title="environment">
                <div>
                    <div>
                        <input placeholder='1' type='number'/>
                        <button>set drone count</button>
                    </div>
                    <button>initialize environment</button>
                </div>
            </DropdownMenu>
        </div>
    );
}

export default EnvironmentControl;
