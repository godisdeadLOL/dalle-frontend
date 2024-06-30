import abortController from "@/abortController"
import { GenerationRequest, Config } from "@/api/schemas"
import { checkResponse, timeout } from "../utils"

function prepareRequest(config, target) {
	const base_url = !!config.base_url ? config.base_url : "https://api.openai.com/v1"

	const url = base_url + target
	const key = config.api_key

	const headers = {
		Authorization: `Bearer ${key}`,
		"Content-Type": "application/json",
	}

	return { url, key, headers }
}

class OpenaiProvider {
	static requestTimeout = 30

	/**
	 * @param {GenerationRequest} request
	 * @param {Config} config
	 * @returns {Promise<Array<string>> }
	 */
	static async generate(request, config) {
		const { headers, key, url } = prepareRequest(config, "/images/generations")

		const isDalle3 = request.model == "dall-e-3"
		let body = {
			model: request.model,
			prompt: request.prompt,
			n: isDalle3 ? 1 : request.batch,
			size: request.size,
			...(isDalle3 && {
				style: request.style,
				quality: request.quality,
			}),
		}

		const response = await timeout(
			fetch(url, { method: "POST", headers, body: JSON.stringify(body), signal: abortController.signal }),
			OpenaiProvider.requestTimeout
		)
		await checkResponse(response)

		const data = (await response.json()).data

		return data.map((entry) => entry.url)
	}

	/**
	 * @param {Config} config
	 */
	static async check(config) {
		const { headers, key, url } = prepareRequest(config, "/models")

		const response = await timeout(fetch(url, { method: "GET", headers, signal: abortController.signal }), OpenaiProvider.requestTimeout)
		await checkResponse(response)

		const data = (await response.json()).data
		const models = data.map((entry) => entry.id)

		return models.indexOf("dall-e-2") > -1 || models.indexOf("dall-e-3") > -1
	}
}

export default OpenaiProvider
