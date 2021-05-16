import { ErrorMessage, useField } from 'formik';
import { useEffect, useState } from 'react';
import { BsExclamationTriangleFill as ErrorIcon } from "react-icons/bs";

const InputField = ({ label, hv, ...props }) => {
  const [hasValue, setValue] = useState(false);
  const [focus, setFocus] = useState(false);
  const [field, meta] = useField(props);

  useEffect(() => {
    if (field.value) setValue(true)
    else setValue(false)
  }, [field.value])

  useEffect(() => {
    if (hv) setValue(true)
  }, [hv])

  const verifyValue = (formikBlur, e) => {
    setFocus(false);
    formikBlur(e);
  }

  const enableFocus = () => setFocus(true);

  return (
    <div className="form-group">
      <div className={`input-form${focus ? ' focus' : ""}${hasValue ? ' hasValue' : ""}${(meta.touched && meta.error) ? ' invalid' : ''}`}>
        <input {...field} {...props} className="input-text" onBlur={(e) => verifyValue(field.onBlur, e)} onFocus={enableFocus} />
        <label htmlFor={field.name}>{label}</label>
      </div>
      <ErrorMessage name={field.name}>{msg => <div className="error-label"><ErrorIcon /> <span>{msg}</span></div>}</ErrorMessage>
    </div>
  )
}

export default InputField
