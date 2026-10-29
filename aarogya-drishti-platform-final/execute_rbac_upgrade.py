import re

with open('frontend/index.html', encoding='utf-8') as f:
    text = f.read()

# 1. Update Navigation Block (renderPipelineNav, goToStep, plus new Cadre Hub & Banner & Shield)
nav_block_regex = re.compile(
    r'[ \t]*// ==================== PIPELINE NAVIGATION & RBAC GUARD ====================[\s\S]*?function goToStep\(stepId\)\s*\{[\s\S]*?\n    \}',
    re.MULTILINE
)

new_nav_block = '''    // ==================== CADRE DASHBOARD HUB & RBAC ENFORCEMENT ====================
    function renderCadreDashboardHub() {
      const hub = document.getElementById('cadreDashboardHub');
      if (!hub) return;
      if (!currentUser) {
        hub.innerHTML = '';
        return;
      }
      const config = ROLE_CONFIGS[currentUser.role] || ROLE_CONFIGS.HEALTH_WORKER;
      const isTe = currentLang === 'te';
      const roleTitle = isTe ? config.titleTe : config.titleEn;
      const roleSub = isTe ? config.subTe : config.subEn;
      const roleBadge = isTe ? config.badgeTe : config.badgeEn;

      // Role specific KPIs & Quick Routes
      let kpis = [];
      let quickActions = [];

      if (currentUser.role === 'HEALTH_WORKER') {
        kpis = [
          { label: isTe ? 'నేటి గ్రామ స్క్రీనింగ్‌లు' : 'Village Screenings Today', val: '18 Active', sub: isTe ? 'తాజంగి & పాడేరు సెక్టార్' : 'Tajangi & Minumuluru Sector', icon: 'fa-user-check', border: 'border-emerald-500/30', text: 'text-emerald-400' },
          { label: isTe ? 'అనుమానాస్పద కేసులు' : 'High-Risk Lesions Identified', val: '4 Cases', sub: isTe ? 'తక్షణ డాక్టర్ ట్రయాజ్‌కు పంపబడింది' : 'Immediate MO Triage Flagged', icon: 'fa-triangle-exclamation', border: 'border-rose-500/30', text: 'text-rose-400' },
          { label: isTe ? 'ఆఫ్‌లైన్ విలేజ్ క్యూ' : 'Offline Village Queue', val: `${offlineQueue.length} Pending`, sub: isOnline ? (isTe ? 'ఆన్‌లైన్ (సింక్ పూర్తయింది)' : 'Online (Storage Synced)') : (isTe ? 'ఆఫ్‌లైన్ మోడ్ క్రియాశీలం' : 'Offline Mode Active'), icon: 'fa-cloud-arrow-up', border: 'border-amber-500/30', text: 'text-amber-400' },
          { label: isTe ? 'తదుపరి ఫాలో-అప్ సందర్శనలు' : 'Follow-up Visits Due', val: '3 Patients', sub: isTe ? 'దీర్ఘకాలిక సంరక్షణ పర్యవేక్షణ' : 'Tribal Habitation Navigation', icon: 'fa-calendar-day', border: 'border-indigo-500/30', text: 'text-indigo-400' }
        ];
        quickActions = [
          { stepId: 1, label: isTe ? '+ కొత్త స్క్రీనింగ్ నమోదు' : '+ New Patient Registration', icon: 'fa-user-plus', primary: true },
          { stepId: 2, label: isTe ? 'నోటి ఫోటో పరీక్ష' : 'Oral Camera Capture', icon: 'fa-camera' },
          { stepId: 3, label: isTe ? 'AI రిస్క్ విశ్లేషణ' : 'AI Lesion Assessment', icon: 'fa-microchip' },
          { stepId: 8, label: isTe ? 'రోగి ఫాలో-అప్ ట్రాకింగ్' : 'Home Follow-up Tracking', icon: 'fa-heart-pulse' }
        ];
      } else if (currentUser.role === 'MEDICAL_OFFICER') {
        kpis = [
          { label: isTe ? 'సమీక్షించాల్సిన AI కేసులు' : 'AI Triages Pending Review', val: '6 Triages', sub: isTe ? 'మినుములూరు PHC డెస్క్' : 'Minumuluru PHC Clinical Desk', icon: 'fa-clock-rotate-left', border: 'border-sky-500/30', text: 'text-sky-400' },
          { label: isTe ? 'నిపుణుడికి సిఫార్సులు' : 'Urgent Teleconsults Queued', val: '2 Patients', sub: isTe ? 'KGH ఆంకాలజిస్ట్ సమన్వయం' : 'Awaiting KGH Specialist', icon: 'fa-video', border: 'border-purple-500/30', text: 'text-purple-400' },
          { label: isTe ? 'సక్రియ బయాప్సీ శాంపిల్స్' : 'Active Biopsy Trackers', val: '4 Specimen', sub: isTe ? 'పాడేరు జిల్లా ఆసుపత్రి ల్యాబ్' : 'Paderu DH / KGH Vizag Lab', icon: 'fa-microscope', border: 'border-amber-500/30', text: 'text-amber-400' },
          { label: isTe ? 'సగటు ట్రయాజ్ నిర్ణయ సమయం' : 'Clinical Decision TAT', val: '2.4 Hours', sub: isTe ? 'లక్ష్యం: < 24 గంటలు' : 'Standard < 24h Window', icon: 'fa-bolt', border: 'border-emerald-500/30', text: 'text-emerald-400' }
        ];
        quickActions = [
          { stepId: 4, label: isTe ? 'AI ట్రయాజ్ సమీక్ష డెస్క్' : 'Review AI Triage Queue', icon: 'fa-user-doctor', primary: true },
          { stepId: 5, label: isTe ? 'టెలికన్సల్ట్ ప్రారంభించండి' : 'Open Video Teleconsult', icon: 'fa-video' },
          { stepId: 6, label: isTe ? 'ఆసుపత్రి రిఫరల్ షెడ్యూల్' : 'Schedule Hospital Referral', icon: 'fa-calendar-check' },
          { stepId: 7, label: isTe ? 'బయాప్సీ ల్యాబ్ ట్రాకర్' : 'Track Biopsy Specimen', icon: 'fa-microscope' }
        ];
      } else if (currentUser.role === 'SPECIALIST') {
        kpis = [
          { label: isTe ? 'టెలి-ఆంకాలజీ కన్సల్ట్‌లు' : 'Tele-Oncology Queue', val: '3 Sessions', sub: isTe ? 'ప్రత్యక్ష WebRTC వీడియో లింక్' : 'Live WebRTC Specialist Room', icon: 'fa-video', border: 'border-purple-500/30', text: 'text-purple-400' },
          { label: isTe ? 'స్టేజింగ్ వేచి ఉన్నవి' : 'Biopsies Awaiting Staging', val: '2 Reports', sub: isTe ? 'హిస్టోపాథాలజీ రిపోర్టులు సిద్ధం' : 'Histopathology Microscopic Review', icon: 'fa-microscope', border: 'border-amber-500/30', text: 'text-amber-400' },
          { label: isTe ? 'నిర్ధారిత ప్రారంభ కేసులు' : 'Confirmed Early Stage Cases', val: '8 Patients', sub: isTe ? 'TisN0M0 & Stage I చికిత్స' : 'TisN0M0 & Stage I Curative', icon: 'fa-circle-check', border: 'border-emerald-500/30', text: 'text-emerald-400' },
          { label: isTe ? 'ఆరోగ్యశ్రీ చికిత్స ప్లాన్లు' : 'Aarogyasri Care Plans', val: '12 Active', sub: isTe ? 'KGH / హోమీ భాభా సెంటర్' : 'Tertiary KGH / HBCH Vizag', icon: 'fa-heart-pulse', border: 'border-sky-500/30', text: 'text-sky-400' }
        ];
        quickActions = [
          { stepId: 5, label: isTe ? 'టెలి-ఆంకాలజీ గది' : 'Launch Tele-Oncology Room', icon: 'fa-video', primary: true },
          { stepId: 7, label: isTe ? 'TNM స్టేజింగ్ & బయాప్సీ' : 'Biopsy TNM Staging', icon: 'fa-microscope' },
          { stepId: 4, label: isTe ? 'సంక్లిష్ట కేసుల సమీక్ష' : 'Complex Lesions Review', icon: 'fa-user-doctor' },
          { stepId: 8, label: isTe ? 'ఆంకాలజీ చికిత్స ప్రణాళిక' : 'Oncology Care Navigation', icon: 'fa-clipboard-medical' }
        ];
      } else if (currentUser.role === 'DISTRICT_ADMIN') {
        kpis = [
          { label: isTe ? 'జిల్లా స్క్రీనింగ్ లక్ష్యం' : 'ASR Screening Target', val: '82.5%', sub: isTe ? '2,642 / 3,200 పూర్తి' : '2,642 / 3,200 Achieved', icon: 'fa-bullseye', border: 'border-amber-500/30', text: 'text-amber-400' },
          { label: isTe ? 'అధిక ముప్పు మండలాలు' : 'High-Alert Mandals', val: '3 Mandals', sub: isTe ? 'పాడేరు, చింతపల్లి, జి.మాడుగుల' : 'Paderu, Chintapalli, G.Madugula', icon: 'fa-triangle-exclamation', border: 'border-rose-500/30', text: 'text-rose-400' },
          { label: isTe ? 'గిరిజన ఫీడర్ అంబులెన్సులు' : 'Feeder Ambulances Live', val: '14 / 16 Live', sub: isTe ? 'మల్టీ-టెర్రైన్ అంబులెన్స్ నెట్‌వర్క్' : 'Multi-Terrain Tribal Logistics', icon: 'fa-truck-medical', border: 'border-emerald-500/30', text: 'text-emerald-400' },
          { label: isTe ? 'రిఫరల్-టు-బయాప్సీ సమయం' : 'Referral Resolution Rate', val: '86.4%', sub: isTe ? 'సగటు పరిష్కారం: 14.2 గంటలు' : 'Median Turnaround: 14.2 Hours', icon: 'fa-chart-line', border: 'border-indigo-500/30', text: 'text-indigo-400' }
        ];
        quickActions = [
          { stepId: 9, label: isTe ? 'జిల్లా నిఘా డ్యాష్‌బోర్డ్' : 'District Surveillance Command', icon: 'fa-chart-pie', primary: true },
          { stepId: 4, label: isTe ? 'PHC ట్రయాజ్ కేస్‌లోడ్ ఆడిట్' : 'PHC Triage Caseload Audit', icon: 'fa-clipboard-list' },
          { stepId: 1, label: isTe ? 'సమాజ రిజిస్ట్రేషన్ల ఆడిట్' : 'Demographics Intake Audit', icon: 'fa-users' }
        ];
      }

      hub.innerHTML = `
        <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl p-5 sm:p-6 border border-slate-700 shadow-xl space-y-5 relative overflow-hidden">
          <div class="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
            <i class="fa-solid ${config.icon} text-9xl text-teal-300"></i>
          </div>

          <!-- Top Row: Role Avatar, Greeting, Facility & Status -->
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
            <div class="flex items-start sm:items-center gap-3.5">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold text-white shadow-lg ring-4 ring-white/10 shrink-0" style="background-color: ${config.accentHex};">
                <i class="fa-solid ${config.icon}"></i>
              </div>
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.badgeClass}">
                    ${currentUser.role}
                  </span>
                  <span class="text-xs text-teal-300 font-semibold flex items-center gap-1">
                    <i class="fa-solid fa-circle-check text-emerald-400"></i>
                    ${roleBadge}
                  </span>
                  <span class="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-full">
                    DISHA / HIPAA 2026 Compliant
                  </span>
                </div>
                <h2 class="text-lg sm:text-xl font-extrabold text-white tracking-tight flex flex-wrap items-center gap-2">
                  <span>${isTe ? 'స్వాగతం' : 'Cadre Command Hub:'}</span>
                  <span class="text-teal-300">${currentUser.name}</span>
                  <span class="text-xs text-slate-300 font-normal">(${roleTitle})</span>
                </h2>
                <div class="text-xs text-slate-300 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span><i class="fa-solid fa-location-dot text-rose-400 mr-1"></i>${currentUser.facility}</span>
                  <span><i class="fa-solid fa-map text-teal-400 mr-1"></i>${currentUser.mandal}</span>
                  <span class="text-emerald-400 font-semibold"><i class="fa-solid fa-shield-halved mr-1"></i>${isTe ? 'అనుమతించబడిన విభాగాలు: ' : 'Authorized Steps: '}${currentUser.allowedSteps.join(', ')}</span>
                </div>
              </div>
            </div>

            <!-- Role Switch / Log out Trigger -->
            <div class="flex items-center gap-2 shrink-0">
              <button onclick="handleLogout()" class="bg-slate-800/90 hover:bg-slate-700 border border-slate-600 text-xs text-slate-200 hover:text-white px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition shadow-sm" title="Switch Cadre Role">
                <i class="fa-solid fa-arrow-right-from-bracket text-rose-400"></i>
                <span>${isTe ? 'పాత్ర మార్చండి' : 'Switch Role'}</span>
              </button>
            </div>
          </div>

          <!-- Middle Row: Cadre Dynamic KPIs (4 Cards) -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
            ${kpis.map(kpi => `
              <div class="bg-slate-800/85 backdrop-blur-sm border ${kpi.border} rounded-xl p-3.5 space-y-1 hover:border-teal-500/50 transition">
                <div class="flex items-center justify-between text-[11px] text-slate-400">
                  <span class="font-medium line-clamp-1">${kpi.label}</span>
                  <i class="fa-solid ${kpi.icon} ${kpi.text} text-xs"></i>
                </div>
                <div class="text-xl sm:text-2xl font-black ${kpi.text} tracking-tight">${kpi.val}</div>
                <div class="text-[10px] text-slate-400 line-clamp-1">${kpi.sub}</div>
              </div>
            `).join('')}
          </div>

          <!-- Bottom Row: Cadre Quick-Action Shortcuts -->
          <div class="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs relative z-10">
            <div class="flex items-center gap-2 text-slate-400">
              <i class="fa-solid fa-route text-teal-400"></i>
              <span class="font-semibold text-slate-300">${isTe ? 'కేడర్ త్వరిత మార్గాలు (1-క్లిక్ రూటింగ్):' : 'Cadre Quick-Action Routes:'}</span>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              ${quickActions.map(qa => `
                <button onclick="goToStep(${qa.stepId})" class="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                  qa.primary
                    ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md font-extrabold'
                    : 'bg-slate-800 hover:bg-slate-700 text-teal-200 border border-slate-700'
                }">
                  <i class="fa-solid ${qa.icon}"></i>
                  <span>${qa.label}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    function renderDashboardRbacBanner(stepId) {
      const banner = document.getElementById(`rbac-banner-step-${stepId}`);
      if (!banner) return;
      if (!currentUser) {
        banner.innerHTML = '';
        return;
      }

      const stepObj = pipelineSteps.find(s => s.id === stepId);
      const isTe = currentLang === 'te';
      const allowed = currentUser.allowedSteps || currentUser.allowed_steps || [];
      const isPermitted = allowed.includes(stepId);
      const isReadOnly = stepObj && stepObj.writeRoles && !stepObj.writeRoles.includes(currentUser.role);
      const config = ROLE_CONFIGS[currentUser.role] || ROLE_CONFIGS.HEALTH_WORKER;
      const userRoleTitle = isTe ? config.titleTe : config.titleEn;

      let statusBadgeClass = '';
      let statusIcon = '';
      let statusText = '';
      let bgClass = '';

      if (isPermitted) {
        if (isReadOnly) {
          statusBadgeClass = 'bg-amber-100 text-amber-800 border border-amber-300';
          statusIcon = 'fa-eye';
          statusText = isTe ? 'అనుమతి ఇవ్వబడింది • పరిపాలనా ఆడిట్ మోడ్' : 'ACCESS GRANTED • ADMINISTRATIVE READ-ONLY AUDIT';
          bgClass = 'bg-amber-50/70 border-amber-200 text-amber-950';
        } else {
          statusBadgeClass = 'bg-emerald-100 text-emerald-800 border border-emerald-300';
          statusIcon = 'fa-shield-check';
          statusText = isTe ? 'అనుమతి ఇవ్వబడింది • పూర్తి క్లినికల్ అధికారం' : 'ACCESS GRANTED • FULL CLINICAL CLEARANCE';
          bgClass = 'bg-emerald-50/60 border-emerald-200 text-emerald-950';
        }
      } else {
        statusBadgeClass = 'bg-rose-100 text-rose-800 border border-rose-300';
        statusIcon = 'fa-shield-halved';
        statusText = isTe ? 'అనుమతి నిరాకరించబడింది • ఉన్నత కేడర్ అనుమతి అవసరం' : 'ACCESS RESTRICTED • HIGHER CADRE CLEARANCE REQUIRED';
        bgClass = 'bg-rose-50/80 border-rose-200 text-rose-950';
      }

      const allowedRolesHtml = stepObj && stepObj.roles ? stepObj.roles.map(r => {
        const rc = ROLE_CONFIGS[r];
        const rTitle = rc ? (isTe ? rc.titleTe : rc.titleEn) : r;
        const isCurrent = currentUser && currentUser.role === r;
        return `<span class="px-2 py-0.5 rounded text-[10px] font-bold border ${
          isCurrent
            ? 'bg-slate-900 text-teal-300 border-teal-500 shadow-sm'
            : 'bg-white text-slate-700 border-slate-300'
        }">${rTitle}</span>`;
      }).join(' ') : '';

      banner.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl border ${bgClass} text-xs shadow-sm">
          <div class="flex items-center gap-2.5 flex-wrap">
            <span class="px-2.5 py-1 rounded-md font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 ${statusBadgeClass}">
              <i class="fa-solid ${statusIcon}"></i>
              <span>${statusText}</span>
            </span>
            <span class="font-medium text-slate-700">
              ${isTe ? 'సక్రియ కేడర్:' : 'Active Cadre:'} <strong class="text-slate-900">${currentUser.name}</strong> (${userRoleTitle}) • <span class="text-slate-500">${currentUser.facility}</span>
            </span>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-slate-500 font-semibold">${isTe ? 'చట్టబద్ధమైన అధికారిక కేడర్లు:' : 'Statutory Cadres:'}</span>
            <div class="flex items-center gap-1 flex-wrap">
              ${allowedRolesHtml}
            </div>
            <span class="text-slate-400 text-[10px] hidden md:inline ml-1 pl-2 border-l border-slate-300">
              <i class="fa-solid fa-scale-balanced mr-1"></i>DISHA RBAC
            </span>
          </div>
        </div>
      `;
    }

    function renderDashboardRbacShield(stepId) {
      const shield = document.getElementById(`rbac-shield-step-${stepId}`);
      if (!shield || !currentUser) return;

      const stepObj = pipelineSteps.find(s => s.id === stepId);
      const isTe = currentLang === 'te';
      const stepName = stepObj ? (isTe ? stepObj.titleTe : stepObj.titleEn) : `Step ${stepId}`;
      const config = ROLE_CONFIGS[currentUser.role] || ROLE_CONFIGS.HEALTH_WORKER;
      const userRoleTitle = isTe ? config.titleTe : config.titleEn;

      const rationales = {
        1: isTe ? "గిరిజన రోగుల నమోదు మరియు క్లినికల్ అలవాట్ల వివరాల నమోదు కేవలం గ్రామ ఆరోగ్య కార్యకర్తలు (ASHA/ANM) లేదా PHC వైద్యుల ప్రత్యక్ష పర్యవేక్షణ ద్వారా మాత్రమే నిర్వహించబడాలి." : "Field patient enrollment and clinical risk factor intake require Frontline Health Worker (ASHA/ANM) certification or Medical Officer oversight for tribal community compliance.",
        2: isTe ? "నోటి లోపలి భాగాలను ఫోటో తీయుటకు మరియు నాణ్యత తనిఖీకి ప్రత్యేక శిక్షణ పొందిన ఫ్రంట్‌లైన్ ఆరోగ్య కార్యకర్తలు మరియు మెడికల్ ఆఫీసర్లు మాత్రమే అర్హులు." : "Standardized intraoral mucosal photography is restricted to Frontline Village Health Workers and Medical Officers who have completed practical oral screening protocols.",
        3: isTe ? "AI విశ్లేషణ మరియు అనుమానాస్పద స్కోర్ల సమీక్ష కేవలం వైద్య నిపుణులు (ఆరోగ్య కార్యకర్తలు, వైద్యాధికారులు, ఆంకాలజిస్టులు) మాత్రమే చేయాలి." : "Clinical vision inference review is restricted to clinical care personnel (Health Workers, Medical Officers, Oncologists). Administrative personnel may monitor aggregated metrics in Step 9.",
        4: isTe ? "AI అనుమానాస్పద కేసుల వైద్య సమీక్ష, అధికారిక ట్రయాజ్ మరియు బయాప్సీ సిఫార్సుల ఆమోదం కేవలం రిజిస్టర్డ్ వైద్యాధికారులు మరియు స్పెషలిస్టులకు మాత్రమే అనుమతి ఉంది." : "Clinical triage decision-making and diagnostic referral sign-offs require statutory Medical Officer or Surgical Oncologist registration under the AP Medical Council.",
        5: isTe ? "ప్రత్యక్ష టెలి-కన్సల్టేషన్ కేవలం రోగి వద్ద ఉన్న ఆరోగ్య కార్యకర్త మరియు ఉన్నత ఆసుపత్రి స్పెషలిస్ట్ మధ్య మాత్రమే జరగాలి." : "Synchronous video clinical consultations require a certified Medical Officer or Oral Oncologist connecting with village health teams.",
        6: isTe ? "ఆసుపత్రి రిఫరల్ మరియు ఉచిత ఫీడర్ అంబులెన్స్ కేటాయింపు ప్రక్రియ క్లినికల్ నిపుణుల ద్వారా మాత్రమే ప్రామాణీకరించబడాలి." : "Tertiary hospital referral scheduling and feeder ambulance dispatch require clinical healthcare provider authorization.",
        7: isTe ? "పంచ్ బయాప్సీ నమూనాల నిర్వహణ, పాథాలజీ ల్యాబ్ రిపోర్టుల ధృవీకరణ మరియు TNM స్టేజింగ్ కేవలం ఆంకాలజిస్ట్ మరియు మెడికల్ ఆఫీసర్ల చట్టబద్ధమైన పరిధిలో ఉంటాయి." : "Histopathological evaluation, punch biopsy handling, and TNM staging (TisN0M0 - Stage IV) are strictly limited to certified Oncologists and Medical Officers.",
        8: isTe ? "చికిత్స కొనసాగింపు మరియు ఆరోగ్యశ్రీ ప్రయోజనాల పర్యవేక్షణ క్లినికల్ కేర్ సిబ్బందికి మాత్రమే కేటాయించబడింది." : "Longitudinal adherence tracking and Aarogyasri chemotherapy navigation require clinical health workers and medical supervisors.",
        9: isTe ? "జిల్లా స్థాయి వ్యాప్తి గణాంకాలు, మండల వారీ హీట్‌మ్యాప్‌లు మరియు కమాండ్ సెంటర్ కేవలం జిల్లా స్థాయి పరిపాలనాధికారులు (PO ITDA / DM&HO) మరియు వైద్యాధికారులకు మాత్రమే అందుబాటులో ఉంటాయి." : "District-wide epidemiological heatmaps and surveillance command centers are restricted to District Health Administrators (PO ITDA / DM&HO) and Medical Officers."
      };

      const restrictionReason = rationales[stepId] || (isTe ? "ఈ విభాగానికి మీ ప్రస్తుత పాత్రకు అనుమతి లేదు." : "Your active cadre does not possess clearance for this clinical dashboard.");

      const allowedRolesDetailedBadges = stepObj && stepObj.roles ? stepObj.roles.map(r => {
        const rc = ROLE_CONFIGS[r];
        if (!rc) return '';
        const rTitle = isTe ? rc.titleTe : rc.titleEn;
        const rSub = isTe ? rc.subTe : rc.subEn;
        return `
          <div class="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
            <div class="w-6 h-6 rounded-md flex items-center justify-center text-xs text-white" style="background-color: ${rc.accentHex};">
              <i class="fa-solid ${rc.icon}"></i>
            </div>
            <div>
              <div class="font-bold text-slate-800 text-[11px]">${rTitle}</div>
              <div class="text-[10px] text-slate-500">${rSub}</div>
            </div>
          </div>
        `;
      }).join('') : '';

      shield.innerHTML = `
        <div class="bg-white rounded-2xl border-2 border-rose-300 shadow-xl p-6 sm:p-8 max-w-2xl mx-auto my-6 text-center space-y-6 relative overflow-hidden">
          <div class="absolute -right-8 -top-8 text-rose-100 pointer-events-none text-9xl opacity-40">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          
          <div class="relative z-10 space-y-4">
            <div class="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center text-3xl mx-auto shadow-lg ring-8 ring-rose-100">
              <i class="fa-solid fa-lock"></i>
            </div>

            <div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300">
                <i class="fa-solid fa-triangle-exclamation text-rose-600"></i>
                ${isTe ? 'అనుమతి నిరాకరించబడింది (RBAC Restricted)' : 'Role-Based Access Restricted'}
              </span>
              <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                ${stepName} — ${isTe ? 'డ్యాష్‌బోర్డ్ రక్షితం' : 'Dashboard Access Shielded'}
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
                ${restrictionReason}
              </p>
            </div>

            <!-- Active User vs Authorized Roles Compare Box -->
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2.5">
              <div class="flex items-center justify-between border-b pb-2">
                <span class="text-slate-500 font-semibold">${isTe ? 'మీ ప్రస్తుత కేడర్ & పాత్ర:' : 'Your Active Cadre & Role:'}</span>
                <span class="font-bold text-slate-800 flex items-center gap-1.5">
                  <i class="fa-solid ${config.icon} text-teal-600"></i>
                  ${currentUser.name} (${userRoleTitle})
                </span>
              </div>
              <div class="flex items-center justify-between border-b pb-2">
                <span class="text-slate-500 font-semibold">${isTe ? 'కేటాయించిన విధులలో అనుమతించబడిన దశలు:' : 'Authorized Workflow Steps:'}</span>
                <span class="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Steps [${currentUser.allowedSteps.join(', ')}]
                </span>
              </div>
              <div>
                <span class="text-slate-500 font-semibold block mb-1.5">${isTe ? 'ఈ డ్యాష్‌బోర్డుకు చట్టబద్ధ అధికారం ఉన్న కేడర్లు:' : 'Statutory Authorized Cadres for this Dashboard:'}</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  ${allowedRolesDetailedBadges}
                </div>
              </div>
            </div>

            <!-- Statutory Notice -->
            <div class="text-[11px] text-slate-500 flex items-center justify-center gap-2 bg-rose-50/70 p-2.5 rounded-lg border border-rose-200">
              <i class="fa-solid fa-scale-balanced text-rose-500 shrink-0"></i>
              <span>${isTe ? 'ఆంధ్రప్రదేశ్ ప్రజా ఆరోగ్య చట్టం & DISHA నియంత్రణల ప్రకారం క్లినికల్ రక్షణ కల్పించబడింది.' : 'Protected under Andhra Pradesh Public Health Act & DISHA Statutory Standards.'}</span>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button onclick="goToStep(${currentUser.startStep || 1})" class="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow flex items-center justify-center gap-2 transition">
                <i class="fa-solid fa-arrow-left"></i>
                <span>${isTe ? 'నా ప్రాథమిక వర్క్‌స్పేస్‌కు వెళ్ళు' : 'Return to My Primary Workspace'}</span>
              </button>
              <button onclick="handleLogout()" class="w-full sm:w-auto bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-5 py-3 rounded-xl shadow flex items-center justify-center gap-2 transition">
                <i class="fa-solid fa-arrow-right-from-bracket text-amber-400"></i>
                <span>${isTe ? 'అధికారిక పాత్రలోకి మారండి' : 'Switch Role / Re-login'}</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    function applyStep1Permissions() {
      const isDistrictAdmin = currentUser && currentUser.role === 'DISTRICT_ADMIN';
      const isTe = currentLang === 'te';
      const form = document.getElementById('patientRegForm');
      if (!form) return;

      let adminNotice = document.getElementById('step1AdminNotice');
      if (!adminNotice) {
        adminNotice = document.createElement('div');
        adminNotice.id = 'step1AdminNotice';
        form.parentNode.insertBefore(adminNotice, form);
      }

      const submitBtn = form.querySelector('button[type="submit"]');

      if (isDistrictAdmin) {
        adminNotice.className = "mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5 font-semibold";
        adminNotice.innerHTML = `
          <i class="fa-solid fa-lock text-amber-600 mt-0.5 text-sm"></i>
          <div>
            <div class="font-bold mb-0.5">${isTe ? 'పరిపాలనా ఆడిట్ మోడ్ (Administrative Audit Mode):' : 'Administrative Read-Only Audit Mode:'}</div>
            <p class="text-amber-800 leading-relaxed font-normal">
              ${isTe 
                ? 'జిల్లా అధికారి పాత్రలో మీరు సమాజ స్థాయి నమోదులను వీక్షించగలరు కానీ మార్చలేరు. ఫీల్డ్ డేటా నమోదు గ్రామ ఆరోగ్య కార్యకర్తలు (ANM) మరియు వైద్యాధికారులకు మాత్రమే పరిమితం.' 
                : 'District Admin is monitoring tribal community demographic intake in audit mode. Registration form submission is locked to preserve primary field data integrity.'}
            </p>
          </div>
        `;
        adminNotice.classList.remove('hidden');

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.classList.add('opacity-50', 'cursor-not-allowed', 'bg-slate-400');
          submitBtn.classList.remove('hover:bg-teal-700', 'bg-teal-600');
          submitBtn.innerHTML = `<i class="fa-solid fa-lock mr-2"></i> ${isTe ? 'నమోదు లాక్ చేయబడింది (ఆడిట్ మోడ్)' : 'Registration Submission Locked (Admin Audit)'}`;
        }
      } else {
        adminNotice.classList.add('hidden');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-slate-400');
          submitBtn.classList.add('hover:bg-teal-700', 'bg-teal-600');
          submitBtn.innerHTML = `<i class="fa-solid fa-user-plus mr-2"></i> <span>${isTe ? 'నమోదు చేసి ఫోటో పరీక్షకు వెళ్ళండి (దశ 2)' : 'Register & Proceed to Oral Screening (Step 2)'}</span>`;
        }
      }
    }

    function renderPipelineNav() {
      const nav = document.getElementById('pipelineNav');
      if (!nav) return;
      const allowed = currentUser ? (currentUser.allowedSteps || currentUser.allowed_steps || []) : [1, 2, 3, 5, 6, 8];
      nav.innerHTML = pipelineSteps.map(step => {
        const isActive = step.id === currentStep;
        const label = currentLang === 'te' ? step.titleTe : step.titleEn;
        const isPermitted = allowed.includes(step.id);

        if (!isPermitted) {
          return `
            <button onclick="goToStep(${step.id})" title="Restricted for ${currentUser ? currentUser.designation : 'Current Role'} • Click to view RBAC requirements" class="flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
              isActive
                ? 'bg-rose-900/90 text-rose-100 border-rose-600 shadow-sm'
                : 'bg-rose-50/70 hover:bg-rose-100/80 text-rose-800 border-rose-200'
            }">
              <i class="fa-solid fa-lock text-[10px] text-rose-600"></i>
              <span class="whitespace-nowrap">${label}</span>
              <span class="text-[9px] bg-rose-200/90 text-rose-900 px-1 py-0.2 rounded font-bold">Lock</span>
            </button>
          `;
        }

        return `
          <button onclick="goToStep(${step.id})" class="flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
            isActive ? 'step-active border-teal-700 bg-teal-800 text-white shadow-sm' : 'bg-slate-50 hover:bg-teal-50 text-slate-700 border-slate-200'
          }">
            <i class="fa-solid ${step.icon}"></i>
            <span class="whitespace-nowrap">${label}</span>
          </button>
        `;
      }).join('');
    }

    function handleRestrictedStepClick(stepId) {
      goToStep(stepId);
    }

    function goToStep(stepId) {
      currentStep = stepId;
      const allowed = currentUser ? (currentUser.allowedSteps || currentUser.allowed_steps || []) : [1, 2, 3, 5, 6, 8];
      const isPermitted = allowed.includes(stepId);

      // Hide all step sections
      document.querySelectorAll('.step-section').forEach(sec => sec.classList.add('hidden'));

      // Show target step section
      const target = document.getElementById(`step-${stepId}`);
      if (target) target.classList.remove('hidden');

      // Update RBAC clearance banner for this step
      renderDashboardRbacBanner(stepId);

      const shield = document.getElementById(`rbac-shield-step-${stepId}`);
      const content = document.getElementById(`step-content-step-${stepId}`);

      if (isPermitted) {
        if (shield) shield.classList.add('hidden');
        if (content) content.classList.remove('hidden');

        // Fine-grained in-dashboard adjustments
        if (stepId === 1) {
          applyStep1Permissions();
        } else if (stepId === 2) {
          drawOralCavityCanvas('oralCanvas', false);
        } else if (stepId === 3) {
          renderAICanvas();
        } else if (stepId === 4) {
          renderMOTriageTable();
        }
      } else {
        if (shield) shield.classList.remove('hidden');
        if (content) content.classList.add('hidden');
        renderDashboardRbacShield(stepId);
      }

      renderPipelineNav();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }'''

