export const HStack = ({ children, className = "", stretch = true, ref = null }) => {
	return (
		<div
			ref={ref}
			className={`flex flex-row gap-2 ${stretch && "[&>*]:flex-auto"} items-center ${className}`}
		>
			{children}
		</div>
	)
}
