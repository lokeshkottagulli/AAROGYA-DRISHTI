import re

html_path = r'frontend/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_block = """                  <!-- HIGH-RISK HARD ALERT CARD: Solid Crimson Red Gradient, High-Contrast White Elements & 3D Hover -->
                  <div onclick="${kpi.targetStep ? `goToStep(${kpi.targetStep})` : ''}" class="bg-gradient-to-br from-red-600 via-rose-600 to-red-700 text-white rounded-xl p-4 space-y-2 border-2 border-white shadow-xl shadow-red-950/40 ring-4 ring-red-500/40 transform hover:-translate-y-2 hover:scale-[1.04] hover:shadow-2xl hover:brightness-110 transition-all duration-300 ease-out cursor-pointer relative overflow-hidden group">
                    <div class="absolute -right-3 -top-3 w-16 h-16 bg-white/15 rounded-full blur-sm group-hover:scale-150 transition-all duration-500"></div>
                    <div class="flex items-center justify-between text-xs">
                      <span class="font-black text-white text-[11px] uppercase tracking-wider line-clamp-1">${kpi.label}</span>
                      <span class="bg-white text-red-700 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md shrink-0">
                        <i class="fa-solid fa-triangle-exclamation text-amber-500 animate-pulse"></i> HIGH RISK
                      </span>
                    </div>
                    <div class="text-3xl font-black text-white tracking-tight drop-shadow-md flex items-baseline gap-2">
                      <span>${kpi.val}</span>
                      <span class="text-xs font-bold text-red-100 uppercase tracking-normal">Urgent</span>
                    </div>
                    <div class="text-[11px] text-red-100 font-semibold line-clamp-1">${kpi.sub}</div>
                  </div>"""

new_block = """                  <!-- HIGH-RISK SOLID ALERT CARD: Pure Deep Blood Red / Maroon (No Pink, No Blur Bubble) -->
                  <div onclick="${kpi.targetStep ? `goToStep(${kpi.targetStep})` : ''}" class="bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl p-4 space-y-2 border-2 border-white shadow-xl shadow-black/30 transform hover:-translate-y-2 hover:scale-[1.04] hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer">
                    <div class="flex items-center justify-between text-xs">
                      <span class="font-black text-white text-[11px] uppercase tracking-wider line-clamp-1">${kpi.label}</span>
                      <span class="bg-white text-[#b91c1c] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md shrink-0">
                        <i class="fa-solid fa-triangle-exclamation text-amber-500 animate-pulse"></i> HIGH RISK
                      </span>
                    </div>
                    <div class="text-3xl font-black text-white tracking-tight drop-shadow-md flex items-baseline gap-2">
                      <span>${kpi.val}</span>
                      <span class="text-xs font-black text-amber-300 uppercase tracking-wider">Urgent</span>
                    </div>
                    <div class="text-[11px] text-white/95 font-semibold line-clamp-1">${kpi.sub}</div>
                  </div>"""

if old_block in content:
    content = content.replace(old_block, new_block)
    print("SUCCESS: High-Risk card replaced with solid deep red (zero pink)!")
else:
    print("Warning: Direct string replacement failed, checking line by line...")
    # Normalized search
    pattern = r"<!-- HIGH-RISK HARD ALERT CARD[\s\S]*?</div>\s*</div>"
    content, count = re.subn(pattern, new_block, content, count=1)
    print(f"Regex replacement count: {count}")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished writing frontend/index.html")