m = nav_block_regex.search(text)
assert m, "nav_block_regex failed to match"
text = text[:m.start()] + new_nav_block + text[m.end():]
print("Replaced nav_block")

# 2. Update handleRegisterPatient
text = text.replace(
    'function handleRegisterPatient(e) {\n      e.preventDefault();',
    'function handleRegisterPatient(e) {\n      e.preventDefault();\n      if (currentUser && currentUser.role === "DISTRICT_ADMIN") {\n        showToast(currentLang === "te" ? "పరిపాలనా ఆడిట్ మోడ్: రోగి నమోదు కేవలం గ్రామ కార్యకర్తలు లేదా డాక్టర్లకు మాత్రమే అనుమతించబడింది." : "Audit Mode: Patient registration is restricted to Health Workers and Medical Officers.", "warning");\n        return;\n      }',
    1
)
print("Updated handleRegisterPatient")

# 3. Update renderMOTriageTable
mo_table_regex = re.compile(
    r'function renderMOTriageTable\(\)\s*\{[\s\S]*?tbody\.innerHTML\s*=\s*filtered\.map\(p => `[\s\S]*?`\)\.join\(\'\'\);\s*\}',
    re.MULTILINE
)

new_mo_table = '''function renderMOTriageTable() {
        const filter = document.getElementById('moFilterRisk')?.value || 'ALL';
        const tbody = document.getElementById('moTriageTableBody');
        if (!tbody) return;

        const isAdmin = currentUser && currentUser.role === 'DISTRICT_ADMIN';
        const isTe = currentLang === 'te';
  
        const triageTable = document.getElementById('moTriageTable');
        let moAdminNotice = document.getElementById('moAdminAuditNotice');
        if (triageTable && !moAdminNotice) {
          moAdminNotice = document.createElement('div');
          moAdminNotice.id = 'moAdminAuditNotice';
          triageTable.parentNode.insertBefore(moAdminNotice, triageTable);
        }
        if (moAdminNotice) {
          if (isAdmin) {
            moAdminNotice.className = "mb-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2 font-medium";
            moAdminNotice.innerHTML = `<i class="fa-solid fa-eye text-amber-600 text-sm"></i> <span><strong>${isTe ? 'పరిపాలనా నిఘా మోడ్:' : 'Administrative Surveillance Mode:'}</strong> ${isTe ? 'మీరు PHC క్లినికల్ ట్రయాజ్ క్యూను ఆడిట్ చేస్తున్నారు. క్లినికల్ నిర్ణయాలు వైద్యాధికారులకు మాత్రమే పరిమితం.' : 'You are auditing PHC clinical triage queues. Clinical sign-off is reserved for Medical Officers and Specialists.'}</span>`;
            moAdminNotice.classList.remove('hidden');
          } else {
            moAdminNotice.classList.add('hidden');
          }
        }

        const filtered = patients.filter(p => filter === 'ALL' || p.risk === filter);
        tbody.innerHTML = filtered.map(p => `
          <tr class="hover:bg-slate-50">
            <td class="py-3 px-4">
              <div class="font-bold text-slate-800">${p.name} <span class="text-slate-400 font-normal">(${p.age}y/${p.gender[0]})</span></div>
              <div class="text-[11px] text-slate-500">${p.id} • ${p.village}, ${p.mandal}</div>
            </td>
            <td class="py-3 px-3 text-slate-700">${p.habits}</td>
            <td class="py-3 px-3 font-medium text-slate-700">${p.site}</td>
            <td class="py-3 px-3">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                p.risk === 'SUSPICIOUS' ? 'bg-red-100 text-red-800' : (p.risk === 'MODERATE' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800')
              }">${p.risk} (${(p.aiScore * 100).toFixed(1)}%)</span>
            </td>
            <td class="py-3 px-3 font-semibold text-teal-700">${p.moDecision}</td>
            <td class="py-3 px-4 text-right space-x-1">
              ${
                isAdmin
                  ? `<span class="px-2.5 py-1 rounded bg-slate-100 text-slate-500 font-semibold text-[11px] border border-slate-200 inline-flex items-center gap-1" title="Medical Officer clinical sign-off required">
                       <i class="fa-solid fa-lock text-[10px] text-slate-400"></i> ${isTe ? 'డాక్టర్ సమీక్ష అవసరం' : 'MO Sign-off'}
                     </span>`
                  : `<button onclick="approveAndTeleconsult('${p.id}')" class="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-2.5 py-1.5 rounded-lg text-[11px]">
                       <i class="fa-solid fa-video mr-1"></i>${isTe ? 'టెలికన్సల్ట్' : 'Teleconsult'}
                     </button>
                     <button onclick="approveAndRefer('${p.id}')" class="bg-slate-800 hover:bg-slate-900 text-white font-semibold px-2.5 py-1.5 rounded-lg text-[11px]">
                       ${isTe ? 'బయాప్సీ సిఫార్సు' : 'Refer Biopsy'}
                     </button>`
              }
            </td>
          </tr>
        `).join('');
      }'''

