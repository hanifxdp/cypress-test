// * Test Passed

import { faker } from "@faker-js/faker";

let accessToken;
let bankId;
const BankNameType = {
	MANDIRI: "mandiri",
	BRI: "bri",
	BNI: "bni",
	BCA: "bca",
	BSM: "bsm",
	CIMB: "cimb",
	MUAMALAT: "muamalat",
	DANAMON: "danamon",
	PERMATA: "permata",
	BII: "bii",
	PANIN: "panin",
	UOB: "uob",
	OCBC: "ocbc",
	CITIBANK: "citibank",
	ARTHA: "artha",
	TOKYO: "tokyo",
	DBS: "dbs",
	STANDARD_CHARTERED: "standard_chartered",
	CAPITAL: "capital",
	ANZ: "anz",
	BOC: "boc",
	BUMI_ARTA: "bumi_arta",
	HSBC: "hsbc",
	RABOBANK: "rabobank",
	MAYAPADA: "mayapada",
	BJB: "bjb",
	DKI: "dki",
	DAERAH_ISTIMEWA: "daerah_istimewa",
	JAWA_TENGAH: "jawa_tengah",
	JAWA_TIMUR: "jawa_timur",
	JAMBI: "jambi",
	SUMUT: "sumut",
	SUMATERA_BARAT: "sumatera_barat",
	RIAU_DAN_KEPRI: "riau_dan_kepri",
	SUMSEL_DAN_BABEL: "sumsel_dan_babel",
	LAMPUNG: "lampung",
	KALIMANTAN_SELATAN: "kalimantan_selatan",
	KALIMANTAN_BARAT: "kalimantan_barat",
	KALIMANTAN_TIMUR: "kalimantan_timur",
	KALIMANTAN_TENGAH: "kalimantan_tengah",
	SULSELBAR: "sulselbar",
	SULUT: "sulut",
	NUSA_TENGGARA_BARAT: "nusa_tenggara_barat",
	BALI: "bali",
	NUSA_TENGGARA_TIMUR: "nusa_tenggara_timur",
	MALUKU: "maluku",
	PAPUA: "papua",
	BENGKULU: "bengkulu",
	SULAWESI: "sulawesi",
	SULAWESI_TENGGARA: "sulawesi_tenggara",
	NUSANTARA_PARAHYANGAN: "nusantara_parahyangan",
	INDIA: "india",
	MESTIKA_DHARMA: "mestika_dharma",
	SINARMAS: "sinarmas",
	MASPION: "maspion",
	GANESHA: "ganesha",
	ICBC: "icbc",
	QNB_KESAWAN: "qnb_kesawan",
	BTN: "btn",
	WOORI: "woori",
	TABUNGAN_PENSIUNAN_NASIONAL: "tabungan_pensiunan_nasional",
	BTPN_SYR: "btpn_syr",
	BJB_SYR: "bjb_syr",
	MEGA: "mega",
	BUKOPIN: "bukopin",
	BUKOPIN_SYR: "bukopin_syr",
	JASA_JAKARTA: "jasa_jakarta",
	HANA: "hana",
	MNC_INTERNASIONAL: "mnc_internasional",
	AGRONIAGA: "agroniaga",
	SBI_INDONESIA: "sbi_indonesia",
	ROYAL: "royal",
	NATIONALNOBU: "nationalnobu",
	MEGA_SYR: "mega_syr",
	INA_PERDANA: "ina_perdana",
	SAHABAT_SAMPOERNA: "sahabat_sampoerna",
	KESEJAHTERAAN_EKONOMI: "kesejahteraan_ekonomi",
	BCA_SYR: "bca_syr",
	ARTOS: "artos",
	MAYORA: "mayora",
	INDEX_SELINDO: "index_selindo",
	VICTORIA_INTERNASIONAL: "victoria_internasional",
	AGRIS: "agris",
	CHINATRUST: "chinatrust",
	COMMONWEALTH: "commonwealth",
	VICTORIA_SYR: "victoria_syr",
	BANTEN: "banten",
	MUTIARA: "mutiara",
	PANIN_SYR: "panin_syr",
	ACEH: "aceh",
	ANTARDAERAH: "antardaerah",
	CCB: "ccb",
	CNB: "cnb",
	DINAR: "dinar",
	EKA: "eka",
	HARDA: "harda",
	MANTAP: "mantap",
	MAS: "mas",
	PRIMA: "prima",
	SHINHAN: "shinhan",
	YUDHA_BAKTI: "yudha_bakti",
	GOPAY: "gopay",
	OVO: "ovo",
	SHOPEEPAY: "shopeepay",
	DANA: "dana",
	LINKAJA: "linkaja",
};

const option = {
	method: "POST",
	url: `${Cypress.env("back_url")}/auth/sign-in`,
	body: {
		identifier: `${Cypress.env("user").usernameHanif}`,
		password: `${Cypress.env("user").passwordHanif}`,
	},
};

before(() => {
	cy.request(option).then((res) => {
		accessToken = res.body.access_token;
	});
});

describe(`bank-account-test`, () => {
	it(`create-bank-test`, () => {
		cy.request({
			method: "POST",
			url: `${Cypress.env("back_url")}/bank-accounts`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			body: {
				bankName: faker.helpers.objectValue(BankNameType, { max: 1 }),
				accountNumber: faker.finance.accountNumber(),
				accountName: faker.person.fullName(),
			},
		}).then((res) => {
			bankId = res.body.id;
			expect(res.body.id).is.not.null;
			expect(res.body.bankName).is.not.null;
			expect(res.body.accountNumber).is.not.null;
			expect(res.body.accountName).is.not.null;
		});
	});
	it(`GET-bank-test`, () => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/bank-accounts`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {
			bankId = res.body.data[0].id;
			expect(res.body.total).is.above(0);
			expect(res.body.data).is.not.null;
		});
	});
	it(`GET-one-bank-test`, () => {
		cy.request({
			method: "GET",
			url: `${Cypress.env("back_url")}/bank-accounts/${bankId}`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {
			expect(res.body.id).is.not.null;
			expect(res.body.accountName).is.a("string");
			expect(res.body.accountNumber).is.a("string");
		});
	});
	it(`PUT-bank-test`, () => {
		cy.request({
			method: "PUT",
			url: `${Cypress.env("back_url")}/bank-accounts/${bankId}`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
			body: {
				bankName: "bri",
				accountNumber: faker.finance.accountNumber(),
				accountName: faker.person.fullName(),
			},
		}).then((res) => {
			expect(res.body.id).is.not.null;
		});
	});
	it(`DELETE-bank-test`, () => {
		cy.request({
			method: "DELETE",
			url: `${Cypress.env("back_url")}/bank-accounts/${bankId}`,
			headers: {
				authorization: `bearer ${accessToken}`,
			},
		}).then((res) => {
			expect(res.body.id).is.not.null;
		});
	});
});
