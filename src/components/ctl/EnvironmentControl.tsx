import DropdownMenu from "../widgets/DropdownMenu.tsx";
import styles from './control.module.scss';
import { EventHandler } from "../../eventHandler.ts";
import { useState } from "react";
import { InitializeEnvironment } from "../../api/protocol/command.ts";


function EnvironmentControl() {
    const [values, setValues] = useState({drone_count: 0});

    function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
        const {  id, value  } = event.target;

        setValues((prev) => (({
            ...prev,
            [id]: value === "" ? "" : Number(value)
        }) as typeof prev))

        console.log(`The set of the values in the environment input - ${values}`);
    }

    //! Command payloads can send using session.send method. A high level
    // method/class should be implemented to prevent duplicate code.
    return (
        <div className={styles['control']}>
            <DropdownMenu title="environment">
                <div>
                    <input value={values.drone_count} id="drone_count" placeholder='drone count' type='number' onChange={changeValue}/>
                    <button onClick={() =>
                        EventHandler.emit(`drone_count`, {droneCount: values.drone_count, force: true} as InitializeEnvironment)}>
                            initialize environment</button>
                            /* Ask how to send this initialize environment command, whether the current form is accurate */
                </div>
            </DropdownMenu>
        </div>
    );
}

export default EnvironmentControl;
