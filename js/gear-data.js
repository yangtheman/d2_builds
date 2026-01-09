// Division 2 Gear Data - Brands, Gear Sets, and Exotics

const GEAR_SLOTS = ['mask', 'backpack', 'chest', 'gloves', 'holster', 'kneepads'];

const ATTRIBUTE_TYPES = {
    RED: 'weapon_damage',
    BLUE: 'armor',
    YELLOW: 'skill_tier'
};

// Brand Set Bonuses
const BRANDS = {
    'Ceska Vyroba': {
        slots: ['mask', 'backpack', 'gloves'],
        bonuses: {
            1: { critChance: 10 },
            2: { hazardProtection: 10 },
            3: { health: 90 }
        }
    },
    'Providence Defense': {
        slots: ['mask', 'backpack', 'chest', 'gloves', 'holster', 'kneepads'],
        bonuses: {
            1: { headshotDamage: 15 },
            2: { critChance: 10 },
            3: { critDamage: 15 }
        }
    },
    'Grupo Sombra': {
        slots: ['mask', 'chest', 'holster'],
        bonuses: {
            1: { critDamage: 15 },
            2: { explosiveDamage: 20 },
            3: { headshotDamage: 15 }
        }
    },
    'Walker Harris & Co': {
        slots: ['mask', 'chest', 'gloves', 'holster'],
        bonuses: {
            1: { weaponDamage: 5 },
            2: { damageToArmor: 5 },
            3: { damageToHealth: 10 }
        }
    },
    'Fenris Group AB': {
        slots: ['mask', 'backpack', 'chest', 'kneepads'],
        bonuses: {
            1: { arDamage: 10 },
            2: { reloadSpeed: 30 },
            3: { stability: 50 }
        }
    },
    'Overlord Armaments': {
        slots: ['mask', 'chest', 'holster', 'kneepads'],
        bonuses: {
            1: { rifleDamage: 10 },
            2: { accuracy: 30 },
            3: { weaponHandling: 30 }
        }
    },
    'Sokolov Concern': {
        slots: ['mask', 'backpack', 'chest', 'gloves'],
        bonuses: {
            1: { smgDamage: 10 },
            2: { critDamage: 15 },
            3: { critChance: 10 }
        }
    },
    'Petrov Defense Group': {
        slots: ['mask', 'backpack', 'chest', 'gloves'],
        bonuses: {
            1: { lmgDamage: 10 },
            2: { weaponHandling: 15 },
            3: { ammoCapacity: 50 }
        }
    },
    'Airaldi Holdings': {
        slots: ['mask', 'backpack', 'chest', 'kneepads'],
        bonuses: {
            1: { mmrDamage: 10 },
            2: { headshotDamage: 15 },
            3: { damageToArmor: 5 }
        }
    },
    'Badger Tuff': {
        slots: ['mask', 'backpack', 'chest', 'kneepads'],
        bonuses: {
            1: { shotgunDamage: 10 },
            2: { totalArmor: 5 },
            3: { armorOnKill: 15 }
        }
    },
    'Murakami Industries': {
        slots: ['mask', 'backpack', 'chest', 'holster', 'kneepads'],
        bonuses: {
            1: { skillDuration: 20 },
            2: { repairSkills: 30 },
            3: { skillDamage: 20 }
        }
    },
    'Alps Summit Armaments': {
        slots: ['mask', 'backpack', 'chest', 'gloves', 'holster', 'kneepads'],
        bonuses: {
            1: { repairSkills: 20 },
            2: { skillDuration: 30 },
            3: { skillHaste: 30 }
        }
    },
    'Hana-U Corporation': {
        slots: ['mask', 'backpack', 'gloves', 'kneepads'],
        bonuses: {
            1: { skillHaste: 10 },
            2: { skillDamage: 10 },
            3: { weaponDamage: 10 }
        }
    },
    'Wyvern Wear': {
        slots: ['mask', 'gloves', 'kneepads'],
        bonuses: {
            1: { skillDamage: 10 },
            2: { statusEffects: 15 },
            3: { skillDuration: 40 }
        }
    },
    'China Light Industries': {
        slots: ['mask', 'gloves', 'kneepads'],
        bonuses: {
            1: { explosiveDamage: 15 },
            2: { skillHaste: 20 },
            3: { statusEffects: 20 }
        }
    },
    'Empress International': {
        slots: ['mask', 'backpack', 'chest', 'kneepads'],
        bonuses: {
            1: { skillHealth: 10 },
            2: { skillDamage: 10 },
            3: { skillEfficiency: 10 }
        }
    },
    'Douglas & Harding': {
        slots: ['mask', 'backpack', 'holster'],
        bonuses: {
            1: { pistolDamage: 20 },
            2: { stability: 30 },
            3: { accuracy: 50 }
        }
    },
    'Richter & Kaiser': {
        slots: ['mask', 'backpack', 'holster'],
        bonuses: {
            1: { incomingRepairs: 20 },
            2: { explosiveResist: 25 },
            3: { repairSkills: 40 }
        }
    },
    'Gila Guard': {
        slots: ['backpack', 'chest', 'holster', 'kneepads'],
        bonuses: {
            1: { totalArmor: 5 },
            2: { health: 60 },
            3: { armorRegen: 2 }
        }
    },
    'Golan Gear': {
        slots: ['mask', 'chest', 'gloves', 'holster'],
        bonuses: {
            1: { statusEffects: 10 },
            2: { armorRegen: 1.5 },
            3: { totalArmor: 10 }
        }
    },
    'Belstone Armory': {
        slots: ['backpack', 'chest', 'gloves', 'kneepads'],
        bonuses: {
            1: { armorRegen: 1 },
            2: { armorOnKill: 10 },
            3: { incomingRepairs: 40 }
        }
    },
    'Yaahl Gear': {
        slots: ['mask', 'holster', 'kneepads'],
        bonuses: {
            1: { hazardProtection: 10 },
            2: { incomingRepairs: 10 },
            3: { hazardProtection: 10 }
        }
    },
    '5.11 Tactical': {
        slots: ['mask', 'backpack', 'chest', 'gloves', 'kneepads'],
        bonuses: {
            1: { hazardProtection: 10 },
            2: { armorOnKill: 5 },
            3: { damageToArmor: 10 }
        }
    },
    'Uzina Getica': {
        slots: ['mask', 'backpack', 'chest', 'gloves', 'holster', 'kneepads'],
        bonuses: {
            1: { magazineSize: 10 },
            2: { ammoCapacity: 15 },
            3: { reloadSpeed: 15 }
        }
    },
    'Palisade Steelworks': {
        slots: ['backpack', 'chest', 'gloves'],
        bonuses: {
            1: { totalArmor: 5 },
            2: { stability: 15 },
            3: { skillDamage: 10 }
        }
    },
    'Brazos de Arcabuz': {
        slots: ['mask', 'backpack', 'gloves', 'kneepads'],
        bonuses: {
            1: { statusEffects: 10 },
            2: { skillHaste: 10 },
            3: { explosiveDamage: 15 }
        }
    },
    'Electrique': {
        slots: ['mask', 'chest', 'gloves', 'holster'],
        bonuses: {
            1: { skillDamage: 10 },
            2: { skillHaste: 10 },
            3: { shockDamage: 15 }
        }
    },
    'Habsburg Guard': {
        slots: ['chest', 'gloves', 'holster', 'kneepads'],
        bonuses: {
            1: { totalArmor: 5 },
            2: { pulseResist: 20 },
            3: { health: 30 }
        }
    },
    'Lengmo': {
        slots: ['mask', 'backpack', 'gloves', 'holster'],
        bonuses: {
            1: { skillHaste: 10 },
            2: { repairSkills: 15 },
            3: { skillDuration: 20 }
        }
    },
    'Zwiadowka': {
        slots: ['mask', 'backpack', 'chest', 'holster'],
        bonuses: {
            1: { marksmansRifleDamage: 15 },
            2: { stability: 15 },
            3: { headshot: 15 }
        }
    }
};

