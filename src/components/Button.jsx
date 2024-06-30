import { Icon } from "./Icon"
import "./styles/Button.css"

export const Button = ({
	children = null,
	onClick = undefined,
	color = "plain",
	iconLeft = "",
	iconRight = "",
	className = "",
	disabled = false,
}) => {
	// progress_activity
	const leftSpin = iconLeft == "progress_activity" ? "animate-spin" : ""

	return (
		<button disabled={disabled} onClick={onClick} className={`button ${color} gap-2 ${className}`}>
			{!!iconLeft && <Icon icon={iconLeft} className={`-ml-2 ${leftSpin}`} />}
			<div className="flex-1"> {children} </div>
			{!!iconRight && <Icon icon={iconRight} className="-mr-2" />}
		</button>
	)
}
