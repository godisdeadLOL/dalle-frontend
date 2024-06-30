export const Textarea = ({ className, error = false, ...props }) => {
	const border = error ? "border-cancel" : ""

	return (
		<textarea rows={6} className={`box resize-none appearance-none ${border} rounded disabled:text-neutral-500 ${className}`} {...props} />
	)
}