// Gear Sets
const GEAR_SETS = {
    'Strikers Battlegear': {
        bonuses: {
            2: { weaponHandling: 15 },
            3: { rateOfFire: 15 },
            4: 'talent_striker'
        },
        talent: "Striker's Gamble: Weapon hits increase total weapon damage by 0.65%, stacking up to 100. Lose 1 stack/sec (0-50 stacks), 2 stacks/sec (50-100 stacks).",
        backpackTalent: 'Risk Management: Increases total weapon damage per stack from 0.65% to 1%.',
        chestTalent: 'Press the Advantage: Increases max stacks from 100 to 200.'
    },
    'Heartbreaker': {
        bonuses: {
            2: { arDamage: 15, lmgDamage: 15 },
            3: { weaponHandling: 15 },
            4: 'talent_heartbreaker'
        },
        talent: 'Heartstopper: Headshots pulse enemies for 5s. Hits on pulsed enemies add 1% bonus armor and 1% weapon damage, stacking up to 50. Lose 2 stacks/sec.',
        backpackTalent: 'Cold: Increases bonus armor per stack from 1% to 2%.',
        chestTalent: 'Max BPM: Increases max stacks from 50 to 100.'
    },
    'Negotiators Dilemma': {
        bonuses: {
            2: { critChance: 15 },
            3: { critDamage: 20 },
            4: 'talent_negotiators'
        },
        talent: 'Hostile Negotiations: Crits mark enemies for 20s (up to 3 marks). Critting marked enemy causes others to take 60% of damage dealt. Each marked enemy death grants +2% CHD, up to 20 stacks.',
        backpackTalent: 'Critical Measures: Increases damage to additional marked enemies from 60% to 100%.',
        chestTalent: 'Target Rich Environment: Increases max marked enemies from 3 to 5.'
    },
    'True Patriot': {
        bonuses: {
            2: { ammoCapacity: 30 },
            3: { magazineSize: 30 },
            4: 'talent_patriot'
        },
        talent: 'Red, White, and Blue: Shooting enemies applies stacking debuffs - Red: +8% damage taken, White: repairs 2% armor/sec, Blue: -8% damage dealt.',
        backpackTalent: 'Patriotic Boost: Increases debuff effects (Red: 12%, White: 3%, Blue: 12%).',
        chestTalent: 'Waving the Flag: Reduces debuff rotation time from 2s to 1.5s.'
    },
    'Ongoing Directive': {
        bonuses: {
            2: { statusEffects: 15 },
            3: { reloadSpeed: 30 },
            4: 'talent_directive'
        },
        talent: 'Rules of Engagement: Shooting status-affected enemies marks them. Killing marked enemy grants hollow-point ammo (full clip for you, half for team). Hollow-points amplify damage 20% and apply bleed.',
        backpackTalent: 'Trauma Specialist: Increases bleed duration by 50% and bleed damage by 100%.',
        chestTalent: 'Parabellum Rounds: Increases hollow-point damage amplification to 35%.'
    },
    'Hard Wired': {
        bonuses: {
            2: { skillHaste: 15 },
            3: { skillDamage: 15, repairSkills: 30 },
            4: 'talent_hardwired'
        },
        talent: 'Feedback Loop: Using or cancelling a skill reduces other skill cooldown by 30s, increases total skill damage and repair by 10% for 20s. 20s cooldown.',
        backpackTalent: 'Short Circuit: Decreases Feedback Loop cooldown from 20s to 10s.',
        chestTalent: 'Positive Reinforcement: Increases skill damage and repair boost from 10% to 25%.'
    },
    'Eclipse Protocol': {
        bonuses: {
            2: { statusEffects: 15 },
            3: { skillHaste: 15, hazardProtection: 30 },
            4: 'talent_eclipse'
        },
        talent: 'Indirect Transmission: Status effects spread to enemies within 10m when you kill an affected target, refreshing duration by 50%.',
        backpackTalent: 'Symptom Aggravator: Amplifies all damage to status-affected enemies by 30%.',
        chestTalent: 'Proliferation: Increases spread range to 15m and refresh rate to 75%.'
    },
    'Rigger': {
        bonuses: {
            2: { skillHaste: 15 },
            3: { skillDuration: 15 },
            4: 'talent_rigger'
        },
        talent: 'Tend and Befriend: Interacting with deployed skills grants them 25% skill damage boost for 10s. Interactions include deploying, changing targets, or healing skills.',
        backpackTalent: 'Complete Uptime: Cancelling skills resets their cooldowns.',
        chestTalent: 'Best Buds: Increases skill damage boost from 25% to 50%.'
    },
    'Foundry Bulwark': {
        bonuses: {
            2: { totalArmor: 10 },
            3: { armorRegen: 1, shieldHealth: 50 },
            4: 'talent_foundry'
        },
        talent: 'Makeshift Repairs: When you or your shield take damage, 25% of the damage is repaired over 10s.',
        backpackTalent: 'Process Refinery: Reduces Makeshift Repairs time from 10s to 5s.',
        chestTalent: 'Improved Materials: Increases Makeshift Repairs from 25% to 35%.'
    },
    'Future Initiative': {
        bonuses: {
            2: { repairSkills: 30 },
            3: { skillHaste: 15, skillDuration: 30 },
            4: 'talent_future'
        },
        talent: 'Ground Control: Increases your and allies weapon and skill damage by 15% while at full armor. When you repair an ally, you and all allies within 5m are healed for 60% of that amount.',
        backpackTalent: 'Strategic Combat Support: Increases proximity repair from 60% to 120%.',
        chestTalent: 'Tactical Superiority: Increases damage boost from 15% to 25%.'
    },
    'Hunters Fury': {
        bonuses: {
            2: { shotgunDamage: 15, smgDamage: 15 },
            3: { armorOnKill: 20, healthOnKill: 50 },
            4: 'talent_huntersfury'
        },
        talent: 'Apex Predator: Enemies within 15m receive a debuff, amplifying your weapon damage by 20%. Killing a debuffed enemy disorients others within 5m and amplifies your damage by 5% for 10s, stacking up to 5 times.',
        backpackTalent: 'Overwhelming Force: Increases disorient radius from 5m to 10m.',
        chestTalent: 'Endless Hunger: Increases Apex Predator stack duration from 10s to 30s.'
    },
    'Umbra Initiative': {
        bonuses: {
            2: { critChance: 15 },
            3: { reloadSpeed: 30 },
            4: 'talent_umbra'
        },
        talent: 'From the Shadows: While in cover, gain 10 stacks/sec up to 50. Each stack increases CHD by 1% and RPM by 0.3%. Into the Light: While out of cover in combat, gain 10 stacks/sec up to 50 for 0.8% armor regen per stack.',
        backpackTalent: 'Into the Light: Increases max stacks to 100, stack gain to 20, and consumption to 20.',
        chestTalent: 'From the Shadows: Increases max stacks to 100 and stack gain to 20.'
    },
    'Aces and Eights': {
        bonuses: {
            2: { mmrDamage: 15 },
            3: { headshotDamage: 30 },
            4: 'talent_aces'
        },
        talent: "Dead Man's Hand: Flipping cards while landing MMR shots increases next shot damage by 30%. Stronger hands (Four of a Kind, Full House, Aces and Eights) increase boosted shots.",
        backpackTalent: 'Ace in the Sleeve: Increases amplified shots by one.',
        chestTalent: 'No Limit: Increases damage bonus from 30% to 50%.'
    },
    'Tip of the Spear': {
        bonuses: {
            2: { signatureWeaponDamage: 20 },
            3: { weaponDamage: 10 },
            4: 'talent_spear'
        },
        talent: 'Aggressive Recon: Signature weapon kills boost damage by 15% for 10s and grant +25% reload speed. Ammo regenerates every 60s.',
        backpackTalent: 'Signature Moves: Doubles damage bonus after depleting sig weapon ammo and increases ammo regen.',
        chestTalent: 'Specialized Destruction: Increases sig weapon damage bonus to 30% and generates ammo every third kill.'
    },
    'System Corruption': {
        bonuses: {
            2: { armorOnKill: 15 },
            3: { disruptResist: 40, pulseResist: 40 },
            4: 'talent_corruption'
        },
        talent: 'Hackstep Protocol: Replaces armor kits with a 20s cooldown skill that repairs 20% armor, grants 50% bonus armor, and hides nameplate for 5s. +2% weapon damage per 5% bonus armor, up to 20%.',
        backpackTalent: 'Multithreaded Execution: Increases bonus armor from Hackstep to 100%.',
        chestTalent: 'Compiler Optimization: Reduces Hackstep cooldown from 20s to 15s.'
    },
    'Hotshot': {
        bonuses: {
            2: { mmrDamage: 30, weaponHandling: 30 },
            3: { headshotDamage: 30 },
            4: 'talent_hotshot'
        },
        talent: 'Headache: First MMR headshot increases next headshot damage by 20%. Second consecutive headshot grants +10% armor. Third headshot refills magazine. Fourth+ headshots grant all three bonuses. Missing resets cycle.',
        backpackTalent: 'Blessed: You can miss one headshot before the cycle resets.',
        chestTalent: 'Daring: Increases bonus armor from 50% to 100%.'
    }
};

