const localCountryFlags = {
	australia: '/flags/australia.svg',
	australien: '/flags/australia.svg',
	deutschland: '/flags/germany.svg',
	germany: '/flags/germany.svg',
	kosovo: '/flags/kosovo.svg',
	katar: '/flags/qatar.svg',
	mazedonien: '/flags/north-macedonia.svg',
	mk: '/flags/north-macedonia.svg',
	'north macedonia': '/flags/north-macedonia.svg',
	nordmazedonien: '/flags/north-macedonia.svg',
	qatar: '/flags/qatar.svg',
	schweiz: '/flags/switzerland.svg',
	sweden: '/flags/sweden.svg',
	schweden: '/flags/sweden.svg',
	switzerland: '/flags/switzerland.svg',
	usa: '/flags/usa.svg'
};

const countryCodes = {
	afghanistan: 'AF',
	albania: 'AL',
	albanien: 'AL',
	algeria: 'DZ',
	algerien: 'DZ',
	andorra: 'AD',
	angola: 'AO',
	'antigua and barbuda': 'AG',
	argentina: 'AR',
	argentinien: 'AR',
	armenia: 'AM',
	armenien: 'AM',
	australia: 'AU',
	australien: 'AU',
	austria: 'AT',
	oesterreich: 'AT',
	osterreich: 'AT',
	azerbaijan: 'AZ',
	aserbaidschan: 'AZ',
	bahamas: 'BS',
	bahrain: 'BH',
	bangladesh: 'BD',
	barbados: 'BB',
	belarus: 'BY',
	belgium: 'BE',
	belgien: 'BE',
	belize: 'BZ',
	benin: 'BJ',
	bhutan: 'BT',
	bolivia: 'BO',
	bolivien: 'BO',
	'bosnia and herzegovina': 'BA',
	'bosnien und herzegowina': 'BA',
	botswana: 'BW',
	brazil: 'BR',
	brasilien: 'BR',
	brunei: 'BN',
	bulgaria: 'BG',
	bulgarien: 'BG',
	'burkina faso': 'BF',
	burundi: 'BI',
	cambodia: 'KH',
	kambodscha: 'KH',
	cameroon: 'CM',
	kamerun: 'CM',
	canada: 'CA',
	kanada: 'CA',
	'central african republic': 'CF',
	'zentralafrikanische republik': 'CF',
	'cape verde': 'CV',
	'cabo verde': 'CV',
	kapverde: 'CV',
	'chad': 'TD',
	tschad: 'TD',
	chile: 'CL',
	china: 'CN',
	'cote d ivoire': 'CI',
	"cote d'ivoire": 'CI',
	'ivory coast': 'CI',
	elfenbeinkueste: 'CI',
	elfenbeinkuste: 'CI',
	colombia: 'CO',
	kolumbien: 'CO',
	comoros: 'KM',
	komoren: 'KM',
	congo: 'CG',
	'dr congo': 'CD',
	'dr kongo': 'CD',
	'democratic republic of the congo': 'CD',
	'demokratische republik kongo': 'CD',
	'costa rica': 'CR',
	croatia: 'HR',
	kroatien: 'HR',
	cuba: 'CU',
	kuba: 'CU',
	cyprus: 'CY',
	zypern: 'CY',
	czechia: 'CZ',
	tschechien: 'CZ',
	denmark: 'DK',
	daenemark: 'DK',
	danemark: 'DK',
	djibouti: 'DJ',
	dominica: 'DM',
	'dominican republic': 'DO',
	'dominikanische republik': 'DO',
	ecuador: 'EC',
	egypt: 'EG',
	aegypten: 'EG',
	agypten: 'EG',
	'el salvador': 'SV',
	england: 'GB-ENG',
	'equatorial guinea': 'GQ',
	'aequatorialguinea': 'GQ',
	'aquatorialguinea': 'GQ',
	'eritrea': 'ER',
	estonia: 'EE',
	estland: 'EE',
	eswatini: 'SZ',
	ethiopia: 'ET',
	aethiopien: 'ET',
	athiopien: 'ET',
	fiji: 'FJ',
	fidschi: 'FJ',
	finland: 'FI',
	france: 'FR',
	frankreich: 'FR',
	gabon: 'GA',
	gambia: 'GM',
	georgia: 'GE',
	georgien: 'GE',
	germany: 'DE',
	deutschland: 'DE',
	ghana: 'GH',
	greece: 'GR',
	griechenland: 'GR',
	grenada: 'GD',
	guatemala: 'GT',
	guinea: 'GN',
	'guinea-bissau': 'GW',
	guyana: 'GY',
	haiti: 'HT',
	honduras: 'HN',
	hungary: 'HU',
	ungarn: 'HU',
	iceland: 'IS',
	island: 'IS',
	india: 'IN',
	indien: 'IN',
	indonesia: 'ID',
	indonesien: 'ID',
	iran: 'IR',
	iraq: 'IQ',
	irak: 'IQ',
	ireland: 'IE',
	irland: 'IE',
	israel: 'IL',
	italy: 'IT',
	italien: 'IT',
	jamaica: 'JM',
	japan: 'JP',
	jordan: 'JO',
	jordanien: 'JO',
	kazakhstan: 'KZ',
	kasachstan: 'KZ',
	kenya: 'KE',
	kenia: 'KE',
	kiribati: 'KI',
	kosovo: 'XK',
	kuwait: 'KW',
	kyrgyzstan: 'KG',
	kirgisistan: 'KG',
	laos: 'LA',
	latvia: 'LV',
	lettland: 'LV',
	lebanon: 'LB',
	libanon: 'LB',
	lesotho: 'LS',
	liberia: 'LR',
	libya: 'LY',
	libyen: 'LY',
	liechtenstein: 'LI',
	lithuania: 'LT',
	litauen: 'LT',
	luxembourg: 'LU',
	luxemburg: 'LU',
	madagascar: 'MG',
	madagaskar: 'MG',
	malawi: 'MW',
	malaysia: 'MY',
	malaysia: 'MY',
	maldives: 'MV',
	malediven: 'MV',
	mali: 'ML',
	malta: 'MT',
	'marshall islands': 'MH',
	marshallinseln: 'MH',
	mauritania: 'MR',
	mauretanien: 'MR',
	mauritius: 'MU',
	mexico: 'MX',
	mexiko: 'MX',
	micronesia: 'FM',
	mikronesien: 'FM',
	moldova: 'MD',
	moldawien: 'MD',
	monaco: 'MC',
	mongolia: 'MN',
	mongolei: 'MN',
	montenegro: 'ME',
	morocco: 'MA',
	marokko: 'MA',
	mozambique: 'MZ',
	mosambik: 'MZ',
	myanmar: 'MM',
	namibia: 'NA',
	nauru: 'NR',
	nepal: 'NP',
	netherlands: 'NL',
	niederlande: 'NL',
	'new zealand': 'NZ',
	neuseeland: 'NZ',
	nicaragua: 'NI',
	niger: 'NE',
	nigeria: 'NG',
	'north korea': 'KP',
	nordkorea: 'KP',
	'north macedonia': 'MK',
	nordmazedonien: 'MK',
	mazedonien: 'MK',
	norway: 'NO',
	norwegen: 'NO',
	'northern ireland': 'GB-NIR',
	nordirland: 'GB-NIR',
	oman: 'OM',
	pakistan: 'PK',
	palau: 'PW',
	palestine: 'PS',
	palaestina: 'PS',
	palastina: 'PS',
	panama: 'PA',
	'papua new guinea': 'PG',
	'papua-neuguinea': 'PG',
	paraguay: 'PY',
	peru: 'PE',
	philippines: 'PH',
	philippinen: 'PH',
	poland: 'PL',
	polen: 'PL',
	portugal: 'PT',
	qatar: 'QA',
	katar: 'QA',
	romania: 'RO',
	rumaenien: 'RO',
	rumanien: 'RO',
	russia: 'RU',
	russland: 'RU',
	rwanda: 'RW',
	ruanda: 'RW',
	'saint kitts and nevis': 'KN',
	'saint lucia': 'LC',
	'saint vincent and the grenadines': 'VC',
	'saint vincent und die grenadinen': 'VC',
	samoa: 'WS',
	'san marino': 'SM',
	'sao tome and principe': 'ST',
	'saudi arabia': 'SA',
	'saudi-arabien': 'SA',
	senegal: 'SN',
	serbia: 'RS',
	serbien: 'RS',
	seychelles: 'SC',
	seychellen: 'SC',
	scotland: 'GB-SCT',
	schottland: 'GB-SCT',
	'sierra leone': 'SL',
	singapore: 'SG',
	singapur: 'SG',
	slovakia: 'SK',
	slowakei: 'SK',
	slovenia: 'SI',
	slowenien: 'SI',
	'solomon islands': 'SB',
	salomonen: 'SB',
	somalia: 'SO',
	'south africa': 'ZA',
	suedafrika: 'ZA',
	sudafrika: 'ZA',
	'south korea': 'KR',
	suedkorea: 'KR',
	sudkorea: 'KR',
	'south sudan': 'SS',
	suedsudan: 'SS',
	sudsudan: 'SS',
	spain: 'ES',
	spanien: 'ES',
	'sri lanka': 'LK',
	sudan: 'SD',
	suriname: 'SR',
	sweden: 'SE',
	schweden: 'SE',
	switzerland: 'CH',
	schweiz: 'CH',
	syria: 'SY',
	syrien: 'SY',
	taiwan: 'TW',
	tajikistan: 'TJ',
	tadschikistan: 'TJ',
	tanzania: 'TZ',
	tansania: 'TZ',
	thailand: 'TH',
	timor: 'TL',
	'timor-leste': 'TL',
	togo: 'TG',
	tonga: 'TO',
	'trinidad and tobago': 'TT',
	'trinidad und tobago': 'TT',
	tunisia: 'TN',
	tunesien: 'TN',
	turkey: 'TR',
	tuerkei: 'TR',
	turkei: 'TR',
	turkmenistan: 'TM',
	tuvalu: 'TV',
	uganda: 'UG',
	ukraine: 'UA',
	'united arab emirates': 'AE',
	'vereinigte arabische emirate': 'AE',
	'united kingdom': 'GB',
	'grossbritannien': 'GB',
	'great britain': 'GB',
	'uruguay': 'UY',
	usa: 'US',
	'united states': 'US',
	'united states of america': 'US',
	'vereinigte staaten': 'US',
	us: 'US',
	uzbekistan: 'UZ',
	usbekistan: 'UZ',
	vanuatu: 'VU',
	vatican: 'VA',
	vatikan: 'VA',
	venezuela: 'VE',
	vietnam: 'VN',
	wales: 'GB-WLS',
	walisisch: 'GB-WLS',
	yemen: 'YE',
	jemen: 'YE',
	zambia: 'ZM',
	sambia: 'ZM',
	zimbabwe: 'ZW'
};

