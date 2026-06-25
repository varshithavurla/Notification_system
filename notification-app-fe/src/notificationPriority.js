const TYPE_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const getTopNNotifications = (notifications, n) => {
  if (!Array.isArray(notifications)) return [];

  return [...notifications]
    .sort((a, b) => {
      const scoreA =
        (TYPE_WEIGHT[a.Type] || 0) +
        new Date(a.Timestamp).getTime() / 1000000;

      const scoreB =
        (TYPE_WEIGHT[b.Type] || 0) +
        new Date(b.Timestamp).getTime() / 1000000;

      return scoreB - scoreA;
    })
    .slice(0, n);
};