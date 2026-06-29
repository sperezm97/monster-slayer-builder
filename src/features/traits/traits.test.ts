import { describe, expect, it } from 'vitest';
import { TraitsPage } from './traits.page';

describe('traits', () => {
  it('exports its page component', () => {
    expect(TraitsPage).toBeTypeOf('function');
  });
});
