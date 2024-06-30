import { Button } from "@/components/Button"
import { HStack } from "@/components/HStack"
import { Icon } from "@/components/Icon"
import { IconButton } from "@/components/IconButton"
import { VStack } from "@/components/VStack"

const ActionsButton = ({ onDeleteAll, onCleanUp }) => {
	return (
		<div className="relative group">
			<IconButton color="plain" icon="more_vert" className="group-focus-within:bg-primary-faded" />
			<VStack className="box absolute hidden group-focus-within:flex !p-0 !gap-0 mt-1 right-0 [&>*]:text-nowrap">
				<Button onClick={onDeleteAll} iconLeft="delete">
					Delete All
				</Button>

				<Button onClick={onCleanUp} iconLeft="mop">
					Clean Up
				</Button>
			</VStack>
		</div>
	)
}

export const Navbar = ({ onDeleteAll, onCleanUp, mode, setMode }) => {
	// generation, settings, gallery

	const Subtitle = ({ children, className = "" }) => {
		return <span className={`text-neutral-800 ${className}`}>{children}</span>
	}

	const navButton = (cur, tar) => ({
		color: tar.includes(cur) ? "used" : "plain",
		disabled: tar.includes(cur),
		onClick: () => setMode(tar[0]),
	})

	return (
		<HStack stretch={false} className="fixed w-full p-4 py-2 border-b bg-white top-0 z-20">
			<h1 className="font-mono text-md md:text-lg">
				<span className="font-bold">Dall-E-D</span> 
				{/* {mode == "generation" && <Subtitle>Generation</Subtitle>} */}
				{/* {mode == "gallery" && (&gt;
					<>
						<Subtitle className="hidden md:inline">Generation</Subtitle>
						<Subtitle className="inline md:hidden">Gallery</Subtitle>
					</>
				)}
				{mode == "settings" && <Subtitle>Settings</Subtitle>} */}
			</h1>

			{/* Desktop */}
			<HStack className="ml-auto hidden md:flex">
				<Button {...navButton(mode, ["generation", "gallery"])} iconLeft="palette">
					Generation
				</Button>
				<Button {...navButton(mode, ["settings"])} iconLeft="tune">
					Settings
				</Button>

				{/* <Dropdown>
					<option>Lol</option>
				</Dropdown> */}
			</HStack>

			{/* Mobile */}
			<HStack className="ml-auto flex md:hidden">
				<IconButton {...navButton(mode, ["generation"])} icon="palette" />
				<IconButton {...navButton(mode, ["gallery"])} icon="image" />
				<IconButton {...navButton(mode, ["settings"])} icon="tune" />
			</HStack>

			<ActionsButton onDeleteAll={onDeleteAll} onCleanUp={onCleanUp} />
		</HStack>
	)
}
