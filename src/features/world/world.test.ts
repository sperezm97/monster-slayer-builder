import { describe, expect, it } from 'vitest';
import { WorldPage } from './world.page';

describe('world', () => {
  it('exports its page component', () => {
    expect(WorldPage).toBeTypeOf('function');
  });
});
