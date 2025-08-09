import { For, Show } from 'solid-js'
import { getSeverityLevels } from '../utils/parentalGuidanceUtil'

export default function ParentsGuide({ parentsGuide }) {
    console.log("Parents Guide Data:", parentsGuide())

    const severityLevels = getSeverityLevels(parentsGuide())
    console.log("Severity Levels:", severityLevels)

    return (
        <Show when={severityLevels}>
            <For each={Object.entries(severityLevels)}>
                {([category, level]) => (
                    <div class="mb-4">
                        <h2 class="text-lg font-semibold">{category}: {level}</h2>
                    </div>
                )}
            </For>
        </Show>
    )
}
