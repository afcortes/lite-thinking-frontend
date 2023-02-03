const GenericErrorMessage = ({errors: {message}}) => {
    return (
        <>
            <span className="error-message">{message}</span>
        </>
    )
}

export default GenericErrorMessage;