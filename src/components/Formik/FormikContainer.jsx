import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'

function FormikContainer() {
    const dropdownOptions = [
        { key: 'Select an option', value: ''},
        { key: 'Option 1', value: '1'},
        { key: 'Option 2', value: '2'},
        { key: 'Option 3', value: '3'},
    ]

    const radioOptions = [
        { key: 'Option 1', value: 'r1'},
        { key: 'Option 2', value: 'r2'},
        { key: 'Option 3', value: 'r3'},
    ]

    const checkboxOptions = [
        { key: 'Option 1', value: 'c1'},
        { key: 'Option 2', value: 'c2'},
        { key: 'Option 3', value: 'c3'},
    ]

    const initialValues = {
        email: '',
        description: '',
        selectOption: '',
        radioOption: '',
        checkboxOption: [],
        birthDate: null
    }
    const validationSchema = Yup.object({
        email: Yup.string().required('Required!'),
        description: Yup.string().required('Required!'),
        selectOption: Yup.string().required('Required!'),
        radioOption: Yup.string().required('Required!'),
        checkboxOption: Yup.array().min(1, 'Required!'),
        birthDate: Yup.date().required('Required!').nullable(),
    })
    const onSubmit = values => {
        console.log('Form data', values)
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
                    <FormikControl control='input' type='email' label='Email' name='email' />
                    
                    <FormikControl control='textarea' type='text' label='Description' name='description' />

                    <FormikControl control='select' label='Select a topic' name='selectOption' options={dropdownOptions} />

                    <FormikControl control='radio' label='Radio topic' name='radioOption' options={radioOptions} />

                    <FormikControl control='checkbox' label='Checkbox topic' name='checkboxOption' options={checkboxOptions} />

                    <FormikControl control='date' label='Pick a date' name='birthDate' />
                    
                    <button type='submit'>Submit</button>
                </Form>
            }
        </Formik>
    )
}

export default FormikContainer