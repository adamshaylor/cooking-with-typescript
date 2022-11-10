/**
 * Let's say we have a web service. It accepts mostly the same payloads
 * as it returns. The only difference is that it returns objects saved
 * to a database with an `id` property.
 */

type Saved<T> = T & { id: number }

/**
 * Here's an object we might want to save.
 */

interface Image {
  name: string
  mimeType: `image/${ 'png' | 'webp' | 'jpeg' }`
  width: number
  height: number
}

/**
 * Now let's say we need to write a function that returns the image URL
 * by id.
 */

const getImageUrl = (image: Saved<Image>): string =>
  `https://example.com/images/${ image.id }`;

/**
 * Now let's say we have an unsaved image.
 */

const image: Image = {
  name: 'Paeonia officinalis',
  mimeType: 'image/png',
  width: 600,
  height: 600
};

/**
 * But we can't get the URL. Why not?
 */

// getImageUrl(image);
