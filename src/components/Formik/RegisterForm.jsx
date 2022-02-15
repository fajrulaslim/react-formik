import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'

function RegisterForm() {
    const options = [
        { key: 'Email', value: 'emailmoc'},
        { key: 'Telp', value: 'telpmoc'},
    ]
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        modeOfContact: '',
        phone: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email!')
            .required('Required!'),
        password: Yup.string().required('Required!'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password', '')], 'Password must match')
            .required('Required!'),
        modeOfContact: Yup.string().required('Required!'),
        phone: Yup.string().when('modeOfContact', {
            is: 'telpmoc',
            then: Yup.string().required('Required!')
        }),
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
                    
                    <FormikControl control='input' type='password' label='Password' name='password' />
                    
                    <FormikControl control='input' type='password' label='Confirm Password' name='confirmPassword' />
                    
                    <FormikControl control='radio' label='Mode of Contact' name='modeOfContact' options={options} />
                    
                    <FormikControl control='input' type='text' label='Phone' name='phone' />
                    
                    <button type='submit' disabled={!formik.isValid}>Submit</button>
                </Form>
            }
        </Formik>
  )
}

export default RegisterForm