export default {
	LOGO_URL:
		'https://firebasestorage.googleapis.com/v0/b/emizmusic.appspot.com/o/sheruta%2FCUBE%20HOUSE%20JOSHUA%20IT.png?alt=media&token=31eb5ee6-a36e-4c66-b45c-ac85adb2458e',
	VERIFIED_BADGE:
		'https://cdn2.iconfinder.com/data/icons/essentials-volume-i/128/verified-green-512.png',
	isMobile: window?.innerWidth < 800,
	PLACEHOLDER_IMG:
		'https://oaan.org/wp-content/themes/consultix/images/no-image-found-360x250.png',
	USER_PLACEHOLDER_AVATAR:
		'https://www.nicepng.com/png/full/514-5146455_premium-home-loan-icon-download-in-svg-png.png',
	ADD_IMG:
		'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png',
	APP_URL: 'http://localhost:3000',
	API_URL: 'http://localhost:1337',
	PLATFORM: window.navigator?.platform,
}

export const all_states = [
    "Abuja",
    // "Abia",
    // "Adamawa",
    // "Akwa Ibom",
    // "Anambra",
    // "Bauchi",
    // "Bayelsa",
    // "Benue",
    // "Borno",
    // "Cross River",
    // "Delta",
    // "Ebonyi",
    // "Edo",
    // "Ekiti",
    // "Enugu",
    // "Gombe",
    // "Imo",
    // "Jigawa",
    // "Kaduna",
    // "Kano",
    // "Katsina",
    // "Kebbi",
    // "Kogi",
    // "Kwara",
    "Lagos",
    // "Nassarawa",
    // "Niger",
    // "Ogun",
    // "Ondo",
    // "Osun",
    // "Oyo",
    // "Plateau",
    // "Rivers",
    // "Sokoto",
    // "Taraba",
    // "Yobe",
    // "Zamfara",
].map((val) => {
    return val.replace(" ","-").toLocaleLowerCase();
});

