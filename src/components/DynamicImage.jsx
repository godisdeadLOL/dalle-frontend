import { useEffect, useRef, useState } from "preact/hooks"
import { Icon } from "./Icon"
import { Spinner } from "./Spinner"

// TODO убери
export const ResponsiveRect = ({ size = null, aspect = "1024/1024", children = null, className = "", ...props }) => {
	if (!!size) {
		const [width, height] = size.split("x")
		aspect = `${width}/${height}`
	}

	return (
		<div className="w-full" {...props}>
			<div className={`mx-auto max-w-full ${className}`} style={{ aspectRatio: aspect }}>
				{children}
			</div>
		</div>
	)
}

// TODO
// убрать ResponsiveRect из DynamicImage
// DynamicImage всегда максимально расширяется?

export const DynamicImage = ({ src, className = "", children = null, ...props }) => {
	const [loaded, setLoaded] = useState(false)
	const [error, setError] = useState(false)

	const loading = !loaded && !error

	const imgRef = useRef(null)
	useEffect(() => {
		if (imgRef?.current?.complete || false) return

		setLoaded(false)
		setError(false)
	}, [src])

	// TODO useEffect(..., [loaded]) -

	return (
		<div className={`relative w-full h-full center rounded bg-primary-faded overflow-clip ${className}`} {...props}>
			{!error && (
				<>
					<img
						ref={imgRef}
						src={src}
						onLoad={() => setLoaded(true)}
						onError={() => setError(true)}
						className={`absolute w-full h-full object-cover ${loading ? "opacity-50" : ""}`}
					/>
					{!loaded && <Spinner size="large" />}
				</>
			)}

			{error && <Icon size="extra" className="text-text-faded" icon="broken_image" />}
		</div>
	)
}
