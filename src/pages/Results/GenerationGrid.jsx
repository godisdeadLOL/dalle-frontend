import { DynamicImage, ResponsiveRect } from "@/components/DynamicImage"
import { Icon } from "@/components/Icon"
import { Spinner } from "@/components/Spinner"
import { useEffect, useState } from "preact/hooks"

const ResponsiveSquare = ({ children = null, className = "" }) => {
	return (
		<div className="w-full">
			<div className={`mx-auto max-w-full aspect-square ${className}`}> {children} </div>
		</div>
	)
}

export const GenerationGrid = ({ generation }) => {
	const styles = [`grid-cols-1`, `grid-cols-2`, "grid-cols-3", `grid-cols-2 mx-auto container max-w-md`, "grid-cols-3", "grid-cols-4"]

	const total = generation.images.length
	const gridStyle = styles[Math.min(total - 1, 4)]

	const isGenerated = !generation.isGenerating && !generation.isError
	const isSingle = generation.request.batch === 1

	const singleImage = <DynamicImage src={generation.images[0]} />

	const imageGrid = (
		<div className={`grid ${gridStyle} gap-4 [&>*]:aspect-square`}>
			{generation.images.map((src) => {
				return <DynamicImage src={src} />
			})}
		</div>
	)

	const generationSpinner = (
		<>
			<Spinner size="small" />
			Generating...
		</>
	)

	const errorMessage = (
		<>
			<Icon icon="block" className="text-red-500" />
			<div className="text-center">{generation.error}</div>
		</>
	)

	return (
		<>
			{(!isGenerated || isSingle) && (
				<ResponsiveRect size={generation.request.size} className={`center gap-2 max-h-80 bg-blue-50 rounded`}>
					{isGenerated && singleImage}
					{generation.isGenerating && generationSpinner}
					{generation.isError && errorMessage}
				</ResponsiveRect>
			)}

			{isGenerated && !isSingle && imageGrid}
		</>
	)
}
