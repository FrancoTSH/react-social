import Button from 'components/Button';
import ImagePreview from 'components/ImagePreview';
import { useAuth } from 'context/AuthContext';
import { Field, Form, Formik } from 'formik';
import { useRef } from 'react';
import { AiFillCamera } from "react-icons/ai";
import { createPost } from 'services/Posts';
import * as Validator from 'yup';

const validateFields = Validator.object().shape({
  caption: Validator.string()
    .required('error1'),
  image: Validator.mixed()
    .nullable('error2')
    .required('error3')
})

const CreatePost = () => {
  const { currentUser } = useAuth();
  const file = useRef();

  const handleSubmit = async ({ caption, image }, { resetForm }) => {
    try {
      await createPost(caption, image, currentUser.displayName, currentUser.photoURL);
      resetForm({
        caption: '',
        image: null,
      })
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className="createPost">
      <div className="createPost__loggedIn">
        <div className="createPost__form">
          <Formik initialValues={{
            caption: '',
            image: null,
          }}
            validationSchema={validateFields}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >{
              ({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  <div className="createPost__body">
                    <div className="createPost__body-input">
                      <Field name="caption" as="textarea" rows="4" placeholder="¿Qué estas pensando?" />
                    </div>
                    {
                      (values.image) && (<ImagePreview className="createPost__body-ip" image={values.image} setFieldValue={setFieldValue} file={file.current} />)
                    }
                  </div>
                  <div className="createPost__footer">
                    <div className="createPost__footer-img">
                      <label htmlFor="image">
                        <AiFillCamera size="30" />
                      </label>
                      <input aria-label="file-button" type="file" ref={file} name="image" id="image" className="file" accept="image/*" onChange={(e) => setFieldValue("image", e.currentTarget.files[0])} />
                    </div>
                    <div className="createPost__footer-submit">
                      <Button styles={`btn-submit${isSubmitting ? ' loading' : ''}`} text="Crear" disabled={isSubmitting} />
                    </div>
                  </div>
                </Form>
              )
            }
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
