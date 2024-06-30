import "./styles/Range.css"

export const Range = ({ className = "", ...props }) => {
	return (
		<input
			type="range"
			className={`slider h-2 w-full appearance-none bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer ${className}`}
			{...props}
		/>
	)
}
