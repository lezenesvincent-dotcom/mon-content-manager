import sys

path = sys.argv[1] if len(sys.argv) > 1 else 'vignettes.html'
with open(path, 'r') as f:
    c = f.read()

# 1. Add full preset object to morning in EMISSION_PRESETS
old1 = """        morning: {
            titleTY: 213,
            specTY: 201,
            titleFontSize: '46px'
        },"""
new1 = """        morning: {
            titleTY: 213,
            specTY: 201,
            titleFontSize: '46px',
            full: {
                title: {tx:-186, ty:213, scale:1.64, brightness:100, saturate:100, contrast:100},
                spec: {tx:-81, ty:210, scale:1.74, brightness:100, saturate:100, contrast:100},
                bottom: {tx:132, ty:-21, scale:1.3, brightness:100, saturate:100, contrast:100},
                titleFontSize: '46px',
                photos: [{tx:0, ty:0, scale:1, brightness:100, saturate:100, contrast:100}]
            }
        },"""
assert old1 in c, "ERREUR: preset morning non trouvé"
c = c.replace(old1, new1)

# 2. Add preset.full check in applyEmissionPreset
old2 = """        if (!preset)
            return;
        var tb = document.getElementById('titleBlock');"""
new2 = """        if (!preset)
            return;
        if (preset.full) {
            applyPresetToCanvas(preset.full);
            return;
        }
        var tb = document.getElementById('titleBlock');"""
assert old2 in c, "ERREUR: applyEmissionPreset non trouvé"
c = c.replace(old2, new2)

# 3. Version badge
assert '>v62<' in c, "ERREUR: badge v62 non trouvé"
c = c.replace('>v62<', '>v63<')

with open(path, 'w') as f:
    f.write(c)

print("✅ Patch v63 appliqué avec succès")
print(f"   - Preset morning intégré en dur")
print(f"   - applyEmissionPreset utilise preset.full")  
print(f"   - Badge v63")
