export const titleToSlugConverter = (title: string): string => {
	if (!title) return '';

	return title
		.toLowerCase()
		.replace(/['’]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
};

export const slugToTitleConverter = (slug: string): string => {
	if (!slug) return '';

	const words = slug.split('-');

	const capitalized = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	);

	return capitalized.join(' ');
};
