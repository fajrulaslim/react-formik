import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'

function EnrollmentForm() {
    const dropdownOptions = [
        { key: 'Select your course', value: ''},
        { key: 'React', value: 'react'},
        { key: 'Angular', value: 'angular'},
        { key: 'Vue', value: 'vue'},
    ]
    const checkboxOptions = [
        { key: 'HTML', value: 'html'},
        { key: 'CSS', value: 'css'},
        { key: 'Javascript', value: 'javascript'},
    ]
    const initialValues = {
        email: '',
        bio: '',
        course: '',
        skills: [],
        courseDate: null
    }
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email!')
            .required('Required!'),
        bio: Yup.string().required('Required!'),
        course: Yup.string().required('Required!'),
        skills: Yup.array().min(1, 'Required!'),
        courseDate: Yup.date().required('Required!').nullable(),
    })
    const onSubmit = values => {
        console.log('Saved data', JSON.parse(JSON.stringify(values)))
    }

  return (
    <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                formik => <Form>
                    <FormikControl control='input' type='text' label='Email' name='email' />
                    
                    <FormikControl control='textarea' type='text' label='Bio' name='bio' />
                    
                    <FormikControl control='select'  label='Course' name='course' options={dropdownOptions} />
                    
                    <FormikControl control='checkbox' label='Your Skillset' name='skills' options={checkboxOptions} />
                    
                    <FormikControl control='date' label='Course Date' name='courseDate' />
                    
                    <button type='submit' disabled={!formik.isValid}>Submit</button>
                </Form>
            }
        </Formik>
  )
}

export default EnrollmentForm