m = mo_table_regex.search(text)
assert m, "mo_table_regex failed to match"
text = text[:m.start()] + new_mo_table + text[m.end():]
print("Updated renderMOTriageTable")

# 4. Update updateBiopsyStage & saveDiagnosticsAndContinue
biopsy_regex = re.compile(
    r'function updateBiopsyStage\(stage\)\s*\{[\s\S]*?function saveDiagnosticsAndContinue\(\)\s*\{[\s\S]*?goToStep\(8\);\s*\}',
    re.MULTILINE
)

new_biopsy = '''function updateBiopsyStage(stage) {
      if (currentUser && !['MEDICAL_OFFICER', 'SPECIALIST'].includes(currentUser.role)) {
        showToast(currentLang === 'te' ? "బయాప్సీ నమూనా మార్పు కేవలం డాక్టర్లకు మాత్రమే అనుమతించబడింది." : "Biopsy staging updates are restricted to Medical Officers and Specialists.", "warning");
        return;
      }
      const p = patients.find(item => item.id === activePatientId);
      if (p) p.biopsyStage = stage;
      showToast(`Updated Biopsy Lifecycle to: ${stage}`, "success");
    }

    function saveDiagnosticsAndContinue() {
      if (currentUser && !['MEDICAL_OFFICER', 'SPECIALIST'].includes(currentUser.role)) {
        showToast(currentLang === 'te' ? "డయాగ్నస్టిక్ రికార్డు ఆమోదం కేవలం స్పెషలిస్ట్/డాక్టర్లకు మాత్రమే అనుమతించబడింది." : "Diagnostic record sign-off is restricted to Specialists and Medical Officers.", "warning");
        return;
      }
      showToast("Histopathology report verified and encrypted.", "success");
      goToStep(8);
    }'''

