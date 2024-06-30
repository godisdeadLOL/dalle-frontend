import Stash from "@/api/Stash"
import OpenaiProvider from "@/api/providers/OpenaiProvider"
import { GenerationResult, GenerationRequest } from "@/api/schemas"
import Settings from "@/api/endpoints/Settings"

class Generations {
	/**
	 * @param {GenerationRequest} request
	 * @returns {Promise<GenerationResult>}
	 */
	static async generate(request) {
		const config = await Settings.load()

		let result = null
		try {
			const images = await OpenaiProvider.generate(request, config)
			result = GenerationResult.generated(request, images)
		} catch (e) {
			result = GenerationResult.error(request, e.message)
		}

		return Stash.append("generations", result)
	}

	/**
	 * @returns {Promise<Array<GenerationResult>>}
	 */
	static async list() {
		return Stash.get("generations", [])
	}

	/**
	 * @param {number} id
	 */
	static async delete(id) {
		Stash.delete("generations", id)
	}

	static async cleanUp() {
		const generations = await Generations.list()

		for (const gen of generations) {
			const diff = Date.now() - gen.time
			if (gen.isError || diff > 60 * 60 * 1000) await Generations.delete(gen.id)
		}
	}

	static async deleteAll() {
		Stash.set("generations", [])
	}
}

export default Generations
