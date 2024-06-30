import { HStack } from "@/components/HStack"
import { IconButton } from "@/components/IconButton"
import { VStack } from "@/components/VStack"
import { HelperPopup } from "../../components/HelperPopup"
import { Divider } from "@/components/Divider"

export const GenerationInfo = ({ generation, onDelete, onCopy }) => {
	const Param = ({ label, children, ...props }) => {
		return (
			<div {...props}>
				<label className="font-bold mr-1">{label}:</label>
				<span> {children} </span>
			</div>
		)
	}

	const isDalle3 = generation.request.model == "dall-e-3"

	const time = new Date(generation.time).toLocaleString("ru-RU", {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	})
	const expire = 60 - Math.floor((Date.now() - generation.time) / (1000 * 60))

	const isGenerated = !generation.isGenerating && !generation.isError

	return (
		<VStack>
			<HStack>
				<div>
					<div> {time} </div>
					{isGenerated && (
						<HStack>
							<span className="!flex-initial text-neutral-500"> {expire > 0 ? `Expire in ${expire} minutes` : "Expired"} </span>
							<HelperPopup> Generated images URLs are only valid for 60 minutes since generation. </HelperPopup>
						</HStack>
					)}
				</div>

				<IconButton onClick={() => onCopy(generation)} color="plain" icon="content_copy" />
				<IconButton onClick={() => onDelete(generation)} color="plain_cancel" icon="delete" />
			</HStack>

			<Divider />

			<Param label="Prompt" className="text-justify">
				{generation.request.prompt}
			</Param>

			<VStack className="!gap-1">
				<Param label="Model"> {generation.request.model} </Param>
				<Param label="Size"> {generation.request.size} </Param>
				{isDalle3 && (
					<>
						<Param label="Quality">{generation.request.quality}</Param>
						<Param label="Style">{generation.request.style}</Param>
					</>
				)}
				{!isDalle3 && <Param label="Batch">{generation.request.batch}</Param>}
			</VStack>
		</VStack>
	)
}
