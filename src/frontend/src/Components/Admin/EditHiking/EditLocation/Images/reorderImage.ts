export const reorderImages: (
  images: number[],
  source: number,
  destination: number | undefined,
) => number[] = (images, source, destination) => {
  if (destination) {
    const image = images.find((_image, i) => source === i);
    if (image === undefined) {
      return images;
    }
    const imagesWithoutSource = images.filter((_image, i) => i !== source);
    return imagesWithoutSource.reduce(
      (acc: number[], curr, currentIndex) =>
        destination !== currentIndex + 1
          ? destination === 0 && currentIndex === 0
            ? [...acc, image, curr]
            : [...acc, curr]
          : [...acc, curr, image],
      [],
    );
  }
  return images;
};
