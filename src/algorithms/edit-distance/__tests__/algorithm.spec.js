import { createDpTable } from "../algorithm";

const editDistanceValue = (word1, word2) => {
  const table = createDpTable(word1, word2);
  const lastRow = table[table.length - 1];
  return lastRow[lastRow.length - 1];
};

it("should work with update", () => {
  expect(editDistanceValue("abz", "abx")).toBe(1);
  expect(editDistanceValue("abz", "axz")).toBe(1);
  expect(editDistanceValue("abz", "xbz")).toBe(1);
});

it("should work with delete", () => {
  expect(editDistanceValue("", "")).toBe(0);
  expect(editDistanceValue("abz", "ab")).toBe(1);
  expect(editDistanceValue("abz", "a")).toBe(2);
  expect(editDistanceValue("abz", "")).toBe(3);
});

it("should work with add from empty", () => {
  expect(editDistanceValue("", "a")).toBe(1);
  expect(editDistanceValue("", "ab")).toBe(2);
  expect(editDistanceValue("", "abc")).toBe(3);
});

it("should work with add from front and back", () => {
  expect(editDistanceValue("a", "ac")).toBe(1);
  expect(editDistanceValue("a", "ba")).toBe(1);
});

it("should work with add from front middle and back", () => {
  expect(editDistanceValue("ab", "cab")).toBe(1);
  expect(editDistanceValue("ab", "abc")).toBe(1);
  expect(editDistanceValue("ab", "acb")).toBe(1);
});
