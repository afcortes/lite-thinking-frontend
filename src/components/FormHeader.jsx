const FormHeader = ({title}) => {
    return (
        <>
            <div className='form-header__container'>
                <h1 className="text-center">
                    {title}
                </h1>
            </div>
        </>
    )
}

export default FormHeader;