import { fileSlug } from "./ui";
// style | name | palette(0 gold,1 white,2 pink,3 red,4 blue,5 orange,6 purple,7 colorful) | energy(1-3) | keywords
const RAW = `
snow|Christmas Snowfall|1|1|christmas,xmas,holiday,december,festive
snow|Heavy Blizzard Snow|1|3|blizzard,snowstorm,winter storm,heavy snow,freezing
snow|Blue Ice Snowflakes|4|2|ice,frozen,frost,cold,winter wonderland
snow|Golden New Year Snow|0|1|new year,celebration,luxury,gold glitter,festive
snow|Pink Cotton Snow|2|1|cute,pastel,soft,dreamy,fairy tale
snow|Slow Winter Snowfall|1|1|calm,peaceful,winter night,cozy,serene
snow|Red Holiday Snow|3|2|santa,holiday season,gift,cheerful,seasonal
snow|Purple Magic Snow|6|1|magic,fantasy,enchanted,night,mystical
snow|Colorful Snowflakes|7|2|playful,kids,fun,cartoon style,bright
snow|Orange Sunset Snow|5|1|sunset,warm,golden hour,cinematic,dusk
rain|Light Rain Drops|1|1|drizzle,light rain,calm,mist,spring rain
rain|Heavy Rainstorm|1|3|downpour,thunderstorm,monsoon,heavy rain,storm
rain|Blue Rain Overlay|4|2|water drops,rainy day,cool,wet,cloudy
rain|Golden Rain|0|2|luxury,magic rain,glamour,precious,wealth
rain|Pink Rain Drops|2|1|cute,romantic,pastel,rainy mood,dreamy
rain|Purple Night Rain|6|2|night,mystery,moody,cinematic,dark mood
rain|Red Rain|3|2|dramatic,horror,danger,intense,thriller
rain|Orange Autumn Rain|5|1|autumn,fall season,warm rain,cozy,evening
rain|Colorful Rain|7|2|rainbow,playful,kids,fun,bright
rain|Silver Monsoon Rain|1|2|monsoon,wet season,tropical,rainfall,weather forecast
confetti|Birthday Confetti|7|2|birthday,party,celebrate,balloons,happy
confetti|Gold Celebration Confetti|0|2|luxury,award,anniversary,gala,festive
confetti|New Year Confetti|0|3|new year,countdown,midnight,nye,party
confetti|Wedding Confetti|1|1|wedding,bride,groom,romantic,marriage
confetti|Pink Baby Shower Confetti|2|1|baby shower,girl,gender reveal,cute,pastel
confetti|Blue Boy Confetti|4|1|baby boy,gender reveal,cute,celebration,kids party
confetti|Red Winner Confetti|3|3|winner,victory,success,championship,congratulations
confetti|Purple Party Confetti|6|2|disco,night party,celebration,club,festival
confetti|Orange Carnival Confetti|5|3|carnival,festival,fiesta,parade,fun
confetti|Graduation Confetti|7|2|graduation,school,achievement,success,ceremony
hearts|Valentine Hearts|3|1|valentine,february,love,romantic,romance
hearts|Pink Floating Hearts|2|1|cute,girly,affection,sweet,kawaii
hearts|Golden Love Hearts|0|1|luxury,anniversary,wedding,premium,love
hearts|White Wedding Hearts|1|1|wedding,bride,pure,elegant,marriage
hearts|Purple Hearts|6|1|magic love,fantasy,mystic,dreamy,romantic night
hearts|Blue Hearts|4|1|friendship,calm,peaceful,kind,support
hearts|Colorful Hearts|7|2|rainbow,pride,fun,kids,playful
hearts|Fast Rising Hearts|3|3|social media,reaction,popular,romantic,dynamic
hearts|Orange Warm Hearts|5|1|warm,kindness,charity,caring,family
hearts|Slow Dreamy Hearts|2|1|slow motion,dreamy,soft focus,tender,calm
petals|Gold Falling Petals|0|2|golden,luxury,spring,romantic,nature
petals|Cherry Blossom Petals|2|1|cherry blossom,sakura,japan,spring,pink
petals|Rose Petals Falling|3|1|rose,romance,valentine,wedding,flower
petals|White Wedding Petals|1|1|wedding,bride,elegant,pure,ceremony
petals|Purple Lavender Petals|6|1|lavender,relaxing,spa,fragrance,floral
petals|Blue Flower Petals|4|1|blue flowers,fresh,calm,garden,delicate
petals|Orange Marigold Petals|5|2|marigold,festival,celebration,traditional,warm
petals|Colorful Spring Petals|7|2|spring,garden,joy,easter,blossoming
petals|Windy Petals Storm|2|3|windy,breeze,petal storm,dynamic,fast
petals|Slow Romantic Petals|3|1|slow motion,romantic,gentle,love,tender
sparkles|Gold Glitter Sparkles|0|2|gold glitter,luxury,glamour,shiny,golden
sparkles|White Twinkling Stars|1|2|stars,twinkle,night sky,magic,wish
sparkles|Pink Fairy Sparkles|2|1|fairy dust,princess,cute,girly,fantasy
sparkles|Blue Magic Sparkles|4|2|magic,spell,ice,fantasy,mystical
sparkles|Purple Magic Dust|6|2|enchanted,wizard,mystic,cosmic,spell
sparkles|Red Shine Sparkles|3|2|valentine,glamour,festive,sparkling,party
sparkles|Orange Spark Glints|5|2|golden hour,glint,warm,shine,reflection
sparkles|Colorful Glitter|7|3|rainbow glitter,party,unicorn,fun,kids
sparkles|Slow Shimmer|1|1|shimmer,subtle,elegant,soft,dreamy
sparkles|Fast Flash Sparkles|0|3|flash,award,reveal,celebration,burst
bubbles|Soap Bubbles|7|1|soap,wash,clean,kids,playful
bubbles|Underwater Bubbles|4|2|underwater,ocean,sea,diving,aquarium
bubbles|Pink Bubbles|2|1|cute,baby,pastel,soft,sweet
bubbles|Golden Bubbles|0|1|champagne,luxury,celebration,fizz,sparkling
bubbles|White Clear Bubbles|1|2|clear,transparent,clean,fresh,water
bubbles|Purple Magic Bubbles|6|1|magic,fantasy,dreamy,mystical,floating
bubbles|Fast Rising Bubbles|4|3|fizz,carbonated,soda,rising,dynamic
bubbles|Red Bubbles|3|1|romantic,love,valentine,party,soft
bubbles|Orange Bubbles|5|1|summer,citrus,fresh,juice,warm
bubbles|Slow Floating Bubbles|1|1|slow motion,calm,peaceful,relaxing,meditation
embers|Fire Embers Rising|5|2|fire,sparks,flame,campfire,burning
embers|Red Hot Sparks|3|3|hot,explosion,forge,welding,intense
embers|Golden Embers|0|2|glowing,bonfire,warm,ember glow,heat
embers|Campfire Sparks|5|1|camping,night,bonfire,outdoor,cozy
embers|Blue Flame Sparks|4|2|cold fire,magic fire,energy,plasma,mystic
embers|Purple Magic Embers|6|2|fantasy,magic,dark,spell,enchanted
embers|White Hot Sparks|1|3|metal,grinding,industrial,sparks,heat
embers|Colorful Fireworks Sparks|7|3|fireworks,celebration,festival,night,burst
embers|Slow Floating Embers|3|1|slow motion,ash,remains,atmosphere,cinematic
embers|Fireflies Glow|0|1|fireflies,summer night,forest,glow,magical
leaves|Autumn Leaves Falling|5|2|autumn,fall,season,foliage,orange leaves
leaves|Golden Fall Leaves|0|1|golden,thanksgiving,october,nature,warm
leaves|Red Maple Leaves|3|2|maple,fall colors,harvest,seasonal,autumn
leaves|Colorful Autumn Leaves|7|2|fall colors,forest,vibrant,park,seasonal
leaves|Windy Leaves Storm|5|3|wind,windy,gust,storm,dynamic
leaves|Slow Drifting Leaves|0|1|calm,peaceful,slow motion,gentle,serene
leaves|Purple Magic Leaves|6|1|fantasy,enchanted,fairy tale,mystic,surreal
leaves|Blue Frost Leaves|4|1|frost,early winter,cold,november,fresh
leaves|Pink Spring Leaves|2|1|spring,fresh,blossom,soft,gentle
leaves|White Winter Leaves|1|1|winter,ice,snowy,cold,abstract
dust|Floating Dust Particles|1|1|dust motes,atmosphere,cinematic,particles,haze
dust|Golden Dust Bokeh|0|1|bokeh,golden light,sun rays,warm,dreamy
dust|Magic Dust Particles|6|1|magic,fantasy,mystic,fairy dust,enchanted
dust|Blue Dust Particles|4|1|cold,tech,sci-fi,clean,atmosphere
dust|Pink Dust Bokeh|2|1|romantic,soft,pastel,dream,glow
dust|Orange Dust Embers|5|1|warm,desert,sunset,smoky,vintage
dust|Fast Dust Storm|5|3|sandstorm,wind,desert,debris,dynamic
dust|Colorful Particles|7|2|abstract,colorful,floating,digital,festive
dust|Red Dust Particles|3|1|dramatic,dark,thriller,mood,cinematic
dust|Slow Light Particles|0|1|slow motion,light dust,calm,ethereal,peaceful
snow|Frosted Window Snow|4|1|frosted,window,cozy winter,mood,soft
snow|Mountain Peak Snow|1|2|alpine,mountain,ski,resort,winter sports
snow|Rose Gold Snowfall|2|1|elegant,rose gold,luxury,soft glow,romantic winter
snow|Midnight Blue Snow|4|1|midnight,night sky,moody,quiet,dark winter
snow|Festive Rainbow Snow|7|3|celebration,rainbow,joy,holiday party,bright
rain|Tropical Shower Rain|1|2|tropical,shower,summer rain,island,warm
rain|Neon Night Rain|6|3|neon,city night,cyberpunk,glow,urban
rain|Gold Monsoon Rain|0|2|golden hour,monsoon,warm,elegant,rainfall
rain|Cool Mist Rain|4|1|mist,fog,morning,calm,forest
rain|Ruby Storm Rain|3|3|storm,dramatic,lightning,dark,intense
confetti|Anniversary Gold Confetti|0|1|anniversary,milestone,elegant,celebration,jubilee
confetti|Retirement Party Confetti|7|1|retirement,farewell,party,celebrate,joy
confetti|Sweet Sixteen Confetti|2|2|sweet sixteen,birthday,teen party,pink,fun
confetti|Corporate Launch Confetti|1|2|product launch,business,opening,success,announcement
confetti|Diwali Festival Confetti|5|2|diwali,festival of lights,celebration,sweets,festive
hearts|Mothers Day Hearts|2|1|mothers day,mom,family,gratitude,love
hearts|Fathers Day Hearts|4|1|fathers day,dad,family,pride,love
hearts|Ruby Heart Burst|3|2|passion,romance,bold,love,heart burst
hearts|Teal Gentle Hearts|4|1|gentle,care,health,healing,hope
hearts|Sunshine Hearts|0|2|happy,sunshine,joy,summer,positive
petals|Lavender Breeze Petals|6|1|lavender,relaxing,spa,calm,purple flowers
petals|Rose Petal Shower|3|2|rose petals,romance,wedding,red roses,luxury
petals|White Jasmine Petals|1|1|jasmine,fragrance,pure,garden,soft
petals|Rainbow Flower Petals|7|2|flowers,colorful,garden party,bright,spring festival
leaves|Golden Maple Leaves|5|1|maple,golden autumn,canada,fall colors,warm
leaves|Red Oak Leaves|3|2|oak,autumn forest,fall,rustic,nature
leaves|Jungle Blue Leaves|4|2|jungle,tropical leaves,exotic,rainforest,lush
leaves|Fresh Winter Mint Leaves|1|1|mint,fresh,clean,wellness,tea
leaves|Purple Plum Leaves|6|2|plum,harvest,vineyard,purple,rustic
dust|Gold Cinematic Dust|0|2|cinematic,film grain,premium,golden,epic
dust|Cosmic Star Dust|6|2|space,galaxy,stars,cosmos,nebula
dust|Ice Crystal Dust|1|1|crystal,clean,minimal,glass,light
dust|Coral Sunrise Dust|2|1|sunrise,morning light,soft glow,peach,dawn
dust|Electric Blue Dust|4|3|electric,energy,tech,digital,fast
sparkles|Diamond Sparkles|1|1|diamond,jewelry,luxury,wedding,sparkle
sparkles|Starlight Glints|4|1|starlight,night,dreamy,galaxy,wish
sparkles|Rose Glitter Dust|3|2|rose glitter,beauty,glam,fashion,makeup
sparkles|Rainbow Shimmer|7|2|rainbow,unicorn,magical,colorful,fun
sparkles|Silver Disco Glitter|1|2|silver,disco,glam,shiny,party
bubbles|Bath Time Bubbles|2|1|bath,spa,relax,kids,foam
bubbles|Champagne Toast Bubbles|0|2|toast,wedding champagne,celebration,elegant,gala
bubbles|Ocean Blue Bubbles|4|1|ocean,sea,tide,summer,fresh
bubbles|Neon Pop Bubbles|6|3|neon,pop,party,dance,bright
bubbles|Coral Soda Bubbles|5|2|soda,drink,refreshing,cafe,summer drink
embers|Ocean Sunset Embers|5|1|sunset,dusk,warm glow,beach,calm
embers|Crimson Forge Sparks|3|3|forge,blacksmith,metal,workshop,heat
embers|Blue Gas Flame|4|2|gas flame,stove,kitchen,cooking,blue fire
embers|Gold Phoenix Embers|0|3|phoenix,rebirth,legend,fantasy,power
embers|Pink Candle Embers|2|1|candle,romantic dinner,soft,warm,cozy
petals|Sakura Drift Petals|2|1|sakura,zen,garden,peaceful,soft petals
grid|Cyberpunk Neon Wireframe|4|2|cyberpunk,neon,wireframe,synthwave,futuristic
grid|Synthwave Retro Grid|2|2|synthwave,retro,80s,vaporwave,neon
grid|Golden Tech Grid|0|1|luxury tech,gold grid,future,premium,digital
grid|Monochrome Perspective Grid|1|1|minimal,architecture,perspective,clean,modern
grid|Orange Holo Grid|5|3|hologram,sci-fi,fast,hud,tech
wave|Vector Distortion Waves|4|2|vector,waves,sound,digital,abstract
wave|Fluid Sine Ribbons|7|2|rainbow waves,colorful,flowing,fun,abstract
wave|Calm Ocean Lines|1|1|calm,sea,minimal,zen,peaceful
wave|Sunset Wave Lines|5|2|sunset,warm,summer,retro,flow
wave|Purple Audio Waveforms|6|3|music,audio,beat,party,dynamic
glitch|Digital Data Glitch|7|2|glitch,data,vhs,digital,error
glitch|Red Signal Glitch|3|3|error,hacked,warning,static,intense
glitch|Blue Screen Glitch|4|2|tech,signal,interference,noise,digital
glitch|Pink Retro VHS Glitch|2|2|vhs,retro,tape,nostalgia,80s
glitch|Gold Lux Glitch|0|1|premium,glitch art,luxury,modern,abstract
orbit|Abstract Orbit Spheres|4|1|orbit,planets,3d,space,abstract
orbit|Golden Planet Orbits|0|2|planets,luxury,galaxy,gold,science
orbit|Pink Atomic Orbits|2|2|atom,science,molecules,lab,education
orbit|Quantum Electron Orbit|6|2|quantum,physics,electron,futuristic,science
orbit|Orange Solar System|5|1|solar,sun,planets,astronomy,warm
liquid|Liquid Chrome Flow|1|2|liquid metal,chrome,mercury,silver,fluid
liquid|Lava Lamp Blob Motion|5|1|lava lamp,blob,retro,fluid,groovy
liquid|Ferrofluid Blue Spikes|4|3|ferrofluid,magnetic,dynamic,liquid,science
liquid|Pink Metaball Merge|2|1|metaball,soft,merging,cute,liquid
liquid|Purple Oil Slick Blob|6|2|oil,iridescent,mystic,abstract,fluid
radar|Blue Radar Sonar Sweep|4|2|radar,sonar,scan,detect,military
radar|Gold Scanner Sweep|0|1|scanner,search,tech,premium,detect
radar|Red Alert Radar|3|3|alert,warning,radar,security,danger
radar|White Surveillance Sweep|1|1|surveillance,security,monitoring,system,clean
radar|Orange Sonar Pulse|5|2|sonar,ocean,pulse,navigation,signal
streak|Hyperdrive Starlight Streaks|1|3|hyperdrive,speed,stars,space,warp
streak|Golden Light Streaks|0|2|light trails,luxury,speed,motion,glow
streak|Blue Fiber Optic Trails|4|2|fiber optic,light trails,network,internet,data
streak|Pink Neon Motion Streaks|2|2|neon,motion,speed,night city,lights
streak|Colorful Speed Trails|7|3|rainbow,speed,fun,bright,motion
`;
export type Niche = { id: string; style: string; name: string; pal: number; energy: number; kw: string[] };
export const NICHES: Niche[] = RAW.trim().split("\n").map((l) => {
  const [style, name, pal, energy, kw] = l.split("|");
  return { id: fileSlug(name), style, name, pal: +pal, energy: +energy, kw: kw.split(",") };
});
export const nicheFile = (n: Niche) => `${n.id}-green-screen-loop.mp4`;
