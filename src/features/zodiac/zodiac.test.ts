import { describe, expect, it } from 'vitest';
import { ZodiacPage } from './zodiac.page';

describe('zodiac', () => {
  it('exports its page component', () => {
    expect(ZodiacPage).toBeTypeOf('function');
  });
});
