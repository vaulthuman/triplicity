import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import * as S from './src/data/site.js';
const css = readFileSync('./src/styles/global.css','utf8');
const year = new Date().getFullYear();
const html = `<!doctype html><html lang="en"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${S.firm.legalName} — Development Advisors & Business Coaching</title>
<meta name="description" content="CSH Vault Consulting — development advisory and operator coaching for land and multifamily housing across Texas."/>
<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>${css}</style></head><body>
<header class="site"><div class="wrap bar"><a class="brand" href="/">${S.firm.wordmark}</a><a class="navbtn" href="${S.firm.bookingUrl}">Start a conversation</a></div></header>
<main><div class="wrap">
<section class="hero"><p class="kicker">${S.firm.kicker}</p><h1>${S.hero.h1}</h1><p class="subline serif">${S.hero.subline}</p></section>
<div class="lede">${S.hero.lede.map(p=>`<p>${p}</p>`).join('')}</div>
<div class="cta"><a class="btn-fill" href="${S.firm.bookingUrl}">${S.hero.cta}</a></div>
<hr class="rule"/>
<section class="cols">${S.pillars.map(c=>`<div><h3>${c.title}</h3><p>${c.body}</p></div>`).join('')}</section>
<hr class="rule"/>
<p class="turn">${S.turn}</p>
<hr class="rule"/>
<h2 class="sec">What we work in</h2>
<div class="tags">${S.housingTypes.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
<hr class="rule"/>
<h2 class="sec">Where we work</h2>
<div class="markets">${S.markets.map(m=>`<div class="market">${m}</div>`).join('')}</div>
<hr class="rule"/>
<h2 class="sec">Why Vault</h2>
<div class="prose">${S.why.map(p=>`<p>${p}</p>`).join('')}</div>
<hr class="rule"/>
<p class="closing">${S.closing}</p>
<div class="ctarow" id="start"><a class="btn-fill" href="mailto:${S.firm.email}">Start a conversation</a></div>
</div></main>
<footer class="site"><div class="wrap"><p class="sig">${S.firm.legalName.toUpperCase()}</p>
<p class="meta">${S.footerLine} &middot; <a href="mailto:${S.firm.email}">${S.firm.email}</a> &middot; &copy; ${year}</p></div></footer>
</body></html>`;
mkdirSync('dist',{recursive:true}); writeFileSync('dist/index.html', html);
// also write a matching Astro page so the repo builds on Cloudflare
const astro = `---\nimport '../styles/global.css';\nimport * as S from '../data/site.js';\nconst year = new Date().getFullYear();\n---\n`+html.replace('<style>${css}</style>','').replace('${css}','');
console.log('wrote dist/index.html ('+html.length+' bytes)');
