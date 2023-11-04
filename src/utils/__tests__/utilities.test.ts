import { describe, expect, it } from 'vitest';
import { dummyBooks } from '~/test/dummyData';
import { findUnique } from '../utilities';

const uniquePublishers = [
  'No Starch Press',
  "O'Reilly Media",
  'Independently published',
  'Apress; 2nd edition',
  'Apress',
];

describe('findUnique', () => {
  it('should find the unique values of the given key', () => {
    const result = findUnique(dummyBooks.books, 'publisher');

    expect(result).toEqual(uniquePublishers);
  });
});
