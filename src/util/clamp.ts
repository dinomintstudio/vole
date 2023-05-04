/**
 * Clamps a value between a min and max inclusive
 */
export function clamp(val: number, min: number, max: number) {
    return Math.min(Math.max(min, val), max)
}
