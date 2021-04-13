import { nanoid } from 'nanoid';

import createArchiveID from './create-id.js';

jest.mock('nanoid');
nanoid.mockReturnValue('randomID');

describe('Create archive ID', () => {
  it('should create an id with date and random identifier', () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const expected = `${year}${month}${day}randomID`;
    expect(createArchiveID()).toBe(expected);
  });
});
