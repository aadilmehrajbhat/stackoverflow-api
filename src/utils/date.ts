const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function getReadableDate(timeInSeconds: number) {
  const epoch = new Date(1970, 0, 1);
  epoch.setSeconds(timeInSeconds);

  const dayOfMonth = epoch.getDate();
  const month = MONTHS[epoch.getMonth()];
  const year = epoch.getFullYear();
  const hours = epoch.getHours();
  const minutes = epoch.getMinutes();
  const ampm = hours > 12 ? 'PM' : 'AM';

  const formatDigits = (digit: number) => (digit < 10 ? '0' + digit : digit);

  return `${formatDigits(dayOfMonth)}-${month}-${year} ${formatDigits(
    hours % 12,
  )}:${formatDigits(minutes)} ${ampm}`;
}
