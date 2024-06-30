import { useEffect, useState } from "preact/hooks"
import { Screen } from "../Screen"

import { GenerationList } from "./GenerationList"
import { GenerationInfo } from "./GenerationInfo"
import { GenerationGrid } from "./GenerationGrid"

const EmptyScreen = ({ className = "" }) => (
	<Screen className={`center py-16 ${className}`}>
		<p className="text-xl text-neutral-500">No generations</p>
	</Screen>
)

export const ResultsScreen = ({ onTouched, selected, setSelected, generations, onDelete, onCopy, className = "" }) => {
	// useEffect(() => {
	// 	if (selected == generations.length - 1) setSelected((value) => value - 1)
	// }, [generations])

	return (
		<>
			{generations.length == 0 && <EmptyScreen className={className} />}
			{generations.length > 0 && (
				<Screen onTouched={onTouched} className={`pt-16 ${className}`}>
					<>
						<GenerationGrid generation={generations[selected]} />
						<GenerationInfo onCopy={onCopy} onDelete={onDelete} generation={generations[selected]} />

						<GenerationList generations={generations} selected={selected} setSelected={setSelected} />
					</>
				</Screen>
			)}
		</>
	)
}
