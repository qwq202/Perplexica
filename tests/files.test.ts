import { describe, it, expect } from 'vitest';
import { sanitizeFileId } from '../src/lib/utils/files';

describe('sanitizeFileId', () => {
  it('throws an error for path traversal attempts', () => {
    expect(() => sanitizeFileId('../etc/passwd')).toThrowError();
    expect(() => sanitizeFileId('..\\etc\\passwd')).toThrowError();
    expect(() => sanitizeFileId('foo/../../bar')).toThrowError();
  });

  it('allows simple ids', () => {
    expect(sanitizeFileId('abc123')).toBe('abc123');
  });
});
