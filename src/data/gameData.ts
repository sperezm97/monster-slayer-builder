import type { Hero, Skill, MasteryNode, Relic, Pet, Potion, ZodiacNode, WorldStage } from '../types/game';

export const HEROES_DATA: Hero[] = [
  {
    id: 'ranger',
    name: 'Valen la Cazadora',
    description: 'Una ágil arquera elfa experta en infligir daño crítico a larga distancia y atacar a gran velocidad.',
    baseAtk: 120,
    baseHp: 450,
    atkScale: 15,
    hpScale: 40,
    icon: '🎯'
  },
  {
    id: 'knight',
    name: 'Aldric el Bastión',
    description: 'Un caballero fuertemente acorazado que destaca en la supervivencia y en proteger al reino con su inmenso aguante.',
    baseAtk: 95,
    baseHp: 700,
    atkScale: 11,
    hpScale: 75,
    icon: '🛡️'
  },
  {
    id: 'mage',
    name: 'Ignis el Invocador',
    description: 'Un mago elemental que desata poderosos hechizos de fuego y caos que destruyen oleadas enteras de monstruos.',
    baseAtk: 150,
    baseHp: 380,
    atkScale: 20,
    hpScale: 32,
    icon: '🔮'
  }
];

export const SKILLS_DATA: Skill[] = [
  {
    id: 'fireball',
    name: 'Bola de Fuego',
    description: 'Lanza una bola de fuego explosiva que inflige daño masivo de área.',
    type: 'active',
    element: 'fire',
    baseMultiplier: 180,
    multiplierScale: 15,
    cooldown: 6,
    maxLevel: 20,
    icon: '🔥'
  },
  {
    id: 'blizzard',
    name: 'Ventisca',
    description: 'Desata una tormenta de hielo que ralentiza e inflige daño continuo a todos los enemigos.',
    type: 'active',
    element: 'water',
    baseMultiplier: 120,
    multiplierScale: 8,
    cooldown: 12,
    maxLevel: 20,
    icon: '❄️'
  },
  {
    id: 'thunderstrike',
    name: 'Golpe de Trueno',
    description: 'Un rayo de alta tensión impacta al enemigo más fuerte, aturdiéndolo por 2 segundos.',
    type: 'active',
    element: 'light',
    baseMultiplier: 250,
    multiplierScale: 22,
    cooldown: 8,
    maxLevel: 20,
    icon: '⚡'
  },
  {
    id: 'shadowbolt',
    name: 'Flecha de Sombras',
    description: 'Dispara proyectiles oscuros que drenan vida del enemigo y curan al héroe.',
    type: 'active',
    element: 'dark',
    baseMultiplier: 140,
    multiplierScale: 10,
    cooldown: 5,
    maxLevel: 20,
    icon: '💀'
  },
  {
    id: 'slash',
    name: 'Tajo Rápido',
    description: 'Un combo físico ultra veloz que corta a los enemigos frente al héroe.',
    type: 'active',
    element: 'wind',
    baseMultiplier: 160,
    multiplierScale: 12,
    cooldown: 4,
    maxLevel: 20,
    icon: '⚔️'
  },
  {
    id: 'crit_focus',
    name: 'Foco Crítico',
    description: 'Aumenta permanentemente la probabilidad de golpe crítico.',
    type: 'passive',
    element: 'none',
    baseMultiplier: 5, // +5% Crit rate
    multiplierScale: 0.5,
    cooldown: 0,
    maxLevel: 15,
    icon: '👁️'
  },
  {
    id: 'swift_moves',
    name: 'Movimientos Ágiles',
    description: 'Incrementa la velocidad de ataque del héroe.',
    type: 'passive',
    element: 'none',
    baseMultiplier: 8, // +8% Atk speed
    multiplierScale: 0.8,
    cooldown: 0,
    maxLevel: 15,
    icon: '👟'
  },
  {
    id: 'atk_boost',
    name: 'Fuerza Interior',
    description: 'Aumenta el porcentaje de ataque global.',
    type: 'passive',
    element: 'none',
    baseMultiplier: 10, // +10% ATK
    multiplierScale: 1.5,
    cooldown: 0,
    maxLevel: 15,
    icon: '💪'
  }
];

export const GEAR_TEMPLATES = {
  weapon: [
    { name: 'Espada de Hierro', icon: '🗡️' },
    { name: 'Arco del Viento', icon: '🏹' },
    { name: 'Bastón de Aprendiz', icon: '🪄' },
    { name: 'Mandoble del Exterminador', icon: '🪓' }
  ],
  armor: [
    { name: 'Armadura de Placas', icon: '👕' },
    { name: 'Piel de Lobo', icon: '🐺' },
    { name: 'Túnica de Seda Mágica', icon: '🧥' }
  ],
  ring: [
    { name: 'Anillo del Poder', icon: '💍' },
    { name: 'Sortija del Buscador', icon: '🪙' }
  ],
  amulet: [
    { name: 'Colgante de Ojo de Rubí', icon: '📿' },
    { name: 'Amuleto del Fénix', icon: '🪬' }
  ]
};

