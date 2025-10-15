export interface ParkOrder {
	id: number;
	sort_order: number;
}

export interface PortfolioSection {
	id: number;
	park_id: number;
	title: string;
	description: string;
}

export interface ProductOrder {
	id: number;
	sort_order: number;
}

export interface ProductsSection {
	id: number;
	products_id: number;
	title: string;
	subheading?: string;
	description: string;
	externalLink?: string;
}
