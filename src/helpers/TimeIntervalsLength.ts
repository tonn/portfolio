import { areIntervalsOverlapping, differenceInDays, max, min } from 'date-fns';

export function TimeIntervalsLength(intervals: Interval[]): number {
  if (intervals.length === 0) {
    return 0;
  } else if (intervals.length > 1) {
    for (let i = 0; i < intervals.length - 1; ++i) {
      for (let j = i + 1; j < intervals.length; ++j) {
        const ii = intervals[i];
        const ij = intervals[j];

        if (areIntervalsOverlapping(ii, ij, { inclusive: true })) {
          intervals.splice(j, 1);
          intervals.splice(i, 1);
          intervals.push({ start: min([ii.start, ij.start]), end: max([ii.end, ij.end]) });
          
          i = 0; // restart 
          break;
        } 
      }
    }
  }

  return intervals.map(i => differenceInDays(i.end, i.start)).reduce((sum, current) => sum + current, 0) / 365;
}