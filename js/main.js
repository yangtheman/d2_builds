// Division 2 Build Optimizer - Main UI Controller

document.addEventListener('DOMContentLoaded', function() {
    // State
    let inventory = [];
    let selectedBuildType = null;

    // DOM Elements
    const downloadBtn = document.getElementById('downloadTemplate');
    const csvInput = document.getElementById('csvInput');
    const uploadZone = document.getElementById('uploadZone');
    const uploadStatus = document.getElementById('uploadStatus');
    const buildTypeButtons = document.querySelectorAll('.btn-build');
    const optimizeBtn = document.getElementById('optimizeBtn');
    const resultsSection = document.getElementById('resultsSection');
    const buildSummary = document.getElementById('buildSummary');
    const gearSlots = document.getElementById('gearSlots');
    const buildStats = document.getElementById('buildStats');

    // Download Template
    downloadBtn.addEventListener('click', function() {
        CSVTemplate.downloadTemplate();
    });

    // File Upload Handling
    csvInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });

    // Drag and Drop
    uploadZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', function() {
        uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.csv')) {
            handleFileUpload(file);
        } else {
            showStatus('error', 'Please upload a CSV file');
        }
    });

    // Handle file upload
    function handleFileUpload(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const result = CSVTemplate.parseCSV(e.target.result);
                inventory = result.inventory;
                
                if (result.errors.length > 0) {
                    console.warn('CSV Parse Warnings:', result.errors);
                }

                const validation = CSVTemplate.validateInventory(inventory);
                
                if (!validation.valid) {
                    showStatus('error', `Inventory incomplete: ${validation.issues.join(', ')}`);
                } else {
                    showStatus('success', `✓ Loaded ${inventory.length} items from inventory`);
                    updateOptimizeButton();
                }
            } catch (err) {
                showStatus('error', `Error parsing CSV: ${err.message}`);
            }
        };

        reader.readAsText(file);
    }

    // Show status message
    function showStatus(type, message) {
        uploadStatus.className = `status ${type}`;
        uploadStatus.textContent = message;
    }

    // Build Type Selection
    buildTypeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            buildTypeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedBuildType = this.dataset.type;
            updateOptimizeButton();
        });
    });

    // Update optimize button state
    function updateOptimizeButton() {
        optimizeBtn.disabled = !(inventory.length > 0 && selectedBuildType);
    }

    // Optimize Build
    optimizeBtn.addEventListener('click', function() {
        if (!inventory.length || !selectedBuildType) return;

        try {
            const result = BuildOptimizer.optimize(inventory, selectedBuildType);
            displayResults(result);
        } catch (err) {
            console.error('Optimization error:', err);
            showStatus('error', `Optimization failed: ${err.message}`);
        }
    });

    // Display Results
    function displayResults(result) {
        resultsSection.hidden = false;
        resultsSection.scrollIntoView({ behavior: 'smooth' });

        // Build Summary
        buildSummary.innerHTML = `
            <h3>${result.buildType}</h3>
            <p>${result.description}</p>
            <p><strong>Build Score:</strong> ${result.score.toFixed(0)} points</p>
            <p><strong>Core Distribution:</strong> 
                <span style="color: #e74c3c;">●</span> ${result.stats.redCores} Red | 
                <span style="color: #3498db;">●</span> ${result.stats.blueCores} Blue | 
                <span style="color: #f1c40f;">●</span> ${result.stats.yellowCores} Yellow
            </p>
        `;

        // Gear Slots
        gearSlots.innerHTML = '';
        GEAR_SLOTS.forEach(slot => {
            const item = result.items[slot];
            if (item) {
                gearSlots.innerHTML += createGearSlotHTML(slot, item);
            } else {
                gearSlots.innerHTML += `
                    <div class="gear-slot">
                        <h4>${formatSlotName(slot)}</h4>
                        <div class="item-name">No item available</div>
                    </div>
                `;
            }
        });

        // Build Stats
        buildStats.innerHTML = `
            <h3>📊 Total Build Stats</h3>
            <div class="stats-grid">
                ${createStatsHTML(result.stats)}
            </div>
            ${createBrandBonusesHTML(result.brandBonuses)}
        `;
    }

    // Create gear slot HTML
    function createGearSlotHTML(slot, item) {
        const rarityClass = `rarity-${item.rarity}`;
        
        let attributesHTML = '';
        if (item.attributes.attr1Type) {
            attributesHTML += `
                <div class="stat-row">
                    <span>${formatAttributeName(item.attributes.attr1Type)}</span>
                    <span class="stat-value">+${item.attributes.attr1Value}%</span>
                </div>
            `;
        }
        if (item.attributes.attr2Type) {
            attributesHTML += `
                <div class="stat-row">
                    <span>${formatAttributeName(item.attributes.attr2Type)}</span>
                    <span class="stat-value">+${item.attributes.attr2Value}%</span>
                </div>
            `;
        }

        let talentHTML = '';
        if (item.talent) {
            talentHTML = `<div class="stat-row"><span>Talent:</span><span class="stat-value">${item.talent}</span></div>`;
        }

        return `
            <div class="gear-slot">
                <h4>${formatSlotName(slot)}</h4>
                <div class="item-name ${rarityClass}">${item.name}</div>
                <div class="item-brand">${item.brand || 'Unknown'} (${item.rarity})</div>
                <div class="item-stats">
                    <div class="stat-row">
                        <span>Core</span>
                        <span class="stat-value">${formatAttributeName(item.coreAttribute)} +${item.coreValue || 15}%</span>
                    </div>
                    ${attributesHTML}
                    ${talentHTML}
                </div>
            </div>
        `;
    }

    // Create stats HTML
    function createStatsHTML(stats) {
        const displayStats = [
            { key: 'weaponDamage', label: 'Weapon Damage', suffix: '%' },
            { key: 'critChance', label: 'Critical Hit Chance', suffix: '%' },
            { key: 'critDamage', label: 'Critical Hit Damage', suffix: '%' },
            { key: 'headshot', label: 'Headshot Damage', suffix: '%' },
            { key: 'damageToArmor', label: 'Damage to Armor', suffix: '%' },
            { key: 'skillDamage', label: 'Skill Damage', suffix: '%' },
            { key: 'skillHaste', label: 'Skill Haste', suffix: '%' },
            { key: 'skillDuration', label: 'Skill Duration', suffix: '%' },
            { key: 'skillRepair', label: 'Repair Skills', suffix: '%' }
        ];

        return displayStats
            .filter(s => stats[s.key] > 0)
            .map(s => `
                <div class="stat-item">
                    <span class="stat-label">${s.label}</span>
                    <span class="stat-value">+${stats[s.key].toFixed(1)}${s.suffix}</span>
                </div>
            `).join('');
    }

    // Create brand bonuses HTML
    function createBrandBonusesHTML(bonuses) {
        if (!bonuses || bonuses.length === 0) return '';

        const bonusItems = bonuses.map(b => {
            if (b.talent) {
                return `<div class="stat-item"><span class="stat-label">${b.source} (${b.level}pc)</span><span class="stat-value">${b.talent}</span></div>`;
            }
            const statText = Object.entries(b.stats)
                .map(([k, v]) => `+${v}% ${formatAttributeName(k)}`)
                .join(', ');
            return `<div class="stat-item"><span class="stat-label">${b.source} (${b.level}pc)</span><span class="stat-value">${statText}</span></div>`;
        }).join('');

        return `
            <h3 style="margin-top: 20px;">🏷️ Brand/Set Bonuses</h3>
            <div class="stats-grid">${bonusItems}</div>
        `;
    }

    // Format slot name
    function formatSlotName(slot) {
        return slot.charAt(0).toUpperCase() + slot.slice(1);
    }

    // Format attribute name
    function formatAttributeName(attr) {
        if (!attr) return '';
        const names = {
            weapon_damage: 'Weapon Damage',
            armor: 'Armor',
            skill_tier: 'Skill Tier',
            critChance: 'CHC',
            critDamage: 'CHD',
            headshot: 'HSD',
            weaponDamage: 'WD',
            arDamage: 'AR DMG',
            smgDamage: 'SMG DMG',
            lmgDamage: 'LMG DMG',
            mmrDamage: 'MMR DMG',
            rifleDamage: 'Rifle DMG',
            shotgunDamage: 'Shotgun DMG',
            damageToArmor: 'DTA',
            damageToHealth: 'DTH',
            damageToTarget: 'DTTOOC',
            skillDamage: 'Skill DMG',
            skillHaste: 'Skill Haste',
            skillRepair: 'Repair',
            skillDuration: 'Duration',
            statusEffects: 'Status FX',
            health: 'Health',
            hazardProtection: 'Hazard Prot'
        };
        return names[attr] || attr;
    }
});
