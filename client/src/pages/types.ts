export interface Park {
	id: number;
	title: string;
	location: string;
	description: string;
	blurb: string;
}

export interface ProductsCategory {
	id: number;
	title: string;
	description: string;
}

export interface Provider {
	title: string;
	blurb?: string;
	description?: string;
	externalLink: string;
	logoSrc: string;
	slug: string;
}

export interface Testimonial {
	title: string;
	blurb: string;
	imageSrc: string;
	skipMask?: boolean;
}
