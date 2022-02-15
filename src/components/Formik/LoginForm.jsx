import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'

function LoginForm() {
    const initialValues = {
        email: '',
        password: '',
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email!').required('Required!'),
        password: Yup.string().required('Required!'),
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
                    
                    <button type='submit' disabled={!formik.isValid}>Submit</button>
                </Form>
            }
        </Formik>
  )
}

export default LoginForm