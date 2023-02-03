const GenericErrorMessage = ({errors: {message}}) => {
    return (
        <>
            <span className="text-danger px-2">{message}</span>
        </>
    )
}

export default GenericErrorMessage;