// Exotic Gear Pieces
const EXOTICS = {
    'Coyotes Mask': {
        slot: 'mask',
        talent: 'Pack Instincts: You and all group members gain a bonus based on your proximity to hostiles. 0-15m: +25% CHD, 15-25m: +10% CHC and +10% CHD, 25m+: +10% CHC.',
        bonuses: { critDamage: 25 }
    },
    'Vile': {
        slot: 'mask',
        talent: 'Toxic Delivery: Status effects deal 10% of your weapon damage per second for 10 seconds.',
        bonuses: { statusEffects: 10 }
    },
    'Memento': {
        slot: 'backpack',
        talent: 'Kill Confirmed: Enemies drop trophies on death. Trophies grant 3 short-term buff stacks (30% WD, 3% skill efficiency, 3% armor regen). Long-term buff increases to max 30% WD.',
        bonuses: { weaponDamage: 30, skillEfficiency: 30, armorRegen: 3 }
    },
    'Tardigrade Armor System': {
        slot: 'chest',
        talent: 'Ablative Nano-Plating: When you or an ally would be downed, gain 80% bonus armor for 10 seconds.',
        bonuses: { armor: 10 }
    },
    'Ninjabike Messenger Kneepads': {
        slot: 'kneepads',
        talent: 'Parkour!: Performing a cover to cover or vaulting reloads your drawn weapon and grants +100% weapon handling for 5 seconds.',
        bonuses: { weaponHandling: 15 }
    },
    'Sawyers Kneepads': {
        slot: 'kneepads',
        talent: 'Calm Before Storm: While not moving, gain 1% weapon damage every second, stacking up to 30%.',
        bonuses: { weaponDamage: 30 }
    },
    'Acostas Go-Bag': {
        slot: 'backpack',
        talent: 'One in Hand: Throwing a grenade grants overcharge for 15 seconds. Cooldown: 60 seconds.',
        bonuses: { skillHaste: 10, skillDamage: 10, repairSkills: 10 }
    },
    'Btsu Data Gloves': {
        slot: 'gloves',
        talent: 'Elemental Gadgetry: Skill kills grant overcharge for 15 seconds. Skills are automatically charged when in BTSU overcharge.',
        bonuses: { skillDamage: 15 }
    },
    'Imperial Dynasty': {
        slot: 'holster',
        talent: "Dragon's Glare: While in combat, apply burn to the closest enemy within 20m every 4 seconds.",
        bonuses: { statusEffects: 20 }
    },
    'Dodge City Gunslingers Holster': {
        slot: 'holster',
        talent: 'Quick Draw: While your pistol is holstered, gain stacking bonus. Pulling pistol consumes stacks to deal up to 400% weapon damage on first hit.',
        bonuses: { critDamage: 400 }
    },
    'Ridgeways Pride': {
        slot: 'chest',
        talent: 'Bloody Mess: Bleeding enemies you damage take 20% amplified damage. Killing bleeding enemies repairs 5% armor. Damaged bleeding enemies drop bleed pickups.',
        bonuses: { weaponDamage: 15 }
    },
    'Waveform': {
        slot: 'holster',
        talent: 'Skill Sine-Wave: Gain periodic +15% skill damage every 5 seconds, alternating between your skills.',
        bonuses: { skillDamage: 15 }
    },
    'Catharsis': {
        slot: 'mask',
        talent: 'Vicious Cycle: On headshot kill, create a 10m explosion dealing 500% damage. Gain 20% armor on kill.',
        bonuses: { headshotDamage: 15 }
    }
};

