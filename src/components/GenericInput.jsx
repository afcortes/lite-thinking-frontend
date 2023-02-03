import GenericErrorMessage from "./GenericErrorMessage";
import { useState } from 'react';

const GenericInput = ({ register, type='text', errors, value }) => {

    const [inputValue, setInputValue] = useState(value || '');

    const handleChange = event => {
        setInputValue(event.target.value);
    };

    return (
        <>
            <input { ...register} type={type} placeholder={register.name} value={inputValue} onChange={handleChange}/>
            { errors && <GenericErrorMessage errors={errors}/>}
        </>
    )
}

export default GenericInput;