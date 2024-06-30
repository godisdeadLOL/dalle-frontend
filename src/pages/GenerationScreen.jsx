import { Button } from "@/components/Button"
import { Textarea } from "@/components/Textarea"
import { VStack } from "@/components/VStack"
import { Screen } from "./Screen"
import { InputRange } from "@/components/InputRange"
import { useEffect } from "preact/hooks"
import { Label } from "@/components/Label"
import { Select } from "@/components/Select"

const QualityHelper = () => (
	<p>
		<b>hd</b> creates images with finer details and greater consistancy across the image.
	</p>
)

const StyleHelper = () => (
	<>
		<p>
			<b>Vivid</b> causes the model to generate more hyper-realistic and dramatic images.
		</p>
		<p>
			<b>Natural</b> causes the model to produce more natural, less hyper-real looking images.
		</p>
	</>
)

export const GenerationScreen = ({ onTouched, disabled, generationForm, onApply, className = "" }) => {
	const { values, errors, validate, setValues, register } = generationForm

	const isDalle3 = values.model == "dall-e-3"

	useEffect(() => {
		if (isDalle3) setValues((val) => ({ ...val, size: "1024x1024" }))
		else setValues((val) => ({ ...val, size: "256x256" }))
	}, [isDalle3])

	return (
		<Screen onTouched={onTouched} className={`pt-16 pb-4 ${className}`}>
			{/* Prompt */}
			<Label className={!!errors.prompt ? "text-cancel" : ""}>Prompt</Label>
			<Textarea
				error={!!errors.prompt}
				maxLength={isDalle3 ? 4000 : 1000}
				placeholder="What do you want to generate?"
				{...register("prompt")}
			/>

			{/* Model */}
			<Label>Model</Label>
			<Select {...register("model")}>
				<option>dall-e-2</option>
				<option>dall-e-3</option>
			</Select>

			{/* Size */}
			<Label>Size</Label>
			<Select {...register("size")}>
				{!isDalle3 && (
					<>
						<option>256x256</option>
						<option>512x512</option>
						<option>1024x1024</option>
					</>
				)}

				{isDalle3 && (
					<>
						<option>1024x1024</option>
						<option>1792x1024</option>
						<option>1024x1792</option>
					</>
				)}
			</Select>

			{/* Batch (dall-e-2 only) */}

			{!isDalle3 && (
				<>
					<Label>Batch</Label>
					<InputRange min={1} max={10} step={1} {...register("batch")} />
				</>
			)}

			{/* Dall-e-3 only */}

			{isDalle3 && (
				<>
					{/* Quality */}
					<Label helper={<QualityHelper />}>Quality</Label>
					<Select {...register("quality")}>
						<option>standard</option>
						<option>hd</option>
					</Select>
					{/* Style */}
					<Label helper={<StyleHelper />}>Style</Label>
					<Select {...register("style")}>
						<option>natural</option>
						<option>vivid</option>
					</Select>{" "}
				</>
			)}

			<VStack className="flex-1 relative">
				<div className="flex-1" />
				<Button
					disabled={disabled}
					onClick={() => {
						if (validate()) onApply(values)
					}}
					className="sticky w-full bottom-4"
					color="primary"
					iconLeft="brush"
				>
					Generate
				</Button>
			</VStack>
		</Screen>
	)
}
