const labels=['Végétarien','Vegan','Halal','Sans lactose','Sans gluten','Protéiné'];
let toutesLesRecettes=[]; // chargées depuis data.json par fetch()
let index=0, filterTags=new Set(),budget=5,maxTime=45,liked=JSON.parse(localStorage.getItem('swipeat-site5-liked')||'[]'),mine=JSON.parse(localStorage.getItem('swipeat-site5-mine')||'null')||[{name:'Pancakes du dimanche',emoji:'🥞',price:1.2,time:15,smashes:14,tags:['Végétarien']},{name:'Pesto petits pois',emoji:'🫛',price:1.6,time:12,smashes:8,tags:['Vegan']}],activeTab='mine',imageData='';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2200)}
// Semaine 12 · recherche : enlève les accents et met en minuscules (« pates » trouve « Pâtes »).
function simplifier(texte){return String(texte).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}
function filtered(){
  const texte=simplifier(document.getElementById("recherche").value.trim());
  return toutesLesRecettes.filter(function(r){
    const texteOk=simplifier(r.name).includes(texte)
      || r.tags.some(function(t){return simplifier(t).includes(texte)})
      || (r.ingredients||[]).some(function(i){return simplifier(i).includes(texte)});
    const filtresOk=r.price<=budget&&r.time<=maxTime&&[...filterTags].every(t=>r.tags.includes(t));
    return texteOk&&filtresOk;
  });
}
function afficherRecettes(){let pool=filtered();document.getElementById("aucun-resultat").hidden=pool.length>0;if(!pool.length){$('#recipeName').textContent='Aucune recette avec ces critères';$('#foodVisual').style.background='linear-gradient(145deg,#e4e1d9,#c7c3b9)';$('#foodVisual .food-emoji').textContent='🍽️';$('#author').textContent='Ajuste tes filtres ou ta recherche';$('#price').innerHTML='—';$('#time').textContent='—';$('#difficulty').textContent='—';$('#protein').textContent='—';$('#recipeTags').innerHTML='';$('#smashCount').textContent='0';$('#counter').textContent='00 / 00';return}index=((index%pool.length)+pool.length)%pool.length;let r=pool[index];$('#recipeName').textContent=r.name;$('#foodVisual .food-emoji').textContent=r.emoji;$('#author').textContent=r.author||'Par toi, communauté Swipeat';$('#price').innerHTML=`${Number(r.price).toFixed(2).replace('.',',')} €<small>par pers.</small>`;$('#time').textContent=r.time+' min';$('#difficulty').textContent=r.difficulty||'Facile';$('#protein').textContent=(r.protein||'—')+' g prot.';$('#recipeTags').innerHTML=r.tags.map(t=>`<span class="tag">${t}</span>`).join('');$('#smashCount').textContent=r.smashes||0;$('#counter').innerHTML=`${String(index+1).padStart(2,'0')} <i>/ ${String(pool.length).padStart(2,'0')}</i>`;let colors=[['#dbc6a0','#b18461'],['#bcc9a7','#7f9977'],['#e3c5a7','#c37c55'],['#d4c9ab','#908c66'],['#ecc8a2','#d38759']][index%5];$('#foodVisual').style.background=`linear-gradient(145deg,${colors[0]},${colors[1]})`}
function tagsMarkup(selected=new Set()){return labels.map(t=>`<label class="choice"><input type="checkbox" value="${t}" ${selected.has(t)?'checked':''}><span>${t}</span></label>`).join('')}
function renderLibrary(){let items=activeTab==='mine'?mine:liked;$('#libraryGrid').innerHTML=items.length?items.map(r=>`<article class="library-card carte"><div class="library-photo" ${r.image?`style="background-image:url('${r.image}');background-size:cover;background-position:center;color:transparent"`:''}>${r.emoji||'🍲'}</div><div class="library-copy"><h3>${r.name}</h3><p>${Number(r.price).toFixed(2).replace('.',',')} € / pers. · ${r.time} min</p><div class="tags">${(r.tags||[]).slice(0,3).map(t=>`<span class="tag">${t}</span>`).join('')}</div><div class="library-stats"><span>♥ ${r.smashes||0} smash reçus</span><span>${activeTab==='mine'?'Ma recette':'Dans mes favoris'}</span></div></div></article>`).join(''):`<div class="empty-state">${activeTab==='mine'?'Tes créations apparaîtront ici.':'Pas encore de smash — découvre quelques recettes !'}</div>`;$('#mineCount').textContent=mine.length;$('#myCount').textContent=mine.length;$('#likedCount').textContent=liked.length}
function setView(name){$$('.view').forEach(v=>v.classList.toggle('active',v.id===name+'View'));$$('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.view===name));if(name==='library')renderLibrary();fermerMenu();if(name==='report')renderSignalements();window.scrollTo({top:0,behavior:'smooth'})}
function move(smash){let r=filtered()[index];if(!r){toast('Aucune recette : modifie tes filtres.');return}if(smash){if(!liked.some(x=>x.name===r.name)){liked.unshift({...r});localStorage.setItem('swipeat-site5-liked',JSON.stringify(liked));toast('Smash ! Ajoutée à tes recettes ❤️')}else toast('Déjà dans tes smash ❤️')}else toast('Recette passée. On continue !');index++;afficherRecettes()}
let dragStart=null;const swipeCard=$('#recipeCard');swipeCard.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;dragStart={x:e.clientX,y:e.clientY,id:e.pointerId};swipeCard.setPointerCapture(e.pointerId);swipeCard.classList.add('dragging')});swipeCard.addEventListener('pointermove',e=>{if(!dragStart||dragStart.id!==e.pointerId)return;let dx=e.clientX-dragStart.x,dy=e.clientY-dragStart.y;if(Math.abs(dx)>Math.abs(dy)){swipeCard.style.transform=`translateX(${dx}px) rotate(${dx*.035}deg)`;swipeCard.classList.toggle('smash-preview',dx< -35);swipeCard.classList.toggle('pass-preview',dx>35)}});function finishSwipe(e){if(!dragStart)return;let dx=e.clientX-dragStart.x,dy=e.clientY-dragStart.y;swipeCard.classList.remove('dragging','smash-preview','pass-preview');swipeCard.style.transform='';dragStart=null;if(Math.abs(dx)>85&&Math.abs(dx)>Math.abs(dy)*1.15)move(dx<0)}swipeCard.addEventListener('pointerup',finishSwipe);swipeCard.addEventListener('pointercancel',()=>{dragStart=null;swipeCard.classList.remove('dragging','smash-preview','pass-preview');swipeCard.style.transform=''});
$$('[data-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));$('#passBtn').onclick=$('#passBtnMobile').onclick=()=>move(false);$('#smashBtn').onclick=$('#smashBtnMobile').onclick=()=>move(true);$('#openFilters').onclick=()=>$('#filterModal').classList.add('open');$('#closeFilters').onclick=()=>$('#filterModal').classList.remove('open');$('#filterModal').addEventListener('click',e=>{if(e.target.id==='filterModal')e.currentTarget.classList.remove('open')});$('#budgetRange').oninput=e=>{$('#budgetValue').textContent=e.target.value+' € / pers.'};$('#timeRange').oninput=e=>{$('#timeValue').textContent=e.target.value+' min'};$('#filterTags').innerHTML=tagsMarkup(filterTags);$('#publishTags').innerHTML=tagsMarkup();$('#applyFilters').onclick=()=>{filterTags=new Set($$('#filterTags input:checked').map(x=>x.value));budget=Number($('#budgetRange').value);maxTime=Number($('#timeRange').value);$('#filterCount').textContent=filterTags.size+(budget<5||maxTime<45?1:0);index=0;afficherRecettes();$('#filterModal').classList.remove('open');toast('Filtres appliqués')};$('#clearFilters').onclick=()=>{$$('#filterTags input').forEach(x=>x.checked=false);$('#budgetRange').value=10;$('#timeRange').value=60;$('#budgetValue').textContent='10 € / pers.';$('#timeValue').textContent='60 min';filterTags.clear();budget=10;maxTime=60;$('#filterCount').textContent='0';index=0;afficherRecettes()};$$('.tab').forEach(b=>b.onclick=()=>{$$('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');activeTab=b.dataset.tab;renderLibrary()});$('#imageInput').onchange=e=>{let f=e.target.files[0];if(!f)return;let reader=new FileReader();reader.onload=()=>{imageData=reader.result;$('#uploadPreview').style.backgroundImage=`url(${imageData})`;$('#uploadPreview').textContent=''};reader.readAsDataURL(f)};
$('#detailButton').onclick=()=>{let r=filtered()[index];if(!r)return;$('#detailContent').innerHTML=`<h2>${r.emoji} ${r.name}</h2><p>${Number(r.price).toFixed(2)} € / pers. · ${r.time} min · ${r.protein} g de protéines</p><h3>Ingrédients</h3><ul>${r.ingredients.map(i=>`<li>${i}</li>`).join('')}</ul><h3>Préparation</h3><p>${r.steps}</p><div class="tags">${r.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>`;$('#detailModal').classList.add('open')};$('#closeDetail').onclick=()=>$('#detailModal').classList.remove('open');$('#detailModal').onclick=e=>{if(e.target.id==='detailModal')e.currentTarget.classList.remove('open')};document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.modal-backdrop').forEach(m=>m.classList.remove('open'));if(e.target.closest('input,textarea'))return;if(e.key==='ArrowRight')move(false);if(e.key==='ArrowLeft')move(true)});renderLibrary();

/* ===== Semaine 12 · Exercice 3 : la recherche ===== */
const champRecherche=document.getElementById("recherche");
function appliquerFiltres(){
  index=0;              // on repart de la première recette trouvée
  afficherRecettes();   // afficherRecettes utilise filtered(), qui lit le champ
}
champRecherche.addEventListener("input",function(){
  appliquerFiltres();
});

/* ===== Semaine 12 · Exercice 3 : le formulaire « Partager une recette » ===== */
const formulaire=document.getElementById("recipeForm");

formulaire.addEventListener("submit",function(event){
  event.preventDefault();   // la page ne se recharge pas

  const donnees=new FormData(formulaire);
  const nom=donnees.get("name").trim();
  const prix=Number(donnees.get("price"));
  const temps=Number(donnees.get("time"))||20;
  const proteines=Number(donnees.get("protein"))||0;
  const tags=$$("#publishTags input:checked").map(x=>x.value);

  const erreurs=[];
  let champFautif=null;

  // Règle 1 : un vrai nom de recette.
  if(nom.length<3){
    erreurs.push("Le nom de la recette doit avoir au moins 3 caractères.");
    champFautif=champFautif||"champ-nom";
  }
  // Règle 2 : Swipeat, c'est petit budget.
  if(donnees.get("price").trim()===""||prix<0.1||prix>5){
    erreurs.push("Le prix doit être entre 0,10 € et 5 € par personne.");
    champFautif=champFautif||"champ-prix";
  }

  const zoneErreurs=document.getElementById("erreurs");
  if(erreurs.length>0){
    zoneErreurs.textContent="Erreur : "+erreurs.join(" ");
    document.getElementById(champFautif).focus();
    return;
  }
  zoneErreurs.textContent="";

  const nouvelle={
    id:toutesLesRecettes.length+1,
    name:nom,
    emoji:"🍲",
    price:prix,
    time:temps,
    protein:proteines,
    difficulty:"Facile",
    petitBudget:prix<2,
    tags:tags,
    smashes:0,
    author:"Par toi, communauté Swipeat",
    ingredients:donnees.get("ingredients").split("\n").map(x=>x.trim()).filter(Boolean),
    steps:donnees.get("steps").trim()||"Étapes à venir.",
    image:imageData
  };

  // La nouvelle recette passe en tête de liste.
  toutesLesRecettes.unshift(nouvelle);
  mine.unshift(nouvelle);
  localStorage.setItem("swipeat-site5-mine",JSON.stringify(mine));

  formulaire.reset();
  imageData="";$("#uploadPreview").style.backgroundImage="";$("#uploadPreview").textContent="＋";
  champRecherche.value="";
  index=0;
  setView("swipe");
  afficherRecettes();
  toast("Ta recette est publiée, bravo !");
});

/* ===== Menu burger ===== */
const boutonMenu=document.getElementById("menuToggle");
const menuBurger=document.getElementById("menuBurger");
function fermerMenu(){
  menuBurger.hidden=true;
  boutonMenu.setAttribute("aria-expanded","false");
}
boutonMenu.addEventListener("click",function(event){
  event.stopPropagation();
  const ouvert=menuBurger.hidden;
  menuBurger.hidden=!ouvert;
  boutonMenu.setAttribute("aria-expanded",ouvert);
  if(ouvert)menuBurger.querySelector("button").focus();
});
document.addEventListener("click",function(event){
  if(!menuBurger.hidden&&!menuBurger.contains(event.target))fermerMenu();
});
document.addEventListener("keydown",function(event){
  if(event.key==="Escape"&&!menuBurger.hidden){fermerMenu();boutonMenu.focus();}
});

/* ===== Section « Signaler » : un bug ou un abus ===== */
const formulaireSignalement=document.getElementById("reportForm");
let signalements=JSON.parse(localStorage.getItem("swipeat-signalements")||"[]");

function renderSignalements(){
  const liste=document.getElementById("listeSignalements");
  liste.textContent="";
  if(signalements.length===0){
    const vide=document.createElement("li");
    vide.className="vide";
    vide.textContent="Aucun signalement pour l’instant.";
    liste.append(vide);
    return;
  }
  for(const s of signalements){
    const li=document.createElement("li");
    const titre=document.createElement("strong");
    titre.textContent=(s.type==="Bug"?"🐞 Bug":"🚩 Abus")+(s.cible?" · "+s.cible:"");
    const texte=document.createElement("p");
    texte.textContent=s.message;   // textContent : le texte tapé n'est jamais lu comme du HTML
    const date=document.createElement("small");
    date.textContent=s.date;
    li.append(titre,texte,date);
    liste.append(li);
  }
}

formulaireSignalement.addEventListener("submit",function(event){
  event.preventDefault();   // la page ne se recharge pas

  const donnees=new FormData(formulaireSignalement);
  const type=donnees.get("type");          // null si aucun bouton n'est coché
  const cible=donnees.get("cible").trim();
  const message=donnees.get("message").trim();

  const erreurs=[];
  let champFautif=null;

  // Règle 1 : on doit savoir si c'est un bug ou un abus.
  if(type===null){
    erreurs.push("Choisis s’il s’agit d’un bug ou d’un abus.");
    champFautif=champFautif||"type-bug";
  }
  // Règle 2 : une explication assez précise pour qu'on comprenne.
  if(message.length<10){
    erreurs.push("Décris le problème en au moins 10 caractères.");
    champFautif=champFautif||"champ-message";
  }

  const zoneErreurs=document.getElementById("erreurs-signalement");
  const zoneOk=document.getElementById("signalement-ok");
  if(erreurs.length>0){
    zoneErreurs.textContent="Erreur : "+erreurs.join(" ");
    zoneOk.textContent="";
    document.getElementById(champFautif).focus();
    return;
  }
  zoneErreurs.textContent="";

  signalements.unshift({
    type:type,
    cible:cible,
    message:message,
    date:new Date().toLocaleString("fr-CH",{dateStyle:"short",timeStyle:"short"})
  });
  localStorage.setItem("swipeat-signalements",JSON.stringify(signalements));
  renderSignalements();
  formulaireSignalement.reset();
  zoneOk.textContent="Merci ! Ton signalement a bien été enregistré.";
  toast("Signalement envoyé, merci 🙏");
});

/* ===== e3-3 · Chargement de data.json avec fetch() et les 4 états d’interface ===== */
const etat=document.getElementById("etat-recettes");
const zoneSwipe=document.querySelector("#swipeView .swipe-grid");
const boutonsMobile=document.querySelector("#swipeView .mobile-actions");

function afficherEtat(classe,message){
  etat.className="etat "+classe;
  etat.innerHTML=message;
  etat.hidden=false;
  zoneSwipe.hidden=true;
  boutonsMobile.hidden=true;
}

// État 1 — Chargement
afficherEtat("etat-chargement","Chargement des recettes en cours... 🍳");

fetch("./data.json")
  .then(function(reponse){
    if(!reponse.ok){
      throw new Error("Erreur de chargement : "+reponse.status);
    }
    return reponse.json();
  })
  .then(function(donnees){
    // État 3 — Vide
    if(donnees.length===0){
      afficherEtat("etat-vide","🍽️ Aucune recette pour le moment.<br><small>Sois le premier à en partager une !</small>");
      return;
    }
    // État 2 — Succès : on affiche la carte à swiper
    toutesLesRecettes=donnees;
    etat.hidden=true;
    zoneSwipe.hidden=false;
    boutonsMobile.hidden=false;
    afficherRecettes();
  })
  .catch(function(erreur){
    // État 4 — Erreur
    console.error("Détail technique :",erreur);
    afficherEtat("etat-erreur","⚠️ Impossible de charger les recettes.<br><small>Vérifie ta connexion puis recharge la page.</small>");
  });
