import { useEffect, useState } from "preact/hooks"

export function useForm(defaultValues) {
	const [values, setValues] = useState(defaultValues)
	const [errors, setErrors] = useState({})

	const register = (name) => {
		const onChange = (e) => {
			setValues({ ...values, [name]: !e.target ? e : e.target.value })
		}

		const onBlur = () => {}

		return { value: values[name], onChange, onBlur }
	}

	const validate = () => {
		const errors = {}
		for (const [key, value] of Object.entries(values)) {
			if (!value) errors[key] = true
		}
		setErrors(errors)

		return Object.keys(errors).length == 0
	}

	useEffect(() => {
		validate()
	}, [values])

	const reset = () => {
		setValues(defaultValues)
	}

	return {
		values,
		errors,
		validate,
		setValues,
		register,
		reset,
	}
}
