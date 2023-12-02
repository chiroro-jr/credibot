const { randomBytes } = await import('node:crypto')

export const serializeNonPOJOs = <T>(obj: T) => structuredClone(obj)

export const generateUsername = (firstName: string) => {
	const id = randomBytes(2).toString('hex')
	const username = `${firstName}${id}`
	return username
}
