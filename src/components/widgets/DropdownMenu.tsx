import { useState, JSX } from 'react';
import styles from './styles.module.scss';


function DropdownMenu(
    { children, minimized, title }: 
        { children: JSX.Element, minimized?: boolean, title: string }
) {

    const [minimized_, setMinimized] = 
        useState(!!minimized);

    return (
        <section 
            className={styles['dropdown-menu']} 
            d-minimized={minimized_ ? "" : undefined}
        >
            <header onClick={() => setMinimized(!minimized_)}>
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
