export const titleToSlugConverter = (title: string): string => {
	if (!title) return '';

	return title
		.toLowerCase()
		.replace(/['’]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
};
