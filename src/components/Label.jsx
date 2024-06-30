import { HStack } from "@/components/HStack"
import { HelperPopup } from "../components/HelperPopup"

export const Label = ({ className = "", helper = null, children = null }) => {
	const style = `${className} -mb-2`

	if (!helper) return <label className={style}> {children} </label>

	return (
		<HStack className={style}>
			<label className="!flex-initial"> {children} </label>
			<HelperPopup> {helper} </HelperPopup>
		</HStack>
	)
}
