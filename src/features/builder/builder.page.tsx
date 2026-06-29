import React from 'react';
import { HeroesPage } from '../heroes/heroes.page';
import { SkillsPage } from '../skills/skills.page';
import { EquipmentPage } from '../equipment/equipment.page';
import { MasteryPage } from '../mastery/mastery.page';
import { RelicsPage } from '../relics/relics.page';
import { TraitsPage } from '../traits/traits.page';
import { AwakenPage } from '../awaken/awaken.page';
import { AscensionPage } from '../ascension/ascension.page';
import { PetsPage } from '../pets/pets.page';
import { AlchemyPage } from '../alchemy/alchemy.page';
import { WorldPage } from '../world/world.page';
import { ZodiacPage } from '../zodiac/zodiac.page';

interface TabsContentProps {
  activeTab: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ activeTab }) => {
  switch (activeTab) {
    case 'heroes':
      return <HeroesPage />;
    case 'skills':
      return <SkillsPage />;
    case 'equipment':
      return <EquipmentPage />;
    case 'mastery':
      return <MasteryPage />;
    case 'relic':
      return <RelicsPage />;
    case 'traits':
      return <TraitsPage />;
    case 'awaken':
      return <AwakenPage />;
    case 'ascension':
      return <AscensionPage />;
    case 'pets':
      return <PetsPage />;
    case 'alchemy':
      return <AlchemyPage />;
    case 'world':
      return <WorldPage />;
    case 'zodiac':
      return <ZodiacPage />;
    default:
      return null;
  }
};
