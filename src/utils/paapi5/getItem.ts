import { createAuthorizationHeader, toAmzDate } from './auth/SignHelper';

export interface IFAmazonItem {
	name: string;
	href: string;
	imageSrc: string;
}

const getItem = async (itemId: string): IFAmazonItem => {
	const accessKey: string = import.meta.env.PAAPI_ACCESS_KEY;
	const secretKey: string = import.meta.env.PAAPI_SECRET_KEY;
	const host: string = 'webservices.amazon.co.jp';
	const region: string = 'us-west-2';
	const service: string = 'ProductAdvertisingAPI';
	const timestamp: Date = Date.now();
	const httpMethod: string = 'POST';
	const path: string = '/paapi5/getitems';
	const url: string = `https://${host}${path}`;

	const payload = {
		ItemIds: [itemId],
		PartnerTag: 'at946-22',
		PartnerType: 'Associates',
		Resources: ['Images.Primary.Large', 'ItemInfo.Title'],
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
	const item = resJson.ItemsResult.Items[0];
	const amazonItem: IFAmazonItem = {
		name: item.ItemInfo.Title.DisplayValue,
		href: item.DetailPageURL,
		imageSrc: item.Images.Primary.Large.URL,
	};
	return amazonItem;
};

export default getItem;
