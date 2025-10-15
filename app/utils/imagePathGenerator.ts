export const imagePathGenerator = (folder: string, slug: string, id: string) => {
    return `/images/${folder}/${slug}/${slug}-${id}.jpg`
};
