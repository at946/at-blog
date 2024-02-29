import { createAuthorizationHeader, toAmzDate } from './auth/SignHelper';

export interface IFAmazonItem {
	name: string;
	href: string;
	imageSrc: string;
}

const getItem = async (itemId: string): IFAmazonItem => {
	const accessKey: string = import.meta.env.PAAPI_ACCESS_KEY;
	const secretKey: string = import.meta.env.PAAPI_SECRET_KEY;
	const partnerTag: string = import.meta.env.PAAPI_PARTNER_TAG;
	const host: string = 'webservices.amazon.co.jp';
	const region: string = 'us-west-2';
	const service: string = 'ProductAdvertisingAPI';
	const path: string = '/paapi5/getitems';
	const timestamp: Date = Date.now();
	const httpMethod: string = 'POST';
	const url: string = `https://${host}${path}`;

	const payload = {
		ItemIds: [itemId],
		PartnerTag: partnerTag,
		PartnerType: 'Associates',
		Resources: [
			'Images.Primary.Large',
			'ItemInfo.Title',
			'ItemInfo.ByLineInfo',
		],
	};

	const requestHeaders = {
		'content-encoding': 'amz-1.0',
		'content-type': 'application/json; charset=utf-8',
		host: host,
		'x-amz-target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems',
		'x-amz-date': toAmzDate(timestamp),
	};

	const authorizationHeader: string = createAuthorizationHeader(
		accessKey,
		secretKey,
		requestHeaders,
		httpMethod,
		path,
		payload,
		region,
		service,
		timestamp,
	);

	requestHeaders['Authorization'] = authorizationHeader;

	const options = {
		method: httpMethod,
		headers: requestHeaders,
		body: JSON.stringify(payload),
	};

	const res = await fetch(url, options);
	const resJson = await res.json();

	if (resJson.Errors) {
		const error: { Code: string; Message: string } = resJson.Errors[0];
		throw `${error.Code} | ${error.Message}`;
	}

	const rawItemJson = resJson.ItemsResult.Items[0];
	let contributors: string = '';
	for (const contributer of rawItemJson.ItemInfo.ByLineInfo.Contributors) {
		contributors += `${contributer.Name} (${contributer.Role}), `;
	}
	contributors = contributors.slice(0, -2);

	const item: IFAmazonItem = {
		name: rawItemJson.ItemInfo.Title.DisplayValue,
		href: rawItemJson.DetailPageURL,
		imageSrc: rawItemJson.Images.Primary.Large.URL,
		contributors: contributors.slice(),
		manufacturer: rawItemJson.ItemInfo.ByLineInfo.Manufacturer.DisplayValue,
	};

	return item;
};

export default getItem;
