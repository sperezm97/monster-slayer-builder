import { describe, expect, it } from 'vitest';
import { EquipmentPage } from './equipment.page';

describe('equipment', () => {
  it('exports its page component', () => {
    expect(EquipmentPage).toBeTypeOf('function');
  });
});
