export default function HomePage() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `
<style>
  .lp-hero{position:relative;background:var(--hero);color:var(--cream);min-height:88vh;display:flex;align-items:flex-end;overflow:hidden;margin-top:-72px}
  .lp-hero::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(120% 90% at 78% 8%,rgba(201,107,65,.20),transparent 55%),radial-gradient(80% 60% at 0% 100%,rgba(0,0,0,.22),transparent 60%);mix-blend-mode:multiply}
  .lp-hero-inner{position:relative;z-index:3;width:100%;padding:0 28px 8vh;max-width:1180px;margin:0 auto}
  .lp-eyebrow{font-size:.72rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#E7B58C;display:inline-flex;align-items:center;gap:.6em}
  .lp-eyebrow::before{content:"";width:26px;height:1px;background:#E7B58C;display:inline-block}
  .lp-hello{font-family:"Fraunces",serif;font-weight:300;font-size:clamp(4rem,15vw,11rem);line-height:.92;letter-spacing:-.03em;margin:.12em 0 .1em}
  .lp-hello em{font-style:italic;color:#E7B58C;font-weight:300}
  .lp-sub{font-family:"Fraunces",serif;font-weight:300;font-size:clamp(1.15rem,2.4vw,1.7rem);max-width:34ch;color:rgba(244,237,219,.92);line-height:1.4}
  .lp-cta{margin-top:34px;display:flex;gap:16px;flex-wrap:wrap;align-items:center}
  .lp-btn{display:inline-flex;align-items:center;gap:.6em;background:var(--terracotta);color:var(--cream);text-decoration:none;font-weight:600;font-size:.92rem;padding:15px 26px;border-radius:100px;transition:transform .2s,background .2s}
  .lp-btn:hover{transform:translateY(-2px);background:#d4734a}
  .lp-ghost{color:var(--cream);text-decoration:none;font-weight:500;font-size:.9rem;border-bottom:1px solid rgba(244,237,219,.4);padding-bottom:3px}
  .lp-bowl{position:absolute;z-index:2;right:-40px;top:50%;transform:translateY(-58%);width:min(46vw,560px);opacity:.9}
  .lp-bowl .s{fill:none;stroke:rgba(244,237,219,.5);stroke-width:2.4;stroke-linecap:round}
  .lp-bowl .f{fill:none;stroke:#E7B58C;stroke-width:2.4;stroke-linecap:round}
  .lp-intro{padding:clamp(70px,11vw,140px) 0;background:var(--cream)}
  .lp-wrap{max-width:1180px;margin:0 auto;padding:0 28px}
  .lp-grid{display:grid;grid-template-columns:1fr 1.3fr;gap:60px;align-items:start}
  .lp-statement{font-family:"Fraunces",serif;font-weight:300;font-size:clamp(1.7rem,3.6vw,2.9rem);line-height:1.22;letter-spacing:-.015em;color:var(--matcha-deep);margin-top:24px}
  .lp-statement b{font-weight:500;font-style:italic;color:var(--matcha)}
  .lp-body p{margin-bottom:18px;color:#43503D;max-width:46ch}
  .lp-find{padding:clamp(70px,11vw,130px) 0;background:var(--matcha-deep);color:var(--cream)}
  .lp-find .lp-eyebrow{color:#E7B58C}
  .lp-find h2{font-family:"Fraunces",serif;font-weight:300;font-size:clamp(2.1rem,5vw,3.4rem);margin:.3em 0 .4em}
  .lp-find h2 em{font-style:italic;color:#E7B58C}
  .lp-detail{display:flex;gap:18px;padding:18px 0;border-top:1px solid rgba(244,237,219,.16);max-width:560px}
  .lp-detail .k{font-size:.72rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#E7B58C;min-width:70px;padding-top:3px}
  .lp-detail .v{font-family:"Fraunces",serif;font-size:1.18rem}
  .lp-detail .v small{display:block;font-family:"DM Sans";font-size:.85rem;color:rgba(244,237,219,.6);margin-top:3px}
  .lp-foot{background:var(--matcha-deep);color:var(--cream);padding:0 0 50px;text-align:center}
  .lp-thanks{font-family:"Fraunces",serif;font-weight:300;font-size:clamp(3rem,10vw,6rem);line-height:.9;letter-spacing:-.03em}
  .lp-thanks em{font-style:italic;color:#E7B58C}
  .lp-foot-small{font-size:.78rem;color:rgba(244,237,219,.5);margin-top:24px}
  @media(max-width:860px){.lp-grid{grid-template-columns:1fr;gap:36px}.lp-bowl{opacity:.3;right:-22%;width:80vw}.lp-hero{align-items:center}.lp-hero-inner{padding-top:120px;padding-bottom:60px}}
</style>
<section class="lp-hero">
  <svg class="lp-bowl" viewBox="0 0 400 360" aria-hidden="true">
    <path class="s" d="M170 70 C150 50 190 40 172 20" style="stroke:rgba(244,237,219,.4)"/>
    <path class="s" d="M205 66 C185 46 225 36 207 16" style="stroke:rgba(244,237,219,.4)"/>
    <path class="s" d="M240 72 C220 52 260 42 242 22" style="stroke:rgba(244,237,219,.4)"/>
    <path class="s" d="M96 168 H304 a8 8 0 0 1 8 9 C312 250 270 300 200 300 C130 300 88 250 88 177 a8 8 0 0 1 8 -9 Z"/>
    <ellipse class="s" cx="200" cy="170" rx="104" ry="20"/>
    <path class="f" d="M150 168 q14 -14 28 0 q14 14 28 0 q14 -14 28 0 q14 14 22 0"/>
    <path class="s" d="M250 60 L228 150"/><path class="s" d="M260 58 L240 150"/><path class="s" d="M270 60 L252 150"/>
    <rect class="s" x="248" y="40" width="26" height="22" rx="6"/>
  </svg>
  <div class="lp-hero-inner">
    <span class="lp-eyebrow">Houston · Matcha pop-up</span>
    <h1 class="lp-hello">Xin <em>chào.</em></h1>
    <p class="lp-sub">A little matcha bar with a Vietnamese heart — whisked by hand, sweetened with sữa đặc if you want it.</p>
    <div class="lp-cta">
      <a href="/order" class="lp-btn">Find the cart →</a>
      <a href="/order" class="lp-ghost">See the menu</a>
    </div>
  </div>
</section>
<section class="lp-intro">
  <div class="lp-wrap lp-grid">
    <div>
      <span class="lp-eyebrow" style="color:var(--terracotta)">Câu chuyện · Our story</span>
      <p class="lp-statement">Five friends, one whisk, and a craving for matcha that tastes like <b>home</b>.</p>
    </div>
    <div class="lp-body">
      <p>We grew up on cà phê sữa đá — strong, sweet, served slow on a hot day. Xíu is that feeling, traded for ceremonial-grade matcha: bright, grassy, and finished with Vietnamese condensed milk.</p>
      <p>No fixed address yet. We show up at markets, makers' nights, and corners around Houston, whisk a few hundred cups, and pack up. Follow along to catch the next drop.</p>
    </div>
  </div>
</section>
<section class="lp-find">
  <div class="lp-wrap">
    <span class="lp-eyebrow">Tìm chúng tôi · Find us</span>
    <h2>We move <em>around</em>.</h2>
    <div class="lp-detail"><div class="k">Next</div><div class="v">Follow us for the next drop<small>We post every location 24 hours ahead on Instagram</small></div></div>
    <div class="lp-detail"><div class="k">Hours</div><div class="v">We pour till we sell out<small>Usually sooner than you'd think</small></div></div>
    <div style="margin-top:30px"><a href="/order" class="lp-btn">Order ahead →</a></div>
  </div>
</section>
<footer class="lp-foot">
  <div class="lp-wrap" style="padding-top:clamp(50px,8vw,90px)">
    <div class="lp-thanks">Cảm <em>ơn.</em></div>
    <div class="lp-foot-small">Xíu Café · Houston, TX · made by hand</div>
  </div>
</footer>
    ` }} />
  );
}
