const logo = document.querySelector('.logo-img');
const lightLogo = './assets/eteciaLogo-Claro.png';
const darkLogo  = './assets/eteciaLogo-Escuro.png';
const lightIcon = './assets/eteciaIconeClaro.ico';
const darkIcon = './assets/eteciaIconeEscuro.ico';
const firstModule = document.querySelector('.ds1');
const secondModule = document.querySelector('.ds2');
const thirdModule = document.querySelector('.ds3');
const tableLeftBtn = document.querySelector('.btn-tableLeft');
const tableRightBtn = document.querySelector('.btn-tableRight');
const imgInfras = document.querySelectorAll('.Infra');
const imgInfraXpan = document.getElementById('imgxpan');
const overlay = document.getElementById('overlay');
let modules = [secondModule, firstModule, thirdModule];
modules[1].style.order = '2';
modules[0].style.order = '1';
modules[2].style.order = '3';
modules[0].style.display = 'none';
modules[2].style.display = 'none';
document.body.style.background = '';

window.scrollTo({ behavior: 'smooth' });

async function setIcon(href) {
    try {
        const res = await fetch(href, { cache: 'no-store' });
        if (res.ok) {
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('link');
            link.rel = 'icon';
            link.href = blobUrl;
            document.head.appendChild(link);
            if (setIcon._lastBlobUrl) URL.revokeObjectURL(setIcon._lastBlobUrl);
            setIcon._lastBlobUrl = blobUrl;
            return;
        }
    } catch (err) {
    }
}
function applyTheme(isLight) {
    logo.src = isLight ? lightLogo : darkLogo;
    logo.alt = 'ETEC Irmã Agostina logo';
    setIcon(isLight ? lightIcon : darkIcon);
}

const mql = window.matchMedia('(prefers-color-scheme: light)');
applyTheme(mql.matches);
const handler = e => applyTheme(e.matches);
if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', handler);
}
async function switchModulesUp(e) {
    modules[0].style.opacity = '0';
    modules[0].style.translate = '120px 0';
    const changeUp = modules[0];
    modules[0] = modules[2];
    modules[2] = modules[1];
    modules[1] = changeUp;
    modules[1].style.display = '';
    modules[0].style.display = 'none';
    modules[2].style.display = 'none';
    await new Promise(r => setTimeout(r, 5));
    modules[1].style.translate = '0 0';
    modules[1].style.opacity = '1';
    if (modules[1] == thirdModule) {
        tableRightBtn.style.translate = '0 -30px';
        tableLeftBtn.style.translate = '0 -30px';
    }
}
async function switchModulesDown(e) {
    modules[2].style.opacity = '0';
    modules[2].style.translate = '-120px 0';
    const changeDown = modules[1];
    modules[1] = modules[2];
    modules[2] = modules[0];
    modules[0] = changeDown;
    modules[1].style.display = '';
    modules[0].style.display = 'none';
    modules[2].style.display = 'none';
    await new Promise(r => setTimeout(r, 5));
    modules[1].style.translate = '0 0';
    modules[1].style.opacity = '1';
}
function vizuImage(e) {
    imgInfraXpan.src = e.currentTarget.src;
    overlay.classList.add('ativo');
    overlay.style.display = 'flex';
}

const overlayCloseBtn = overlay.querySelector('.fechar');
if (overlayCloseBtn) {
    overlayCloseBtn.addEventListener('click', () => {
        overlay.classList.remove('ativo');
        overlay.style.display = 'none';
        imgInfraXpan.src = '';
    });
}

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
let scrollTimeout;
window.addEventListener("scroll", () => {
    const dashBoard = document.querySelector(".contBoard");
    
    if (window.scrollY > 100) {
        dashBoard.classList.add("scroll");
    } else {
        dashBoard.classList.remove("scroll");
    }
});

tableLeftBtn.addEventListener('click', switchModulesDown);
tableRightBtn.addEventListener('click', switchModulesUp);
imgInfras.forEach(img => img.addEventListener('click', vizuImage));