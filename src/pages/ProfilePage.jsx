import React from 'react';
import { motion } from 'framer-motion';
import { 
    Heart, Mic, Music, Sparkles, Mail, ChevronDown, Quote, Send, 
    Star, Sun, Book, Clapperboard, Palette, Flower, CheckCircle2,
    Calendar, User, MapPin, Smile, CloudRain,
    Moon, Utensils, Clock, Wind, Cloud, Church
} from 'lucide-react';

// --- DATA CONFIGURATION (Walang binago dito) ---
const PROFILE_DATA = {
    name: "Jubilee Cudiamat De Los Reyes",
    nickname: "Jubilee",
    role: "Guidance Facilitator",
    school: "Batangas State University - Balayan Campus",
    avatar: "jubilee.jpg", 
    facts: {
        birthday: "October 31, 2000",
        zodiac: "Scorpio ♏",
        mbti: "INFJ (The Advocate)",
        hometown: "Santol, Balayan, Batangas"
    },
    topFavorites: [
        { label: "Comfort Food", value: "Caldereta", icon: Heart },
        { label: "Hobby", value: "Singing", icon: Mic },
        { label: "On Repeat", value: "Makasama Ka - Marko Rudio", icon: Music },
    ],
    moreFavorites: [
        { category: "Psych Read", value: "Maybe You Should Talk to Someone", icon: Book },
        { category: "Zombie Flick", value: "Train to Busan", icon: Clapperboard },
        { category: "Color", value: "Pinkkkk! 🎀", icon: Palette },
        { category: "Flower", value: "Rose 🌹", icon: Flower },
    ],
    identity: [
        { label: "A Season", value: "Autumn 🍂", desc: "Cozy sweaters & cool breeze" },
        { label: "A Time of Day", value: "Golden Hour 🌅", desc: "Warm, soft, & fleeing" },
        { label: "A Scent", value: "Vanilla & Old Books 📖", desc: "Sweet & nostalgic" },
        { label: "A Sound", value: "Rain on Roof 🌧️", desc: "Calming & rhythmic" },
    ],
    loveLanguages: [
        { type: "Quality Time", percent: "40%" },
        { type: "Acts of Service", percent: "30%" },
        { type: "Physical Touch", percent: "20%" },
        { type: "Words of Affirmation", percent: "10%" },
    ],
    greenFlags: [
        "Remembering small details",
        "Kindness to strangers/animals",
        "Emotional intelligence",
        "Good hygiene & smells nice",
        "Respects boundaries"
    ],
    littleJoys: [
        { title: "Sunset Watch", icon: Sun, color: "bg-orange-100 text-orange-500" },
        { title: "Rainy Days", icon: CloudRain, color: "bg-blue-100 text-blue-500" },
        { title: "Late Night Talks", icon: Moon, color: "bg-purple-100 text-purple-500" },
        { title: "Eating Good Food", icon: Utensils, color: "bg-pink-100 text-pink-500" },
    ],
    sundayRoutine: [
        { time: "06:00 AM", activity: "Morning Mass ⛪" },
        { time: "10:00 AM", activity: "Slow Mornings & Coffee" },
        { time: "02:00 PM", activity: "Rest & Family Time" },
        { time: "05:00 PM", activity: "Walk / Nature Trip" },
        { time: "09:00 PM", activity: "Skincare & Journaling" },
    ],
    faith: {
        title: "Faith & Service",
        subtitle: "Serving the Lord",
        desc: "Beyond my work, my heart belongs to service. Offering my time and voice to the Church is my way of giving back the grace I receive every day.",
        verse: "Here I am, Lord; I come to do your will.",
    },
    services: [
        "Individual Counseling",
        "Student Well-being Support",
        "Career Guidance",
        "Mental Health Awareness",
        "Peer Facilitator Training"
    ],
    quote: "Guiding hearts, one student at a time.",
    thisOrThat: [
        { left: "Coffee", right: "Tea", choice: "right" }, 
        { left: "Morning", right: "Night", choice: "left" }, 
        { left: "Sea", right: "Mountain", choice: "left" }, 
        { left: "Books", right: "Movies", choice: "right" }, 
    ],
    nailongTitle: "My Comfort Character",
    nailongDesc: "Certified Nailong Fan! 🦖💛",
    nailongImg: "src/nailong.jpg" 
};


