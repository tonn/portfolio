import { addDays, addYears } from "date-fns";
import { TimeIntervalsLength } from "./TimeIntervalsLength";

jest.setTimeout(3000);

describe('Calculate time length of array of time intervals', () => {
  const now = new Date();

  test.each([
    { name: 'empty', intervals: [] as Interval[], expected: 0 },
    { name: 'interval with no length', intervals: [{ start: now, end: now }], expected: 0 },
    { name: 'interval with 1 year length', intervals: [{ start: now, end: addYears(now, 1) }], expected: 1 },
    { name: 'two non-intersected intervals', 
      intervals: [
        { start: now, end: addDays(now, 100) },
        { start: addDays(now, 200), end: addYears(now, 1)}], 
      expected: 1 },
    { name: 'two intersected intervals', 
      intervals: [
        { start: now, end: addDays(now, 200) },
        { start: addDays(now, 100), end: addYears(now, 1)}], 
      expected: 1 },
    { name: 'two intervals, second inside first', 
      intervals: [
        { start: now, end: addYears(now, 1) },
        { start: addDays(now, 100), end: addDays(now, 200)}], 
      expected: 1 },
    // { name: 'fro real data',
    //   intervals: [{"start":"2016-06-30T20:00:00.000Z","end":"2021-10-15T08:19:13.320Z"},{"start":"2017-06-30T20:00:00.000Z","end":"2017-09-30T20:00:00.000Z"},{"start":"2016-11-30T20:00:00.000Z","end":"2017-09-30T20:00:00.000Z"},{"start":"2020-03-31T20:00:00.000Z","end":"2021-10-15T08:19:13.320Z"},{"start":"2017-03-31T20:00:00.000Z","end":"2021-10-15T08:19:13.320Z"},{"start":"2016-11-30T20:00:00.000Z","end":"2016-11-30T20:00:00.000Z"},{"start":"2016-01-31T20:00:00.000Z","end":"2016-05-31T20:00:00.000Z"}]
    //     .map(i => ({ start: new Date(i.start), end: new Date(i.end) })),
    //   expected: 0}
  ])('%s', ({ intervals, expected }) => {
    expect(Math.round(TimeIntervalsLength(intervals))).toBe(expected);
  });
});