export const MASTERY_DATA: MasteryNode[] = [
  {
    id: 'atk_mastery',
    name: 'Fuerza Bruta',
    description: 'Aumenta el ataque general del héroe de forma porcentual.',
    maxLevel: 50,
    statType: 'atk_percent',
    bonusPerLevel: 0.03, // +3% por nivel
    baseCost: 1,
    costScale: 1
  },
  {
    id: 'hp_mastery',
    name: 'Corazón de Gigante',
    description: 'Aumenta los puntos de vida totales.',
    maxLevel: 50,
    statType: 'hp_percent',
    bonusPerLevel: 0.04, // +4% por nivel
    baseCost: 1,
    costScale: 1
  },
  {
    id: 'crit_rate_mastery',
    name: 'Precisión Quirúrgica',
    description: 'Aumenta la probabilidad de asestar golpes críticos.',
    maxLevel: 30,
    statType: 'crit_rate',
    bonusPerLevel: 0.005, // +0.5% por nivel
    baseCost: 2,
    costScale: 1.2
  },
  {
    id: 'crit_dmg_mastery',
    name: 'Golpe Devastador',
    description: 'Aumenta el daño de los golpes críticos.',
    maxLevel: 40,
    statType: 'crit_dmg',
    bonusPerLevel: 0.04, // +4% por nivel
    baseCost: 2,
    costScale: 1.1
  },
  {
    id: 'gold_mastery',
    name: 'Codicia Extrema',
    description: 'Aumenta el oro obtenido al derrotar monstruos.',
    maxLevel: 50,
    statType: 'gold_percent',
    bonusPerLevel: 0.05, // +5% por nivel
    baseCost: 1,
    costScale: 1
  }
];

export const RELICS_DATA: Relic[] = [
  {
    id: 'golden_grail',
    name: 'Cáliz de Midas',
    description: 'Un cáliz sagrado que transmuta la sangre de los monstruos en monedas de oro.',
    maxLevel: 100,
    statType: 'gold_percent',
    bonusPerLevel: 0.08, // +8%
    baseCost: 10,
    costScale: 1.15
  },
  {
    id: 'demon_horn',
    name: 'Cuerno de Belial',
    description: 'Un cuerno afilado que infunde furia destructiva, multiplicando el daño total.',
    maxLevel: 100,
    statType: 'atk_percent',
    bonusPerLevel: 0.06, // +6%
    baseCost: 12,
    costScale: 1.18
  },
  {
    id: 'ancient_shield',
    name: 'Escudo del Olimpo',
    description: 'Una reliquia tallada en roca estelar capaz de absorber golpes letales.',
    maxLevel: 100,
    statType: 'hp_percent',
    bonusPerLevel: 0.08, // +8%
    baseCost: 8,
    costScale: 1.12
  },
  {
    id: 'tome_wisdom',
    name: 'Tomo del Sabio Ancestral',
    description: 'Escritos antiguos que aceleran el entendimiento táctico en batalla.',
    maxLevel: 50,
    statType: 'exp_percent',
    bonusPerLevel: 0.05, // +5%
    baseCost: 15,
    costScale: 1.25
  }
];

export const PETS_DATA: Pet[] = [
  {
    id: 'fenrir',
    name: 'Fenrir Bebé',
    description: 'Aumenta el ataque del héroe. Lanza periódicamente un aliento helado que aturde enemigos.',
    maxLevel: 50,
    statType: 'atk_percent',
    bonusPerLevel: 0.04, // +4%
    baseCost: 50,
    icon: '🐺'
  },
  {
    id: 'fawkes',
    name: 'Fénix de Oro',
    description: 'Atrae la fortuna. Incrementa de manera masiva las ganancias de oro al derrotar enemigos.',
    maxLevel: 50,
    statType: 'gold_percent',
    bonusPerLevel: 0.08, // +8%
    baseCost: 50,
    icon: '🐦'
  },
  {
    id: 'rocky',
    name: 'Pequeño Gólem',
    description: 'Otorga un escudo de tierra pasivo que incrementa la vitalidad máxima del héroe.',
    maxLevel: 50,
    statType: 'hp_percent',
    bonusPerLevel: 0.06, // +6%
    baseCost: 40,
    icon: '🪨'
  },
  {
    id: 'mimi',
    name: 'Mímico Cariñoso',
    description: 'Aumenta la ganancia de experiencia global, ideal para subir de nivel rápidamente.',
    maxLevel: 50,
    statType: 'exp_percent', // mapeado a exp
    bonusPerLevel: 0.05,
    baseCost: 45,
    icon: '📦'
  }
];

