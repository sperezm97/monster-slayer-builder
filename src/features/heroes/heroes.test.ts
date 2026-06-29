import { describe, expect, it } from 'vitest';
import { HeroesPage } from './heroes.page';

describe('heroes', () => {
  it('exports its page component', () => {
    expect(HeroesPage).toBeTypeOf('function');
  });
});
