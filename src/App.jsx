import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Info, Trash2, ShieldCheck, Hammer, Box, 
  ArrowRightLeft, AlertTriangle, ChevronRight, ListFilter,
  Plus, Minus, Trophy, ShoppingBag, Zap, Flame, FlaskConical, Wrench
} from 'lucide-react';

// Complete Item Database Extracted from v3.4 (Pages 1 & 2)
const ITEM_DATA = [
  // EXPEDITION PROJECTS (Page 1)
  { name: "Metal Parts", sellValue: 75, recycleROI: "-25%", category: "Common", tags: ["Project 1", "Project 2", "Project 3"], reqs: { "Project 1": 150, "Project 2": 150, "Project 3": 150 } },
  { name: "Rubber Parts", sellValue: 50, recycleROI: "-25%", category: "Common", tags: ["Project 1", "Project 2"], reqs: { "Project 1": 200, "Project 2": 200 } },
  { name: "Chemicals", sellValue: 50, recycleROI: "-25%", category: "Common", tags: ["Project 3"], reqs: { "Project 3": 100 } },
  { name: "Durable Cloth", sellValue: 640, recycleROI: "-53%", category: "High Priority", tags: ["Project 1", "Project 2", "Project 3", "Quest", "Medical Lab"], reqs: { "Project 1": 35, "Project 2": 35, "Project 3": 30, "Medical Lab L2": 5, "Quest": 1 } },
  { name: "Wires", sellValue: 200, recycleROI: "-50%", category: "Common", tags: ["Project 1", "Project 2", "Project 3", "Quest"], reqs: { "Project 1": 30, "Project 2": 25, "Project 3": 25, "Quest": 11 } },
  { name: "Light Bulb", sellValue: 2000, recycleROI: "-25%", category: "Rare", tags: ["Project 1", "Project 2"], reqs: { "Project 1": 5, "Project 2": 4, "Project 2 (Phase 3)": 10 } },
  { name: "Battery", sellValue: 250, recycleROI: "-40%", category: "Common", tags: ["Project 1", "Project 2", "Project 3", "Quest"], reqs: { "Project 1": 30, "Project 2": 30, "Project 3": 35, "Quest": 3 } },
  { name: "Humidifier", sellValue: 1000, recycleROI: "+0%", category: "Common", tags: ["Project 1"], reqs: { "Project 1": 5 } },
  { name: "Advanced Electrical Components", sellValue: 1750, recycleROI: "-52%", category: "High Priority", tags: ["Project 1", "Project 2", "Project 3", "Gear Bench", "Utility Station"], reqs: { "Project 1": 5, "Project 2": 5, "Project 3": 5, "Gear Bench L3": 5, "Utility Station L3": 5 } },
  { name: "Arc Alloy", sellValue: 200, recycleROI: "-25%", category: "Common", tags: ["Project 1", "Project 2", "Project 3", "Quest"], reqs: { "Project 1": 80, "Project 2": 80, "Project 3": 80, "Quest": 3 } },
  { name: "Steel Spring", sellValue: 300, recycleROI: "-25%", category: "Common", tags: ["Project 1", "Project 2", "Project 3"], reqs: { "Project 1": 15, "Project 2": 15, "Project 3": 15 } },
  { name: "Electrical Components", sellValue: 640, recycleROI: "-48%", category: "High Priority", tags: ["Project 1", "Project 2", "Project 3", "Gear Bench", "Utility Station"], reqs: { "Project 1": 30, "Project 2": 20, "Project 3": 20, "Gear Bench L2": 5, "Utility Station L2": 5 } },
  { name: "Cooling Fan", sellValue: 2000, recycleROI: "-16%", category: "Rare", tags: ["Project 1"], reqs: { "Project 1": 5 } },
  { name: "Sensors", sellValue: 500, recycleROI: "-45%", category: "Common", tags: ["Project 1"], reqs: { "Project 1": 20 } },
  { name: "Exodus Modules", sellValue: 2750, recycleROI: "-42%", category: "Rare", tags: ["Project 1", "Project 2", "Project 3"], reqs: { "Project 1": 1, "Project 2": 1, "Project 3": 1 } },
  { name: "Magnetic Accelerator", sellValue: 5500, recycleROI: "-50%", category: "Rare", tags: ["Project 1"], reqs: { "Project 1": 3 } },
  { name: "Leaper Pulse Unit", sellValue: 5000, recycleROI: "-20%", category: "Rare", tags: ["Project 1", "Project 2", "Quest"], reqs: { "Project 1": 3, "Project 2": 3, "Quest": 1 } },
  { name: "Shredder Gyro", sellValue: 3000, recycleROI: "-16%", category: "Rare", tags: ["Project 2"], reqs: { "Project 2": 10 } },
  { name: "Ion Sputter", sellValue: 6000, recycleROI: "-21%", category: "Rare", tags: ["Project 2"], reqs: { "Project 2": 3 } },
  { name: "Coffee Pot", sellValue: 1000, recycleROI: "-10%", category: "Common", tags: ["Project 3"], reqs: { "Project 3": 5 } },
  { name: "Broken Guidance System", sellValue: 2000, recycleROI: "-25%", category: "Rare", tags: ["Project 3"], reqs: { "Project 3": 1 } },
  { name: "Industrial Charger", sellValue: 1000, recycleROI: "-10%", category: "Common", tags: ["Project 3"], reqs: { "Project 3": 3 } },
  { name: "Firefly Burner", sellValue: 1000, recycleROI: "-16%", category: "Common", tags: ["Project 3"], reqs: { "Project 3": 5 } },
  { name: "Breathtaking Snow Globe", sellValue: 7000, recycleROI: "-21%", category: "Rare", tags: ["Project 3"], reqs: { "Project 3": 1 } },
  { name: "Bombardier Cell", sellValue: 3000, recycleROI: "-10%", category: "Rare", tags: ["Project 3", "Refiner L3"], reqs: { "Project 3": 2, "Refiner L3": 6 } },

  // WORKSHOP UPGRADES - GUNSMITH (Page 2)
  { name: "Mechanical Components", sellValue: 640, recycleROI: "-40%", category: "High Priority", tags: ["Gunsmith L2"], reqs: { "Gunsmith L2": 5 } },
  { name: "Rusted Tools", sellValue: 1000, recycleROI: "-10%", category: "Common", tags: ["Gunsmith L2"], reqs: { "Gunsmith L2": 3 } },
  { name: "Wasp Driver", sellValue: 640, recycleROI: "+63%", category: "Common", tags: ["Gunsmith L2", "Quest"], reqs: { "Gunsmith L2": 8, "Quest": 2 } },
  { name: "Rusted Gear", sellValue: 2000, recycleROI: "-21%", category: "Common", tags: ["Gunsmith L3"], reqs: { "Gunsmith L3": 3 } },
  { name: "Advanced Mechanical Components", sellValue: 1750, recycleROI: "-48%", category: "High Priority", tags: ["Gunsmith L3"], reqs: { "Gunsmith L3": 5 } },
  { name: "Sentinel Firing Core", sellValue: 3000, recycleROI: "-23%", category: "Rare", tags: ["Gunsmith L3"], reqs: { "Gunsmith L3": 4 } },

  // WORKSHOP UPGRADES - GEAR BENCH (Page 2)
  { name: "Power Cable", sellValue: 1000, recycleROI: "-20%", category: "Common", tags: ["Gear Bench L2"], reqs: { "Gear Bench L2": 3 } },
  { name: "Hornet Driver", sellValue: 1000, recycleROI: "-16%", category: "Common", tags: ["Gear Bench L2", "Quest"], reqs: { "Gear Bench L2": 5, "Quest": 2 } },
  { name: "Industrial Battery", sellValue: 1000, recycleROI: "-15%", category: "Common", tags: ["Gear Bench L3"], reqs: { "Gear Bench L3": 3 } },
  { name: "Bastion Cell", sellValue: 3000, recycleROI: "-22%", category: "Rare", tags: ["Gear Bench L3"], reqs: { "Gear Bench L3": 6 } },

  // WORKSHOP UPGRADES - MEDICAL LAB (Page 2)
  { name: "Tick Pod", sellValue: 640, recycleROI: "-22%", category: "High Priority", tags: ["Medical Lab L2"], reqs: { "Medical Lab L2": 8 } },
  { name: "Cracked Bioscanner", sellValue: 1000, recycleROI: "-10%", category: "Common", tags: ["Medical Lab L2"], reqs: { "Medical Lab L2": 2 } },
  { name: "Rusted Shut Medical Kit", sellValue: 2000, recycleROI: "+0%", category: "Common", tags: ["Medical Lab L3"], reqs: { "Medical Lab L3": 3 } },
  { name: "Antiseptic", sellValue: 1000, recycleROI: "-50%", category: "Common", tags: ["Medical Lab L3", "Quest"], reqs: { "Medical Lab L3": 8, "Quest": 2 } },
  { name: "Surveyor Vault", sellValue: 2000, recycleROI: "-15%", category: "Common", tags: ["Medical Lab L3", "Quest"], reqs: { "Medical Lab L3": 5, "Quest": 1 } },

  // WORKSHOP UPGRADES - SCRAPPY (Page 2)
  { name: "Dog Collar", sellValue: 640, recycleROI: "-25%", category: "Common", tags: ["Scrappy L2"], reqs: { "Scrappy L2": 1 } },
  { name: "Lemon", sellValue: 640, recycleROI: "-25%", category: "Common", tags: ["Scrappy L3"], reqs: { "Scrappy L3": 3 } },
  { name: "Apricot", sellValue: 640, recycleROI: "-53%", category: "Common", tags: ["Scrappy L3", "Scrappy L5"], reqs: { "Scrappy L3": 3, "Scrappy L5": 12 } },
  { name: "Prickly Pear", sellValue: 640, recycleROI: "-53%", category: "Common", tags: ["Scrappy L4"], reqs: { "Scrappy L4": 6 } },
  { name: "Olives", sellValue: 640, recycleROI: "-53%", category: "Common", tags: ["Scrappy L4"], reqs: { "Scrappy L4": 6 } },
  { name: "Cat Bed", sellValue: 1000, recycleROI: "-25%", category: "Common", tags: ["Scrappy L4"], reqs: { "Scrappy L4": 1 } },
  { name: "Mushroom", sellValue: 1000, recycleROI: "-25%", category: "Common", tags: ["Scrappy L5"], reqs: { "Scrappy L5": 12 } },
  { name: "Very Comfortable Pillow", sellValue: 2000, recycleROI: "-25%", category: "Common", tags: ["Scrappy L5"], reqs: { "Scrappy L5": 3 } },

  // WORKSHOP UPGRADES - EXPLOSIVES (Page 2)
  { name: "Pop Trigger", sellValue: 640, recycleROI: "-27%", category: "High Priority", tags: ["Explosives L2"], reqs: { "Explosives L2": 5 } },
  { name: "Crude Explosives", sellValue: 270, recycleROI: "-44%", category: "Common", tags: ["Explosives L2"], reqs: { "Explosives L2": 5 } },
  { name: "Synthesized Fuel", sellValue: 700, recycleROI: "-50%", category: "Common", tags: ["Explosives L2"], reqs: { "Explosives L2": 3 } },
  { name: "Laboratory Reagents", sellValue: 2000, recycleROI: "-20%", category: "Common", tags: ["Explosives L3"], reqs: { "Explosives L3": 3 } },
  { name: "Explosive Compound", sellValue: 1000, recycleROI: "-45%", category: "Common", tags: ["Explosives L3", "Uncategorized"], reqs: { "Explosives L3": 5 } },
  { name: "Rocketeer Driver", sellValue: 3000, recycleROI: "-22%", category: "Rare", tags: ["Explosives L3", "Quest"], reqs: { "Explosives L3": 3, "Quest": 1 } },

  // WORKSHOP UPGRADES - REFINER (Page 2)
  { name: "Fireball Burner", sellValue: 640, recycleROI: "-27%", category: "High Priority", tags: ["Refiner L2", "Quest"], reqs: { "Refiner L2": 8, "Quest": 1 } },
  { name: "ARC Motion Core", sellValue: 1000, recycleROI: "-60%", category: "High Priority", tags: ["Refiner L2"], reqs: { "Refiner L2": 5 } },
  { name: "Toaster", sellValue: 1000, recycleROI: "-10%", category: "Common", tags: ["Refiner L2"], reqs: { "Refiner L2": 3 } },
  { name: "Motor", sellValue: 2000, recycleROI: "-25%", category: "Common", tags: ["Refiner L3"], reqs: { "Refiner L3": 3 } },
  { name: "ARC Circuitry", sellValue: 1000, recycleROI: "-25%", category: "Common", tags: ["Refiner L3"], reqs: { "Refiner L3": 10 } },

  // WORKSHOP UPGRADES - UTILITY (Page 2)
  { name: "Snitch Scanner", sellValue: 1000, recycleROI: "-16%", category: "Common", tags: ["Utility L2", "Quest"], reqs: { "Utility L2": 6, "Quest": 2 } },
  { name: "Damaged Heat Sink", sellValue: 1000, recycleROI: "-15%", category: "Common", tags: ["Utility L2"], reqs: { "Utility L2": 2 } },
  { name: "Fried Motherboard", sellValue: 2000, recycleROI: "-21%", category: "Common", tags: ["Utility L3"], reqs: { "Utility L3": 3 } },

  // KEEP FOR QUESTS (Page 2 - Complete List of 20)
  { name: "Magnetron", sellValue: 6000, recycleROI: "-25%", category: "Rare", tags: ["Quest"], reqs: { "Quest": 1 } },
  { name: "Power Rod", sellValue: 5000, recycleROI: "-25%", category: "Rare", tags: ["Quest"], reqs: { "Quest": 1 } },
  { name: "Fertilizer", sellValue: 1000, recycleROI: "-10%", category: "Common", tags: ["Quest"], reqs: { "Quest": 2 } },
  { name: "Great Mullein", sellValue: 300, recycleROI: "-0%", category: "Common", tags: ["Quest"], reqs: { "Quest": 1 } },
  { name: "Water Pump", sellValue: 640, recycleROI: "-25%", category: "Common", tags: ["Quest"], reqs: { "Quest": 1 } },
  { name: "Flow Controller", sellValue: 2900, recycleROI: "-20%", category: "Rare", tags: ["Quest"], reqs: { "Quest": 1 } },
  { name: "Syringe", sellValue: 500, recycleROI: "-0%", category: "Common", tags: ["Quest"], reqs: { "Quest": 1 } },
  { name: "Burletta", sellValue: 2900, recycleROI: "-20%", category: "Rare", tags: ["Quest"], reqs: { "Quest": 1 } },

  // SAFE TO SELL / JUNK (Page 1)
  { name: "Alarm Clock", sellValue: 1000, recycleROI: "+0%", category: "Junk", tags: ["Safe to Sell"], reqs: {} },
  { name: "Coolant", sellValue: 640, recycleROI: "-10%", category: "Junk", tags: ["Safe to Sell"], reqs: {} },
  { name: "Diving Goggles", sellValue: 640, recycleROI: "-10%", category: "Junk", tags: ["Safe to Sell"], reqs: {} },
  { name: "Number Plate", sellValue: 270, recycleROI: "+181%", category: "Junk", tags: ["Recycle High ROI"], reqs: {} },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('arc_raiders_inv_v3.4');
    if (saved) setInventory(JSON.parse(saved));
  }, []);

  const updateInventory = (name, delta) => {
    const newVal = Math.max(0, (inventory[name] || 0) + delta);
    const updated = { ...inventory, [name]: newVal };
    setInventory(updated);
    localStorage.setItem('arc_raiders_inv_v3.4', JSON.stringify(updated));
  };

  const filteredItems = useMemo(() => {
    return ITEM_DATA.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      if (activeFilter === 'All') return matchesSearch;
      if (activeFilter === 'Needed') {
        const totalNeeded = Object.values(item.reqs || {}).reduce((a, b) => a + b, 0);
        return matchesSearch && (inventory[item.name] || 0) < totalNeeded;
      }
      if (activeFilter === 'Projects') return matchesSearch && item.tags.some(t => t.includes('Project'));
      if (activeFilter === 'Workshop') return matchesSearch && (
        item.tags.some(t => ["Gunsmith", "Gear Bench", "Medical Lab", "Scrappy", "Explosives", "Refiner", "Utility"].some(w => t.includes(w)))
      );
      if (activeFilter === 'Quest') return matchesSearch && item.tags.includes('Quest');
      if (activeFilter === 'Sell') return matchesSearch && item.tags.includes('Safe to Sell');
      return matchesSearch;
    });
  }, [searchTerm, activeFilter, inventory]);

  const getRecommendation = (item) => {
    if (item.tags.includes('Safe to Sell')) return { text: 'Sell/Recycle', color: 'text-slate-400', bg: 'bg-slate-900', icon: Trash2 };
    if (item.tags.includes('Quest')) return { text: 'QUEST ITEM', color: 'text-yellow-400', bg: 'bg-yellow-900/20', icon: ShieldCheck };
    if (item.category === 'High Priority') return { text: 'HIGH PRIORITY', color: 'text-red-400', bg: 'bg-red-900/20', icon: AlertTriangle };
    return { text: 'Workshop Item', color: 'text-blue-400', bg: 'bg-blue-900/20', icon: Hammer };
  };

  const getWorkshopIcon = (tag) => {
    if (tag.includes('Gunsmith')) return <Wrench className="w-3 h-3 text-orange-400" />;
    if (tag.includes('Explosives')) return <Flame className="w-3 h-3 text-red-400" />;
    if (tag.includes('Medical')) return <FlaskConical className="w-3 h-3 text-green-400" />;
    if (tag.includes('Refiner')) return <Zap className="w-3 h-3 text-blue-400" />;
    return <ChevronRight className="w-3 h-3 text-slate-600" />;
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-900 pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-600 rounded-lg">
                <Box className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase italic">
                ARC <span className="text-orange-500">Raiders</span> Master v3.4
              </h1>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Workshop & Expedition Sync Active</p>
          </div>
          
          <div className="flex bg-slate-900/40 p-1 rounded-2xl border border-slate-800">
            <div className="px-5 py-2 text-center">
              <div className="text-[10px] text-slate-500 uppercase font-black">Total Loot</div>
              <div className="text-xl font-black text-white">{Object.values(inventory).reduce((a,b)=>a+b, 0)}</div>
            </div>
            <div className="w-px bg-slate-800 my-2"></div>
            <div className="px-5 py-2 text-center">
              <div className="text-[10px] text-slate-500 uppercase font-black">Stash Count</div>
              <div className="text-xl font-black text-orange-500">{Object.keys(inventory).filter(k => inventory[k] > 0).length}</div>
            </div>
          </div>
        </header>

        <div className="sticky top-0 z-10 space-y-4 mb-8 bg-black/90 backdrop-blur-xl py-4 border-b border-slate-900">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              placeholder="Filter by name (e.g. Scrappy, Magnetron)..."
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500/50 transition-all text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Needed', 'Projects', 'Workshop', 'Quest', 'Sell'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  activeFilter === filter 
                    ? 'bg-orange-600 border-orange-500 text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                {filter === 'Needed' ? <div className="flex items-center gap-1.5"><ShoppingBag className="w-3 h-3"/> Wishlist</div> : filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pb-20">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const rec = getRecommendation(item);
              const totalNeeded = Object.values(item.reqs || {}).reduce((a, b) => a + b, 0);
              const current = inventory[item.name] || 0;
              const isDone = totalNeeded > 0 && current >= totalNeeded;
              const RecIcon = rec.icon;
              
              return (
                <div key={idx} className={`bg-slate-900/30 border rounded-[32px] p-6 transition-all ${isDone ? 'border-green-500/30' : 'border-slate-800 hover:border-slate-700'}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white leading-none">{item.name}</h3>
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-tighter ${rec.bg} ${rec.color} border-current opacity-70`}>
                          <RecIcon className="w-3 h-3" />
                          {rec.text}
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><span className="text-orange-500">Φ</span> {item.sellValue}</span>
                        <span className={`flex items-center gap-1.5 ${item.recycleROI.includes('+') ? 'text-green-500' : ''}`}><ArrowRightLeft className="w-3 h-3" /> {item.recycleROI} ROI</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-black/60 p-2 rounded-3xl border border-slate-800">
                      <button onClick={() => updateInventory(item.name, -1)} className="p-3 hover:bg-slate-800 rounded-2xl text-slate-500"><Minus className="w-4 h-4" /></button>
                      <div className="w-10 text-center text-2xl font-black text-white">{current}</div>
                      <button onClick={() => updateInventory(item.name, 1)} className="p-3 hover:bg-orange-600 rounded-2xl text-slate-500 hover:text-white"><Plus className="w-4 h-4" /></button>
                    </div>
                  </div>

                  {totalNeeded > 0 && (
                    <div className="mt-6 space-y-4">
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-700 ${isDone ? 'bg-green-500' : 'bg-orange-500'}`}
                          style={{ width: `${Math.min(100, (current / totalNeeded) * 100)}%` }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(item.reqs).map(([loc, count], i) => (
                          <div key={i} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-tighter bg-black/40 px-3 py-1.5 rounded-xl border border-slate-800/50 text-slate-400">
                            {getWorkshopIcon(loc)}
                            <span className={current >= count ? 'text-green-500' : 'text-slate-300'}>{Math.min(current, count)}/{count}</span>
                            <span className="opacity-20">|</span>
                            {loc}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-32 bg-slate-950 rounded-[48px] border border-dashed border-slate-900">
              <Info className="w-12 h-12 text-slate-800 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-700 uppercase italic">No Matches</h3>
              <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Check scanner filters</p>
            </div>
          )}
        </div>

        <footer className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-xl border-t border-slate-900 flex justify-center">
          <div className="flex items-center gap-6 text-slate-600 text-[9px] font-black uppercase tracking-widest">
             <div className="flex items-center gap-2 text-green-500"><Trophy className="w-3 h-3"/> V3.4 MASTER SYNC</div>
             <div className="hidden md:block">u/pRoDeeD MASTER SHEET DATA</div>
          </div>
        </footer>
      </div>
    </div>
  );
}