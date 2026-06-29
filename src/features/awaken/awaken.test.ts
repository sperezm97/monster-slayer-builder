import { describe, expect, it } from 'vitest';
import { AwakenPage } from './awaken.page';

describe('awaken', () => {
  it('exports its page component', () => {
    expect(AwakenPage).toBeTypeOf('function');
  });
});
