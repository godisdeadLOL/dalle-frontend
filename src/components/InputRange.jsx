import { useRef, useState } from "preact/hooks"
import { HStack } from "./HStack"
import { Input } from "./Input"
import { Range } from "./Range"

export const InputRange = ({ onChange, min, max, ...props }) => {
	const handleChange = (e) => {
		try {
			let num_value = parseInt(e.target.value) || 1

			if (num_value < min) num_value = min
			else if (num_value > max) num_value = max

			onChange(num_value)
		} catch {
			onChange(min)
		}
	}

	const handleSlider = (e) => {
		let value = parseInt(e.target.value)

		inputRef.current.base.value = value
	}

	const inputRef = useRef(null)

	return (
		<HStack>
			<Input
				ref={inputRef}
				min={min}
				max={max}
				onChange={handleChange}
				className="max-w-24 mr-2"
				type="number"
				inputMode="numeric"
				{...props}
			/>
			<Range min={min} max={max} onInput={handleSlider} onChange={handleChange} {...props} />
		</HStack>
	)
}
