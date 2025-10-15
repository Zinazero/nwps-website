export interface Testimonial {
	title: string;
	blurb: string;
	imageSrc: string;
	skipMask?: boolean;
}

export interface LinkType {
	label: string;
	to: string;
	isDropdown?: boolean;
}
