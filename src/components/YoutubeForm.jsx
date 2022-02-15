import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
    name: 'Fajrul',
    email: '',
    channel: '',
    comments: '',
    address: '',
    status: '',
    social: {
        facebook: '',
        twitter: '',
    },
    phoneNUmbers: ['', ''],
    phNumbers: [''],
}

const savedValues = {
    name: 'Fajrul',
    email: 'sedang.ngoding@gmail.com',
    channel: 'fajrulaslim',
    comments: 'welcome to formik',
    address: 'Tangerang',
    status: '1',
    social: {
        facebook: '',
        twitter: '',
    },
    phoneNUmbers: ['', ''],
    phNumbers: [''],
}

const onSubmit = (values, onSubmitProps) => {
    console.log('Form data', values)
    console.log('Submit Props', onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string()
        .email('Invalid email format!')
        .required('Required!'),
    channel: Yup.string().required('Required!'),
    // comments: Yup.string().required('Required!'),
})

const validateComments = value => {
    let error
    if (!value) {
        error = 'Required!'
    }
    return error
}



function YoutubeForm() {
    const [formValues, setFormValues] = useState(null)

    return (
        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
            validateOnChange={false}
            validateOnBlur={false}>
            {formik => {
                console.log('Formik props', formik)
                return (
                    <Form>
                        <div className="form-control">
                            <label htmlFor="name">Name</label>
                            <Field type="text" id="name" name="name" />
                            <div className="error"><ErrorMessage name='name' /></div>
                        </div>

                        <div className="form-control">
                            <label htmlFor="email">Email</label>
                            <Field type="text" id="email" name="email" />
                            <ErrorMessage name='email' component={TextError} />
                        </div>

                        <div className="form-control">
                            <label htmlFor="channel">Channel</label>
                            <Field type="text" id="channel" name="channel" placeholder="Youtube channel name" />
                            <ErrorMessage name='channel'>
                                {
                                    (errorMsg) => <div className='error'>{errorMsg}</div>
                                }
                            </ErrorMessage>
                        </div>

                        <div className="form-control">
                            <label htmlFor="comments">Comments</label>
                            <Field as='textarea' type="text" id="comments" name="comments" validate={validateComments} />
                            <ErrorMessage name='comments' component={TextError} />
                        </div>

                        <div className="form-control">
                            <label htmlFor="address">Address</label>
                            <FastField id="address" name="address">
                                {
                                    (props) => {
                                        console.log('Field render')
                                        const { field, form, meta } = props
                                        // console.log('Render props', props)
                                        return (
                                            <div>
                                                <input type="text" id='address' {...field} />
                                                {meta.touched && meta.error && <div>{meta.error}</div>}
                                            </div>
                                        )
                                    }
                                }
                            </FastField>
                        </div>

                        <div className="form-control">
                            <label htmlFor="status">Status</label>
                            <Field id="status" name="status">
                                {
                                    (props) => {
                                        const { field, form, meta } = props
                                        return (
                                            <div>
                                                <select name="status" id="status" {...field}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                </select>
                                            </div>
                                        )
                                    }
                                }
                            </Field>
                        </div>

                        <div className="form-control">
                            <label htmlFor="facebook">Facebook Profile</label>
                            <Field type='text' id='facebook' name='social.facebook' />
                        </div>

                        <div className="form-control">
                            <label htmlFor="twitter">Twitter Profile</label>
                            <Field type='text' id='twitter' name='social.twitter' />
                        </div>

                        <div className="form-control">
                            <label htmlFor="primaryPh">Primary phone number</label>
                            <Field type='text' id='primaryPh' name='phoneNUmbers[0]' />
                        </div>

                        <div className="form-control">
                            <label htmlFor="secondaryPh">Secondary phone number</label>
                            <Field type='text' id='secondaryPh' name='phoneNUmbers[1]' />
                        </div>

                        <div className="form-control">
                            <label>List of phone number</label>
                            <FieldArray name='phNumbers'>
                                {
                                    (fieldArrayProps) => {
                                        // console.log('fieldArrayProps', fieldArrayProps)
                                        const { push, remove, form } = fieldArrayProps
                                        const { values } = form
                                        const { phNumbers } = values
                                        console.log("Form errors", form.errors)
                                        return <div>
                                            {
                                                phNumbers.map((phNumber, index) => (
                                                    <div key={index}>
                                                        <Field name={`phNumbers[${index}]`} />
                                                        {index > 0 && <button type='button' onClick={() => remove(index)}> - </button>}
                                                        <button type='button' onClick={() => push('')}> + </button>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    }
                                }
                            </FieldArray>
                        </div>

                        {/* <button type='button' onClick={() => formik.validateField('comments')}>Validate comments</button>
                        <button type='button' onClick={() => formik.validateForm()}>Validate all</button>

                        <button type='button' onClick={() => formik.setFieldTouched('comments')}>Visit comments</button>
                        <button type='button' onClick={() => formik.setTouched({
                            name: true,
                            email: true,
                            channel: true,
                            comments: true
                        })}>Visit fields</button> */}
                        {/* <button type='submit' disabled={!(formik.dirty && formik.isValid)}>Submit</button> */}
                        <button type='button' onClick={() => setFormValues(savedValues)}>Load saved data</button>
                        <button type='reset'>Reset</button>
                        <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
                    </Form>
                )
            }}

        </Formik>
    )
}

export default YoutubeForm