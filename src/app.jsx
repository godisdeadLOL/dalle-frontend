import { useEffect, useRef, useState } from "preact/hooks"

import { Navbar } from "./pages/Navbar"

import { SettingsScreen } from "./pages/SettingsScreen"
import { GenerationScreen } from "./pages/GenerationScreen"
import { ResultsScreen } from "./pages/Results/ResultsScreen"
import { useForm } from "./hooks/useForm"

import { GenerationRequest, GenerationResult } from "@/api/schemas"
import Generations from "@/api/endpoints/Generations"
import abortController from "./abortController"
import { DeleteModal } from "./pages/DeleteModal"
import { useConfirmModal } from "./hooks/useDeleteModal"

import * as toasts from "@/toasts"
import { Toaster } from "react-hot-toast"

export function App() {
	const [mode, setMode] = useState("generation") // generation, gallery, settings
	const [generating, setGenerating] = useState(false)

	const [generations, setGenerations] = useState([])
	const [selected, setSelected] = useState(0)

	const generationForm = useForm({
		prompt: "",
		model: "dall-e-2",
		size: "256x256",
		batch: 1,
		quality: "standard",
		style: "natural",
	})
	const deleteModal = useConfirmModal()

	const reloadGenerations = async () => {
		Generations.list().then((results) => {
			setGenerations(results.reverse())
		})
	}

	useEffect(() => {
		reloadGenerations()
	}, [])

	const onGenerate = async (request) => {
		const placeholder = GenerationResult.placeholder(request)
		setGenerations((value) => [placeholder, ...value])

		setSelected(0)

		setGenerating(true)
		setMode("gallery")
		toasts.info("Generating...")

		Generations.generate(request)
			.then((result) => {
				setGenerations((value) => [result, ...value.slice(1)])

				if (!result.isError) toasts.success("Generation complete.")
				else toasts.error("Generation failed.")
			})
			.finally(() => setGenerating(false))
	}

	const onCopy = (generation) => {
		generationForm.setValues(generation.request)
		setMode("generation")
		toasts.info("Values copied.")
	}

	const onDelete = async (generation) => {
		deleteModal.onOpen("Selected image(s) will be deleted.", async () => {
			const index = generations.indexOf(generation)
			setGenerations((value) => value.filter((_, i) => i !== index))
			setSelected((value) => (value == generations.length - 1 ? value - 1 : value))

			toasts.info("Image(s) deleted.")

			if (!!generation.id) await Generations.delete(generation.id)
			if (generation.isGenerating) abortController.abort("deleted")
		})
	}

	const onDeleteAll = async () => {
		deleteModal.onOpen("All generated images will be deleted.", async () => {
			setGenerations([])
			toasts.info("Image(s) deleted.")
			await Generations.deleteAll()
		})
	}
	const onCleanUp = async () => {
		deleteModal.onOpen("All expired or failed generations will be deleted.", async () => {
			await Generations.cleanUp()
			toasts.info("Image(s) deleted.")
			await reloadGenerations()
		})
	}

	const generationStyle = `${mode == "gallery" ? "!hidden md:!flex" : ""}`
	const resultsStyle = `${mode == "generation" ? "!hidden md:!flex" : ""}`

	return (
		<>
			<Toaster />
			<DeleteModal {...deleteModal} />

			<Navbar onDeleteAll={onDeleteAll} onCleanUp={onCleanUp} mode={mode} setMode={setMode} />

			{mode == "settings" && <SettingsScreen className="px-4 md:px-8" />}

			{(mode == "gallery" || mode == "generation") && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
					<GenerationScreen
						onTouched={() => setMode("generation")}
						disabled={generating}
						generationForm={generationForm}
						onApply={onGenerate}
						className={generationStyle}
					/>
					<ResultsScreen
						onTouched={() => setMode("gallery")}
						selected={selected}
						setSelected={setSelected}
						onCopy={onCopy}
						onDelete={onDelete}
						generations={generations}
						className={resultsStyle}
					/>
				</div>
			)}
		</>
	)
}
