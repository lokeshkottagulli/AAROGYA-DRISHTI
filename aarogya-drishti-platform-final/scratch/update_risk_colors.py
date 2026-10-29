import re

html_path = r'frontend/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update renderPatientSelectors risk badge colors
old_patient_badge = """      const badge = document.getElementById('activePatientRiskBadge');
      if (active.risk === 'SUSPICIOUS') {
        badge.className = 'px-3 py-1 rounded-full text-xs font-black bg-red-600 hover:bg-red-700 text-white border-2 border-white shadow-md flex items-center gap-1.5 cursor-pointer transform hover:scale-105 transition-all';
        badge.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-amber-300 animate-pulse"></i> HIGH RISK (${(active.aiScore * 100).toFixed(0)}%)`;
      } else if (active.risk === 'MODERATE') {
        badge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1';
        badge.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> MODERATE (${(active.aiScore * 100).toFixed(0)}%)`;
      } else {
        badge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1';
        badge.innerHTML = `<i class="fa-solid fa-circle-check"></i> LOW RISK (${(active.aiScore * 100).toFixed(0)}%)`;
      }"""

new_patient_badge = """      const badge = document.getElementById('activePatientRiskBadge');
      if (active.risk === 'SUSPICIOUS') {
        badge.className = 'px-3 py-1 rounded-full text-xs font-black bg-red-600 hover:bg-red-700 text-white border-2 border-white shadow-md flex items-center gap-1.5 cursor-pointer transform hover:scale-105 transition-all';
        badge.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-amber-300 animate-pulse"></i> HIGH RISK (${(active.aiScore * 100).toFixed(0)}%)`;
      } else if (active.risk === 'MODERATE') {
        badge.className = 'px-3 py-1 rounded-full text-xs font-black bg-amber-600 hover:bg-amber-700 text-white border-2 border-white shadow-md flex items-center gap-1.5 cursor-pointer transform hover:scale-105 transition-all';
        badge.innerHTML = `<i class="fa-solid fa-circle-exclamation text-yellow-200"></i> MODERATE RISK (${(active.aiScore * 100).toFixed(0)}%)`;
      } else {
        badge.className = 'px-3 py-1 rounded-full text-xs font-black bg-emerald-700 hover:bg-emerald-800 text-white border-2 border-white shadow-md flex items-center gap-1.5 cursor-pointer transform hover:scale-105 transition-all';
        badge.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-200"></i> LOW RISK (${(active.aiScore * 100).toFixed(0)}%)`;
      }"""

if old_patient_badge in content:
    content = content.replace(old_patient_badge, new_patient_badge)
    print("SUCCESS: Updated activePatientRiskBadge for High, Moderate, and Low risk!")
else:
    print("Warning: old_patient_badge match failed, checking regex...")
    pattern = r"const badge = document\.getElementById\('activePatientRiskBadge'\);[\s\S]*?LOW RISK \(\$\{\(active\.aiScore \* 100\)\.toFixed\(0\)\}\%\)`\;\s*\}"
    content, count = re.subn(pattern, new_patient_badge, content, count=1)
    print(f"Regex replacement count: {count}")

# 2. Step 1 Sidebar list badges
old_sidebar_badge = "p.risk === 'SUSPICIOUS' ? 'bg-red-100 text-red-700' : (p.risk === 'MODERATE' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700')"
new_sidebar_badge = "p.risk === 'SUSPICIOUS' ? 'bg-red-600 text-white font-black shadow-sm' : (p.risk === 'MODERATE' ? 'bg-amber-600 text-white font-black shadow-sm' : 'bg-emerald-700 text-white font-black shadow-sm')"

if old_sidebar_badge in content:
    content = content.replace(old_sidebar_badge, new_sidebar_badge)
    print("SUCCESS: Updated Step 1 sidebar patient badges to solid high-contrast colors!")

# 3. Step 4 MO Triage Table badges
old_triage_badge = "p.risk === 'SUSPICIOUS' ? 'bg-red-100 text-red-800' : (p.risk === 'MODERATE' ? 'bg-amber-100 text-slate-700' : 'bg-emerald-100 text-emerald-800')"
new_triage_badge = "p.risk === 'SUSPICIOUS' ? 'bg-red-600 text-white font-black shadow-sm' : (p.risk === 'MODERATE' ? 'bg-amber-600 text-white font-black shadow-sm' : 'bg-emerald-700 text-white font-black shadow-sm')"

if old_triage_badge in content:
    content = content.replace(old_triage_badge, new_triage_badge)
    print("SUCCESS: Updated Step 4 MO triage table badges to solid high-contrast colors!")

# 4. Step 3 AI Assessment Badges
old_ai_mod_badge = "badgeEl.className = 'inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-slate-700';"
new_ai_mod_badge = "badgeEl.className = 'inline-block mt-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-600 text-white shadow-md';"

old_ai_low_badge = "badgeEl.className = 'inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800';"
new_ai_low_badge = "badgeEl.className = 'inline-block mt-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-700 text-white shadow-md';"

old_ai_high_badge = "badgeEl.className = 'inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800';"
new_ai_high_badge = "badgeEl.className = 'inline-block mt-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-red-600 text-white shadow-md';"

if old_ai_mod_badge in content:
    content = content.replace(old_ai_mod_badge, new_ai_mod_badge)
if old_ai_low_badge in content:
    content = content.replace(old_ai_low_badge, new_ai_low_badge)
if old_ai_high_badge in content:
    content = content.replace(old_ai_high_badge, new_ai_high_badge)

# 5. Step 2 Preset buttons badges
old_preset_a = '<span class="bg-red-100 text-red-800 text-[10px] font-bold px-1.5 py-0.5 rounded">High Risk</span>'
new_preset_a = '<span class="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">HIGH RISK</span>'

old_preset_b = '<span class="bg-amber-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded">Moderate</span>'
new_preset_b = '<span class="bg-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">MODERATE</span>'

old_preset_c = '<span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">Normal</span>'
new_preset_c = '<span class="bg-emerald-700 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">LOW RISK</span>'

if old_preset_a in content:
    content = content.replace(old_preset_a, new_preset_a)
if old_preset_b in content:
    content = content.replace(old_preset_b, new_preset_b)
if old_preset_c in content:
    content = content.replace(old_preset_c, new_preset_c)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: All Moderate and Low Risk indicators updated with hard, visible solid colors!")
