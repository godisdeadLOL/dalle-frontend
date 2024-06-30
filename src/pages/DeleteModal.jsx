import { Button } from "@/components/Button"
import { Divider } from "@/components/Divider"
import { HStack } from "@/components/HStack"
import { VStack } from "@/components/VStack"

export const DeleteModal = ({ open, message, onClose, onConfirm }) => {
	return (
		<div className={`fixed left-0 top-0 w-full h-full z-[1000] bg-black/80 backdrop-blur-sm center ${open ? "" : "!hidden"}`}>
			{/* <div onClick={() => alert(15)} className="absolute left-0 top-0 w-full h-full"></div> */}

			<VStack className="box container max-w-xl !py-4 mx-4">
				<h1 className="text-xl font-bold">Are you sure?</h1>
				<main>{message}</main>

				<Divider />

				<HStack stretch={false}>
					<Button onClick={onClose} className="ml-auto">
						Cancel
					</Button>
					<Button onClick={onConfirm} color="cancel">
						Confirm
					</Button>
				</HStack>
			</VStack>
		</div>
	)
}
