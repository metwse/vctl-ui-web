import { useState, JSX } from 'react';
import styles from './styles.module.scss';


function DropdownMenu(
    { children, title }: { children: JSX.Element, title: string }
) {

    const [inactive, setInactive] = useState(false);

    return (
        <section 
            className={styles['dropdown-menu']} 
            d-minimized={inactive ? "" : undefined}
        >
            <header onClick={() => setInactive(!inactive)}>
                <i className={`${styles['icon']} bi bi-chevron-down`}></i>
                <span>{title}</span>
            </header>
            <div className={styles['children']}>
                {children}
            </div>
        </section>
    );
}


export default DropdownMenu;
