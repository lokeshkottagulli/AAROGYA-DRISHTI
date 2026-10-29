import re

html_path = r'frontend/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's inspect renderCadreDashboardHub in content
start_marker = "    function renderCadreDashboardHub() {"
end_marker = "    function renderDashboardRbacBanner(stepId) {"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

print("start_idx:", start_idx)
print("end_idx:", end_idx)

if start_idx == -1 or end_idx == -1:
    print("Markers not found!")
    exit(1)

new_cadre_hub = """    function renderCadreDashboardHub() {
      const hub = document.getElementById('cadreDashboardHub');
      if (!hub || !currentUser) return;

      const isTe = currentLang === 'te';
      const config = ROLE_CONFIGS[currentUser.role] || ROLE_CONFIGS.HEALTH_WORKER;
      const roleTitle = isTe ? config.titleTe : config.titleEn;
      const roleBadge = isTe ? config.badgeTe : config.badgeEn;

      // Role specific KPIs & Quick Routes
      let kpis = [];
      let quickActions = [];

      if (currentUser.role === 'HEALTH_WORKER') {
        kpis = [
          { label: isTe ? 'గ్రామ సర్వే స్క్రీనింగ్‌లు' : 'Village Screenings Today', val: '18 Active', sub: isTe ? 'తాజంగి & మినుములూరు సెక్టార్' : 'Tajangi & Minumuluru Sector', icon: 'fa-user-check', targetStep: 1 },
          { label: isTe ? 'అధిక-ప్రమాద గాయాలు' : 'High-Risk Lesions Identified', val: '4 Cases', sub: isTe ? 'వెంటనే వైద్యాధికారి సమీక్షించవలసినవి' : 'Immediate MO Triage Flagged', icon: 'fa-triangle-exclamation', isAlert: true, targetStep: 3 },
          { label: isTe ? 'ఆఫ్‌లైన్ విలేజ్ క్యూ' : 'Offline Village Queue', val: `${offlineQueue.length} Pending`, sub: isOnline ? (isTe ? 'ఆన్‌లైన్ (స్టోరేజ్ సింక్ అయింది)' : 'Online (Storage Synced)') : (isTe ? 'ఆఫ్‌లైన్ మోడ్ యాక్టివ్' : 'Offline Mode Active'), icon: 'fa-cloud-arrow-up', targetStep: 1 },
          { label: isTe ? 'ఫాలో-అప్ విజిట్స్' : 'Follow-up Visits Due', val: '3 Patients', sub: isTe ? 'గిరిజన ప్రాంతాల కమ్యూనికేషన్' : 'Tribal Habitation Navigation', icon: 'fa-calendar-day', targetStep: 8 }
        ];
        quickActions = [
          { stepId: 1, label: isTe ? '+ కొత్త రోగి నమోదు' : '+ New Patient Registration', icon: 'fa-user-plus', primary: true },
          { stepId: 2, label: isTe ? 'ఓరల్ కెమెరా క్యాప్చర్' : 'Oral Camera Capture', icon: 'fa-camera' },
          { stepId: 3, label: isTe ? 'AI గాయాల విశ్లేషణ' : 'AI Lesion Assessment', icon: 'fa-microchip' },
          { stepId: 8, label: isTe ? 'హోమ్ ఫాలో-అప్ ట్రాకింగ్' : 'Home Follow-up Tracking', icon: 'fa-heart-pulse' }
        ];
      } else if (currentUser.role === 'MEDICAL_OFFICER') {
        kpis = [
          { label: isTe ? 'సమీక్షించాల్సిన AI ఫలితాలు' : 'AI Triages Pending Review', val: '6 Triages', sub: isTe ? 'మినుములూరు PHC డెస్క్' : 'Minumuluru PHC Clinical Desk', icon: 'fa-clock-rotate-left', targetStep: 4 },
          { label: isTe ? 'అత్యవసర టెలికన్సల్ట్స్' : 'Urgent Teleconsults Queued', val: '2 Patients', sub: isTe ? 'KGH స్పెషలిస్ట్ కోసం వేచి ఉంది' : 'Awaiting KGH Specialist', icon: 'fa-video', isAlert: true, targetStep: 5 },
          { label: isTe ? 'యాక్టివ్ బయాప్సీలు' : 'Active Biopsy Trackers', val: '4 Specimen', sub: isTe ? 'పాడేరు జిల్లా ఆసుపత్రి / KGH' : 'Paderu DH / KGH Vizag Lab', icon: 'fa-microscope', targetStep: 7 },
          { label: isTe ? 'క్లినికల్ నిర్ణయ సమయం' : 'Clinical Decision TAT', val: '2.4 Hours', sub: isTe ? 'లక్ష్యం: < 24 గంటలు' : 'Standard < 24h Window', icon: 'fa-bolt', targetStep: 4 }
        ];
        quickActions = [
          { stepId: 4, label: isTe ? 'AI సమీక్ష డెస్క్' : 'Review AI Triage Queue', icon: 'fa-user-doctor', primary: true },
          { stepId: 5, label: isTe ? 'వీడియో టెలికన్సల్ట్' : 'Open Video Teleconsult', icon: 'fa-video' },
          { stepId: 6, label: isTe ? 'ఆసుపత్రి రిఫెరల్' : 'Schedule Hospital Referral', icon: 'fa-calendar-check' },
          { stepId: 7, label: isTe ? 'బయాప్సీ ట్రాకింగ్' : 'Track Biopsy Specimen', icon: 'fa-microscope' }
        ];
      } else if (currentUser.role === 'SPECIALIST') {
        kpis = [
          { label: isTe ? 'టెలి-ఆంకాలజీ క్యూ' : 'Tele-Oncology Queue', val: '3 Sessions', sub: isTe ? 'ప్రత్యక్ష WebRTC గదిలో వేచి' : 'Live WebRTC Specialist Room', icon: 'fa-video', isAlert: true, targetStep: 5 },
          { label: isTe ? 'హిస్టోపాథాలజీ రిపోర్టులు' : 'Biopsies Awaiting Staging', val: '2 Reports', sub: isTe ? 'మైక్రోస్కోపిక్ రివ్యూ' : 'Histopathology Microscopic Review', icon: 'fa-microscope', targetStep: 7 },
          { label: isTe ? 'నిర్ధారిత ప్రారంభ కేసులు' : 'Confirmed Early Stage Cases', val: '8 Patients', sub: isTe ? 'TisN0M0 & Stage I నయమయ్యేవి' : 'TisN0M0 & Stage I Curative', icon: 'fa-circle-check', targetStep: 8 },
          { label: isTe ? 'ఆరోగ్యశ్రీ సంరక్షణ ప్రణాళికలు' : 'Aarogyasri Care Plans', val: '12 Active', sub: isTe ? 'KGH / హోమీ బాభా కేంద్రం' : 'Tertiary KGH / HBCH Vizag', icon: 'fa-heart-pulse', targetStep: 8 }
        ];
        quickActions = [
          { stepId: 5, label: isTe ? 'టెలి-ఆంకాలజీ రూమ్' : 'Launch Tele-Oncology Room', icon: 'fa-video', primary: true },
          { stepId: 7, label: isTe ? 'TNM స్టేజింగ్ & ల్యాబ్' : 'Biopsy TNM Staging', icon: 'fa-microscope' },
          { stepId: 4, label: isTe ? 'సంక్లిష్ట కేసుల సమీక్ష' : 'Complex Lesions Review', icon: 'fa-user-doctor' },
          { stepId: 8, label: isTe ? 'ఆంకాలజీ చికిత్స' : 'Oncology Care Navigation', icon: 'fa-clipboard-medical' }
        ];
      } else if (currentUser.role === 'DISTRICT_ADMIN') {
        kpis = [
          { label: isTe ? 'జిల్లా లక్ష్యం సాధన' : 'ASR Screening Target', val: '82.5%', sub: isTe ? '2,642 / 3,200 సాధించబడింది' : '2,642 / 3,200 Achieved', icon: 'fa-bullseye', targetStep: 9 },
          { label: isTe ? 'అతిపెద్ద ప్రమాద మండలాలు' : 'High-Alert Mandals', val: '3 Mandals', sub: isTe ? 'పాడేరు, చింతపల్లి, జి.మాడుగుల' : 'Paderu, Chintapalli, G.Madugula', icon: 'fa-triangle-exclamation', isAlert: true, targetStep: 9 },
          { label: isTe ? 'ఫీడర్ అంబులెన్సులు లైవ్' : 'Feeder Ambulances Live', val: '14 / 16 Live', sub: isTe ? 'మల్టీ-టెర్రైన్ గిరిజన లాజిస్టిక్స్' : 'Multi-Terrain Tribal Logistics', icon: 'fa-truck-medical', targetStep: 6 },
          { label: isTe ? 'పరిష్కార రేటు' : 'Referral Resolution Rate', val: '86.4%', sub: isTe ? 'సగటు సమయం: 14.2 గంటలు' : 'Median Turnaround: 14.2 Hours', icon: 'fa-chart-line', targetStep: 9 }
        ];
        quickActions = [
          { stepId: 9, label: isTe ? 'జిల్లా కమాండ్ సెంటర్' : 'District Surveillance Command', icon: 'fa-chart-pie', primary: true },
          { stepId: 4, label: isTe ? 'PHC కేస్‌లోడ్ ఆడిట్' : 'PHC Triage Caseload Audit', icon: 'fa-clipboard-list' },
          { stepId: 1, label: isTe ? 'డేమోగ్రాఫిక్స్ ఆడిట్' : 'Demographics Intake Audit', icon: 'fa-users' }
        ];
      }

      hub.innerHTML = `
        <div class="bg-gradient-to-r from-[#d84a1b] via-[#e05423] to-[#ea580c] text-white rounded-2xl p-5 sm:p-6 border border-orange-600 shadow-xl space-y-5 relative">
          
          <!-- Top Row: Role Avatar, Greeting, Facility & Status -->
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div class="flex items-start sm:items-center gap-3.5">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white bg-white/20 border border-white/30 shadow shrink-0">
                <i class="fa-solid ${config.icon}"></i>
              </div>
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="bg-black/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 uppercase tracking-wider">${roleBadge}</span>
                  <span class="text-[10px] text-emerald-200 flex items-center gap-1 font-semibold"><i class="fa-solid fa-circle-check"></i> DISHA / HIPAA Compliant</span>
                </div>
                <h2 class="text-lg sm:text-xl font-black text-white tracking-tight flex flex-wrap items-center gap-2">
                  <span>${isTe ? 'కేడర్ కమాండ్ హబ్:' : 'Cadre Command Hub:'}</span>
                  <span class="text-white">${currentUser.name}</span>
                  <span class="text-xs text-orange-200 font-normal">(${roleTitle})</span>
                </h2>
                <div class="text-xs text-orange-100 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span><i class="fa-solid fa-location-dot text-amber-300 mr-1"></i>${currentUser.facility}</span>
                  <span><i class="fa-solid fa-map text-amber-300 mr-1"></i>Alluri Sitharama Raju District • ${currentUser.mandal}</span>
                  <span class="text-white font-semibold"><i class="fa-solid fa-shield-halved text-amber-300 mr-1"></i>${isTe ? 'అనుమతించబడిన దశలు: ' : 'Authorized Steps: '}${currentUser.allowedSteps.join(', ')}</span>
                </div>
              </div>
            </div>

            <!-- Role Switch / Log out Trigger -->
            <div class="flex items-center gap-2 shrink-0">
              <button onclick="handleLogout()" class="bg-white/20 hover:bg-white/30 border border-white/30 text-xs text-white px-3.5 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md" title="Switch Cadre Role">
                <i class="fa-solid fa-arrow-right-from-bracket text-amber-200"></i>
                <span>${isTe ? 'లాగ్ అవుట్' : 'Sign Out'}</span>
              </button>
            </div>
          </div>

          <!-- Middle Row: Cadre Dynamic KPIs (4 Cards) with Interactive Hover Effects & High-Risk Hard Alert Styling -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            ${kpis.map(kpi => {
              if (kpi.isAlert) {
                return `
                  <!-- HIGH-RISK HARD ALERT CARD: Solid Crimson Red Gradient, High-Contrast White Elements & 3D Hover -->
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
                  </div>
                `;
              } else {
                return `
                  <!-- Standard KPI Card: Translucent Frosted Glass with Interactive 3D Lift & Shadow Elevation -->
                  <div onclick="${kpi.targetStep ? `goToStep(${kpi.targetStep})` : ''}" class="bg-white/15 backdrop-blur-md border border-white/25 rounded-xl p-4 space-y-2 text-white shadow-md transform hover:-translate-y-2 hover:scale-[1.03] hover:bg-white/25 hover:border-white/50 hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer group">
                    <div class="flex items-center justify-between text-xs text-orange-100">
                      <span class="font-bold line-clamp-1 text-white">${kpi.label}</span>
                      <i class="fa-solid ${kpi.icon} text-white/80 group-hover:text-amber-200 text-xs transition"></i>
                    </div>
                    <div class="text-3xl font-black text-white tracking-tight">${kpi.val}</div>
                    <div class="text-[11px] text-orange-100 line-clamp-1 font-medium">${kpi.sub}</div>
                  </div>
                `;
              }
            }).join('')}
          </div>

          <!-- Bottom Row: Cadre Quick-Action Shortcuts with Interactive Hover Lift -->
          <div class="pt-3 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-2 text-orange-100">
              <i class="fa-solid fa-route text-amber-300"></i>
              <span class="font-bold text-white uppercase tracking-wider text-[11px]">${isTe ? 'త్వరిత మార్గాలు:' : 'Cadre Quick Routes:'}</span>
            </div>
            <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              ${quickActions.map(qa => `
                <button onclick="goToStep(${qa.stepId})" class="text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-200 border transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg cursor-pointer ${
                  qa.primary
                    ? 'bg-white text-[#d84a1b] hover:bg-orange-50 border-white shadow-md'
                    : 'bg-white/15 hover:bg-white/30 text-white border-white/30'
                }">
                  <i class="fa-solid ${qa.icon} text-[10px] ${qa.primary ? 'text-[#d84a1b]' : 'text-amber-200'}"></i>
                  <span>${qa.label}</span>
                </button>
              `).join('')}
            </div>
          </div>

        </div>
      `;
    }\n\n"""

updated = content[:start_idx] + new_cadre_hub + content[end_idx:]

# Also update renderPatientSelectors activePatientRiskBadge to hard color
old_badge_code = """      if (active.risk === 'SUSPICIOUS') {
        badge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1';
        badge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> HIGH RISK (${(active.aiScore * 100).toFixed(0)}%)`;
      }"""

new_badge_code = """      if (active.risk === 'SUSPICIOUS') {
        badge.className = 'px-3 py-1 rounded-full text-xs font-black bg-red-600 hover:bg-red-700 text-white border-2 border-white shadow-md flex items-center gap-1.5 cursor-pointer transform hover:scale-105 transition-all';
        badge.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-amber-300 animate-pulse"></i> HIGH RISK (${(active.aiScore * 100).toFixed(0)}%)`;
      }"""

if old_badge_code in updated:
    updated = updated.replace(old_badge_code, new_badge_code)
    print("Updated activePatientRiskBadge to hard color!")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(updated)

print("SUCCESS: renderCadreDashboardHub updated with hard colors and hover effects!")

