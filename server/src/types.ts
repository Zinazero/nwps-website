export interface Park {
	id: number;
	title: string;
	location: string;
	description: string;
	blurb: string;
}

export interface ParkOrder {
	id: number;
	sort_order: number;
}

export interface Section {
  title: string;
  description: string;
  location: string;
}

export interface PortfolioSection {
	id: number;
	park_id: number;
	title: string;
	description: string;
}
