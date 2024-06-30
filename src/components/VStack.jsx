export const VStack = ({ children = null, className = "", ...props }) => {
	return (
		<div className={`flex flex-col gap-4 ${className}`} {...props}>
			{children}
		</div>
	)
}