// --- NEW: "OA COQUETTE" SECTION COMPONENT ---
const Section = ({ children, className = "", pattern = "plain", motif = null }) => {
    let bgStyle = "";
    let MotifOverlay = null;

    // 1. DEFINE OA PATTERNS
    if (pattern === "gingham") {
        // Pink Gingham Checkered Pattern
        bgStyle = `bg-rose-50 [background-image:linear-gradient(to_right,rgba(244,114,182,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,114,182,0.15)_1px,transparent_1px)] [background-size:24px_24px]`;
    }
    if (pattern === "lace") {
         // Eyelet Lace Dots
         bgStyle = `bg-amber-50/30 [background-image:radial-gradient(circle_at_center,_#FFF_3px,_transparent_3px),_radial-gradient(circle_at_center,_#FFF_3px,_transparent_3px)] [background-size:20px_20px] [background-position:0_0,_10px_10px] border-y-[8px] border-dashed border-pink-100/50`;
    }
    if (pattern === "polka") {
         // Soft Pink Polka Dots
         bgStyle = `bg-pink-50/80 [background-image:radial-gradient(#fbcfe8_4px,transparent_4px)] [background-size:32px_32px]`;
    }
    if (pattern === "heavenly") {
        // Dreamy Clouds Gradient
        bgStyle = "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-100 via-cream-50 to-blue-50";
    }
    if (pattern === "quilted") {
         // Diagonal Quilted Lines
         bgStyle = `bg-rose-50 [background-image:repeating-linear-gradient(45deg,rgba(251,207,232,0.4)_0px,rgba(251,207,232,0.4)_2px,transparent_2px,transparent_16px),repeating-linear-gradient(135deg,rgba(251,207,232,0.4)_0px,rgba(251,207,232,0.4)_2px,transparent_2px,transparent_16px)]`;
    }
    if (pattern === "nailong") {
         // Puffy Yellow dots
         bgStyle = `bg-yellow-50 [background-image:radial-gradient(#fef08a_5px,transparent_5px)] [background-size:28px_28px]`;
    }

    // 2. DEFINE FLOATING MOTIFS (The "OA" touch)
    if (motif === "bows") {
         MotifOverlay = () => (
             <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden font-serif">
                 <div className="absolute top-10 left-10 rotate-[-15deg] text-3xl text-pink-300">🎀</div>
                 <div className="absolute top-1/4 right-20 rotate-[15deg] text-2xl text-pink-200">🎀</div>
                 <div className="absolute bottom-1/3 left-32 rotate-[-10deg] text-4xl text-rose-300">🎀</div>
                 <div className="absolute bottom-20 right-10 rotate-[20deg] text-3xl text-pink-300">🎀</div>
             </div>
         );
    }
     if (motif === "cherries") {
         MotifOverlay = () => (
             <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
                 <div className="absolute top-20 left-5 animate-pulse text-xl">🍒</div>
                 <div className="absolute bottom-40 right-10 animate-pulse delay-300 text-2xl">🍒</div>
                 <div className="absolute top-1/3 right-1/4 text-lg">🍒</div>
             </div>
         );
    }
     if (motif === "sparkles") {
          MotifOverlay = () => (
             <div className="absolute inset-0 pointer-events-none">
                 <Sparkles className="absolute top-1/4 left-10 text-yellow-200 animate-pulse w-10 h-10" />
                 <Sparkles className="absolute bottom-1/3 right-12 text-pink-200 animate-ping w-8 h-8" />
                 <Sparkles className="absolute top-20 right-20 text-yellow-100 w-12 h-12" />
                 <Star className="absolute bottom-20 left-20 text-pink-100 w-8 h-8 animate-spin-slow" />
             </div>
         );
    }

    return (
        // Added shadow-inset for depth
        <section className={`h-screen w-full flex flex-col items-center justify-center snap-start relative px-6 overflow-hidden shadow-[inset_0_0_60px_rgba(255,241,242,0.6)] ${bgStyle} ${className}`}>
            {MotifOverlay && <MotifOverlay />}
            {children}
            <div className="absolute bottom-6 md:bottom-10 animate-bounce text-pink-300 z-20 opacity-80 hover:opacity-100 transition-opacity drop-shadow-sm">
                <ChevronDown size={32} />
            </div>
             {/* EXTRA OA TOUCH: Bottom Lace Border SVG */}
            <div className="absolute bottom-0 left-0 w-full h-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTIwMCAyMCI+PHBhdGggZD0iTTAgMHYyMGgxMjAwVjBIMHptMCAxN2MyLjI2IDAgNC0yLjA4IDQtNHM0IDIuNjIgOCAzLjdjMi42Ni43MiA1Ljg4LS4xIDctMS43IDIuNDIgMy40IDYuMDYgMy42IDguNDQgMS43IDIuODggMi4yOCA2LjgyIDEuODggOC45NC0uNzggMi4yIDMuNCA2LjM2IDQuOTYgOS41OCAyLjc0IDIuODIgMS45NCA1LjU2IDMuMzQgNy4yNiA2Ljk2IDEuOTgtMy44IDUuMDYtNC43IDcuNjgtMi44IDIuNTIgMS44MiA0Ljk2IDUuMTIgNC44OCA5Ljk0LS4wNiA0LjMyLTQuMTQgNi43Ni04LjcyIDMuMzQtMS45MiAzLjQ0LTUuNDYgNS4xLTcuMTQgOS4wNCAyLjc2IDIuMzYgNy4xNiAxLjMyIDguODQtMS45NiAyLjg2IDMuMzQgNi44IDMuMzQgOS4wOC0uNjZIMTIwMHYxSDZ2LTFoLS40NHoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC42Ii8+PC9zdmc+')] bg-repeat-x opacity-80 pointer-events-none"></div>
        </section>
    );
};

