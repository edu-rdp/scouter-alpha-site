class PlayerProjections extends HTMLElement { connectedCallback(){ if(this.shadowRoot)return; const root=this.attachShadow({mode:"open"}); root.innerHTML="<link rel=\"stylesheet\" href=\"/scouter-alpha-site/player-projections/component.css\">\n    <div class=\"historical-note\"><p><strong>Exemplo histórico.</strong> Estimativas calculadas após o jogo de 12/10/2026. Não são previsões atuais.</p></div>\n\n    <section id=\"projecoes\" class=\"projections\" aria-labelledby=\"projectionsTitle\">\n      <div class=\"section-title\"><div><h2 id=\"projectionsTitle\">Projeções de jogadores <span class=\"experimental\">Experimental</span></h2><p>Explore as médias esperadas para diferentes tempos em campo.</p></div><button id=\"openValidation\" class=\"text-button\" type=\"button\">9 métricas em validação <span aria-hidden=\"true\">↗</span></button></div>\n      <p class=\"model-notice\"><span aria-hidden=\"true\">i</span>Estimativas condicionadas à atuação e aos minutos selecionados. Não indicam a probabilidade de o jogador entrar em campo.</p>\n\n      <div class=\"workspace\">\n        <div class=\"primary-controls\">\n          <fieldset><legend>Clube</legend><div id=\"clubControls\" class=\"segmented club-controls\"><button type=\"button\" data-team=\"home\" aria-pressed=\"true\">Chapecoense</button><button type=\"button\" data-team=\"away\" aria-pressed=\"false\">Athletico PR</button><button type=\"button\" data-team=\"all\" aria-pressed=\"false\">Ambos</button></div></fieldset>\n          <fieldset class=\"minute-field\"><legend>Minutos em campo</legend><div id=\"minuteControls\" class=\"segmented minute-controls\"><button type=\"button\" data-minutes=\"30\" aria-pressed=\"false\">30</button><button type=\"button\" data-minutes=\"60\" aria-pressed=\"true\">60</button><button type=\"button\" data-minutes=\"90\" aria-pressed=\"false\">90</button><button type=\"button\" data-minutes=\"estimated\" aria-pressed=\"false\">Estimados</button></div></fieldset>\n        </div>\n        <div class=\"secondary-controls\">\n          <label class=\"search-field\"><span class=\"sr-only\">Buscar jogador</span><svg aria-hidden=\"true\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"><circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"m16 16 5 5\"/></svg><input id=\"playerSearch\" type=\"search\" placeholder=\"Buscar jogador\" autocomplete=\"off\"></label>\n          <label class=\"position-field\"><span>Posição</span><select id=\"positionFilter\"><option value=\"all\">Todas as posições</option><option value=\"G\">Goleiro</option><option value=\"D\">Defesa</option><option value=\"M\">Meio-campo</option><option value=\"F\">Ataque</option></select></label>\n          <p id=\"resultsStatus\" class=\"results-status\" role=\"status\" aria-live=\"polite\">Carregando jogadores…</p>\n        </div>\n        <div id=\"groupControls\" class=\"metric-groups\" role=\"group\" aria-label=\"Grupo de estatísticas\"><button type=\"button\" data-group=\"overview\" aria-pressed=\"true\">Visão geral</button><button type=\"button\" data-group=\"attack\" aria-pressed=\"false\">Ataque</button><button type=\"button\" data-group=\"passing\" aria-pressed=\"false\">Passes</button><button type=\"button\" data-group=\"defending\" aria-pressed=\"false\">Defesa</button><button type=\"button\" data-group=\"goalkeeping\" aria-pressed=\"false\">Goleiros</button></div>\n        <p id=\"scenarioDescription\" class=\"scenario-description\">Cenário de 60 minutos em campo</p>\n        <p class=\"table-hint\">Deslize a tabela para ver as outras estatísticas.</p>\n        <div class=\"table-scroll\" role=\"region\" aria-label=\"Tabela de projeções de jogadores, role horizontalmente para mais estatísticas\" tabindex=\"0\"><table id=\"playerTable\"><caption class=\"sr-only\">Médias esperadas por jogador, condicionadas à atuação</caption><thead id=\"tableHead\"></thead><tbody id=\"tableBody\"></tbody></table></div>\n        <div id=\"emptyState\" class=\"empty-state\" hidden><span aria-hidden=\"true\">⌕</span><h3>Nenhum jogador neste filtro</h3><p>Tente outro nome, posição ou clube.</p><button id=\"clearFilters\" class=\"outline-button\" type=\"button\">Limpar filtros</button></div>\n        <p id=\"loadError\" class=\"load-error\" role=\"alert\" hidden>Não foi possível carregar a demonstração. Reabra a prévia pelo servidor local.</p>\n        <div class=\"table-footer\"><p>Valores decimais representam médias esperadas. Um valor indisponível não equivale a zero.</p><p id=\"cardScope\" hidden>Amarelos são estimados por registro na súmula e não variam com o cenário de minutos.</p><p><span class=\"unavailable-key\">Em validação</span> Métrica ainda fora da versão experimental disponível.</p></div>\n      </div>\n    </section>\n\n    <section id=\"dados\" class=\"data-section\" aria-labelledby=\"dataTitle\">\n      <div><h2 id=\"dataTitle\">O que estes números dizem</h2><p>Uma estimativa é uma referência para comparar cenários, não uma promessa de atuação ou resultado.</p></div>\n      <div class=\"data-details\">\n        <details><summary>Como ler as projeções</summary><p>Escolha 30, 60 ou 90 minutos para comparar jogadores no mesmo cenário. Em “Estimados”, cada jogador usa os minutos previstos pelo modelo, condicionado a jogar. Não há probabilidade de participação ou intervalo individual calibrado nesta versão.</p><p>A apresentação limita acertos aos totais correspondentes. Os valores brutos são preservados na pesquisa para avaliação.</p></details>\n        <details><summary>Fonte, cobertura e atualização</summary><p id=\"sourceSummary\">Fonte: Bzzoiro. Cobertura parcial conforme a estatística.</p><p>A fonte pode registrar zero quando uma ação não foi medida. Os totais individuais podem diferir dos agregados da equipe. A seção de detalhes de cada jogador informa o histórico disponível.</p><p>Modelos ajustados com dados até setembro de 2026. Esta demonstração histórica não reproduz a disponibilidade real dos dados antes do jogo.</p></details>\n        <details><summary>Quais jogadores aparecem neste exemplo?</summary><p id=\"cohortNote\">Amostra da escalação histórica identificada por ID.</p><p>Nomes, posições e números vêm da escalação histórica preservada. Eles não indicam escalação ou vínculo atual. Não usamos fotos de jogadores.</p></details>\n        <details><summary>O que ainda está em validação?</summary><p>Gols, assistências e outros sete alvos ainda não passaram todos os critérios experimentais. Eles permanecem indisponíveis, mesmo quando um modelo chegou a produzir estimativas na pesquisa.</p><button class=\"text-button validation-trigger\" type=\"button\">Ver as nove métricas</button></details>\n      </div>\n    </section>\n    \n  \n\n  <dialog id=\"playerDialog\" class=\"player-dialog\" aria-labelledby=\"playerDialogTitle\"><div class=\"dialog-heading\"><div><p id=\"playerDialogClub\" class=\"dialog-club\"></p><h2 id=\"playerDialogTitle\"></h2><p id=\"playerDialogContext\"></p></div><button class=\"close-dialog\" type=\"button\" aria-label=\"Fechar detalhes do jogador\">×</button></div><p id=\"playerDialogNotice\" class=\"dialog-notice\"></p><div id=\"playerDialogMetrics\" class=\"detail-metrics\"></div><div class=\"detail-quality\"><h3>Histórico e cobertura</h3><p id=\"playerDialogQuality\"></p><p>Valores experimentais e cobertura parcial. Não há intervalo de confiança individual nesta versão.</p></div></dialog>\n  <dialog id=\"validationDialog\" class=\"validation-dialog\" aria-labelledby=\"validationTitle\"><div class=\"dialog-heading\"><div><p class=\"dialog-club\">Versão experimental</p><h2 id=\"validationTitle\">Métricas em validação</h2></div><button class=\"close-dialog\" type=\"button\" aria-label=\"Fechar métricas em validação\">×</button></div><p>Os modelos destes alvos ainda não passaram todos os critérios. Por isso, seus números não são exibidos nesta prévia.</p><ul id=\"validationList\"></ul><p class=\"validation-footnote\">A lista indica situação de validação. Ela não significa que a estatística seja sempre zero ou que o dado não exista na fonte.</p></dialog>\n";
'use strict';
const dataSource=this.getAttribute('data-src')||'/player-projections/preview.json';
const state = {data:null, team:'home', selectedPlayer:'all', minutes:60, group:'overview', position:'all', search:'', sort:'name', direction:1};
const groups = {
  overview:['total_shots','shots_on_target','total_pass','accurate_pass','total_tackle'],
  attack:['total_shots','shots_on_target','key_pass','goals','goal_assist'],
  passing:['total_pass','accurate_pass','key_pass','total_long_balls','accurate_long_balls','total_cross','accurate_cross'],
  defending:['total_tackle','won_tackle','interception','total_clearance','ball_recovery','fouls','yellow_card'],
  goalkeeping:['saves']
};
const labels = {total_shots:'Chutes',shots_on_target:'No alvo',total_pass:'Passes',accurate_pass:'Passes certos',total_tackle:'Desarmes',
  key_pass:'Passes-chave',goals:'Gols',goal_assist:'Assistências',total_long_balls:'Longos',accurate_long_balls:'Longos certos',
  total_cross:'Cruzamentos',accurate_cross:'Cruzamentos certos',won_tackle:'Desarmes ganhos',interception:'Interceptações',
  total_clearance:'Cortes',ball_recovery:'Recuperações',fouls:'Faltas',yellow_card:'Amarelos',saves:'Defesas'};
const positions = {G:'Goleiro',D:'Defesa',M:'Meio-campo',F:'Ataque'};
const nf = new Intl.NumberFormat('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
const minuteFormat = new Intl.NumberFormat('pt-BR',{maximumFractionDigits:1});
const byId = id => root.getElementById(id);
byId('playerSearch').name='player-search';byId('playerSearch').placeholder='Buscar jogador…';byId('positionFilter').name='player-position';
const escape = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function teamName(id){return [state.data.event.home,state.data.event.away].find(t=>t.id===id)?.name??'Clube indisponível';}
function scenarioText(){return state.minutes==='estimated'?'Minutos estimados por jogador, condicionado a atuar':`Cenário de ${state.minutes} minutos em campo`;}
function valueFor(metric){
  if (!metric || metric.status!=='available_experimental') return null;
  if (metric.unit==='minutes') return metric.expected_minutes;
  if (metric.scaled_by_minutes===false) return metric.expected_count;
  if (state.minutes==='estimated') return metric.using_predicted_minutes?.constrained_expected_count??null;
  return metric.by_minutes?.find(s=>s.minutes===state.minutes)?.constrained_expected_count??null;
}
function minutesFor(player){return state.minutes==='estimated'?player.metrics.minutes_played?.expected_minutes??null:state.minutes;}
function shownPlayers(){
  const team = state.team==='all'?null:state.data.event[state.team].id;
  const query=normalize(state.search);
  const selected=state.data.players.filter(p=>(team===null||p.team_id===team)&&(state.selectedPlayer==='all'||String(p.id)===state.selectedPlayer)&&(state.position==='all'||p.position===state.position)&&normalize(p.name).includes(query));
  selected.sort((a,b)=>{
    if(state.sort==='name')return a.name.localeCompare(b.name,'pt-BR')*state.direction;
    const av=state.sort==='minutes'?minutesFor(a):valueFor(a.metrics[state.sort]);
    const bv=state.sort==='minutes'?minutesFor(b):valueFor(b.metrics[state.sort]);
    if(av===null&&bv!==null)return 1;if(bv===null&&av!==null)return -1;
    return av===bv?a.name.localeCompare(b.name,'pt-BR'):(av-bv)*state.direction;
  });
  return selected;
}
function heading(key,label){
  const active=state.sort===key;const direction=active?(state.direction===1?'ascending':'descending'):'none';
  return `<th scope="col" aria-sort="${direction}"><button type="button" data-sort="${key}" aria-label="Ordenar por ${escape(label)}">${escape(label)}<span class="sort-icon" aria-hidden="true">${active?(state.direction===1?'↑':'↓'):'↕'}</span></button></th>`;
}
function metricCell(metric){
  const value=valueFor(metric);
  if(value!==null&&Number.isFinite(value))return `<td>${nf.format(value)}</td>`;
  const provisional=metric?.status==='provisional_not_exposed';
  return `<td class="unavailable-cell">${provisional?'Em validação':'Indisponível'}</td>`;
}
function syncControls(){
  root.querySelectorAll('[data-team]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.team===state.team)));
  root.querySelectorAll('[data-minutes]').forEach(b=>b.setAttribute('aria-pressed',String(String(b.dataset.minutes)===String(state.minutes))));
  root.querySelectorAll('[data-group]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.group===state.group)));
  byId('positionFilter').value=state.position;
  byId('teamFilter').value=state.team==='all'?'all':state.data.event[state.team].id;
  byId('playerFilter').value=state.selectedPlayer;
}
function populatePlayerOptions(){
  const team=state.team==='all'?null:state.data.event[state.team].id;
  const players=state.data.players.filter(p=>team===null||p.team_id===team).slice().sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
  if(state.selectedPlayer!=='all'&&!players.some(p=>String(p.id)===state.selectedPlayer))state.selectedPlayer='all';
  byId('playerFilter').innerHTML='<option value="all">Todos os jogadores</option>'+players.map(p=>`<option value="${p.id}">${escape(p.name)}</option>`).join('');
}
function populateSelectors(){
  const teams=[state.data.event.home,state.data.event.away];
  const controls=byId('positionFilter').parentElement;
  controls.insertAdjacentHTML('beforebegin','<label class="position-field"><span>Time</span><select id="teamFilter"><option value="all">Todos os times</option></select></label><label class="position-field"><span>Jogador</span><select id="playerFilter"><option value="all">Todos os jogadores</option></select></label>');
  byId('teamFilter').name='player-team';byId('playerFilter').name='player-id';
  byId('teamFilter').innerHTML='<option value="all">Todos os times</option>'+teams.map(t=>`<option value="${escape(t.id)}">${escape(t.name)}</option>`).join('');
  populatePlayerOptions();
  byId('teamFilter').addEventListener('change',e=>{const id=e.target.value;state.team=id==='all'?'all':(id===String(state.data.event.home.id)?'home':'away');state.selectedPlayer='all';state.search='';state.position='all';if(state.group==='goalkeeping')state.group='overview';byId('playerSearch').value='';renderTable();});
  byId('playerFilter').addEventListener('change',e=>{state.selectedPlayer=e.target.value;state.search='';state.position='all';if(state.group==='goalkeeping')state.group='overview';byId('playerSearch').value='';renderTable();});
}
function renderTable(){
  if(!state.data)return;
  populatePlayerOptions();
  const fields=groups[state.group];
  if(!['name','minutes',...fields].includes(state.sort)){state.sort='name';state.direction=1;}
  byId('tableHead').innerHTML='<tr>'+heading('name','Jogador')+heading('minutes','Minutos')+fields.map(k=>heading(k,labels[k])).join('')+'<th scope="col"><span class="sr-only">Detalhes</span></th></tr>';
  const players=shownPlayers();
  byId('tableBody').innerHTML=players.map(p=>`<tr data-player="${p.id}"><td><button class="player-button" type="button" data-player-details="${p.id}" aria-label="Ver detalhes de ${escape(p.name)}"><span class="player-avatar-fallback" aria-hidden="true"><svg viewBox="0 0 32 36" focusable="false"><circle cx="16" cy="10" r="5.5"/><path d="M5 33c.8-8.2 4.5-12.4 11-12.4S26.2 24.8 27 33"/></svg></span><span class="player-name">${escape(p.name)}<small class="player-subtitle">${escape(positions[p.position]??'Posição não informada')}${state.team==='all'?' · '+escape(teamName(p.team_id)):''}</small></span></button></td><td class="minutes-cell">${minutesFor(p)===null?'Indisponível':minuteFormat.format(minutesFor(p))+' min'}</td>${fields.map(k=>metricCell(p.metrics[k])).join('')}<td><button class="detail-button" type="button" data-player-details="${p.id}" aria-label="Abrir detalhes de ${escape(p.name)}">›</button></td></tr>`).join('');
  byId('resultsStatus').textContent=`${players.length} ${players.length===1?'jogador':'jogadores'} neste filtro`;
  byId('emptyState').hidden=players.length>0;
  byId('playerTable').hidden=players.length===0;
  byId('scenarioDescription').textContent=scenarioText();
  byId('cardScope').hidden=!fields.includes('yellow_card');
  syncControls();
  byId('tableBody').querySelectorAll('[data-player-details].player-button').forEach(button=>{
    const id=Number(button.dataset.playerDetails);if(!Number.isSafeInteger(id)||id<=0)return;
    const fallback=button.querySelector('.player-avatar-fallback'),photo=document.createElement('img');
    photo.width=32;photo.height=36;photo.alt='';photo.loading='lazy';photo.referrerPolicy='no-referrer';photo.style.cssText='width:32px;height:36px;object-fit:cover;border-radius:50%;flex:none';
    if(fallback){fallback.innerHTML='<svg viewBox="0 0 32 36" aria-hidden="true"><circle cx="16" cy="10" r="5.5" fill="currentColor"/><path d="M6 29c0-5 4-8 10-8s10 3 10 8v2H6z" fill="currentColor"/></svg>';fallback.style.cssText='width:32px;height:36px;display:grid;place-items:center;flex:none;background:var(--blue-soft);border-radius:9px;color:var(--blue)';}
    photo.addEventListener('load',()=>{if(photo.naturalWidth<4||photo.naturalHeight<4){photo.remove();return;}if(fallback)fallback.hidden=true});photo.addEventListener('error',()=>photo.remove());
    photo.src=`https://sports.bzzoiro.com/img/player/${id}/`;button.prepend(photo);
  });
}
function openPlayer(id){
  const p=state.data.players.find(p=>p.id===id);if(!p)return;
  byId('playerDialogTitle').textContent=p.name;
  byId('playerDialogClub').textContent=teamName(p.team_id);
  byId('playerDialogContext').textContent=`${positions[p.position]??'Posição não informada'} · camisa ${p.number??'—'} · ${state.data.mode==='historical_demonstration'?'contexto histórico':'elenco registrado antes do corte'}`;
  byId('playerDialogNotice').textContent=scenarioText()+'. Valores condicionados à atuação.';
  byId('playerDialogMetrics').innerHTML=state.data.released_targets.map(k=>{
    const m=p.metrics[k];const v=valueFor(m);const available=v!==null&&Number.isFinite(v);
    const text=available?(m.unit==='minutes'?minuteFormat.format(v)+' min':nf.format(v)):(m?.status==='provisional_not_exposed'?'Em validação':'Indisponível');
    const coverage=m.coverage?.historical_eligible_events;
    return `<div class="detail-metric ${available?'':'is-unavailable'}"><span>${escape(m?.label||labels[k]||k)}</span><strong>${escape(text)}</strong><small>${available?(k==='yellow_card'?'Por registro de súmula':coverage?`${coverage} partidas no recorte da pesquisa`:'Experimental'):k==='saves'?'Sem cenário de goleiro neste contexto':'Sem estimativa disponível para esta estatística'}</small></div>`;
  }).join('');
  const n=p.metrics.minutes_played?.history_observations??0;
  const notes=[`Histórico anterior de minutos: ${n} ${n===1?'observação':'observações'}. A quantidade pode variar por estatística.`];
  if(n<5)notes.push('Pouco histórico individual: interpretar as estimativas com cautela.');
  if(p.warnings.includes('team_change_since_last_record'))notes.push('Há mudança de clube em relação ao último registro anterior.');
  notes.push(state.data.mode==='historical_demonstration'?'Nomes e posições identificados por ID na escalação histórica preservada.':'Nome e vínculo associados por ID exato em evidência preservada; não indicam escalação confirmada.');
  byId('playerDialogQuality').textContent=notes.join(' ');
  byId('playerDialog').showModal();
}
function openValidation(){if(state.data)byId('validationDialog').showModal();}
byId('clubControls').addEventListener('click',e=>{const b=e.target.closest('[data-team]');if(b){state.team=b.dataset.team;state.selectedPlayer='all';state.search='';state.position='all';if(state.group==='goalkeeping')state.group='overview';byId('playerSearch').value='';renderTable();}});
byId('minuteControls').addEventListener('click',e=>{const b=e.target.closest('[data-minutes]');if(b){state.minutes=b.dataset.minutes==='estimated'?'estimated':Number(b.dataset.minutes);renderTable();}});
byId('groupControls').addEventListener('click',e=>{const b=e.target.closest('[data-group]');if(b){const wasGoalkeeper=state.group==='goalkeeping';state.group=b.dataset.group;if(state.group==='goalkeeping')state.position='G';else if(wasGoalkeeper)state.position='all';renderTable();}});
byId('playerSearch').addEventListener('input',e=>{state.search=e.target.value;renderTable();});
byId('positionFilter').addEventListener('change',e=>{state.position=e.target.value;renderTable();});
byId('tableHead').addEventListener('click',e=>{const b=e.target.closest('[data-sort]');if(b){if(state.sort===b.dataset.sort)state.direction*=-1;else{state.sort=b.dataset.sort;state.direction=state.sort==='name'?1:-1;}renderTable();}});
byId('tableBody').addEventListener('click',e=>{const b=e.target.closest('[data-player-details]');if(b)openPlayer(Number(b.dataset.playerDetails));});
byId('clearFilters').addEventListener('click',()=>{state.search='';state.position='all';state.team='all';state.selectedPlayer='all';byId('playerSearch').value='';renderTable();byId('playerSearch').focus();});
byId('openValidation').addEventListener('click',openValidation);
root.querySelectorAll('.validation-trigger').forEach(b=>b.addEventListener('click',openValidation));
root.querySelectorAll('dialog').forEach(d=>{
  d.querySelector('.close-dialog').addEventListener('click',()=>d.close());
  d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))d.close();});
});
async function init(){
  try{
    const response=await fetch(dataSource,{cache:'no-store'});if(!response.ok)throw Error('preview_unavailable');
    const data=await response.json();
    if(!['historical_demonstration','prospective_private_review'].includes(data.mode)||!Array.isArray(data.players)||data.published!==false)throw Error('invalid_display_payload');
    state.data=data;
    populateSelectors();
    
    if("player-projections/"+data.event.home.crest)
    if("player-projections/"+data.event.away.crest)
    byId('clubControls').querySelector('[data-team="home"]').textContent=data.event.home.name;
    byId('clubControls').querySelector('[data-team="away"]').textContent=data.event.away.slug==='athletico-paranaense'?'Athletico PR':data.event.away.name;
    root.querySelector('.historical-note p').textContent=data.mode==='historical_demonstration'?'Exemplo de 12/10/2026: calculado depois do jogo para demonstrar a ferramenta.':'Estimativas feitas antes do jogo. A participação dos jogadores não está confirmada.';
    byId('sourceSummary').textContent=`Fonte: ${data.source}. Última data de jogo no histórico usado: ${data.historical_source_max_date.split('-').reverse().join('/')}. A cobertura varia conforme a estatística.`;
    byId('cohortNote').textContent=data.cohort_notice;
    byId('validationList').innerHTML=data.provisional.map(m=>`<li>${escape(m.label)}</li>`).join('');
    renderTable();
  }catch(error){byId('loadError').hidden=false;byId('resultsStatus').textContent='Demonstração indisponível';byId('tableBody').replaceChildren();}
}
init();

root.querySelectorAll("a[href^=\"#\"]").forEach(a=>a.addEventListener("click",e=>{ const target=root.getElementById(a.hash.slice(1));if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth"});}}));
}}
customElements.define("player-projections",PlayerProjections);