m = biopsy_regex.search(text)
assert m, "biopsy_regex failed to match"
text = text[:m.start()] + new_biopsy + text[m.end():]
print("Updated biopsy functions")

# 5. Update applyLoggedInState to invoke renderCadreDashboardHub()
apply_login_target = '''      // Re-render pipeline nav and initial step
      renderPipelineNav();
      renderPatientSelectors();
      goToStep(currentUser.startStep || config.startStep);'''

apply_login_replacement = '''      // Render Dedicated Cadre Dashboard Hub
      renderCadreDashboardHub();

      // Re-render pipeline nav and initial step
      renderPipelineNav();
      renderPatientSelectors();
      goToStep(currentUser.startStep || config.startStep);'''

assert apply_login_target in text, "apply_login_target not found"
text = text.replace(apply_login_target, apply_login_replacement, 1)
print("Updated applyLoggedInState")

# 6. Update toggleLanguage
toggle_lang_target = '''      selectLoginRole(selectedLoginRole);
      renderPipelineNav();
      if (currentUser) {
        applyLoggedInState();
      }'''

toggle_lang_replacement = '''      selectLoginRole(selectedLoginRole);
      renderCadreDashboardHub();
      renderPipelineNav();
      if (currentUser) {
        renderDashboardRbacBanner(currentStep);
        const allowed = currentUser.allowedSteps || currentUser.allowed_steps || [];
        if (!allowed.includes(currentStep)) {
          renderDashboardRbacShield(currentStep);
        } else if (currentStep === 1) {
          applyStep1Permissions();
        } else if (currentStep === 4) {
          renderMOTriageTable();
        }
      }'''

assert toggle_lang_target in text, "toggle_lang_target not found"
text = text.replace(toggle_lang_target, toggle_lang_replacement, 1)
print("Updated toggleLanguage")

with open('frontend/index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("SUCCESS: index.html upgraded!")

