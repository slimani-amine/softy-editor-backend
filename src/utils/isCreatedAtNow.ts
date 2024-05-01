export function isCreatedAtNow(createdAt: Date): boolean {
  const now = new Date();

  const threshold = 60 * 60 * 100000;
  const diff = Math.abs(now.getTime() - createdAt.getTime());

  return diff - threshold < 3600000;
}
