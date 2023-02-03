import GenericErrorMessage from "./GenericErrorMessage";

const GenericInput = ({register, type='text', errors}) => {
    return (
        <>
            <input { ...register} type={type} placeholder={register.name}/>
            { errors && <GenericErrorMessage errors={errors}/>}
        </>
    )
}

export default GenericInput;