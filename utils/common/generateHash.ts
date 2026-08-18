import { createHash } from 'node:crypto';

export default function generateHash(value: string): string {
	return createHash('sha256').update(value).digest('hex');
}
