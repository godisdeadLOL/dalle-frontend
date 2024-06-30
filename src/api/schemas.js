export class GenerationRequest {
	/**
	 * @param {string} prompt
	 * @param {string} model
	 * @param {number} batch
	 * @param {string} size
	 * @param {string} style
	 * @param {string} quality
	 */
	constructor(prompt, model, batch, size, style, quality) {
		this.prompt = prompt
		this.model = model?.toLowerCase()
		this.batch = batch
		this.size = size
		this.style = style?.toLowerCase()
		this.quality = quality?.toLowerCase()
	}
}

export class GenerationResult {
	/**
	 * @param {any} id
	 * @param {number} time
	 * @param {GenerationRequest} request
	 * @param {Array<string>} images
	 */
	constructor(time, request, images, isGenerating = false, isError = false, error = "", id = 0) {
		this.id = id
		this.time = time
		this.request = request
		this.images = images
		this.isGenerating = isGenerating
		this.isError = isError
		this.error = error
	}

	static generated(request, images) {
		return new GenerationResult(Date.now(), request, images)
	}

	static placeholder(request) {
		return new GenerationResult(Date.now(), request, [], true)
	}

	static error(request, message) {
		return new GenerationResult(Date.now(), request, [], false, true, message)
	}
}

export class Config {
	/**
	 * @param {string} base_url
	 * @param {string} api_key
	 */
	constructor(base_url, api_key) {
		this.base_url = base_url
		this.api_key = api_key
	}
}
