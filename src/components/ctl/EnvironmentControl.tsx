import DropdownMenu from "../widgets/DropdownMenu.tsx";
import styles from './control.module.scss';


function EnvironmentControl() {
    //! Command payloads can send using session.send method. A high level
    // method/class should be implemented to prevent duplicate code.
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
