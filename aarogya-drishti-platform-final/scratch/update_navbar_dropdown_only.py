import os
import re

html_path = r'frontend/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define the new renderPipelineNav function
new_render_pipeline_nav = """    function renderPipelineNav() {
      const nav = document.getElementById('pipelineNav');
      if (!nav) return;
      const allowed = currentUser ? (currentUser.allowedSteps || currentUser.allowed_steps || [1, 2, 3, 5, 6, 8]) : [1, 2, 3, 5, 6, 8];
      const isTe = currentLang === 'te';
      const config = currentUser ? (ROLE_CONFIGS[currentUser.role] || ROLE_CONFIGS.HEALTH_WORKER) : ROLE_CONFIGS.HEALTH_WORKER;
      const roleTitle = isTe ? config.titleTe : config.titleEn;

      // Authorized steps vs all steps
      const authorizedSteps = pipelineSteps.filter(step => allowed.includes(step.id));
      const activeStepObj = pipelineSteps.find(s => s.id === currentStep) || pipelineSteps[0];
      const activeLabel = isTe ? activeStepObj.titleTe : activeStepObj.titleEn;

      nav.innerHTML = `
        <div class="flex items-center justify-between gap-3 w-full">
          
          <!-- Left: Traditional Government Dashboards Menu Dropdown + Active Step Indicator -->
          <div class="flex items-center gap-3">
            
            <!-- Traditional Government Dropdown Menu Button -->
            <div class="relative inline-block text-left" id="dashboardDropdownContainer">
              <button 
                type="button" 
                onclick="toggleNavDropdown(event)" 
                class="bg-[#b33910] hover:bg-[#992f0b] text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-lg flex items-center gap-2 shadow-sm transition border border-amber-300/40"
                title="Open Traditional Government Dashboards Menu"
              >
                <i class="fa-solid fa-table-cells-large text-amber-200"></i>
                <span class="tracking-wide">${isTe ? 'డాష్‌బోర్డుల మెనూ' : 'Dashboards Menu'}</span>
                <i class="fa-solid fa-caret-down text-[10px] text-amber-200"></i>
              </button>
              
              <!-- Traditional Government Dropdown Menu Popup (All 9 Workflows) -->
              <div id="navDropdownMenu" class="hidden absolute left-0 mt-2 w-80 sm:w-96 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-fade-in font-sans">
                <div class="px-4 py-2 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>${isTe ? 'అధికారిక డాష్‌బోర్డులు' : 'Government Dashboards'}</span>
                  <span class="bg-teal-50 text-[#0096a6] px-2 py-0.5 rounded-full text-[10px] font-bold border border-teal-200">${authorizedSteps.length} of 9 Authorized</span>
                </div>
                <div class="max-h-96 overflow-y-auto py-1 divide-y divide-slate-100">
                  ${pipelineSteps.map(step => {
                    const isAllowed = allowed.includes(step.id);
                    const isActive = step.id === currentStep;
                    const label = isTe ? step.titleTe : step.titleEn;
                    const subtitle = step.id === 1 ? (isTe ? 'గ్రామ సర్వే & నమోదు' : 'Village Screening & Intake')
                      : step.id === 2 ? (isTe ? 'ఓరల్ కెమెరా క్యాప్చర్' : 'Oral Photo Protocol')
                      : step.id === 3 ? (isTe ? 'డ్యూయల్ మోడల్ AI విశ్లేషణ' : 'Dual-Model AI Inference')
                      : step.id === 4 ? (isTe ? 'వైద్యాధికారి సమీక్ష' : 'MO Clinical Triage')
                      : step.id === 5 ? (isTe ? 'వీడియో టెలి-కన్సల్టేషన్' : 'Video Teleconsultation')
                      : step.id === 6 ? (isTe ? 'సెకండరీ రిఫెరల్ & అంబులెన్స్' : 'Secondary Referral & Transport')
                      : step.id === 7 ? (isTe ? 'బయాప్సీ హిస్టోపాథాలజీ' : 'Biopsy Histopathology Lab')
                      : step.id === 8 ? (isTe ? 'ఆంకాలజీ చికిత్స ప్రోటోకాల్' : 'Oncology Treatment Protocol')
                      : (isTe ? 'జిల్లా ఎపిడెమియోలాజికల్ మ్యాప్' : 'District Epidemiological Analytics');

                    if (isAllowed) {
                      return `
                        <button 
                          type="button"
                          onclick="goToStep(${step.id}); closeNavDropdown();" 
                          class="w-full text-left px-4 py-2.5 text-xs font-medium flex items-center gap-3 transition ${
                            isActive
                              ? 'bg-teal-50 text-[#0096a6] font-black border-l-4 border-l-[#0096a6]'
                              : 'hover:bg-orange-50 text-slate-700 hover:text-[#d84a1b]'
                          }"
                        >
                          <span class="w-6 h-6 rounded-lg ${isActive ? 'bg-[#0096a6] text-white shadow' : 'bg-slate-100 text-slate-600'} flex items-center justify-center text-[11px] font-bold shrink-0">${step.id}</span>
                          <i class="fa-solid ${step.icon} text-sm ${isActive ? 'text-[#0096a6]' : 'text-slate-400'} shrink-0 w-4 text-center"></i>
                          <div class="flex-1 truncate">
                            <div class="font-bold text-slate-800 ${isActive ? 'text-[#0096a6]' : ''}">${label}</div>
                            <div class="text-[10px] text-slate-400">${subtitle}</div>
                          </div>
                          ${isActive ? '<i class="fa-solid fa-circle-check text-sm text-[#0096a6] shrink-0"></i>' : '<span class="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">Clear</span>'}
                        </button>
                      `;
                    } else {
                      return `
                        <button 
                          type="button"
                          onclick="goToStep(${step.id}); closeNavDropdown();" 
                          class="w-full text-left px-4 py-2 text-xs font-normal flex items-center gap-3 opacity-60 hover:opacity-100 hover:bg-slate-50 transition"
                          title="Restricted by Cadre Clearance"
                        >
                          <span class="w-6 h-6 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center text-[11px] font-medium shrink-0">${step.id}</span>
                          <i class="fa-solid ${step.icon} text-sm text-slate-400 shrink-0 w-4 text-center"></i>
                          <div class="flex-1 truncate">
                            <div class="text-slate-500">${label}</div>
                            <div class="text-[10px] text-slate-400">${subtitle}</div>
                          </div>
                          <span class="text-[9px] bg-slate-100 text-slate-500 font-semibold px-1.5 py-0.5 rounded border border-slate-200 shrink-0 flex items-center gap-1">
                            <i class="fa-solid fa-lock text-[8px]"></i> Restricted
                          </span>
                        </button>
                      `;
                    }
                  }).join('')}
                </div>
                <div class="border-t border-slate-100 mt-1 pt-2 px-4 pb-1 bg-slate-50 text-[10px] text-slate-500 flex items-center justify-between">
                  <span class="font-medium">Cadre: ${roleTitle}</span>
                  <span class="text-emerald-700 font-bold flex items-center gap-1"><i class="fa-solid fa-shield-halved text-emerald-600"></i>DISHA Compliant</span>
                </div>
              </div>
            </div>

            <!-- Current Active Dashboard Pill (Clean Breadcrumb) -->
            <div class="flex items-center gap-2 bg-black/25 text-white px-3 py-1.5 rounded-lg border border-white/20 text-xs shadow-inner">
              <span class="text-amber-200 font-bold text-[10px] uppercase tracking-wider hidden sm:inline">${isTe ? 'ప్రస్తుత విభాగం' : 'Active Dashboard'}:</span>
              <span class="font-bold flex items-center gap-1.5 text-white">
                <i class="fa-solid ${activeStepObj.icon} text-teal-300 text-xs"></i>
                <span>${activeStepObj.id}. ${activeLabel}</span>
              </span>
            </div>

          </div>

          <!-- Right: Cadre Badge + Switch Cadre Dropdown -->
          <div class="flex items-center gap-2.5">
            
            <!-- Cadre Role Clearance Pill -->
            <div class="hidden sm:flex items-center gap-1.5 text-xs font-bold text-white bg-black/20 px-3 py-1.5 rounded-lg border border-white/20">
              <i class="fa-solid ${config.icon} text-amber-200"></i>
              <span>${roleTitle}</span>
            </div>

            <!-- Traditional Cadre Switcher Dropdown -->
            <div class="relative shrink-0" id="cadreDropdownContainer">
              <button 
                type="button" 
                onclick="toggleCadreDropdown(event)" 
                class="bg-[#b33910] hover:bg-[#992f0b] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 transition border border-amber-300/40 shadow-sm"
                title="Switch Statutory Cadre Role"
              >
                <i class="fa-solid fa-user-gear text-amber-200 text-xs"></i>
                <span>${isTe ? 'కేడర్ మార్చండి ▾' : 'Switch Cadre ▾'}</span>
              </button>
              <div id="cadreDropdownMenu" class="hidden absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-fade-in font-sans">
                <div class="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  ${isTe ? 'అధికారిక కేడర్లు (4 పాత్రలు)' : 'Statutory Health Cadres'}
                </div>
                <button onclick="quickLoginWithAccount('anm_lakshmi'); closeCadreDropdown();" class="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 transition ${currentUser && currentUser.username === 'anm_lakshmi' ? 'bg-teal-50 font-black text-[#0096a6]' : 'text-slate-700'}">
                  <div>
                    <div class="font-bold text-slate-900">ANM Lakshmi Devi</div>
                    <div class="text-[10px] text-slate-500">Health Worker • Tajangi SC</div>
                  </div>
                  ${currentUser && currentUser.username === 'anm_lakshmi' ? '<i class="fa-solid fa-circle-check text-[#0096a6]"></i>' : ''}
                </button>
                <button onclick="quickLoginWithAccount('dr_lokeshkumar'); closeCadreDropdown();" class="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 transition ${currentUser && currentUser.username === 'dr_lokeshkumar' ? 'bg-teal-50 font-black text-[#0096a6]' : 'text-slate-700'}">
                  <div>
                    <div class="font-bold text-slate-900">Dr. K. Lokeshkumar</div>
                    <div class="text-[10px] text-slate-500">Medical Officer • Minumuluru PHC</div>
                  </div>
                  ${currentUser && currentUser.username === 'dr_lokeshkumar' ? '<i class="fa-solid fa-circle-check text-[#0096a6]"></i>' : ''}
                </button>
                <button onclick="quickLoginWithAccount('dr_surya_kgh'); closeCadreDropdown();" class="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 transition ${currentUser && currentUser.username === 'dr_surya_kgh' ? 'bg-teal-50 font-black text-[#0096a6]' : 'text-slate-700'}">
                  <div>
                    <div class="font-bold text-slate-900">Dr. P. Surya Rao</div>
                    <div class="text-[10px] text-slate-500">Specialist Oncologist • KGH Vizag</div>
                  </div>
                  ${currentUser && currentUser.username === 'dr_surya_kgh' ? '<i class="fa-solid fa-circle-check text-[#0096a6]"></i>' : ''}
                </button>
                <button onclick="quickLoginWithAccount('po_itda_paderu'); closeCadreDropdown();" class="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 transition ${currentUser && currentUser.username === 'po_itda_paderu' ? 'bg-teal-50 font-black text-[#0096a6]' : 'text-slate-700'}">
                  <div>
                    <div class="font-bold text-slate-900">Sri Aditya Verma, IAS</div>
                    <div class="text-[10px] text-slate-500">ITDA Project Officer • Paderu</div>
                  </div>
                  ${currentUser && currentUser.username === 'po_itda_paderu' ? '<i class="fa-solid fa-circle-check text-[#0096a6]"></i>' : ''}
                </button>
                <div class="border-t border-slate-100 mt-1 pt-1.5 px-3.5">
                  <button onclick="handleLogout()" class="w-full text-left py-1 text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    <span>${isTe ? 'లాగ్ అవుట్' : 'Sign Out'}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      `;
    }"""

pattern = r"    function renderPipelineNav\(\) \{[\s\S]*?    \}"
new_content, count = re.subn(pattern, new_render_pipeline_nav, content, count=1)

if count == 1:
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: renderPipelineNav replaced cleanly!")
else:
    print(f"FAILED: match count was {count}")

