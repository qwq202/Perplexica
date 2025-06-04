import { describe, it, expect } from 'vitest';
import { mergeConfigs } from '../src/lib/config';

describe('mergeConfigs', () => {
  it('merges nested objects', () => {
    const current = { a: 1, b: { c: 2, d: 3 } };
    const update = { b: { c: 4, e: 5 }, f: 6 };
    const result = mergeConfigs(current, update);
    expect(result).toEqual({ a: 1, b: { c: 4, d: 3, e: 5 }, f: 6 });
  });

  it('returns current when update is null or undefined', () => {
    const current = { a: 1 };
    expect(mergeConfigs(current, null as any)).toEqual(current);
    expect(mergeConfigs(current, undefined as any)).toEqual(current);
  });

  it('ignores undefined values in update', () => {
    const current = { a: 1 };
    const result = mergeConfigs(current, { a: undefined } as any);
    expect(result).toEqual({ a: 1 });
  });

  it('overwrites with null values', () => {
    const current = { a: 1 };
    const result = mergeConfigs(current, { a: null } as any);
    expect(result).toEqual({ a: null });
  });
});