const ProfilePage = () => {
    return (
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth custom-scrollbar bg-white">
            
            {/* --- 1. HERO (Gingham + Bows) --- */}
            <Section pattern="gingham" motif="bows">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-6 relative z-10"
                >
                    <div className="relative inline-block group">
                        {/* Extra Glow */}
                        <div className="absolute inset-0 bg-pink-300 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                        
                        <div className="w-56 h-56 md:w-64 md:h-64 rounded-full p-3 border-[6px] border-white/90 shadow-2xl relative z-10 overflow-hidden ring-4 ring-pink-100 bg-white/50 backdrop-blur-sm">
                            <img 
                                src="jubilee.jpg"
                                alt="Profile" 
                                className="w-full h-full rounded-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                        </div>
                        {/* Bigger Bow Icon */}
                        <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-md p-4 rounded-full shadow-[0_4px_12px_rgba(249,168,212,0.4)] text-4xl animate-pulse z-20 border-2 border-pink-200">🎀</div>
                    </div>
                    
                    <div>
                        <div className="inline-block px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm border-2 border-pink-200 text-pink-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-sm">
                            {PROFILE_DATA.nickname}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif text-gray-800 leading-tight drop-shadow-sm">
                            Jubilee <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 italic" style={{ textShadow: '2px 2px 4px rgba(244,114,182,0.2)' }}>
                                De Los Reyes
                            </span>
                        </h1>
                        <div className="w-32 h-1.5 bg-gradient-to-r from-pink-200 via-rose-300 to-pink-200 mx-auto my-6 rounded-full"></div>
                        <p className="text-lg md:text-xl text-gray-600 font-medium">
                            {PROFILE_DATA.role}
                        </p>
                        <p className="text-sm text-gray-400 uppercase tracking-wider mt-2 flex items-center justify-center gap-2 font-bold">
                             <MapPin size={16} className="text-pink-300" /> {PROFILE_DATA.school}
                        </p>
                    </div>
                </motion.div>
            </Section>

            {/* --- 2. FAST FACTS (Lace Pattern) --- */}
            <Section pattern="lace">
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="max-w-4xl w-full"
                >
                    <div className="text-center mb-12">
                         <h2 className="text-4xl font-serif text-gray-800">The Basics</h2>
                         <p className="text-pink-400 italic font-serif text-lg">Just girly things ✨</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {[
                            { icon: Calendar, label: "Born", val: PROFILE_DATA.facts.birthday, color: "text-pink-400", bg: "bg-rose-50/80" },
                            { icon: Star, label: "Zodiac", val: PROFILE_DATA.facts.zodiac, color: "text-purple-400", bg: "bg-purple-50/80" },
                            { icon: User, label: "MBTI", val: PROFILE_DATA.facts.mbti, color: "text-blue-400", bg: "bg-blue-50/80" },
                            { icon: MapPin, label: "Home", val: PROFILE_DATA.facts.hometown, color: "text-orange-400", bg: "bg-orange-50/80" }
                        ].map((item, i) => (
                            // Added backdrop-blur and borders to cards
                            <div key={i} className={`${item.bg} backdrop-blur-sm p-6 rounded-[2rem] text-center space-y-2 hover:shadow-xl transition-all border-2 border-white shadow-md group hover:-translate-y-1`}>
                                <item.icon className={`w-10 h-10 ${item.color} mx-auto group-hover:scale-110 transition-transform`} />
                                <h3 className="font-bold text-gray-700 font-serif text-lg">{item.label}</h3>
                                <p className="text-sm text-gray-600 font-medium">{item.val}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </Section>

            {/* --- 3. SOUL IDENTITY (Polka + Sparkles) --- */}
            <Section pattern="polka" motif="sparkles">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-4xl relative z-10"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif text-gray-800">Soul Identity</h2>
                        <p className="text-gray-400 italic font-serif">If I were a concept...</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {PROFILE_DATA.identity.map((item, i) => (
                            <div key={i} className="bg-white/90 backdrop-blur-md p-6 rounded-[2.5rem] border-2 border-pink-50 flex items-center gap-6 shadow-sm hover:shadow-[0_8px_24px_rgba(249,168,212,0.3)] transition-all">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-100 via-white to-pink-50 flex items-center justify-center text-3xl shadow-inner border border-pink-100">
                                    {i === 0 ? <Wind className="text-pink-300"/> : i === 1 ? <Clock className="text-yellow-300"/> : i === 2 ? <Flower className="text-rose-300"/> : <Cloud className="text-blue-300"/>}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-pink-300 uppercase tracking-widest mb-2">{item.label}</h4>
                                    <p className="text-2xl font-serif text-gray-800">{item.value}</p>
                                    <p className="text-sm text-gray-500 italic mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </Section>

            {/* --- 4. TOP FAVORITES (Quilted Texture + Cherries) --- */}
            <Section pattern="quilted" motif="cherries">
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="w-full max-w-5xl relative z-10"
                >
                    <h2 className="text-4xl font-serif text-center mb-16 text-gray-800">
                        Current <span className="text-pink-400 italic" style={{ textShadow: '1px 1px 2px rgba(244,114,182,0.3)' }}>Obsessions</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {PROFILE_DATA.topFavorites.map((fav, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -10, scale: 1.02 }} 
                                // Added ruffles/scalloped look with border-dashed
                                className="bg-white/95 backdrop-blur-sm p-8 rounded-[3rem] shadow-[0_12px_30px_-10px_rgba(251,207,232,0.6)] border-[4px] border-dashed border-pink-100 text-center flex flex-col items-center justify-center gap-6 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 rounded-bl-[4rem] -mr-8 -mt-8 z-0 group-hover:bg-pink-100 transition-colors"></div>
                                <div className="relative z-10 w-24 h-24 bg-gradient-to-b from-rose-50 to-white rounded-full flex items-center justify-center text-pink-400 shadow-[inset_0_4px_8px_rgba(251,207,232,0.4)] group-hover:rotate-[15deg] transition-transform border-2 border-pink-50">
                                    <fav.icon size={40} className="drop-shadow-sm" />
                                </div>
                                <div className="relative z-10">
                                    <span className="text-xs font-bold text-pink-300 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full">{fav.label}</span>
                                    <p className="text-2xl font-serif text-gray-800 font-bold mt-4">
                                        {fav.value}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Section>

            {/* --- 5. FAITH & SERVICE (Heavenly + Sparkles) --- */}
            <Section pattern="heavenly" motif="sparkles">
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-3xl w-full text-center relative px-6 z-10"
                 >
                    <div className="inline-block p-6 rounded-full bg-gradient-to-tr from-yellow-100 via-white to-yellow-50 shadow-[0_8px_20px_rgba(254,240,138,0.4)] border-4 border-white mb-10 animate-float">
                        <Church className="text-yellow-500 w-16 h-16 drop-shadow-sm" />
                    </div>

                    <h2 className="text-5xl md:text-6xl font-serif text-gray-800 mb-4 drop-shadow-sm">{PROFILE_DATA.faith.title}</h2>
                    <p className="text-yellow-600/80 font-serif italic text-2xl mb-10">{PROFILE_DATA.faith.subtitle}</p>

                    <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] border-2 border-white shadow-[0_10px_40px_rgba(253,230,138,0.3)] relative">
                         <Quote className="absolute top-6 left-8 text-yellow-300 w-10 h-10 opacity-50" />
                         <p className="text-gray-700 text-xl leading-relaxed font-light mb-8 px-4 font-serif">
                            "{PROFILE_DATA.faith.desc}"
                         </p>
                         <div className="h-1 w-32 bg-gradient-to-r from-transparent via-yellow-300 to-transparent mx-auto mb-6"></div>
                         <p className="text-sm font-bold text-yellow-600 uppercase tracking-[0.2em]">
                            {PROFILE_DATA.faith.verse}
                         </p>
                    </div>
                 </motion.div>
            </Section>

            {/* --- 6. SUNDAY RESET (Gingham) --- */}
            <Section pattern="gingham" className="bg-white">
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12 md:gap-20 relative z-10"
                >
                    <div className="text-center md:text-left">
                        <h2 className="text-5xl md:text-6xl font-serif text-gray-800 mb-4">Sunday Reset</h2>
                        <p className="text-pink-400 italic mb-8 text-2xl font-serif">Recharging Soul & Spirit ⛪</p>
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] border-2 border-dashed border-pink-200 inline-block shadow-md rotate-[-2deg]">
                             <p className="text-gray-600 max-w-xs leading-relaxed font-serif italic text-lg">
                                "Sundays are for the Lord, for rest, and for resetting my heart."
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-md p-10 rounded-[3rem] shadow-[0_20px_60px_-12px_rgba(244,114,182,0.3)] w-full max-w-md relative border-4 border-pink-50">
                        {/* Decorative Big Bow */}
                        <div className="absolute -top-8 -right-8 text-6xl rotate-[15deg] drop-shadow-md">🎀</div>
                        
                        {PROFILE_DATA.sundayRoutine.map((item, i) => (
                            <div key={i} className="flex gap-4 mb-8 last:mb-0 group items-center">
                                <span className={`font-bold w-28 shrink-0 text-right font-serif text-lg ${i === 0 ? 'text-pink-500' : 'text-pink-300'}`}>{item.time}</span>
                                <div className="w-1 bg-pink-100 h-12 relative rounded-full">
                                    <div className={`absolute top-1/2 -translate-y-1/2 -left-2 w-5 h-5 border-[3px] rounded-full transition-all shadow-sm ${i === 0 ? 'bg-pink-200 border-pink-400 scale-110' : 'bg-white border-pink-200 group-hover:bg-pink-300'}`}></div>
                                </div>
                                <span className={`font-medium text-lg transition-colors ${i === 0 ? 'text-gray-800 font-bold' : 'text-gray-600 group-hover:text-pink-500'}`}>
                                    {item.activity}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </Section>

            {/* --- 7. LITTLE JOYS (Polka + Bows) --- */}
            <Section pattern="polka" motif="bows" className="bg-white">
                <div className="text-center mb-16 relative z-10">
                    <h2 className="text-4xl font-serif text-gray-800">Little Joys</h2>
                    <p className="text-pink-400 font-serif italic text-xl">Instant Serotonin Boosters 🦢</p>
                </div>

                <div className="grid grid-cols-2 gap-8 max-w-3xl w-full relative z-10">
                    {PROFILE_DATA.littleJoys.map((joy, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? -2 : 2 }}
                            className="bg-white p-8 rounded-[2.5rem] shadow-md border-[3px] border-dashed border-pink-100 flex flex-col items-center justify-center gap-6 hover:border-pink-300 transition-all hover:shadow-xl"
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${joy.color} shadow-inner border-2 border-white`}>
                                <joy.icon size={32} />
                            </div>
                            <span className="font-serif text-gray-700 text-xl font-bold">{joy.title}</span>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* --- 8. LOVE LANGUAGES & GREEN FLAGS (Lace) --- */}
            <Section pattern="lace" className="bg-rose-50/40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4 relative z-10">
                    <motion.div 
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="bg-white/80 backdrop-blur-sm p-10 rounded-[3rem] shadow-[0_10px_40px_rgba(244,114,182,0.2)] border-2 border-pink-100"
                    >
                        <h3 className="text-3xl font-serif text-gray-800 mb-8 flex items-center gap-3">
                            <Heart className="text-pink-400 fill-pink-400 drop-shadow-sm" size={28}/> Love Language
                        </h3>
                        <div className="space-y-6">
                            {PROFILE_DATA.loveLanguages.map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-lg mb-2 text-gray-700 font-serif">
                                        <span>{item.type}</span>
                                        <span className="text-pink-400 font-bold">{item.percent}</span>
                                    </div>
                                    <div className="w-full bg-pink-50 rounded-full h-4 overflow-hidden border border-pink-100 p-0.5">
                                        <div 
                                            className="bg-gradient-to-r from-pink-200 to-rose-300 h-full rounded-full shadow-sm" 
                                            style={{ width: item.percent }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="bg-white/80 backdrop-blur-sm p-10 rounded-[3rem] shadow-[0_10px_40px_rgba(167,243,208,0.2)] border-2 border-green-100"
                    >
                         <h3 className="text-3xl font-serif text-gray-800 mb-8 flex items-center gap-3">
                            <CheckCircle2 className="text-green-400 drop-shadow-sm" size={28}/> Green Flags
                        </h3>
                        <ul className="space-y-5">
                            {PROFILE_DATA.greenFlags.map((flag, i) => (
                                <li key={i} className="flex items-center gap-4 text-gray-700 bg-green-50/50 p-4 rounded-2xl font-medium border border-green-50">
                                    <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                                    {flag}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </Section>

            {/* --- 9. DETAILED FAVORITES (Quilted) --- */}
            <Section pattern="quilted" className="bg-rose-50/20">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    whileInView={{ opacity: 1 }}
                    className="w-full max-w-3xl relative z-10"
                >
                     <div className="text-center mb-12">
                         <h2 className="text-4xl font-serif text-gray-800">More Things I Love</h2>
                     </div>

                     <div className="space-y-6">
                        {PROFILE_DATA.moreFavorites.map((item, i) => (
                            <div key={i} className="flex items-center gap-8 p-6 rounded-[2rem] bg-white hover:bg-rose-50 transition-all border-2 border-gray-50 hover:border-pink-200 shadow-md hover:shadow-lg group hover:-translate-x-1">
                                <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 shrink-0 shadow-inner border border-pink-100 group-hover:rotate-12 transition-transform">
                                    <item.icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-pink-300 uppercase tracking-wide mb-1">{item.category}</h4>
                                    <p className="text-2xl font-serif text-gray-800">{item.value}</p>
                                </div>
                                <div className="text-pink-200 group-hover:text-pink-400 transition-colors">
                                    <Heart size={24} fill="currentColor" />
                                </div>
                            </div>
                        ))}
                     </div>
                </motion.div>
            </Section>

            {/* --- 10. WORK MODE (Heavenly) --- */}
            <Section pattern="heavenly">
                 <motion.div 
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    className="max-w-3xl w-full bg-white/60 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 shadow-xl border-2 border-white relative z-10"
                 >
                    <div className="text-center mb-12">
                        <div className="inline-block p-5 rounded-full bg-purple-100 text-purple-500 mb-6 animate-pulse shadow-md border-2 border-white">
                            <Sparkles size={32} />
                        </div>
                        <h2 className="text-4xl font-serif text-gray-800">Work Mode 💼</h2>
                        <p className="text-gray-500 mt-3 text-lg font-serif italic">Guidance Facilitator Services</p>
                    </div>

                    <ul className="grid gap-6">
                        {PROFILE_DATA.services.map((service, i) => (
                            <li key={i} className="flex items-center gap-5 text-gray-700 bg-white/80 p-5 rounded-2xl shadow-sm border-2 border-transparent hover:border-purple-200 hover:shadow-md transition-all group hover:bg-purple-50/50">
                                <CheckCircle2 className="text-purple-300 group-hover:text-purple-500 transition-colors drop-shadow-sm" size={24} />
                                <span className="font-medium text-lg group-hover:translate-x-2 transition-transform">{service}</span>
                            </li>
                        ))}
                    </ul>
                 </motion.div>
            </Section>

            {/* --- 11. THIS OR THAT (Polka) --- */}
            <Section pattern="polka" className="bg-white">
                <div className="text-center mb-12 relative z-10">
                    <h2 className="text-4xl font-serif text-gray-800">This or That?</h2>
                    <p className="text-pink-400 font-serif italic text-xl">My Choices 🎀</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10">
                    {PROFILE_DATA.thisOrThat.map((item, i) => (
                        <div key={i} className="bg-white rounded-full p-3 flex items-center justify-between shadow-lg border-2 border-pink-100 relative overflow-hidden group hover:scale-[1.02] transition-transform hover:shadow-xl">
                            <div className={`absolute top-2 bottom-2 w-[calc(50%-8px)] bg-gradient-to-r from-pink-100 to-rose-200 rounded-full transition-all duration-500 shadow-inner ${item.choice === 'left' ? 'left-2' : 'left-[calc(50%)] translate-x-0'}`}></div>
                            
                            <div className={`relative z-10 w-1/2 text-center py-4 font-bold text-lg cursor-default font-serif ${item.choice === 'left' ? 'text-pink-700' : 'text-gray-400'}`}>
                                {item.left}
                            </div>
                            <div className={`relative z-10 w-1/2 text-center py-4 font-bold text-lg cursor-default font-serif ${item.choice === 'right' ? 'text-pink-700' : 'text-gray-400'}`}>
                                {item.right}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* --- 12. NAILONG CORNER (Nailong Pattern) --- */}
            <Section pattern="nailong" className="bg-yellow-50/50">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="text-center max-w-md w-full relative z-10"
                >
                    {/* Decorative Stars */}
                    <div className="absolute -top-16 -left-10 text-yellow-400 animate-spin-slow drop-shadow-sm"><Star size={48}/></div>
                    <div className="absolute top-0 -right-16 text-yellow-300 animate-pulse drop-shadow-sm"><Star size={32}/></div>

                    <h2 className="text-5xl font-serif text-gray-800 mb-4">{PROFILE_DATA.nailongTitle}</h2>
                    <p className="text-yellow-700 font-bold mb-10 bg-yellow-200/80 inline-block px-6 py-2 rounded-full shadow-sm border-2 border-yellow-100">{PROFILE_DATA.nailongDesc}</p>
                    
                    <div className="relative w-72 h-72 mx-auto mb-10 animate-bounce">
                        <div className="absolute inset-0 bg-yellow-300 rounded-[3rem] blur-2xl opacity-60"></div>
                        <div className="w-full h-full rounded-[3rem] overflow-hidden border-[8px] border-white shadow-2xl relative z-10 bg-white rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img 
                                src="nailong.png"
                                alt="Nailong" 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-center gap-3 flex-wrap">
                        <span className="bg-white text-yellow-600 px-5 py-3 rounded-full text-sm font-bold shadow-md border-2 border-yellow-100 hover:-translate-y-1 transition-transform">Cute 🦖</span>
                        <span className="bg-white text-yellow-600 px-5 py-3 rounded-full text-sm font-bold shadow-md border-2 border-yellow-100 hover:-translate-y-1 transition-transform delay-75">Funny 😆</span>
                        <span className="bg-white text-yellow-600 px-5 py-3 rounded-full text-sm font-bold shadow-md border-2 border-yellow-100 hover:-translate-y-1 transition-transform delay-150">Yellow 💛</span>
                    </div>
                </motion.div>
            </Section>

            {/* --- 13. MANTRA & CONTACT (Gingham + Bows) --- */}
            <Section pattern="gingham" motif="bows" className="bg-white">
                <div className="space-y-20 w-full max-w-2xl flex flex-col items-center relative z-10">
                    
                    {/* Mantra */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center relative p-10 bg-white/80 backdrop-blur-sm rounded-[3rem] border-2 border-dashed border-pink-200 shadow-lg rotate-1"
                    >
                        <Quote className="text-pink-300 w-20 h-20 mx-auto mb-6 opacity-60" />
                        <h2 className="text-4xl md:text-6xl font-serif text-gray-800 leading-tight italic drop-shadow-sm">
                            "{PROFILE_DATA.quote}"
                        </h2>
                    </motion.div>

                    {/* Contact Card */}
                    <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="bg-white w-full p-10 rounded-[3rem] border-[3px] border-double border-pink-200 shadow-2xl text-center relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,var(--tw-colors-pink-200),var(--tw-colors-pink-200)_10px,white_10px,white_20px)]"></div>
                        
                        <h2 className="mt-6 text-3xl font-serif text-gray-800 mb-3">Send a Message 💌</h2>
                        <p className="text-gray-500 mb-8 font-medium text-lg font-serif">
                            Batangas State U - Balayan Campus
                        </p>

                        <div className="flex gap-6 justify-center">
                            <button className="bg-rose-50 text-pink-500 p-5 rounded-full hover:bg-pink-100 transition-colors shadow-md border-2 border-pink-100 hover:scale-110 hover:rotate-6">
                                <Mail size={28} />
                            </button>
                            <button className="bg-rose-50 text-pink-500 p-5 rounded-full hover:bg-pink-100 transition-colors shadow-md border-2 border-pink-100 hover:scale-110 hover:-rotate-6 delay-75">
                                <Send size={28} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </Section>

        </div>
    );
};

export default ProfilePage;