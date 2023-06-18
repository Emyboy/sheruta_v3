import store from "../redux/store/store"

export function isInvalid(str) {
    const user = store.getState().auth?.user?.user;
    if(user && user.email?.includes('sheruta')){
        return false;
    }
	// Remove white spaces from the string
	console.log('CHECKING ---', str)
	const sanitizedStr = str.toLowerCase().replace(/\s/g, '')

	// Check for '@', '_', and '#' in the string
	if (
		sanitizedStr.includes('@') ||
		sanitizedStr.includes('_') ||
		sanitizedStr.includes('instagram') ||
		sanitizedStr.includes('ig') ||
		sanitizedStr.includes('tiktok') ||
		sanitizedStr.includes('snapchat') ||
		sanitizedStr.includes('#')
	) {
		return true
	}

	// Check for phone numbers
	const phoneNumberRegex = /[0-9]{10}/g // Assuming a 10-digit phone number format
	const phoneNumbers = sanitizedStr.match(phoneNumberRegex)

	if (phoneNumbers && phoneNumbers.length > 0) {
		return true
	}

	if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
		return true
	}

	// Check for numbers greater than 8
	const numbers = str.match(/\d+/g)
	if (numbers) {
		for (const number of numbers) {
            console.log('THE NUMBER --', number)
			if (String(number).length > 8) {
				return true
			}
		}
	}

	// If no issues found, return false
	return false
}
