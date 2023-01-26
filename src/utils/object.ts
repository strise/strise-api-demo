export const filterObjects = <T extends object>(data: T[], filter: string): T[] => data.filter((dataPoint) => Object.values(dataPoint).some((value) => String(value).toLowerCase().includes(filter)))
