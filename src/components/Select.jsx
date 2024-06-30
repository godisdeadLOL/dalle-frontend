import { Icon } from "./Icon"

export const Select = ({ disabled = false, children, ...props }) => {
	const disabledStyle = disabled ? "text-neutral-400" : ""

	return (
		<div className="relative group">
			<Icon className={`pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 mr-2 ${disabledStyle}`} icon="keyboard_arrow_down" />

			<select
				disabled={disabled}
				className="w-full dropdown appearance-none box bg-white border rounded disabled:text-neutral-400"
				{...props}
			>
				{children}
			</select>
		</div>
	)
}
