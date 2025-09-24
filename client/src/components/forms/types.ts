export type Section = ParkSection | ProductsSection;

export interface ParkSection {
	title: string;
	description: string;
	image: File | null;
}

export interface ProductsSection {
	title: string;
	subheading?: string;
	description: string;
	image: File | null;
	externalLink?: string;
}

export type SectionFormProps =
  | {
      formType: 'park';
      section: ParkSection;
      index: number;
      setSection: (section: ParkSection) => void;
      dropSection: (index: number, section: ParkSection) => void;
    }
  | {
      formType: 'products';
      section: ProductsSection;
      index: number;
      setSection: (section: ProductsSection) => void;
      dropSection: (index: number, section: ProductsSection) => void;
    };

