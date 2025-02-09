import styles from './Button.module.css'

interface ButtonProps {
    children: string;
    color?: 'primary' | 'secondary' | 'success' | 'danger';
    handleClick: () => void;
}

export function Button(props: ButtonProps) {
    const { children, color = 'primary', handleClick} = props;

    return (
        <button className={styles.myButton} onClick={handleClick}>{children}</button>
    )
}