export const POTIONS_DATA: Potion[] = [
  {
    id: 'potion_gold',
    name: 'Elíxir de Codicia',
    description: 'Incrementa el oro de monstruos en +50% temporalmente.',
    statType: 'gold_percent',
    bonusValue: 0.50,
    costElixir: 20
  },
  {
    id: 'potion_speed',
    name: 'Tónico de Hipervelocidad',
    description: 'Aumenta la velocidad del juego en +30% (acelera batallas).',
    statType: 'game_speed',
    bonusValue: 0.30,
    costElixir: 35
  },
  {
    id: 'potion_loot',
    name: 'Poción de Fortuna',
    description: 'Incrementa la probabilidad de obtener objetos raros en un +40%.',
    statType: 'drop_rate',
    bonusValue: 0.40,
    costElixir: 25
  }
];

export const ZODIAC_DATA: ZodiacNode[] = [
  {
    id: 'aries_1',
    constellation: 'Aries',
    name: 'Fuerza de Aries I',
    description: 'Otorga un impulso ofensivo al canalizar el poder del carnero.',
    bonusType: 'atk_percent',
    value: 0.08, // +8%
    starPointsCost: 5
  },
  {
    id: 'aries_2',
    constellation: 'Aries',
    name: 'Golpe de Aries II',
    description: 'Incrementa el daño infligido por los ataques críticos.',
    bonusType: 'crit_dmg',
    value: 0.12, // +12%
    starPointsCost: 8
  },
  {
    id: 'aries_3',
    constellation: 'Aries',
    name: 'Velocidad Estelar',
    description: 'Incrementa la velocidad de ataque del héroe.',
    bonusType: 'atk_speed',
    value: 0.05, // +5%
    starPointsCost: 10
  },
  {
    id: 'taurus_1',
    constellation: 'Taurus',
    name: 'Coraza del Toro',
    description: 'Incrementa sustancialmente la vida máxima.',
    bonusType: 'atk_percent', // Usado para balancear ataque o hp
    value: 0.10, // +10%
    starPointsCost: 6
  },
  {
    id: 'taurus_2',
    constellation: 'Taurus',
    name: 'Reflejos Cósmicos',
    description: 'Disminuye el tiempo de enfriamiento de todas las habilidades.',
    bonusType: 'cd_reduction',
    value: 0.04, // -4% CD
    starPointsCost: 12
  }
];

export const WORLD_STAGES: WorldStage[] = [
  { stageNumber: 1, name: 'Praderas del Alba', bossHp: 5000, bossAtk: 40, recommendedDps: 150 },
  { stageNumber: 2, name: 'Bosque de las Sombras', bossHp: 18000, bossAtk: 90, recommendedDps: 450 },
  { stageNumber: 3, name: 'Cataratas de Cristal', bossHp: 62000, bossAtk: 220, recommendedDps: 1200 },
  { stageNumber: 4, name: 'Desierto de Azufre', bossHp: 210000, bossAtk: 480, recommendedDps: 3800 },
  { stageNumber: 5, name: 'Picos de la Tormenta', bossHp: 750000, bossAtk: 1100, recommendedDps: 11000 },
  { stageNumber: 6, name: 'Mazmorra Olvidada', bossHp: 2500000, bossAtk: 2500, recommendedDps: 35000 },
  { stageNumber: 7, name: 'Tierras de Fuego', bossHp: 9000000, bossAtk: 5800, recommendedDps: 110000 },
  { stageNumber: 8, name: 'Valle de los Huesos', bossHp: 32000000, bossAtk: 14000, recommendedDps: 390000 },
  { stageNumber: 9, name: 'Templo del Vacío', bossHp: 110000000, bossAtk: 32000, recommendedDps: 1200000 },
  { stageNumber: 10, name: 'Frontera del Caos', bossHp: 450000000, bossAtk: 80000, recommendedDps: 4800000 }
];

export const AWAKEN_STARS_BONUS = [
  { star: 1, bonusType: 'atk_percent' as const, value: 0.15, desc: 'Ataque +15%' },
  { star: 2, bonusType: 'hp_percent' as const, value: 0.20, desc: 'Vida Máxima +20%' },
  { star: 3, bonusType: 'skill_dmg_percent' as const, value: 0.15, desc: 'Daño de Habilidades +15%' },
  { star: 4, bonusType: 'atk_percent' as const, value: 0.25, desc: 'Ataque +25%' },
  { star: 5, bonusType: 'skill_dmg_percent' as const, value: 0.30, desc: 'Daño de Habilidades +30%' }
];
