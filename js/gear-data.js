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
            2: { critDamage: 10 },
            3: { critChance: 10 }
        }
    },
    'Providence Defense': {
        slots: ['mask', 'backpack', 'chest', 'gloves', 'holster', 'kneepads'],
        bonuses: {
            1: { critChance: 15 },
            2: { critDamage: 10 },
            3: { headshot: 10 }
        }
    },
    'Grupo Sombra': {
        slots: ['mask', 'chest', 'holster'],
        bonuses: {
            1: { critDamage: 15 }
        }
    },
    'Walker Harris & Co': {
        slots: ['mask', 'chest', 'gloves', 'holster'],
        bonuses: {
            1: { weaponDamage: 5 },
            2: { damageToArmor: 5 },
            3: { damageToHealth: 5 }
        }
    },
    'Fenris Group AB': {
        slots: ['mask', 'backpack', 'chest', 'kneepads'],
        bonuses: {
            1: { arDamage: 10 },
            2: { critDamage: 10 },
            3: { critChance: 10 }
        }
    },
    'Overlord Armaments': {
        slots: ['mask', 'chest', 'holster', 'kneepads'],
        bonuses: {
            1: { rifleDamage: 10 },
            2: { damageToHealth: 10 },
            3: { accuracy: 10 }
        }
    },
    'Sokolov Concern': {
        slots: ['mask', 'backpack', 'chest', 'gloves'],
        bonuses: {
            1: { smgDamage: 10 },
            2: { critChance: 10 },
            3: { critDamage: 10 }
        }
    },
    'Petrov Defense Group': {
        slots: ['mask', 'backpack', 'chest', 'gloves'],
        bonuses: {
            1: { lmgDamage: 10 },
            2: { damageToArmor: 5 },
            3: { damageToHealth: 5 }
        }
    },
    'Airaldi Holdings': {
        slots: ['mask', 'backpack', 'chest', 'kneepads'],
        bonuses: {
            1: { mmrDamage: 10 },
            2: { headshot: 10 },
            3: { critDamage: 10 }
        }
    },
    'Badger Tuff': {
        slots: ['mask', 'backpack', 'chest', 'kneepads'],
        bonuses: {
            1: { shotgunDamage: 10 },
            2: { damageToArmor: 5 },
            3: { armor: 10 }
        }
    },
    'Murakami Industries': {
        slots: ['mask', 'backpack', 'chest', 'holster', 'kneepads'],
        bonuses: {
            1: { healthRegen: 1 },
            2: { skillDuration: 10 },
            3: { health: 10 }
        }
    },
    'Alps Summit Armaments': {
        slots: ['mask', 'backpack', 'chest', 'gloves', 'holster', 'kneepads'],
        bonuses: {
            1: { repairSkills: 10 },
            2: { skillDuration: 15 },
            3: { skillHaste: 10 }
        }
    },
    'Hana-U Corporation': {
        slots: ['mask', 'backpack', 'gloves', 'kneepads'],
        bonuses: {
            1: { skillHaste: 10 },
            2: { skillDamage: 10 },
            3: { skillHaste: 10 }
        }
    },
    'Wyvern Wear': {
        slots: ['mask', 'gloves', 'kneepads'],
        bonuses: {
            1: { skillDamage: 10 }
        }
    },
    'China Light Industries': {
        slots: ['mask', 'gloves', 'kneepads'],
        bonuses: {
            1: { explosiveDamage: 10 }
        }
    },
    'Empress International': {
        slots: ['mask', 'backpack', 'chest', 'kneepads'],
        bonuses: {
            1: { skillHaste: 10 },
            2: { skillDuration: 10 },
            3: { skillEfficiency: 10 }
        }
    },
    'Douglas & Harding': {
        slots: ['mask', 'backpack', 'holster'],
        bonuses: {
            1: { stability: 10 },
            2: { accuracy: 10 },
            3: { handling: 10 }
        }
    },
    'Richter & Kaiser': {
        slots: ['mask', 'backpack', 'holster'],
        bonuses: {
            1: { hazardProtection: 10 },
            2: { resistExotic: 10 },
            3: { health: 10 }
        }
    },
    'Gila Guard': {
        slots: ['backpack', 'chest', 'holster', 'kneepads'],
        bonuses: {
            1: { armor: 5 },
            2: { healthRegen: 1 },
            3: { bonusArmor: 10 }
        }
    },
    'Golan Gear': {
        slots: ['mask', 'chest', 'gloves', 'holster'],
        bonuses: {
            1: { armor: 5 },
            2: { health: 10 },
            3: { armorRegen: 1 }
        }
    },
    'Belstone Armory': {
        slots: ['backpack', 'chest', 'gloves', 'kneepads'],
        bonuses: {
            1: { armorRegen: 1 },
            2: { damageToArmor: 5 },
            3: { armor: 5 }
        }
    },
    'Yaahl Gear': {
        slots: ['mask', 'holster', 'kneepads'],
        bonuses: {
            1: { hazardProtection: 10 }
        }
    }
};

