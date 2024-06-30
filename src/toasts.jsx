import toast from "react-hot-toast"
import { HStack } from "./components/HStack"
import { Icon } from "./components/Icon"

const Toast = ({ vissible, mode = "info", children = null }) => {
	const icons = {
		info: "info",
		error: "error",
		success: "check_circle",
	}

	const styles = {
		info: "",
		error: "text-cancel",
		success: "text-success",
	}

	const animation = vissible ? "opacity-100" : "opacity-0"

	return (
		<HStack className={`z-[100] box shadow ${styles[mode]} transition-all ${animation}`}>
			<Icon icon={icons[mode]} /> <div className="text-center"> {children} </div>
		</HStack>
	)
}

export function success(msg) {
	toast.custom((toast) => (
		<Toast vissible={toast.visible} mode="success">
			{msg}
		</Toast>
	))
}

export function info(msg) {
	toast.custom((toast) => (
		<Toast vissible={toast.visible} mode="info">
			{msg}
		</Toast>
	))
}

export function error(msg) {
	toast.custom((toast) => (
		<Toast vissible={toast.visible} mode="error">
			{msg}
		</Toast>
	))
}
