import { describe, expect, it } from 'vitest';
import { RelicsPage } from './relics.page';

describe('relics', () => {
  it('exports its page component', () => {
    expect(RelicsPage).toBeTypeOf('function');
  });
});