// Named Items
const NAMED_ITEMS = {
    'Contractors Gloves': {
        slot: 'gloves',
        brand: 'Petrov Defense Group',
        bonus: { damageToArmor: 11 }
    },
    'Fox Prayer': {
        slot: 'kneepads',
        brand: 'Overlord Armaments',
        bonus: { damageToTarget: 8 }
    },
    'Grupo Sombra Mask': {
        slot: 'mask',
        brand: 'Grupo Sombra',
        bonus: { critDamage: 12 }
    },
    'The Sacrifice': {
        slot: 'chest',
        brand: 'Providence Defense',
        talent: 'Perfect Glass Cannon'
    },
    'The Gift': {
        slot: 'backpack',
        brand: 'Providence Defense',
        talent: 'Perfect Vigilance'
    },
    'Chainkiller': {
        slot: 'chest',
        brand: 'Airaldi Holdings',
        talent: 'Perfect Headhunter'
    }
};

// Attribute Ranges
const ATTRIBUTE_RANGES = {
    critChance: { min: 0, max: 6, label: 'Critical Hit Chance', type: 'red' },
    critDamage: { min: 0, max: 12, label: 'Critical Hit Damage', type: 'red' },
    headshot: { min: 0, max: 10, label: 'Headshot Damage', type: 'red' },
    weaponDamage: { min: 0, max: 15, label: 'Weapon Damage', type: 'red' },
    arDamage: { min: 0, max: 10, label: 'AR Damage', type: 'red' },
    smgDamage: { min: 0, max: 10, label: 'SMG Damage', type: 'red' },
    lmgDamage: { min: 0, max: 10, label: 'LMG Damage', type: 'red' },
    mmrDamage: { min: 0, max: 10, label: 'MMR Damage', type: 'red' },
    rifleDamage: { min: 0, max: 10, label: 'Rifle Damage', type: 'red' },
    shotgunDamage: { min: 0, max: 10, label: 'Shotgun Damage', type: 'red' },
    damageToArmor: { min: 0, max: 6, label: 'Damage to Armor', type: 'red' },
    damageToHealth: { min: 0, max: 6, label: 'Damage to Health', type: 'red' },
    armor: { min: 0, max: 170000, label: 'Armor', type: 'blue' },
    armorPercent: { min: 0, max: 10, label: 'Armor %', type: 'blue' },
    health: { min: 0, max: 18935, label: 'Health', type: 'blue' },
    explosiveResist: { min: 0, max: 10, label: 'Explosive Resistance', type: 'blue' },
    hazardProtection: { min: 0, max: 10, label: 'Hazard Protection', type: 'blue' },
    skillDamage: { min: 0, max: 10, label: 'Skill Damage', type: 'yellow' },
    skillHaste: { min: 0, max: 12, label: 'Skill Haste', type: 'yellow' },
    skillRepair: { min: 0, max: 20, label: 'Repair Skills', type: 'yellow' },
    skillDuration: { min: 0, max: 12, label: 'Skill Duration', type: 'yellow' },
    statusEffects: { min: 0, max: 10, label: 'Status Effects', type: 'yellow' }
};

