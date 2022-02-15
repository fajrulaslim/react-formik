import React from 'react'
import { ErrorMessage, Field } from 'formik'
import TextError from './TextError'

function CheckBox(props) {
    const { label, name, options, ...rest } = props

    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field name={name} {...rest}>
                {
                    ({ field }) => {
                        console.log('Field', field)
                        return options.map(option => {
                            return (
                                <React.Fragment key={option.key} >
                                    <input type='checkbox' id={option.value} {...field} value={option.value} checked={Boolean(field.value.includes(option.value))} />
                                    <label htmlFor={option.value}>{option.key}</label>
                                </React.Fragment>
                            )
                        })
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default CheckBox