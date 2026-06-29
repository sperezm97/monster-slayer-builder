import { describe, expect, it } from 'vitest';
import { SkillsPage } from './skills.page';

describe('skills', () => {
  it('exports its page component', () => {
    expect(SkillsPage).toBeTypeOf('function');
  });
});
