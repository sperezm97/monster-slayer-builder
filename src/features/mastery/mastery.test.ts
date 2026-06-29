import { describe, expect, it } from 'vitest';
import { MasteryPage } from './mastery.page';

describe('mastery', () => {
  it('exports its page component', () => {
    expect(MasteryPage).toBeTypeOf('function');
  });
});
