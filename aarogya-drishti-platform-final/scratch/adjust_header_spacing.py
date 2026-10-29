import re

html_path = r'frontend/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Step 1 header adjustment
step1_old = """      <div class="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-[#d84a1b] via-[#e05423] to-[#ea580c] text-white p-4.5 rounded-xl border border-orange-600 shadow-md">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-amber-200" data-i18n="step1Tag">Step 1 of 9 • Village-Level Field Entry</span>
          <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight" data-i18n="step1Title">Patient Registration & Risk Factor History</h2>
          <p class="text-xs text-orange-100 font-medium mt-0.5" data-i18n="step1Desc">Register tribal community members, record tobacco/gutka habits, and cache offline when out of cellular coverage.</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="fillSyntheticPatient()" class="bg-white hover:bg-orange-50 text-[#d84a1b] border border-orange-200 text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition shadow-sm">
            <i class="fa-solid fa-wand-magic-sparkles text-amber-500"></i>
            <span data-i18n="btnAutoFill">Auto-Fill Synthetic Tribal Patient</span>
          </button>
        </div>
      </div>"""

step1_new = """      <div class="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-[#d84a1b] via-[#e05423] to-[#ea580c] text-white px-6 py-6 rounded-xl border border-orange-600 shadow-md">
        <div class="space-y-1.5">
          <span class="text-xs font-bold uppercase tracking-wider text-amber-200 block" data-i18n="step1Tag">Step 1 of 9 • Village-Level Field Entry</span>
          <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight" data-i18n="step1Title">Patient Registration & Risk Factor History</h2>
          <p class="text-xs sm:text-sm text-orange-100 font-medium leading-relaxed max-w-3xl" data-i18n="step1Desc">Register tribal community members, record tobacco/gutka habits, and cache offline when out of cellular coverage.</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="fillSyntheticPatient()" class="bg-white hover:bg-orange-50 text-[#d84a1b] border border-orange-200 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 transition shadow-sm">
            <i class="fa-solid fa-wand-magic-sparkles text-amber-500"></i>
            <span data-i18n="btnAutoFill">Auto-Fill Synthetic Tribal Patient</span>
          </button>
        </div>
      </div>"""

# 2. Step 5 header adjustment
step5_old = """        <!-- Top Header & LiveKit Cloud Status Bar: Orange Gradation -->
        <div class="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-[#d84a1b] via-[#e05423] to-[#ea580c] text-white p-4.5 rounded-xl border border-orange-600 shadow-md">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold uppercase tracking-wider text-amber-200">Step 5 of 9 • Remote Tele-Oncology Link</span>
              <span id="livekitStatusBadge" class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-white/20 text-white border border-white/30">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>LiveKit Cloud Active</span>
              </span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 tracking-tight" data-i18n="step5Title">
              <i class="fa-solid fa-video text-amber-200"></i>
              <span>LiveKit Cloud Video Teleconsultation & AI Voice Agent</span>
            </h2>
            <p class="text-xs text-orange-100 font-medium mt-0.5">
              Live WebRTC tele-oncology room connecting ASHA/ANM health workers & patients with Oral Oncologist at King George Hospital (KGH) / District Hospital Paderu, with autonomous clinical Voice AI assistance.
            </p>
          </div>"""

step5_new = """        <!-- Top Header & LiveKit Cloud Status Bar: Orange Gradation -->
        <div class="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-[#d84a1b] via-[#e05423] to-[#ea580c] text-white px-6 py-6 rounded-xl border border-orange-600 shadow-md">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold uppercase tracking-wider text-amber-200">Step 5 of 9 • Remote Tele-Oncology Link</span>
              <span id="livekitStatusBadge" class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-white/20 text-white border border-white/30">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>LiveKit Cloud Active</span>
              </span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2 tracking-tight" data-i18n="step5Title">
              <i class="fa-solid fa-video text-amber-200"></i>
              <span>LiveKit Cloud Video Teleconsultation & AI Voice Agent</span>
            </h2>
            <p class="text-xs sm:text-sm text-orange-100 font-medium leading-relaxed max-w-3xl">
              Live WebRTC tele-oncology room connecting ASHA/ANM health workers & patients with Oral Oncologist at King George Hospital (KGH) / District Hospital Paderu, with autonomous clinical Voice AI assistance.
            </p>
          </div>"""

# Replace in content
c1 = content.count(step1_old)
c5 = content.count(step5_old)

print("Step 1 matches:", c1)
print("Step 5 matches:", c5)

if c1 == 1:
    content = content.replace(step1_old, step1_new)
else:
    print("Warning: step1_old match failed, trying normalized replacement")
    # Normalized search
    lines = content.splitlines()
    for i, line in enumerate(lines):
        if 'data-i18n="step1Tag"' in line and 'bg-gradient-to-r' in lines[i-2]:
            lines[i-2] = lines[i-2].replace('p-4.5', 'px-6 py-6').replace('gap-3', 'gap-4')
            lines[i-1] = '        <div class="space-y-1.5">'
            lines[i] = lines[i].replace('class="text-xs', 'class="text-xs block')
            lines[i+2] = lines[i+2].replace('text-xs text-orange-100', 'text-xs sm:text-sm text-orange-100').replace('mt-0.5', 'leading-relaxed max-w-3xl')
    content = '\n'.join(lines)

if c5 == 1:
    content = content.replace(step5_old, step5_new)
else:
    print("Trying normalized replacement for step 5")
    content = content.replace('p-4.5 rounded-xl border border-orange-600 shadow-md', 'px-6 py-6 rounded-xl border border-orange-600 shadow-md')

# Also upgrade other step headers from p-4 to px-6 py-5
for s_num in [2, 4, 6, 7, 8, 9]:
    old_card = f'<div class="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">'
    new_card = f'<div class="flex flex-wrap items-center justify-between gap-4 bg-white px-6 py-5 rounded-xl border border-slate-200 shadow-sm">'
    if old_card in content:
        content = content.replace(old_card, new_card)
        print(f"Upgraded Step {s_num} header padding to px-6 py-5")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: Header spacing and padding adjusted!")

