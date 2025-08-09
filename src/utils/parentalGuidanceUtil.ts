export function getSeverityLevels(parentsGuide) {
    const result: Record<string, string> = {}

    for (const category of parentsGuide) {
        const breakdowns = category.severityBreakdowns

        const validBreakdowns = breakdowns.filter((bd) => bd.voteCount !== undefined)

        if (validBreakdowns.length === 0) {
            result[category.category] = "unknown"
            continue
        }

        const maxSeverity = validBreakdowns.reduce((max, current) =>
            current.voteCount > max.voteCount ? current : max
        )

        result[category.category] = maxSeverity.severityLevel
    }

    return result
}
