import re

html_path = r'frontend/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add ABHA ID and Aarogyasri fields to the form
old_form_row = """              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1" data-i18n="lblPhone">Contact / ASHA Phone *</label>
                <input type="text" id="regPhone" required placeholder="+91 94401 XXXXX" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none" />
              </div>
            </div>"""

new_form_row = """              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1" data-i18n="lblPhone">Contact / ASHA Phone *</label>
                <input type="text" id="regPhone" required placeholder="+91 94401 XXXXX" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none" />
              </div>
            </div>

            <!-- Optional ABHA ID (Ayushman Bharat Health Account) & ABDM Identification -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-xs font-semibold text-slate-700">
                    <span>ABHA ID / ABDM Health ID</span>
                    <span class="text-slate-400 font-normal text-[11px]">(Optional / ఐచ్ఛికం)</span>
                  </label>
                  <span class="text-[10px] bg-teal-50 text-[#0096a6] font-bold px-2 py-0.5 rounded border border-teal-200 flex items-center gap-1">
                    <i class="fa-solid fa-id-card text-teal-600 text-[10px]"></i> ABDM Integrated
                  </span>
                </div>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#0096a6]">
                    <i class="fa-solid fa-id-badge text-sm"></i>
                  </div>
                  <input 
                    type="text" 
                    id="regAbhaId" 
                    placeholder="e.g., 91-7294-8841-2026 or name@abdm" 
                    maxlength="30"
                    class="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0096a6] focus:border-[#0096a6] focus:outline-none bg-white text-slate-900" 
                  />
                </div>
                <p class="text-[10px] text-slate-400 mt-1">14-digit Ayushman Bharat Health Account number (optional for remote tribal intake)</p>
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-xs font-semibold text-slate-700">
                    <span>Dr. YSR Aarogyasri Card No.</span>
                    <span class="text-slate-400 font-normal text-[11px]">(Optional / ఐచ్ఛికం)</span>
                  </label>
                  <span class="text-[10px] bg-orange-50 text-orange-700 font-bold px-2 py-0.5 rounded border border-orange-200">
                    Cashless Coverage
                  </span>
                </div>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-600">
                    <i class="fa-solid fa-credit-card text-sm"></i>
                  </div>
                  <input 
                    type="text" 
                    id="regAarogyasri" 
                    placeholder="e.g., WAP041893821" 
                    maxlength="20"
                    class="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0096a6] focus:border-[#0096a6] focus:outline-none bg-white text-slate-900" 
                  />
                </div>
                <p class="text-[10px] text-slate-400 mt-1">Linked for expedited hospital biopsy pre-authorization & transport</p>
              </div>
            </div>"""

if old_form_row in content:
    content = content.replace(old_form_row, new_form_row)
    print("SUCCESS: Inserted ABHA ID and Aarogyasri fields into registration form!")
else:
    print("Warning: old_form_row not matched!")

# 2. Update fillSyntheticPatient to populate ABHA ID
old_fill_phone = """      document.getElementById('regVillage').value = selected.village;
      document.getElementById('regPhone').value = `+91 9440${Math.floor(100000 + Math.random() * 899999)}`;
      showToast(`Populated tribal patient from ${selected.mandal} Mandal`, "info");"""

new_fill_phone = """      document.getElementById('regVillage').value = selected.village;
      document.getElementById('regPhone').value = `+91 9440${Math.floor(100000 + Math.random() * 899999)}`;
      const abhaInput = document.getElementById('regAbhaId');
      if (abhaInput) {
        abhaInput.value = `91-${Math.floor(1000 + Math.random() * 8999)}-${Math.floor(1000 + Math.random() * 8999)}-${Math.floor(1000 + Math.random() * 8999)}`;
      }
      showToast(`Populated tribal patient with optional ABHA ID from ${selected.mandal} Mandal`, "info");"""

if old_fill_phone in content:
    content = content.replace(old_fill_phone, new_fill_phone)
    print("SUCCESS: Updated fillSyntheticPatient with ABHA ID generation!")

# 3. Update handleRegisterPatient to capture ABHA ID
old_reg_handler = """      const village = document.getElementById('regVillage').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const years = document.getElementById('regHabitYears').value;"""

new_reg_handler = """      const village = document.getElementById('regVillage').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const abhaId = document.getElementById('regAbhaId')?.value.trim() || 'Not Provided';
      const aarogyasri = document.getElementById('regAarogyasri')?.value.trim() || 'Not Provided';
      const years = document.getElementById('regHabitYears').value;"""

if old_reg_handler in content:
    content = content.replace(old_reg_handler, new_reg_handler)
    print("SUCCESS: Updated handleRegisterPatient to read abhaId and aarogyasri!")

old_new_patient = """      const newPatient = {
        id: newId,
        name,
        age,
        gender,"""

new_new_patient = """      const newPatient = {
        id: newId,
        name,
        abhaId,
        aarogyasri,
        age,
        gender,"""

if old_new_patient in content:
    content = content.replace(old_new_patient, new_new_patient)
    print("SUCCESS: Added abhaId to newPatient object!")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done updating frontend/index.html with ABHA ID!")

