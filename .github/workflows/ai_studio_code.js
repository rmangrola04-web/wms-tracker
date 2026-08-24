/**
 * ICH Hub - Warehouse Vehicle Gate & Yard Tracker HTML Downloader
 * इसे किसी भी ब्राउज़र कंसोल या वेब पेज में चलाकर संपूर्ण HTML फ़ाइल डाउनलोड करें।
 */
function downloadWarehouseAppHTML() {
  const fullHtmlContent = `<!DOCTYPE html>
<html lang="hi">
<head>
  <base target="_top">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>ICH Hub - Vehicle Movement & Yard Control</title>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#f8fafc',
              100: '#f1f5f9',
              800: '#1e293b',
              900: '#0f172a',
              950: '#020617',
              accent: '#f59e0b',
              accentHover: '#d97706'
            }
          }
        }
      }
    }
  <\/script>

  <!-- Font Awesome 6 CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

  <!-- Chart.js CDN for Visual Analytics -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>

  <!-- Google Fonts: Inter & Noto Sans Devanagari -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet">

  <style>
    html, body {
      background-color: #0f172a !important;
      color: #f8fafc;
      font-family: 'Inter', 'Noto Sans Devanagari', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      width: 100%;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
    }
    *, *::before, *::after { box-sizing: border-box; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #0f172a; }
    ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #475569; }
    .tab-btn.active { background-color: #f59e0b; color: #020617; font-weight: 700; }
    .tab-btn:not(.active) { background-color: #1e293b; color: #94a3b8; }
    .tab-btn:not(.active):hover { background-color: #334155; color: #ffffff; }
  </style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen flex flex-col justify-between p-3 sm:p-6 md:p-8">

  <!-- Toast Notification -->
  <div id="toastContainer" class="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none"></div>

  <!-- Top Navigation Header -->
  <header class="w-full max-w-7xl mx-auto bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
    <div class="flex items-center space-x-3.5">
      <div class="bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 p-3 rounded-xl shadow-lg flex items-center justify-center">
        <i class="fa-solid fa-truck-moving text-xl sm:text-2xl font-black"></i>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-lg sm:text-xl font-extrabold tracking-tight text-white">ICH Hub - Vehicle Movement & Yard Control</h1>
          <span class="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Live Fleet</span>
        </div>
        <p class="text-xs text-slate-400 font-medium">वाहन आगमन (Inward), प्रस्थान (Outward) एवं रियल-टाइम यार्ड ट्रैकिंग सिस्टम</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="bg-slate-900/90 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-mono text-amber-400 flex items-center gap-2">
        <i class="fa-regular fa-clock"></i>
        <span id="liveClockDisplay">--:--:--</span>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <main class="w-full max-w-7xl mx-auto flex-1 flex flex-col gap-6">

    <!-- KPI Summary Counters -->
    <section class="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
      <div class="bg-slate-800 border border-slate-700/80 p-4 sm:p-5 rounded-2xl shadow-lg flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Today's Inward</span>
          <span id="kpiTodayInward" class="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 block">0</span>
          <span class="text-[10px] text-emerald-500/80">वाहनों का कुल आगमन</span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xl">
          <i class="fa-solid fa-arrow-down-left-and-arrow-up-right-to-center rotate-45"></i>
        </div>
      </div>

      <div class="bg-slate-800 border border-slate-700/80 p-4 sm:p-5 rounded-2xl shadow-lg flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Today's Outward</span>
          <span id="kpiTodayOutward" class="text-2xl sm:text-3xl font-black text-sky-400 mt-1 block">0</span>
          <span class="text-[10px] text-sky-500/80">गेट पास द्वारा प्रस्थान</span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center text-xl">
          <i class="fa-solid fa-truck-fast"></i>
        </div>
      </div>

      <div class="bg-slate-800 border border-amber-500/40 p-4 sm:p-5 rounded-2xl shadow-lg flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Inside Yard Now</span>
          <span id="kpiInsideYard" class="text-2xl sm:text-3xl font-black text-amber-400 mt-1 block">0</span>
          <span class="text-[10px] text-amber-500/80">वर्तमान में परिसर के अंदर</span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-xl">
          <i class="fa-solid fa-square-parking"></i>
        </div>
      </div>

      <div class="bg-slate-800 border border-slate-700/80 p-4 sm:p-5 rounded-2xl shadow-lg flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Movements</span>
          <span id="kpiTotalMovements" class="text-2xl sm:text-3xl font-black text-white mt-1 block">0</span>
          <span class="text-[10px] text-slate-400">कुल दर्ज रिकॉर्ड</span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-slate-700/50 border border-slate-600 text-slate-300 flex items-center justify-center text-xl">
          <i class="fa-solid fa-route"></i>
        </div>
      </div>
    </section>

    <!-- Navigation Tabs -->
    <nav class="flex flex-wrap gap-2.5 border-b border-slate-700 pb-2">
      <button onclick="switchTab('inwardTab')" id="btnTabInward" class="tab-btn active px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2">
        <i class="fa-solid fa-truck-ramp-box"></i>
        <span>1. Vehicle Inward (आगमन)</span>
      </button>
      <button onclick="switchTab('outwardTab')" id="btnTabOutward" class="tab-btn px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2">
        <i class="fa-solid fa-truck-fast"></i>
        <span>2. Vehicle Outward (प्रस्थान)</span>
      </button>
      <button onclick="switchTab('yardTab')" id="btnTabYard" class="tab-btn px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2">
        <i class="fa-solid fa-square-parking"></i>
        <span>3. Live Yard Status (यार्ड स्थिति)</span>
        <span id="badgeYardCount" class="bg-slate-900 text-amber-400 text-[10px] px-1.5 py-0.5 rounded-full font-mono">0</span>
      </button>
      <button onclick="switchTab('analyticsTab')" id="btnTabAnalytics" class="tab-btn px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2">
        <i class="fa-solid fa-chart-pie"></i>
        <span>4. Graphs & Analytics</span>
      </button>
      <button onclick="switchTab('reportsTab')" id="btnTabReports" class="tab-btn px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2">
        <i class="fa-solid fa-file-csv"></i>
        <span>5. Reports & CSV Export</span>
      </button>
    </nav>

    <!-- TAB 1: VEHICLE INWARD FORM -->
    <section id="inwardTab" class="tab-content space-y-6">
      <div class="bg-slate-800 border border-slate-700/90 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-5">
        <div class="flex items-center justify-between pb-4 border-b border-slate-700">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <i class="fa-solid fa-arrow-down"></i>
            </div>
            <div>
              <h2 class="text-lg font-bold text-white tracking-tight">New Vehicle Inward Entry (वाहन आगमन गेट एंट्री)</h2>
              <p class="text-xs text-slate-400">परिसर में प्रवेश करने वाले वाहनों का विवरण दर्ज करें</p>
            </div>
          </div>
          <span class="text-xs text-slate-400 font-medium">* आवश्यक फ़ील्ड्स</span>
        </div>

        <form id="inwardForm" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="inGateNo">
                Gate Entry No (गेट एंट्री संख्या) <span class="text-rose-400">*</span>
              </label>
              <input type="text" id="inGateNo" required readonly class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-amber-400 font-bold focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="inDateTime">
                Date & Time In (आगमन समय) <span class="text-rose-400">*</span>
              </label>
              <input type="datetime-local" id="inDateTime" required class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="inVehicleNo">
                Vehicle No (गाड़ी नंबर) <span class="text-rose-400">*</span>
              </label>
              <input type="text" id="inVehicleNo" required placeholder="उदा. MP-09-GH-4412" style="text-transform: uppercase;" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold tracking-wider text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="inTransporter">
                Transporter Name (ट्रांसपोर्टर) <span class="text-rose-400">*</span>
              </label>
              <input type="text" id="inTransporter" required placeholder="उदा. V-Trans / TCI Freight" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="inDriverName">
                Driver Name (चालक का नाम) <span class="text-rose-400">*</span>
              </label>
              <input type="text" id="inDriverName" required placeholder="उदा. Ramesh Kumar" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="inDriverContact">
                Driver Contact No (ड्राइवर मोबाइल नंबर)
              </label>
              <input type="tel" id="inDriverContact" placeholder="उदा. 9876543210" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="inChallanNo">
                Challan / Invoice No (चालान / बिल संख्या) <span class="text-rose-400">*</span>
              </label>
              <input type="text" id="inChallanNo" required placeholder="उदा. INV-2026/8901" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-mono text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="inSupplier">
                Supplier / Source (सप्लायर / सप्लायर शहर) <span class="text-rose-400">*</span>
              </label>
              <input type="text" id="inSupplier" required placeholder="उदा. Hindustan Agro - Indore Hub" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="inQty">
                Total Boxes / Quantity (कुल बॉक्स / मात्रा) <span class="text-rose-400">*</span>
              </label>
              <input type="text" id="inQty" required placeholder="उदा. 350 Boxes / 12 Tons" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="inRemarks">
              Remarks (टिप्पणी / सील स्थिति)
            </label>
            <textarea id="inRemarks" rows="2" placeholder="उदा. सील सुरक्षित, कोई डैमेज नहीं।" class="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none resize-none"></textarea>
          </div>

          <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-extrabold py-3.5 px-6 rounded-xl shadow-xl transition flex items-center justify-center gap-2 text-sm cursor-pointer">
            <i class="fa-solid fa-circle-check text-base"></i>
            <span>Record Inward Entry (आगमन दर्ज करें)</span>
          </button>
        </form>
      </div>
    </section>

    <!-- TAB 2: VEHICLE OUTWARD FORM -->
    <section id="outwardTab" class="tab-content hidden space-y-6">
      <div class="bg-slate-800 border border-slate-700/90 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-5">
        <div class="flex items-center justify-between pb-4 border-b border-slate-700">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center">
              <i class="fa-solid fa-arrow-up"></i>
            </div>
            <div>
              <h2 class="text-lg font-bold text-white tracking-tight">New Vehicle Outward Pass (वाहन प्रस्थान गेट पास)</h2>
              <p class="text-xs text-slate-400">परिसर से बाहर जाने वाले वाहनों का आउटवर्ड गेट पास दर्ज करें</p>
            </div>
          </div>
          <span class="text-xs text-slate-400 font-medium">* आवश्यक फ़ील्ड्स</span>
        </div>

        <form id="outwardForm" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="outGatePassNo">
                Gate Pass No (आउटवर्ड गेट पास संख्या) <span class="text-rose-400">*</span>
              </label>
              <input type="text" id="outGatePassNo" required readonly class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-sky-400 font-bold focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="outDateTime">
                Date & Time Out (प्रस्थान समय) <span class="text-rose-400">*</span>
              </label>
              <input type="datetime-local" id="outDateTime" required class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider" for="outVehicleNo">
                  Vehicle No (गाड़ी नंबर) <span class="text-rose-400">*</span>
                </label>
                <select id="yardVehicleSelect" onchange="autoFillFromYard(this.value)" class="text-[10px] bg-slate-950 border border-slate-700 text-amber-400 rounded px-1.5 py-0.5 outline-none">
                  <option value="">-- यार्ड से चुनें --</option>
                </select>
              </div>
              <input type="text" id="outVehicleNo" required placeholder="उदा. MP-09-GH-4412" style="text-transform: uppercase;" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold tracking-wider text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="outTransporter">
                Transporter Name (ट्रांसपोर्टर) <span class="text-rose-400">*</span>
              </label>
              <input type="text" id="outTransporter" required placeholder="उदा. V-Trans / Apex Roadlines" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="outDriverName">
                Driver Name (चालक का नाम) <span class="text-rose-400">*</span>
              </label>
              <input type="text" id="outDriverName" required placeholder="उदा. Sunil Verma" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="outDriverContact">
                Driver Contact No (मोबाइल नंबर)
              </label>
              <input type="tel" id="outDriverContact" placeholder="उदा. 9812345678" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="outInvoiceNo">
                Invoice / Dispatch No (डिस्पैच / बिल संख्या) <span class="text-rose-400">*</span>
              </label>
              <input type="text" id="outInvoiceNo" required placeholder="उदा. DSP-9921 / INV-443" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-mono text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="outDestination">
                Destination / Party Name (गंतव्य / पार्टी नाम) <span class="text-rose-400">*</span>
              </label>
              <input type="text" id="outDestination" required placeholder="उदा. Reliance Retail - Bhopal Hub" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="outQty">
                Total Quantity / Packages (कुल मात्रा) <span class="text-rose-400">*</span>
              </label>
              <input type="text" id="outQty" required placeholder="उदा. 420 Cartons / 8 Pallets" class="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5" for="outRemarks">
              Remarks / Security Clearance (टिप्पणी / सुरक्षा जांच)
            </label>
            <textarea id="outRemarks" rows="2" placeholder="उदा. लोडिंग पूर्ण, गेट सील क्रमांक GS-8841 सत्यापित।" class="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none resize-none"></textarea>
          </div>

          <button type="submit" class="w-full bg-sky-600 hover:bg-sky-500 active:scale-[0.99] text-white font-extrabold py-3.5 px-6 rounded-xl shadow-xl transition flex items-center justify-center gap-2 text-sm cursor-pointer">
            <i class="fa-solid fa-truck-fast text-base"></i>
            <span>Generate Outward Pass (प्रस्थान गेट पास जारी करें)</span>
          </button>
        </form>
      </div>
    </section>

    <!-- TAB 3: REAL-TIME YARD STATUS -->
    <section id="yardTab" class="tab-content hidden space-y-6">
      <div class="bg-slate-800 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
          <div class="flex items-center gap-2.5">
            <div class="w-3 h-3 rounded-full bg-amber-400 animate-ping"></div>
            <h3 class="text-base font-bold text-white">Vehicles Currently Inside Yard (परिसर में उपस्थित वाहन)</h3>
          </div>
          <span class="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold px-2.5 py-1 rounded-lg">
            Real-Time Dwell Time Tracking
          </span>
        </div>
        <div id="yardVehiclesContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      </div>
    </section>

    <!-- TAB 4: VISUAL GRAPHS (Chart.js) -->
    <section id="analyticsTab" class="tab-content hidden space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-2xl flex flex-col justify-between">
          <div class="flex items-center justify-between mb-4 pb-2 border-b border-slate-700">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-chart-column text-amber-400"></i>
              <h3 class="text-sm font-bold text-white">Daily Inward vs Outward Traffic</h3>
            </div>
            <span class="text-[10px] text-slate-400">Last 7 Days</span>
          </div>
          <div class="relative h-64 w-full">
            <canvas id="trafficChart"></canvas>
          </div>
        </div>

        <div class="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-2xl flex flex-col justify-between">
          <div class="flex items-center justify-between mb-4 pb-2 border-b border-slate-700">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-chart-pie text-emerald-400"></i>
              <h3 class="text-sm font-bold text-white">Top Transporters / Fleet Share</h3>
            </div>
            <span class="text-[10px] text-slate-400">By Vehicle Volume</span>
          </div>
          <div class="relative h-64 w-full flex items-center justify-center">
            <canvas id="transporterChart"></canvas>
          </div>
        </div>
      </div>
    </section>

    <!-- TAB 5: REPORTS & CSV EXPORT -->
    <section id="reportsTab" class="tab-content hidden space-y-6">
      <div class="bg-slate-800 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 p-4 bg-slate-900/90 border border-slate-700 rounded-xl">
          <div>
            <label class="block text-[11px] font-bold text-slate-400 uppercase mb-1">From Date</label>
            <input type="date" id="filterFromDate" onchange="applyFilters()" class="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white outline-none">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-400 uppercase mb-1">To Date</label>
            <input type="date" id="filterToDate" onchange="applyFilters()" class="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white outline-none">
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-400 uppercase mb-1">Movement Type</label>
            <select id="filterType" onchange="applyFilters()" class="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white outline-none">
              <option value="ALL">All Movements (सभी)</option>
              <option value="INWARD">Inward Only (केवल आगमन)</option>
              <option value="OUTWARD">Outward Only (केवल प्रस्थान)</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-400 uppercase mb-1">Live Search</label>
            <input type="text" id="filterSearch" oninput="applyFilters()" placeholder="गाड़ी नं. / ट्रांसपोर्टर..." class="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white outline-none">
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="text-xs text-slate-400">
            दिखाए जा रहे रिकॉर्ड्स: <strong id="filteredCount" class="text-white">0</strong>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="exportToCsv()" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-2 shadow-lg">
              <i class="fa-solid fa-file-excel text-sm"></i>
              <span>Export Filtered to CSV (Excel)</span>
            </button>
            <button onclick="clearAllDataPrompt()" class="bg-rose-900/60 hover:bg-rose-800 text-rose-200 font-bold text-xs px-3 py-2 rounded-xl transition">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-slate-900 text-slate-400 border-b border-slate-700 uppercase tracking-wider">
                <th class="py-3 px-3.5">Type</th>
                <th class="py-3 px-3.5">Date & Time</th>
                <th class="py-3 px-3.5">Gate / Pass No</th>
                <th class="py-3 px-3.5">Vehicle No</th>
                <th class="py-3 px-3.5">Transporter</th>
                <th class="py-3 px-3.5">Driver & Contact</th>
                <th class="py-3 px-3.5">Challan / Invoice</th>
                <th class="py-3 px-3.5">Supplier / Party</th>
                <th class="py-3 px-3.5">Quantity</th>
                <th class="py-3 px-3.5">Remarks</th>
              </tr>
            </thead>
            <tbody id="reportsTableBody" class="divide-y divide-slate-700/60 text-slate-300"></tbody>
          </table>
        </div>
      </div>
    </section>

  </main>

  <footer class="w-full max-w-7xl mx-auto text-center text-xs text-slate-500 py-4 mt-8">
    ICH Hub Logistics • Real-Time Vehicle Gate Pass & Yard Automation
  </footer>

  <script>
    let vehicleLogs = [];
    let trafficChartInstance = null;
    let transporterChartInstance = null;

    const INITIAL_DEMO_DATA = [
      { id: "INW-2026-001", type: "INWARD", dateTime: "2026-08-24T08:30", gateNo: "GIN-8801", vehicleNo: "MP-09-GH-4412", transporter: "V-Trans India", driverName: "Ramesh Kumar", driverContact: "9826011223", refNo: "INV-9901", party: "Hindustan Agro Ltd (Indore)", qty: "320 Boxes", remarks: "Security Seal Checked - OK", inYard: false },
      { id: "INW-2026-002", type: "INWARD", dateTime: "2026-08-24T09:15", gateNo: "GIN-8802", vehicleNo: "MH-12-PQ-9081", transporter: "TCI Freight", driverName: "Santosh Verma", driverContact: "9876543210", refNo: "CHL-4412", party: "Supreme Dairy Hub (Pune)", qty: "140 Pallets", remarks: "Cold Chain Unloading in Bay 03", inYard: true },
      { id: "OUT-2026-001", type: "OUTWARD", dateTime: "2026-08-24T10:45", gateNo: "GOP-9901", vehicleNo: "MP-09-GH-4412", transporter: "V-Trans India", driverName: "Ramesh Kumar", driverContact: "9826011223", refNo: "DSP-7712", party: "Reliance Retail Central Hub", qty: "320 Boxes", remarks: "Outward Dispatched via Bay 01", inYard: false },
      { id: "INW-2026-003", type: "INWARD", dateTime: "2026-08-24T11:20", gateNo: "GIN-8803", vehicleNo: "GJ-01-AB-1234", transporter: "SafeX Logistics", driverName: "Aslam Khan", driverContact: "9425098765", refNo: "INV-1029", party: "Gujarat Agro Spares", qty: "500 Cartons", remarks: "Unloading in Progress", inYard: true }
    ];

    document.addEventListener('DOMContentLoaded', () => {
      try {
        const saved = localStorage.getItem('ich_vehicle_movement_db');
        vehicleLogs = saved ? JSON.parse(saved) : [...INITIAL_DEMO_DATA];
      } catch (e) { vehicleLogs = [...INITIAL_DEMO_DATA]; }

      initLiveClock();
      generateNextGateNumbers();
      setTodayDateTimeInputs();
      refreshAllViews();
    });

    function initLiveClock() {
      const update = () => {
        const el = document.getElementById('liveClockDisplay');
        if (el) el.innerText = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      };
      update();
      setInterval(update, 1000);
    }

    function setTodayDateTimeInputs() {
      const now = new Date();
      const iso = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
      const inEl = document.getElementById('inDateTime');
      const outEl = document.getElementById('outDateTime');
      if (inEl) inEl.value = iso;
      if (outEl) outEl.value = iso;

      const fromEl = document.getElementById('filterFromDate');
      const toEl = document.getElementById('filterToDate');
      if (fromEl) fromEl.value = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
      if (toEl) toEl.value = now.toISOString().slice(0, 10);
    }

    function generateNextGateNumbers() {
      const inCount = vehicleLogs.filter(l => l.type === 'INWARD').length + 8801;
      const outCount = vehicleLogs.filter(l => l.type === 'OUTWARD').length + 9901;
      document.getElementById('inGateNo').value = \`GIN-\${inCount}\`;
      document.getElementById('outGatePassNo').value = \`GOP-\${outCount}\`;
    }

    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.getElementById(tabId).classList.remove('hidden');

      const btnMap = { 'inwardTab':'btnTabInward', 'outwardTab':'btnTabOutward', 'yardTab':'btnTabYard', 'analyticsTab':'btnTabAnalytics', 'reportsTab':'btnTabReports' };
      document.getElementById(btnMap[tabId]).classList.add('active');

      if (tabId === 'analyticsTab') renderCharts();
      if (tabId === 'yardTab') renderYardVehicles();
      if (tabId === 'reportsTab') applyFilters();
    }

    document.getElementById('inwardForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const newLog = {
        id: \`INW-\${Date.now()}\`,
        type: "INWARD",
        dateTime: document.getElementById('inDateTime').value,
        gateNo: document.getElementById('inGateNo').value,
        vehicleNo: document.getElementById('inVehicleNo').value.trim().toUpperCase(),
        transporter: document.getElementById('inTransporter').value.trim(),
        driverName: document.getElementById('inDriverName').value.trim(),
        driverContact: document.getElementById('inDriverContact').value.trim() || 'N/A',
        refNo: document.getElementById('inChallanNo').value.trim(),
        party: document.getElementById('inSupplier').value.trim(),
        qty: document.getElementById('inQty').value.trim(),
        remarks: document.getElementById('inRemarks').value.trim() || 'OK',
        inYard: true
      };

      vehicleLogs.unshift(newLog);
      localStorage.setItem('ich_vehicle_movement_db', JSON.stringify(vehicleLogs));
      
      document.getElementById('inVehicleNo').value = '';
      document.getElementById('inTransporter').value = '';
      document.getElementById('inDriverName').value = '';
      document.getElementById('inDriverContact').value = '';
      document.getElementById('inChallanNo').value = '';
      document.getElementById('inSupplier').value = '';
      document.getElementById('inQty').value = '';
      document.getElementById('inRemarks').value = '';

      generateNextGateNumbers();
      setTodayDateTimeInputs();
      refreshAllViews();
      showToast(\`वाहन \${newLog.vehicleNo} की इनवर्ड एंट्री (\${newLog.gateNo}) दर्ज हो गई!\`, 'success');
    });

    document.getElementById('outwardForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const vNo = document.getElementById('outVehicleNo').value.trim().toUpperCase();

      const newLog = {
        id: \`OUT-\${Date.now()}\`,
        type: "OUTWARD",
        dateTime: document.getElementById('outDateTime').value,
        gateNo: document.getElementById('outGatePassNo').value,
        vehicleNo: vNo,
        transporter: document.getElementById('outTransporter').value.trim(),
        driverName: document.getElementById('outDriverName').value.trim(),
        driverContact: document.getElementById('outDriverContact').value.trim() || 'N/A',
        refNo: document.getElementById('outInvoiceNo').value.trim(),
        party: document.getElementById('outDestination').value.trim(),
        qty: document.getElementById('outQty').value.trim(),
        remarks: document.getElementById('outRemarks').value.trim() || 'Gate Out Cleared',
        inYard: false
      };

      const insideVehicle = vehicleLogs.find(l => l.vehicleNo === vNo && l.inYard === true);
      if (insideVehicle) insideVehicle.inYard = false;

      vehicleLogs.unshift(newLog);
      localStorage.setItem('ich_vehicle_movement_db', JSON.stringify(vehicleLogs));

      document.getElementById('outVehicleNo').value = '';
      document.getElementById('outTransporter').value = '';
      document.getElementById('outDriverName').value = '';
      document.getElementById('outDriverContact').value = '';
      document.getElementById('outInvoiceNo').value = '';
      document.getElementById('outDestination').value = '';
      document.getElementById('outQty').value = '';
      document.getElementById('outRemarks').value = '';
      document.getElementById('yardVehicleSelect').value = '';

      generateNextGateNumbers();
      setTodayDateTimeInputs();
      refreshAllViews();
      showToast(\`आउटवर्ड गेट पास (\${newLog.gateNo}) जारी। गाड़ी \${newLog.vehicleNo} यार्ड से बाहर।\`, 'success');
    });

    function renderYardVehicles() {
      const container = document.getElementById('yardVehiclesContainer');
      const yardSelect = document.getElementById('yardVehicleSelect');
      const yardVehicles = vehicleLogs.filter(l => l.inYard === true);
      document.getElementById('badgeYardCount').innerText = yardVehicles.length;

      if (yardSelect) {
        yardSelect.innerHTML = '<option value="">-- यार्ड से चुनें --</option>' + 
          yardVehicles.map(v => \`<option value="\${escapeHtml(v.vehicleNo)}">\${escapeHtml(v.vehicleNo)} (\${escapeHtml(v.transporter)})</option>\`).join('');
      }

      if (yardVehicles.length === 0) {
        container.innerHTML = \`<div class="col-span-full text-center py-10 bg-slate-900/60 rounded-2xl border border-slate-700/60"><i class="fa-solid fa-circle-check text-emerald-400 text-3xl mb-2"></i><h4 class="text-sm font-bold text-white">यार्ड में कोई गाड़ी लंबित नहीं है</h4><p class="text-xs text-slate-400 mt-1">सभी इनवर्ड वाहन बाहर जा चुके हैं।</p></div>\`;
        return;
      }

      container.innerHTML = yardVehicles.map(v => {
        const timeDiff = Math.max(0, Math.floor((new Date() - new Date(v.dateTime)) / (1000 * 60)));
        const hours = Math.floor(timeDiff / 60);
        const mins = timeDiff % 60;
        const dwellStr = hours > 0 ? \`\${hours}h \${mins}m\` : \`\${mins}m inside\`;

        return \`
          <div class="bg-slate-900 border border-slate-700/90 rounded-2xl p-4 shadow-xl flex flex-col justify-between space-y-3">
            <div>
              <div class="flex items-center justify-between">
                <span class="text-base font-black text-amber-400 tracking-wider">\${escapeHtml(v.vehicleNo)}</span>
                <span class="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono font-bold">
                  <i class="fa-regular fa-clock mr-1"></i>\${dwellStr}
                </span>
              </div>
              <p class="text-xs font-semibold text-slate-300 mt-1">\${escapeHtml(v.transporter)}</p>
              <div class="text-[11px] text-slate-400 mt-2 space-y-0.5">
                <div><strong>Gate In:</strong> \${escapeHtml(v.gateNo)} (\${new Date(v.dateTime).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' })})</div>
                <div><strong>Driver:</strong> \${escapeHtml(v.driverName)} • \${escapeHtml(v.driverContact)}</div>
                <div><strong>Material:</strong> \${escapeHtml(v.qty)} (\${escapeHtml(v.party)})</div>
              </div>
            </div>
            <button onclick="quickExitVehicle('\${escapeHtml(v.vehicleNo)}')" class="w-full bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Record Exit (प्रस्थान दर्ज करें)</span>
            </button>
          </div>
        \`;
      }).join('');
    }

    function quickExitVehicle(vehicleNo) {
      switchTab('outwardTab');
      autoFillFromYard(vehicleNo);
      document.getElementById('yardVehicleSelect').value = vehicleNo;
    }

    function autoFillFromYard(vehicleNo) {
      if (!vehicleNo) return;
      const matched = vehicleLogs.find(l => l.vehicleNo === vehicleNo && l.inYard === true);
      if (matched) {
        document.getElementById('outVehicleNo').value = matched.vehicleNo;
        document.getElementById('outTransporter').value = matched.transporter;
        document.getElementById('outDriverName').value = matched.driverName;
        document.getElementById('outDriverContact').value = matched.driverContact;
        document.getElementById('outDestination').value = matched.party;
        document.getElementById('outQty').value = matched.qty;
        showToast(\`गाड़ी \${vehicleNo} का विवरण भर दिया गया।\`, 'info');
      }
    }

    function refreshAllViews() {
      const todayStr = new Date().toISOString().slice(0, 10);
      let inCount = 0, outCount = 0, yardCount = 0;

      vehicleLogs.forEach(l => {
        if (l.dateTime.startsWith(todayStr)) {
          if (l.type === 'INWARD') inCount++;
          if (l.type === 'OUTWARD') outCount++;
        }
        if (l.inYard === true) yardCount++;
      });

      document.getElementById('kpiTodayInward').innerText = inCount;
      document.getElementById('kpiTodayOutward').innerText = outCount;
      document.getElementById('kpiInsideYard').innerText = yardCount;
      document.getElementById('kpiTotalMovements').innerText = vehicleLogs.length;
      document.getElementById('badgeYardCount').innerText = yardCount;

      renderYardVehicles();
      applyFilters();
    }

    function renderCharts() {
      const last7Days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        last7Days.push(d.toISOString().slice(0, 10));
      }

      const inwardCounts = last7Days.map(day => vehicleLogs.filter(l => l.type === 'INWARD' && l.dateTime.startsWith(day)).length);
      const outwardCounts = last7Days.map(day => vehicleLogs.filter(l => l.type === 'OUTWARD' && l.dateTime.startsWith(day)).length);
      const dayLabels = last7Days.map(day => new Date(day).toLocaleDateString('hi-IN', { weekday: 'short', day: 'numeric' }));

      if (trafficChartInstance) trafficChartInstance.destroy();
      const ctx1 = document.getElementById('trafficChart');
      if (ctx1) {
        trafficChartInstance = new Chart(ctx1, {
          type: 'bar',
          data: {
            labels: dayLabels,
            datasets: [
              { label: 'Inward (आगमन)', data: inwardCounts, backgroundColor: '#10b981', borderRadius: 6 },
              { label: 'Outward (प्रस्थान)', data: outwardCounts, backgroundColor: '#38bdf8', borderRadius: 6 }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#cbd5e1', font: { family: 'Inter', size: 11 } } } },
            scales: {
              x: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
              y: { ticks: { color: '#94a3b8', stepSize: 1 }, grid: { color: '#334155' } }
            }
          }
        });
      }

      const transporterCounts = {};
      vehicleLogs.forEach(l => {
        if (l.transporter) transporterCounts[l.transporter] = (transporterCounts[l.transporter] || 0) + 1;
      });

      const transLabels = Object.keys(transporterCounts).slice(0, 5);
      const transData = transLabels.map(k => transporterCounts[k]);
      if (transLabels.length === 0) { transLabels.push('No Fleet Data'); transData.push(1); }

      if (transporterChartInstance) transporterChartInstance.destroy();
      const ctx2 = document.getElementById('transporterChart');
      if (ctx2) {
        transporterChartInstance = new Chart(ctx2, {
          type: 'doughnut',
          data: {
            labels: transLabels,
            datasets: [{
              data: transData,
              backgroundColor: ['#f59e0b', '#10b981', '#38bdf8', '#a855f7', '#f43f5e', '#64748b'],
              borderWidth: 2,
              borderColor: '#1e293b'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'right', labels: { color: '#cbd5e1', font: { family: 'Inter', size: 11 } } } }
          }
        });
      }
    }

    function applyFilters() {
      const fromDate = document.getElementById('filterFromDate')?.value || '';
      const toDate = document.getElementById('filterToDate')?.value || '';
      const type = document.getElementById('filterType')?.value || 'ALL';
      const search = (document.getElementById('filterSearch')?.value || '').toLowerCase().trim();

      const filtered = vehicleLogs.filter(item => {
        const itemDate = item.dateTime.slice(0, 10);
        if (fromDate && itemDate < fromDate) return false;
        if (toDate && itemDate > toDate) return false;
        if (type !== 'ALL' && item.type !== type) return false;

        if (search) {
          const match = \`\${item.vehicleNo} \${item.transporter} \${item.driverName} \${item.gateNo} \${item.party} \${item.refNo}\`.toLowerCase();
          if (!match.includes(search)) return false;
        }
        return true;
      });

      document.getElementById('filteredCount').innerText = filtered.length;
      const tbody = document.getElementById('reportsTableBody');
      if (!tbody) return;

      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="text-center py-8 text-slate-500 font-medium italic">चयनित फ़िल्टर के अनुसार कोई रिकॉर्ड उपलब्ध नहीं है।</td></tr>';
        return;
      }

      tbody.innerHTML = filtered.map(item => {
        const typeBadge = item.type === 'INWARD'
          ? '<span class="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">INWARD</span>'
          : '<span class="bg-sky-950 text-sky-400 border border-sky-800 text-[10px] font-bold px-2 py-0.5 rounded-full">OUTWARD</span>';

        return \`
          <tr class="hover:bg-slate-750 transition">
            <td class="py-2.5 px-3 whitespace-nowrap">\${typeBadge}</td>
            <td class="py-2.5 px-3 whitespace-nowrap text-slate-400 font-mono">\${new Date(item.dateTime).toLocaleString('en-IN', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })}</td>
            <td class="py-2.5 px-3 whitespace-nowrap font-mono font-bold text-amber-400">\${escapeHtml(item.gateNo)}</td>
            <td class="py-2.5 px-3 whitespace-nowrap font-bold text-white">\${escapeHtml(item.vehicleNo)}</td>
            <td class="py-2.5 px-3 whitespace-nowrap text-slate-300">\${escapeHtml(item.transporter)}</td>
            <td class="py-2.5 px-3 text-slate-300">
              <div class="font-semibold text-slate-200">\${escapeHtml(item.driverName)}</div>
              <div class="text-[10px] text-slate-400">\${escapeHtml(item.driverContact)}</div>
            </td>
            <td class="py-2.5 px-3 whitespace-nowrap font-mono text-slate-300">\${escapeHtml(item.refNo)}</td>
            <td class="py-2.5 px-3 text-slate-300 font-medium">\${escapeHtml(item.party)}</td>
            <td class="py-2.5 px-3 whitespace-nowrap text-slate-300">\${escapeHtml(item.qty)}</td>
            <td class="py-2.5 px-3 text-slate-400 max-w-xs truncate">\${escapeHtml(item.remarks)}</td>
          </tr>
        \`;
      }).join('');
    }

    function exportToCsv() {
      if (vehicleLogs.length === 0) {
        showToast('एक्सपोर्ट करने के लिए कोई डाटा उपलब्ध नहीं है।', 'warning');
        return;
      }
      const headers = ['Movement Type', 'Date & Time', 'Gate / Pass No', 'Vehicle Number', 'Transporter Name', 'Driver Name', 'Driver Contact', 'Challan / Invoice No', 'Supplier / Party Name', 'Quantity / Boxes', 'Remarks'];
      const rows = vehicleLogs.map(l => [
        \`"\${l.type}"\`, \`"\${l.dateTime}"\`, \`"\${l.gateNo}"\`, \`"\${l.vehicleNo}"\`, \`"\${l.transporter}"\`,
        \`"\${l.driverName}"\`, \`"\${l.driverContact}"\`, \`"\${l.refNo}"\`, \`"\${l.party}"\`, \`"\${l.qty}"\`,
        \`"\${l.remarks.replace(/"/g, '""')}"\`
      ]);
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = \`ICH_Vehicle_Movements_Report_\${new Date().toISOString().slice(0,10)}.csv\`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Excel CSV रिपोर्ट सफलतापूर्वक डाउनलोड हो गई!', 'success');
    }

    function clearAllDataPrompt() {
      if (confirm('क्या आप सभी वाहन रिकॉर्ड्स मिटाना चाहते हैं?')) {
        vehicleLogs = [];
        localStorage.removeItem('ich_vehicle_movement_db');
        refreshAllViews();
        showToast('समस्त रिकॉर्ड्स खाली कर दिए गए हैं।', 'info');
      }
    }

    function showToast(msg, type = 'info') {
      const container = document.getElementById('toastContainer');
      if (!container) return;
      const t = document.createElement('div');
      let colors = 'bg-slate-800 border-slate-600 text-white';
      let icon = 'fa-circle-info text-sky-400';
      if (type === 'success') { colors = 'bg-emerald-950 border-emerald-700 text-emerald-100'; icon = 'fa-circle-check text-emerald-400'; }
      else if (type === 'warning') { colors = 'bg-amber-950 border-amber-700 text-amber-100'; icon = 'fa-triangle-exclamation text-amber-400'; }
      else if (type === 'error') { colors = 'bg-rose-950 border-rose-700 text-rose-100'; icon = 'fa-circle-xmark text-rose-400'; }

      t.className = \`pointer-events-auto flex items-center gap-2.5 p-3 rounded-xl border shadow-2xl text-xs font-semibold \${colors} transition duration-300 transform translate-x-4 opacity-0\`;
      t.innerHTML = \`<i class="fa-solid \${icon} text-sm"></i><span>\${escapeHtml(msg)}</span>\`;
      container.appendChild(t);
      requestAnimationFrame(() => t.classList.remove('translate-x-4', 'opacity-0'));
      setTimeout(() => {
        t.classList.add('translate-x-4', 'opacity-0');
        setTimeout(() => t.remove(), 300);
      }, 3200);
    }

    function escapeHtml(s) {
      if (!s) return '';
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
  <\/script>
</body>
</html>`;

  // Blob बनाना और डाउनलोड ट्रिगर करना
  const blob = new Blob([fullHtmlContent], { type: "text/html;charset=utf-8" });
  const downloadLink = document.createElement("a");

  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = "warehouse_vehicle_tracker.html";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(downloadLink.href);
  console.log("warehouse_vehicle_tracker.html फ़ाइल सफलतापूर्वक डाउनलोड हो गई!");
}

// फ़ाइल डाउनलोड ट्रिगर करें
downloadWarehouseAppHTML();