// Chest Talents
const CHEST_TALENTS = {
    'Glass Cannon': { weaponDamage: 25, damageTaken: 50, type: 'dps' },
    'Obliterate': { critDamage: 25, type: 'dps' },
    'Braced': { weaponHandling: 45, type: 'dps' },
    'Unbreakable': { armorRepair: 95, type: 'tank' },
    'Vanguard': { bonusArmor: 45, type: 'support' },
    'Overwatch': { teamDamage: 12, type: 'support' },
    'Kinetic Momentum': { skillDamage: 30, skillRepair: 30, type: 'skill' },
    'Spotter': { pulsedDamage: 15, type: 'dps' },
    'Intimidate': { bonusArmorDamage: 35, type: 'tank' }
};

// Backpack Talents
const BACKPACK_TALENTS = {
    'Vigilance': { weaponDamage: 25, type: 'dps' },
    'Composure': { coverDamage: 15, type: 'dps' },
    'Concussion': { headshotDamage: 25, type: 'dps' },
    'Bloodsucker': { bonusArmorOnKill: 10, type: 'tank' },
    'Adrenaline Rush': { bonusArmor: 23, type: 'tank' },
    'Opportunistic': { amplify: 10, type: 'support' },
    'Tech Support': { skillDamage: 25, type: 'skill' },
    'Combined Arms': { skillDamage: 30, type: 'skill' },
    'Shock and Awe': { teamDamage: 20, type: 'support' }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GEAR_SLOTS, BRANDS, GEAR_SETS, EXOTICS, NAMED_ITEMS,
        ATTRIBUTE_RANGES, CHEST_TALENTS, BACKPACK_TALENTS
    };
}
