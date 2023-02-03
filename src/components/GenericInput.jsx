import GenericErrorMessage from "./GenericErrorMessage";
import { useState } from 'react';

const GenericInput = ({ register, type='text', errors, value }) => {

    const [inputValue, setInputValue] = useState(value || '');

    const handleChange = event => {
        setInputValue(event.target.value);
    };

    return (
        <div className="form-group px-3 mb-3">
            <input className="form-control font-size-larger mb-1" { ...register} type={type} placeholder={register.name} value={inputValue} onChange={handleChange}/>
            { errors && <GenericErrorMessage errors={errors}/>}
        </div>
    )
}

export default GenericInput;