interface AlertProps {
    children: string;
    onAlertClose: () => void;
}

export function Alert(props: AlertProps) {
    const { children, onAlertClose } = props;

    return (
        <div className="alert alert-info alert-dismissible fade show">
            {children}
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={onAlertClose}></button>
        </div>
    )
}