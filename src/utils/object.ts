export const filterObjects = <T extends object>(data: T[], filter: string): T[] => data.filter((dataPoint) => Object.values(dataPoint).some((value) => String(value).toLowerCase().includes(filter)))
export const removeKeyFromObject = <T extends object>(key: string, obj: T): T => JSON.parse(JSON.stringify(obj, (k, v) => (k === key) ? undefined : v))
