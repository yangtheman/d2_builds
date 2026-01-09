// Division 2 Build Optimizer - Optimization Algorithms

const BuildOptimizer = {
    // Exotic limit constants (Division 2 rules)
    // Players can equip max 1 exotic weapon + 1 exotic gear piece (2 total)
    // This optimizer handles gear, so we enforce max 1 exotic gear piece
    MAX_EXOTIC_GEAR: 1,

    // Build type configurations
    buildConfigs: {
        dps: {
            name: 'DPS Build',
            description: 'Maximum damage output for solo/group content',
            priorities: ['weaponDamage', 'critChance', 'critDamage', 'headshot', 'damageToArmor'],
            targetCores: { weapon_damage: 6 },
            preferredTalents: {
                chest: ['Glass Cannon', 'Obliterate', 'Spotter'],
                backpack: ['Vigilance', 'Composure', 'Concussion']
            },
            preferredBrands: ['Ceska Vyroba', 'Grupo Sombra', 'Providence Defense', 'Walker Harris & Co'],
            preferredGearSets: ['Strikers Battlegear', 'Heartbreaker', 'Negotiators Dilemma']
        },
        skills: {
            name: 'Skill Build',
            description: 'Maximum skill damage and efficiency',
            priorities: ['skillDamage', 'skillHaste', 'skillDuration', 'statusEffects'],
            targetCores: { skill_tier: 6 },
            preferredTalents: {
                chest: ['Kinetic Momentum', 'Glass Cannon'],
                backpack: ['Tech Support', 'Combined Arms']
            },
            preferredBrands: ['Empress International', 'Wyvern Wear', 'Hana-U Corporation', 'China Light Industries'],
            preferredGearSets: ['Hard Wired', 'Eclipse Protocol', 'Rigger']
        },
        support: {
            name: 'Support Build',
            description: 'Team healing and damage buffs',
            priorities: ['skillRepair', 'skillHaste', 'skillDuration', 'armor'],
            targetCores: { skill_tier: 4, armor: 2 },
            preferredTalents: {
                chest: ['Overwatch', 'Vanguard'],
                backpack: ['Opportunistic', 'Shock and Awe']
            },
            preferredBrands: ['Alps Summit Armaments', 'Murakami Industries', 'Empress International'],
            preferredGearSets: ['Future Initiative']
        },
        raids: {
            name: 'Raid Build',
            description: 'Optimized for 8-player raid content',
            priorities: ['weaponDamage', 'critDamage', 'critChance', 'damageToArmor', 'armor'],
            targetCores: { weapon_damage: 6 },
            preferredTalents: {
                chest: ['Obliterate', 'Glass Cannon', 'Braced'],
                backpack: ['Vigilance', 'Composure']
            },
            preferredBrands: ['Providence Defense', 'Ceska Vyroba', 'Grupo Sombra', 'Fenris Group AB'],
            preferredGearSets: ['Heartbreaker', 'Strikers Battlegear']
        },
        incursion: {
            name: 'Incursion Build',
            description: 'Balanced build for challenging incursion content',
            priorities: ['weaponDamage', 'critDamage', 'armor', 'hazardProtection', 'critChance'],
            targetCores: { weapon_damage: 5, armor: 1 },
            preferredTalents: {
                chest: ['Obliterate', 'Unbreakable', 'Intimidate'],
                backpack: ['Vigilance', 'Adrenaline Rush']
            },
            preferredBrands: ['Providence Defense', 'Ceska Vyroba', 'Grupo Sombra', 'Gila Guard'],
            preferredGearSets: ['Heartbreaker', 'Hunters Fury', 'Negotiators Dilemma']
        }
    },

    // Main optimization function
    optimize(inventory, buildType) {
        const config = this.buildConfigs[buildType];
        if (!config) {
            throw new Error(`Unknown build type: ${buildType}`);
        }

        const groupedInventory = CSVTemplate.groupBySlot(inventory);
        
        // Score all possible combinations
        const bestBuild = this.findBestCombination(groupedInventory, config);
        
        // Calculate final stats
        const stats = this.calculateBuildStats(bestBuild, config);
        
        // Generate brand bonuses
        const brandBonuses = this.calculateBrandBonuses(bestBuild);
        
        // Validate exotic limit
        const exoticValidation = this.validateExoticLimit(bestBuild);
        
        return {
            buildType: config.name,
            description: config.description,
            items: bestBuild,
            stats,
            brandBonuses,
            score: this.calculateBuildScore(bestBuild, config),
            exoticInfo: exoticValidation
        };
    },

    // Find the best combination of gear
    findBestCombination(groupedInventory, config) {
        const slots = GEAR_SLOTS;
        let bestCombination = null;
        let bestScore = -Infinity;

        // For each slot, score items
        const scoredItems = {};
        slots.forEach(slot => {
            scoredItems[slot] = groupedInventory[slot].map(item => ({
                item,
                score: this.scoreItem(item, config)
            })).sort((a, b) => b.score - a.score);
        });

        // Greedy approach with brand synergy consideration
        const combinations = this.generateCombinations(scoredItems, config);
        
        combinations.forEach(combo => {
            const score = this.calculateBuildScore(combo, config);
            if (score > bestScore) {
                bestScore = score;
                bestCombination = combo;
            }
        });

        // Fallback: if no good combination found, pick best individual items
        // while respecting exotic limit
        if (!bestCombination) {
            bestCombination = {};
            let exoticUsed = false;
            
            slots.forEach(slot => {
                if (scoredItems[slot].length > 0) {
                    // Find best valid item for this slot
                    for (const { item } of scoredItems[slot]) {
                        const isExotic = item.rarity === 'exotic';
                        if (isExotic && exoticUsed) {
                            continue; // Skip if we already have an exotic
                        }
                        bestCombination[slot] = item;
                        if (isExotic) exoticUsed = true;
                        break;
                    }
                }
            });
        }

        return bestCombination;
    },

    // Generate candidate combinations (limited for performance)
    generateCombinations(scoredItems, config) {
        const combinations = [];
        const slots = GEAR_SLOTS;
        
        // Take top 3 items per slot for combination generation
        const topItems = {};
        slots.forEach(slot => {
            topItems[slot] = scoredItems[slot].slice(0, 3);
        });

        // Generate combinations (limited to reasonable number)
        const maxCombos = 729; // 3^6
        let count = 0;

        const generateRecursive = (slotIndex, current, exoticCount) => {
            if (count >= maxCombos) return;
            
            if (slotIndex === slots.length) {
                // Only add valid combinations that respect exotic limit
                if (exoticCount <= this.MAX_EXOTIC_GEAR) {
                    combinations.push({ ...current });
                    count++;
                }
                return;
            }

            const slot = slots[slotIndex];
            const items = topItems[slot];
            
            if (items.length === 0) {
                generateRecursive(slotIndex + 1, current, exoticCount);
                return;
            }

            items.forEach(({ item }) => {
                const isExotic = item.rarity === 'exotic';
                const newExoticCount = exoticCount + (isExotic ? 1 : 0);
                
                // Skip this item if it would exceed exotic limit
                if (newExoticCount > this.MAX_EXOTIC_GEAR) {
                    return;
                }
                
                current[slot] = item;
                generateRecursive(slotIndex + 1, current, newExoticCount);
            });
        };

        generateRecursive(0, {}, 0);
        return combinations;
    },

    // Validate that a build respects the exotic gear limit
    validateExoticLimit(build) {
        const items = Object.values(build).filter(Boolean);
        const exoticCount = items.filter(item => item.rarity === 'exotic').length;
        return {
            valid: exoticCount <= this.MAX_EXOTIC_GEAR,
            exoticCount,
            maxAllowed: this.MAX_EXOTIC_GEAR,
            exoticItems: items.filter(item => item.rarity === 'exotic').map(item => ({
                slot: item.slot,
                name: item.name || item.brand
            }))
        };
    },

    // Score a single item based on build config
    scoreItem(item, config) {
        let score = 0;

        // Core attribute scoring
        if (item.coreAttribute) {
            const targetCores = config.targetCores;
            if (targetCores && targetCores[item.coreAttribute]) {
                score += 100;
            }
        }

        // Attribute scoring based on priorities
        const priorities = config.priorities || [];
        
        if (item.attributes && item.attributes.attr1Type) {
            const priorityIndex = priorities.indexOf(item.attributes.attr1Type);
            if (priorityIndex !== -1) {
                score += (10 - priorityIndex) * (item.attributes.attr1Value || 0);
            }
        }

        if (item.attributes && item.attributes.attr2Type) {
            const priorityIndex = priorities.indexOf(item.attributes.attr2Type);
            if (priorityIndex !== -1) {
                score += (10 - priorityIndex) * (item.attributes.attr2Value || 0);
            }
        }

        // Brand preference scoring
        if (item.brand && item.brand.trim() && config.preferredBrands && config.preferredBrands.includes(item.brand)) {
            score += 50;
        }

        // Gear set preference scoring
        if (item.brand && item.brand.trim() && config.preferredGearSets && 
            config.preferredGearSets.includes(item.brand)) {
            score += 75;
        }

        // Talent scoring
        if (item.talent) {
            const slotTalents = config.preferredTalents && config.preferredTalents[item.slot];
            if (slotTalents && slotTalents.includes(item.talent)) {
                score += 100;
            }
        }

        // Rarity bonus
        if (item.rarity === 'exotic') score += 25;
        if (item.rarity === 'named') score += 15;

        return score;
    },

    // Calculate overall build score
    calculateBuildScore(build, config) {
        let score = 0;
        const items = Object.values(build).filter(Boolean);

        // Sum individual item scores
        items.forEach(item => {
            score += this.scoreItem(item, config);
        });

        // Brand synergy bonus
        const brandCounts = {};
        items.forEach(item => {
            if (item.brand && item.brand.trim()) {
                brandCounts[item.brand] = (brandCounts[item.brand] || 0) + 1;
            }
        });

        Object.entries(brandCounts).forEach(([brand, count]) => {
            if (brand && BRANDS[brand]) {
                const bonusLevels = Object.keys(BRANDS[brand].bonuses).length;
                score += count * 20 * Math.min(count, bonusLevels);
            }
            if (brand && GEAR_SETS[brand] && count >= 4) {
                score += 200; // Gear set 4-piece bonus
            }
        });

        return score;
    },

    // Calculate total build stats
    calculateBuildStats(build, config) {
        const stats = {
            weaponDamage: 0,
            critChance: 0,
            critDamage: 0,
            headshot: 0,
            damageToArmor: 0,
            armor: 0,
            health: 0,
            skillDamage: 0,
            skillHaste: 0,
            skillDuration: 0,
            skillRepair: 0,
            redCores: 0,
            blueCores: 0,
            yellowCores: 0
        };

        const items = Object.values(build).filter(Boolean);

        items.forEach(item => {
            // Count cores
            if (item.coreAttribute === 'weapon_damage') stats.redCores++;
            if (item.coreAttribute === 'armor') stats.blueCores++;
            if (item.coreAttribute === 'skill_tier') stats.yellowCores++;

            // Add core value
            if (item.coreAttribute === 'weapon_damage') {
                stats.weaponDamage += item.coreValue || 15;
            }

            // Add attributes
            if (item.attributes) {
                if (item.attributes.attr1Type && stats[item.attributes.attr1Type] !== undefined) {
                    stats[item.attributes.attr1Type] += item.attributes.attr1Value || 0;
                }
                if (item.attributes.attr2Type && stats[item.attributes.attr2Type] !== undefined) {
                    stats[item.attributes.attr2Type] += item.attributes.attr2Value || 0;
                }
            }

            // Add mod values
            if (item.mod && item.mod.type && stats[item.mod.type] !== undefined) {
                stats[item.mod.type] += item.mod.value || 0;
            }
        });

        // Add brand bonuses
        const brandBonuses = this.calculateBrandBonuses(build);
        brandBonuses.forEach(bonus => {
            if (bonus.stats) {
                Object.entries(bonus.stats).forEach(([stat, value]) => {
                    if (stats[stat] !== undefined) {
                        stats[stat] += value;
                    }
                });
            }
        });

        return stats;
    },

    // Calculate brand set bonuses
    calculateBrandBonuses(build) {
        const bonuses = [];
        const brandCounts = {};
        const items = Object.values(build).filter(Boolean);

        // Count brands
        items.forEach(item => {
            if (item.brand && item.brand.trim()) {
                brandCounts[item.brand] = (brandCounts[item.brand] || 0) + 1;
            }
        });

        // Calculate bonuses
        Object.entries(brandCounts).forEach(([brand, count]) => {
            if (!brand || !brand.trim()) return;
            
            // Brand bonuses
            if (BRANDS[brand]) {
                const brandData = BRANDS[brand];
                for (let i = 1; i <= count && i <= 3; i++) {
                    if (brandData.bonuses && brandData.bonuses[i]) {
                        bonuses.push({
                            source: brand,
                            level: i,
                            stats: brandData.bonuses[i]
                        });
                    }
                }
            }

            // Gear set bonuses
            if (GEAR_SETS[brand]) {
                const setData = GEAR_SETS[brand];
                [2, 3, 4].forEach(level => {
                    if (count >= level && setData.bonuses && setData.bonuses[level]) {
                        const bonus = setData.bonuses[level];
                        if (typeof bonus === 'object') {
                            bonuses.push({
                                source: brand,
                                level: level,
                                stats: bonus,
                                isGearSet: true
                            });
                        } else {
                            bonuses.push({
                                source: brand,
                                level: level,
                                talent: setData.talent,
                                isGearSet: true
                            });
                        }
                    }
                });
            }
        });

        return bonuses;
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BuildOptimizer;
}
