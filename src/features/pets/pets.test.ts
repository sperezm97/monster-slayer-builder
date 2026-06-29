import { describe, expect, it } from 'vitest';
import { PetsPage } from './pets.page';

describe('pets', () => {
  it('exports its page component', () => {
    expect(PetsPage).toBeTypeOf('function');
  });
});