function normalizeCountryName(country) {
	return String(country ?? '')
		.trim()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/ä/g, 'ae')
		.replace(/ö/g, 'oe')
		.replace(/ü/g, 'ue');
}

function countryCodeToFlagEmoji(countryCode) {
	if (!countryCode || countryCode.includes('-')) {
		return '';
	}

	return countryCode
		.toUpperCase()
		.replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function countryCodeToFlagUrl(countryCode) {
	if (!countryCode) {
		return '';
	}

	return `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
}

function toDisplayName(countryName) {
	const lowercaseWords = new Set(['and', 'of', 'the']);

	return countryName
		.split(' ')
		.map((part, index) =>
			index > 0 && lowercaseWords.has(part)
				? part
				: part.charAt(0).toUpperCase() + part.slice(1)
		)
		.join(' ');
}

const countryNamesByCode = new Map();

for (const [countryName, countryCode] of Object.entries(countryCodes)) {
	if (!countryCode.includes('-') && !countryNamesByCode.has(countryCode)) {
		countryNamesByCode.set(countryCode, toDisplayName(countryName));
	}
}

export const opponentCountries = Array.from(countryNamesByCode.entries())
	.filter(([countryCode]) => countryCode !== 'CH')
	.map(([countryCode, name]) => ({
		code: countryCode,
		name,
		flagUrl: countryCodeToFlagUrl(countryCode)
	}))
	.sort((countryA, countryB) => countryA.name.localeCompare(countryB.name));

const opponentCountryNames = new Set(opponentCountries.map((country) => normalizeCountryName(country.name)));

export function getCountryCode(country) {
	return countryCodes[normalizeCountryName(country)] ?? '';
}

export function getCountryDisplayName(country) {
	const countryCode = getCountryCode(country);
	return countryNamesByCode.get(countryCode) ?? country;
}

export function isSelectableOpponent(country) {
	return opponentCountryNames.has(normalizeCountryName(country));
}

export function getCountryFlagUrl(country) {
	const normalizedCountry = normalizeCountryName(country);
	return localCountryFlags[normalizedCountry] ?? countryCodeToFlagUrl(countryCodes[normalizedCountry]);
}

export function getCountryFlagEmoji(country) {
	return countryCodeToFlagEmoji(getCountryCode(country));
}

export function getCountryFlag(country) {
	return {
		url: getCountryFlagUrl(country),
		emoji: getCountryFlagEmoji(country)
	};
}
