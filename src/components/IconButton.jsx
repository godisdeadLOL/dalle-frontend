import { Icon } from "./Icon"

export const IconButton = ({ icon, color = "primary", size = "large", className = "", children = null, ...props }) => {
	return (
		<button className={`button ${color} p-2 rounded-full !flex-initial !self-center ${className}`} {...props}>
			<Icon size={size} icon={icon} />
			{children}
		</button>
	)
}
