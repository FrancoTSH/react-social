import { Field } from 'formik'

const customCheckbox = ({ text, id }) => {
  return (
    <label className="checkbox" htmlFor={id}>
      <Field type="checkbox" id={id} name={id} />
      <div className="rec-box"></div><span>{text}</span>
    </label>
  )
}

export default customCheckbox
