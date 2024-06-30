import OpenaiProvider from "./src/api/providers/OpenaiProvider.js"
import { GenerationRequest } from "./src/api/schemas.js"

const generate = async () => {
	const request = new GenerationRequest("cat", "dall-e-e", 1, "1024x1024", 'vivid', 'hd')
	const urls = await OpenaiProvider.generate(request, null)

    console.log(urls)
}


generate()