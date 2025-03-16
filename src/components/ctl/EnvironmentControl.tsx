import DropdownMenu from "../widgets/DropdownMenu.tsx";
import styles from './control.module.scss';


function EnvironmentControl() {
    return (
        <div className={styles['control']}>
            <DropdownMenu title="environment">
                <div>
                    <input placeholder='drone count' type='number'/>
                    <button>initialize environment</button>
                </div>
            </DropdownMenu>
        </div>
    );
}

export default EnvironmentControl;
