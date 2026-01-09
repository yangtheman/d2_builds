# Division 2 Build Optimizer

A web-based tool to optimize your Division 2 gear builds based on your inventory. Upload your gear and find the best combinations for DPS, Skills, Support, Raids, and Incursions.

## 🎮 Features

- **Google Sheets Template**: Easy-to-use spreadsheet template for your inventory
- **Multiple Build Types**: Optimize for DPS, Skills, Support, Raids, or Incursions
- **Brand Set Recognition**: Automatically calculates brand and gear set bonuses
- **Smart Optimization**: Finds the best gear combination based on build priorities
- **Privacy First**: Works entirely client-side — your data never leaves your browser

## 📋 How to Use

### Step 1: Copy the Google Sheets Template
1. Open the [Inventory Template](https://docs.google.com/spreadsheets/d/1FR3JVyLr3ImyVn5QL2Q8tOKmshi3TgVunAVsyehQ-_U/edit?usp=sharing)
2. Click **File** → **Make a copy** to save it to your own Google Drive

### Step 2: Fill Out Your Inventory
Add your gear items to the spreadsheet. Each row represents one piece of gear:

| Field | Description | Example Values |
|-------|-------------|----------------|
| slot | Gear slot | mask, backpack, chest, gloves, holster, kneepads |
| item_name | Your item's name | Providence Mask |
| brand_or_set | Brand or gear set | Providence Defense, Strikers Battlegear |
| rarity | Item rarity | high-end, named, exotic, gearset |
| core_attribute | Core type | weapon_damage, armor, skill_tier |
| core_value | Core value | 15 (for max roll) |
| attribute1_type | First minor attribute | critChance, critDamage, etc. |
| attribute1_value | First attribute value | 6 (for CHC), 12 (for CHD) |
| attribute2_type | Second minor attribute | Same as above |
| attribute2_value | Second attribute value | Same as above |
| mod_type | Mod attribute (if applicable) | critChance, critDamage |
| mod_value | Mod value | 1.5, 3.0, etc. |
| talent | Chest/Backpack talent | Glass Cannon, Vigilance |

### Step 3: Download as CSV
1. In Google Sheets, click **File** → **Download** → **Comma Separated Values (.csv)**
2. Save the file to your computer

### Step 4: Upload and Optimize
Upload your CSV file to the optimizer and select a build type to get the best gear recommendations!

## 📊 Build Types Explained

### DPS Build
- Maximizes weapon damage, crit chance, and crit damage
- Best brands: Providence, Ceska, Grupo Sombra
- Recommended talents: Glass Cannon, Vigilance

### Skill Build
- Maximizes skill damage, skill haste, and duration
- Best brands: Empress, Wyvern, Hana-U
- Recommended talents: Kinetic Momentum, Tech Support

### Support Build
- Focuses on healing and team buffs
- Best brands: Alps, Murakami, Empress
- Recommended talents: Overwatch, Opportunistic

### Raid Build
- Optimized for 8-player content
- Balances damage with survivability
- Best brands: Providence, Ceska, Fenris

### Incursion Build
- Balanced for challenging content
- Includes hazard protection considerations
- Mix of damage and armor

## 🛠️ Technical Details

- Pure HTML/CSS/JavaScript - no build tools required
- Works entirely client-side - your data never leaves your browser
- Mobile-responsive design

## 📝 License

This project is open source. Feel free to modify and share.

**Disclaimer**: This tool is not affiliated with Ubisoft or Massive Entertainment. The Division 2 is a trademark of Ubisoft Entertainment.
