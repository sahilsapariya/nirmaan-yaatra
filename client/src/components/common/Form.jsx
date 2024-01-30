import React from 'react'

const Form = ({handleSubmit,formData,setFormData,initialFormData,RedText,NormalText,button_label}) => {

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: { ...prevData[name], value: value },
        }));
    };
  return (
    <div className='add_site_form_container'>
    <div className="sites__heading">
        <span className="heading_red_color">{RedText}</span> {NormalText}
    </div>
    <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([fieldName, fieldData]) => (
            <div className='add_site_form_element' key={fieldName}>
                <label>{fieldData.label_name}:</label>
                {fieldData.type === 'select' ? (
                    <select
                        name={fieldName}
                        value={fieldData.value}
                        onChange={handleInputChange}
                        className='add_site_select'
                    >
                        <option value="">{fieldData.optionDefault}</option>
                        {fieldData.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={fieldData.type}
                        name={fieldName}
                        value={fieldData.value}
                        onChange={handleInputChange}
                        placeholder={fieldData.pl || `Enter ${fieldName}`}
                        required
                    />
                )}
            </div>
        ))}
        <button type="submit">{button_label}</button>
    </form>
</div>
  )
}

export default Form