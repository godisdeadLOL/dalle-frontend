import { VStack } from "@/components/VStack"
import { IconButton } from "@/components/IconButton"

export const HelperPopup = ({ children = null }) => {
	return (
		<div className="group !flex-initial rounded-full">
			<IconButton size="small" color="plain" className="!p-1 -ml-1 mt-[1px]" icon="help" />

			<VStack className="hidden group-hover:flex absolute z-50 box bg-white mt-2 left-0 right-0">{children}</VStack>
		</div>
	)
}
