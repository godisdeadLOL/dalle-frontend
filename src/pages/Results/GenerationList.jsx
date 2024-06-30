import { GenerationRequest, GenerationResult } from "@/api/schemas"
import { DynamicImage } from "@/components/DynamicImage"
import { HStack } from "@/components/HStack"
import { Icon } from "@/components/Icon"
import { IconButton } from "@/components/IconButton"
import { Spinner } from "@/components/Spinner"
import { useEffect } from "preact/hooks"

const TallIconButton = ({ icon, onClick = undefined }) => {
	return <IconButton onClick={onClick} className="!self-stretch !rounded-lg" icon={icon} />
}

const GenerationEntry = ({ generation = null, isSelected = false, isGenerating = false, ...props }) => {
	const selected = isSelected ? "outline outline-3 outline-blue-500 shadow" : ""
	const baseStyle = "cursor-pointer snap-center hover:opacity-75 min-w-20 !w-20 !h-20"

	return (
		<>
			{generation.isError || generation.isGenerating ? (
				<div className={`${baseStyle} ${selected} bg-blue-50 text-red-500 center rounded p-4`} {...props}>
					{generation.isError && <Icon icon="block" size="extra" />}
					{generation.isGenerating && <Spinner size="big" />}
				</div>
			) : (
				<DynamicImage className={`${baseStyle} ${selected}`} src={generation.images[0]} {...props} />
			)}
		</>
	)
}

export const GenerationList = ({ generations, selected, setSelected }) => {
	const onPrevSelected = () => {
		if (selected > 0) setSelected(selected - 1)
	}
	const onNextSelected = () => {
		if (selected < generations.length - 1) setSelected(selected + 1)
	}

	useEffect(() => {
		const element = document.getElementById(`image_${selected}`)
		element?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		})
	}, [selected])

	return (
		<HStack className="mt-auto bg-white border-t py-2 md:py-6 sticky bottom-0">
			<TallIconButton onClick={onPrevSelected} icon="arrow_left" />

			<HStack stretch={false} className="p-2 snap-x snap-mandatory overflow-x-scroll no-scrollbar">
				{generations.map((gen, index) => {
					return (
						<GenerationEntry
							generation={gen}
							onClick={() => setSelected(index)}
							isSelected={index === selected}
							key={gen.id}
							id={`image_${index}`}
						/>
					)
				})}
			</HStack>

			<TallIconButton onClick={onNextSelected} icon="arrow_right" />
		</HStack>
	)
}
