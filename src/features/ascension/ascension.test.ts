import { describe, expect, it } from 'vitest';
import { AscensionPage } from './ascension.page';

describe('ascension', () => {
  it('exports its page component', () => {
    expect(AscensionPage).toBeTypeOf('function');
  });
});
