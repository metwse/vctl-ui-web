import { ReactNode, useState } from 'react';
import styles from './styles.module.scss';


function DropdownMenu({
    children,
    title,
    minimized,
    onToggle
}: {
    children: ReactNode;
    title: string;
    minimized?: boolean;
    onToggle?: (arg0: boolean) => void,
}) {
    const [minimized_, setMinimized_] = useState(minimized ?? false);

    return (
        <section
            className={styles['dropdown-menu']}
            data-minimized={minimized_ ? "" : undefined}
        >
            <header onClick={
                () => {
                    setMinimized_(!minimized_);
                    if (onToggle)
                        onToggle(minimized_);
                }
            }
            >
                <i className={`${styles['icon']} bi bi-chevron-down`}></i>
                <span>{title}</span>
            </header>
            <div className={styles['children']}>
                {children}
            </div>
        </section>
    );
}

export default DropdownMenu
