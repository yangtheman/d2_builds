// CSV Template Generation and Parsing for Division 2 Build Optimizer

const CSVTemplate = {
    // CSV Headers
    headers: [
        'slot',
        'item_name',
        'brand_or_set',
        'rarity',
        'core_attribute',
        'core_value',
        'attribute1_type',
        'attribute1_value',
        'attribute2_type',
        'attribute2_value',
        'mod_type',
        'mod_value',
        'talent'
    ],

    // Generate downloadable CSV template
    generateTemplate() {
        const headerRow = this.headers.join(',');
        
        // Example rows to help users
        const exampleRows = [
            'mask,Providence Mask,Providence Defense,high-end,weapon_damage,15,critChance,6,critDamage,12,critChance,1.5,',
            'backpack,Grupo Backpack,Grupo Sombra,high-end,weapon_damage,15,critDamage,12,critChance,6,critDamage,3.0,Vigilance',
            'chest,Ceska Chest,Ceska Vyroba,high-end,weapon_damage,15,critChance,6,critDamage,12,critDamage,3.0,Glass Cannon',
            'gloves,Contractors Gloves,Petrov Defense Group,named,weapon_damage,15,critDamage,12,damageToArmor,6,,,',
            'holster,Providence Holster,Providence Defense,high-end,weapon_damage,15,critChance,6,critDamage,12,,,',
            'kneepads,Fox Prayer,Overlord Armaments,named,weapon_damage,15,critDamage,12,damageToTarget,8,,,',
            '',
            '# Instructions:',
            '# slot: mask backpack chest gloves holster kneepads',
            '# rarity: high-end named exotic gearset',
            '# core_attribute: weapon_damage armor skill_tier',
            '# BRANDS: "Ceska Vyroba" "Providence Defense" "Grupo Sombra" "Walker Harris & Co" "Fenris Group AB" "Overlord Armaments" "Sokolov Concern" "Petrov Defense Group" "Airaldi Holdings" "Badger Tuff" "Murakami Industries" "Alps Summit Armaments" "Hana-U Corporation" "Wyvern Wear" "China Light Industries" "Empress International" "Douglas & Harding" "Richter & Kaiser" "Gila Guard" "Golan Gear" "Belstone Armory" "Yaahl Gear" "5.11 Tactical" "Uzina Getica" "Palisade Steelworks" "Brazos de Arcabuz" "Electrique" "Habsburg Guard" "Lengmo" "Zwiadowka"',
            '# GEAR SETS: "Strikers Battlegear" "Heartbreaker" "Negotiators Dilemma" "True Patriot" "Ongoing Directive" "Hard Wired" "Eclipse Protocol" "Rigger" "Foundry Bulwark" "Future Initiative" "Hunters Fury" "Umbra Initiative" "Aces and Eights" "Tip of the Spear" "System Corruption" "Hotshot"',
            '# NAMED ITEMS: "Contractors Gloves" "Fox Prayer" "Grupo Sombra Mask" "The Sacrifice" "The Gift" "Chainkiller"',
            '# EXOTICS: "Coyotes Mask" "Vile" "Memento" "Tardigrade Armor System" "Ninjabike Messenger Kneepads" "Sawyers Kneepads" "Acostas Go-Bag" "Btsu Data Gloves" "Imperial Dynasty" "Dodge City Gunslingers Holster" "Ridgeways Pride" "Waveform" "Catharsis"',
            '# RED attributes: critChance critDamage headshot weaponDamage weaponHandling arDamage smgDamage lmgDamage mmrDamage rifleDamage shotgunDamage pistolDamage marksmansRifleDamage damageToArmor damageToHealth damageToTarget',
            '# BLUE attributes: armor armorPercent totalArmor bonusArmor health armorRegen armorOnKill healthOnKill incomingRepairs hazardProtection explosiveResist pulseResist disruptResist',
            '# YELLOW attributes: skillDamage skillHaste skillRepair skillDuration skillEfficiency skillHealth statusEffects explosiveDamage',
            '# OTHER attributes: reloadSpeed stability accuracy magazineSize ammoCapacity rateOfFire',
            '# talents (chest): "Glass Cannon" "Obliterate" "Braced" "Unbreakable" "Vanguard" "Overwatch" "Kinetic Momentum" "Spotter" "Intimidate"',
            '# talents (backpack): "Vigilance" "Composure" "Concussion" "Bloodsucker" "Adrenaline Rush" "Opportunistic" "Tech Support" "Combined Arms" "Shock and Awe"'
        ];

        return headerRow + '\n' + exampleRows.join('\n');
    },

    // Download template as file
    downloadTemplate() {
        const content = this.generateTemplate();
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', 'division2_inventory_template.csv');
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    // Parse uploaded CSV file
    parseCSV(csvText) {
        const lines = csvText.split('\n').filter(line => 
            line.trim() && !line.startsWith('#')
        );
        
        if (lines.length < 2) {
            throw new Error('CSV file must have at least a header and one data row');
        }

        const headers = this.parseCSVLine(lines[0]);
        const inventory = [];
        const errors = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            try {
                const values = this.parseCSVLine(line);
                const item = this.createItemFromRow(headers, values, i + 1);
                if (item) {
                    inventory.push(item);
                }
            } catch (e) {
                errors.push(`Row ${i + 1}: ${e.message}`);
            }
        }

        return { inventory, errors };
    },

    // Parse a single CSV line (handles quoted values)
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.trim());
        return result;
    },

    // Create item object from CSV row
    createItemFromRow(headers, values, rowNumber) {
        const item = {
            id: `item_${rowNumber}`,
            attributes: {},
            mod: null
        };

        headers.forEach((header, index) => {
            const value = values[index] || '';
            
            switch (header.toLowerCase()) {
                case 'slot':
                    item.slot = value.toLowerCase();
                    break;
                case 'item_name':
                    item.name = value;
                    break;
                case 'brand_or_set':
                    item.brand = value;
                    break;
                case 'rarity':
                    item.rarity = value.toLowerCase();
                    break;
                case 'core_attribute':
                    item.coreAttribute = value.toLowerCase();
                    break;
                case 'core_value':
                    item.coreValue = parseFloat(value) || 0;
                    break;
                case 'attribute1_type':
                    if (value) item.attributes.attr1Type = value;
                    break;
                case 'attribute1_value':
                    if (value) item.attributes.attr1Value = parseFloat(value) || 0;
                    break;
                case 'attribute2_type':
                    if (value) item.attributes.attr2Type = value;
                    break;
                case 'attribute2_value':
                    if (value) item.attributes.attr2Value = parseFloat(value) || 0;
                    break;
                case 'mod_type':
                    if (value) item.mod = { type: value };
                    break;
                case 'mod_value':
                    if (value && item.mod) item.mod.value = parseFloat(value) || 0;
                    break;
                case 'talent':
                    if (value) item.talent = value;
                    break;
            }
        });

        // Validate required fields
        if (!item.slot || !GEAR_SLOTS.includes(item.slot)) {
            throw new Error(`Invalid slot: ${item.slot}`);
        }
        if (!item.name) {
            throw new Error('Item name is required');
        }

        return item;
    },

    // Group inventory by slot
    groupBySlot(inventory) {
        const grouped = {};
        GEAR_SLOTS.forEach(slot => {
            grouped[slot] = [];
        });

        inventory.forEach(item => {
            if (grouped[item.slot]) {
                grouped[item.slot].push(item);
            }
        });

        return grouped;
    },

    // Validate inventory completeness
    validateInventory(inventory) {
        const grouped = this.groupBySlot(inventory);
        const issues = [];

        GEAR_SLOTS.forEach(slot => {
            if (grouped[slot].length === 0) {
                issues.push(`No items found for ${slot} slot`);
            }
        });

        return {
            valid: issues.length === 0,
            issues
        };
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CSVTemplate;
}
