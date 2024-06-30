export const Spinner = ({ size = "small" }) => {
	const sizeStyle = size == "small" ? "w-6 h-6" : "w-8 h-8"

	return <div className={`animate-spin ${sizeStyle} rounded-full border-blue-300/60 border-l-blue-500 border-4`} />
}
