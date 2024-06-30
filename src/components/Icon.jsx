export const Icon = ({ icon, size = "large", className = "" }) => {
	const sizes = { large: "text-2xl", small: "text-xl", extra: "text-3xl" }

	return (
		<span
			className={`!flex-initial inline-block text-inherit material-symbols-outlined select-none align-middle ${sizes[size]} leading-none ${className}`}
		>
			{icon}
		</span>
	)
}
