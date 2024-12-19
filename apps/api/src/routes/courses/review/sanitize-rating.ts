export function sanitizeCachedNumericValue(rating: number | null) {
  if (rating == null || rating < 0) return null;
  return rating;
}
