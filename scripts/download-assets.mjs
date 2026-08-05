// Скачивает все ассеты resayme.ru (Tilda CDN) в public/assets/.
// Имя файла = <tild-id>_<basename>, чтобы не было коллизий (много Line_8.svg, 1.svg и т.п.).
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const URLS = [
  "https://static.tildacdn.com/tild6137-6461-4361-b731-343165656632/logo_white_resayme.svg",
  "https://static.tildacdn.com/tild3938-3631-4264-b337-356132386336/burger_menu_resayme.svg",
  "https://static.tildacdn.com/tild6433-6232-4432-b231-393135363861/Gradient.svg",
  "https://static.tildacdn.com/tild6230-6233-4430-b936-333635626631/Resayme_logo.svg",
  "https://static.tildacdn.com/tild3939-3832-4063-a366-346564343334/about.svg",
  "https://static.tildacdn.com/tild3035-3566-4365-a330-666561623561/-2-08.svg",
  "https://static.tildacdn.com/tild3264-6239-4363-b437-616339623938/project.svg",
  "https://static.tildacdn.com/tild6536-3831-4365-b665-623436346165/-2-07.svg",
  "https://static.tildacdn.com/tild3435-3262-4261-b364-383462653839/-2-09.svg",
  "https://static.tildacdn.com/tild6561-3934-4461-b336-626263656365/-2-11.svg",
  "https://static.tildacdn.com/tild6661-3937-4232-a531-613131316265/-2-10.svg",
  "https://static.tildacdn.com/tild6139-6635-4134-a337-656638383461/fermata_logo.svg",
  "https://static.tildacdn.com/tild3063-6431-4666-b338-356564303366/services.svg",
  "https://static.tildacdn.com/tild3037-3331-4163-b131-306632323966/plus.svg",
  "https://static.tildacdn.com/tild6666-3162-4234-b063-303736613661/Line_8.svg",
  "https://static.tildacdn.com/tild3133-3164-4665-b330-613634363437/Vector.svg",
  "https://static.tildacdn.com/tild3236-3238-4630-b862-313534616636/for_designers.svg",
  "https://static.tildacdn.com/tild6665-6337-4262-b833-643966666238/new.svg",
  "https://static.tildacdn.com/tild3930-3031-4936-b265-636537613738/1.svg",
  "https://static.tildacdn.com/tild3639-3732-4632-a162-663130643337/2.svg",
  "https://static.tildacdn.com/tild6538-6338-4365-b164-336231316535/3.svg",
  "https://static.tildacdn.com/tild6538-6531-4439-b732-633830626465/4.svg",
  "https://static.tildacdn.com/tild3632-3031-4732-b230-383964373263/5.svg",
  "https://static.tildacdn.com/tild6637-6635-4934-b530-353366396262/6.svg",
  "https://static.tildacdn.com/tild6230-6439-4432-b864-393366656536/_.jpg",
  "https://static.tildacdn.com/tild3236-3938-4263-a164-633338363163/_.jpg",
  "https://static.tildacdn.com/tild6664-3865-4630-a131-646566303734/2851782e-4c78-4475-a.png",
  "https://static.tildacdn.com/tild3535-3130-4262-b933-366234303866/bergamo.png",
  "https://static.tildacdn.com/tild6530-3831-4331-b438-393930666365/-2___1_.jpg",
  "https://static.tildacdn.com/tild3638-3738-4366-a234-623064643338/-2___1__3.jpg",
  "https://static.tildacdn.com/tild6536-6135-4761-b466-343235633436/-2___1__4.jpg",
  "https://static.tildacdn.com/tild3561-6464-4361-b461-653964353666/-2___1__5.jpg",
  "https://static.tildacdn.com/tild6561-3564-4032-b831-356162326231/fermata__2.jpg",
  "https://static.tildacdn.com/tild6436-3838-4331-a164-666632303639/fermata__1.jpg",
  "https://static.tildacdn.com/tild3439-6332-4564-b861-623236336562/__2025-03-31__213150.png",
  "https://static.tildacdn.com/tild3134-3533-4731-a632-396161613637/__2024-12-08__161353.png",
  "https://static.tildacdn.com/tild6362-3632-4566-a236-346533333465/FAVICON_re_black_1.png",
  "https://static.tildacdn.com/tild6237-3366-4062-b539-336165373032/FAVICON_re_white_1.png",
  "https://static.tildacdn.com/tild3364-3566-4265-b235-663662303139/favicon.svg",
];

const OUT = new URL('../public/assets/', import.meta.url);

function nameFor(u) {
  const m = u.match(/\/(tild[^/]+)\/([^/?]+)$/);
  const id = m ? m[1].slice(0, 12) : Math.random().toString(36).slice(2, 8);
  const base = m ? m[2] : 'asset';
  return `${id}_${base}`.replace(/[^a-zA-Z0-9._-]/g, '_');
}

async function download(u) {
  try {
    const res = await fetch(u);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    const path = new URL(nameFor(u), OUT);
    await writeFile(path, buf);
    return { u, name: nameFor(u), size: buf.length };
  } catch (e) {
    return { u, error: e.message };
  }
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const results = [];
  // батчами по 5
  for (let i = 0; i < URLS.length; i += 5) {
    const batch = await Promise.all(URLS.slice(i, i + 5).map(download));
    results.push(...batch);
  }
  const ok = results.filter(r => !r.error);
  const bad = results.filter(r => r.error);
  console.log(`✓ Скачано: ${ok.length}/${URLS.length}`);
  ok.forEach(r => console.log('  ', r.name, r.size + 'b'));
  if (bad.length) { console.log('✗ Ошибки:'); bad.forEach(r => console.log('  ', r.u, r.error)); }
}
run();