// Gear Sets
const GEAR_SETS = {
    'Strikers Battlegear': {
        bonuses: {
            2: { weaponDamage: 15 },
            3: { critDamage: 15 },
            4: 'talent_striker'
        },
        talent: 'Striker Stack: Hitting enemies grants 0.5% weapon damage, stacks up to 100.'
    },
    'Heartbreaker': {
        bonuses: {
            2: { weaponDamage: 15 },
            3: { damageToArmor: 15 },
            4: 'talent_heartbreaker'
        },
        talent: 'Heartbreaker: Each round landing grants 1 stack. At 50 stacks, gain bonus armor and damage.'
    },
    'Negotiators Dilemma': {
        bonuses: {
            2: { weaponDamage: 15 },
            3: { critDamage: 15 },
            4: 'talent_negotiators'
        },
        talent: 'Hostage Taker: Mark enemies on crit, damage one to damage all marked.'
    },
    'True Patriot': {
        bonuses: {
            2: { weaponDamage: 10 },
            3: { armor: 10 },
            4: 'talent_patriot'
        },
        talent: 'Full Flag: Cycle through debuffs, white repairs armor.'
    },
    'Ongoing Directive': {
        bonuses: {
            2: { weaponDamage: 15 },
            3: { statusDuration: 30 },
            4: 'talent_directive'
        },
        talent: 'Trauma Specialist: Status kills drop ammo that applies hollow points.'
    },
    'Hard Wired': {
        bonuses: {
            2: { skillTier: 1 },
            3: { skillHaste: 15 },
            4: 'talent_hardwired'
        },
        talent: 'Feedback Loop: Using a skill resets cooldowns of other skills.'
    },
    'Eclipse Protocol': {
        bonuses: {
            2: { skillTier: 1 },
            3: { statusDuration: 30 },
            4: 'talent_eclipse'
        },
        talent: 'Indirect Transmission: Status spreads on kill.'
    },
    'Rigger': {
        bonuses: {
            2: { skillTier: 1 },
            3: { skillDuration: 30 },
            4: 'talent_rigger'
        },
        talent: 'Mechanical: Deploying skill resets cooldown of other skill.'
    },
    'Foundry Bulwark': {
        bonuses: {
            2: { armor: 10 },
            3: { bonusArmor: 3 },
            4: 'talent_foundry'
        },
        talent: 'Makeshift Repairs: Gain bonus armor over time while in cover.'
    },
    'Future Initiative': {
        bonuses: {
            2: { skillTier: 1 },
            3: { repairSkills: 15 },
            4: 'talent_future'
        },
        talent: 'Ground Control: At full armor, repairs provide 15% weapon damage to allies.'
    },
    'Hunters Fury': {
        bonuses: {
            2: { smgDamage: 15, shotgunDamage: 15 },
            3: { armor: 10 },
            4: 'talent_huntersfury'
        },
        talent: 'Apex Predator: Close kills grant 50% bonus armor and apply confusion.'
    }
};

// Exotic Gear Pieces
const EXOTICS = {
    'Coyotes Mask': {
        slot: 'mask',
        talent: 'Pack Instincts: Critical hit damage bonus based on distance.',
        bonuses: { critDamage: 25 }
    },
    'Vile': {
        slot: 'mask',
        talent: 'Toxic Delivery: Status effects deal additional damage over time.',
        bonuses: { statusDamage: 50 }
    },
    'Memento': {
        slot: 'backpack',
        talent: 'Kill Confirmed: Trophies grant stacking weapon damage and armor regen.',
        bonuses: { weaponDamage: 30, armorRegen: 3 }
    },
    'The Sacrifice': {
        slot: 'chest',
        talent: 'Perfect Glass Cannon: 30% damage but 60% increased damage taken.',
        bonuses: { weaponDamage: 30 }
    },
    'Bullet King': {
        slot: 'weapon',
        talent: 'Bullet Hell: Never reload, kills refill magazine.',
        bonuses: {}
    },
    'Ninjabike Messenger Kneepads': {
        slot: 'kneepads',
        talent: 'Parkour: Automatically vault small obstacles.',
        bonuses: { speedBonus: 15 }
    },
    'Sawyers Kneepads': {
        slot: 'kneepads',
        talent: 'Calm Before Storm: Standing still builds damage bonus up to 30%.',
        bonuses: { weaponDamage: 30 }
    },
    'Acostas Go-Bag': {
        slot: 'backpack',
        talent: 'One in Hand: Throwing a grenade refreshes skills.',
        bonuses: { skillHaste: 10 }
    },
    'Btsu Data Gloves': {
        slot: 'gloves',
        talent: 'Elemental Gadgetry: Skill proxies detonate hive charges.',
        bonuses: { skillDamage: 15 }
    },
    'Imperial Dynasty': {
        slot: 'holster',
        talent: "Dragon's Glare: Automatically apply burn to nearest enemy.",
        bonuses: { statusDuration: 20 }
    },
    'Dodge City Gunslingers Holster': {
        slot: 'holster',
        talent: 'Quick Draw: First pistol shot after switch gets massive crit bonus.',
        bonuses: { critDamage: 400 }
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
