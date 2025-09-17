export interface Section {
  title: string;
  description: string;
  location: string;
}

export interface Park {
	id: number;
	title: string;
	location: string;
	description: string;
}

export interface PortfolioSection {
	id: number;
	park_id: number;
	title: string;
	description: string;
}
