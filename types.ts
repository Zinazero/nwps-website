export type Park = {
	id: number;
	title: string;
	location: string;
	description: string;
	blurb: string;
    slug: string;
}

export type ProductsCategory = {
	id: number;
	title: string;
	subheading?: string;
	description: string;
	slug: string;
}

export type Provider = {
	title: string;
	blurb?: string;
	description?: string;
	externalLink: string;
	slug: string;
}
