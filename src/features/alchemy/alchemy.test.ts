import { describe, expect, it } from 'vitest';
import { AlchemyPage } from './alchemy.page';

describe('alchemy', () => {
  it('exports its page component', () => {
    expect(AlchemyPage).toBeTypeOf('function');
  });
});
