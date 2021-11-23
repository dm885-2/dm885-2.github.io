export default function Spinner(props)
{
    return props.visible && (<div className="position-absolute vh-100 vw-100 d-flex justify-content-center align-items-center bg-secondary opacity-75">
        <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>);
}