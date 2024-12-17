export function calculateRating(ratings: { rating: number; _count: number }[]) {
  const totalRating = ratings.reduce(
    (acc, { rating, _count }) => acc + rating * _count,
    0,
  );
  if (totalRating === 0) return null;
  const reviewCount = ratings.reduce((acc, { _count }) => acc + _count, 0);
  return totalRating / reviewCount;
}
