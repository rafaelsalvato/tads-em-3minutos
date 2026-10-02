"use strict";
(() => {
  const { icons, modules, areas, projects, careers, sources } =
    window.TADS_DATA;
  const icon = (n) =>
    `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[n] || icons.code}"/></svg>`;
  // Estado temporário: módulo aberto, interesses e progresso do desafio.
  const state = {
    view: "overview",
    visited: new Set(["overview"]),
    interests: new Set(),
    area: 0,
    project: 0,
    order: [2, 0, 3, 1],
    feedback: null,
    challengeDone: false,
  };
  const main = document.getElementById("main");
  // Utilitários de interface e componentes compartilhados.
  function esc(s) {
    return String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  }
  function toast(s) {
    document.getElementById("toast").textContent = s;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(
      () => (document.getElementById("toast").textContent = ""),
      2600,
    );
  }
  function external(url, label) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}${icon("external")}<span class="visuallyhidden"> (abre em nova aba)</span></a>`;
  }
  function sectiontop(n, label, time) {
    return `<div class="sectiontop"><span class="eyebrow crumb">${n} <span aria-hidden="true">/</span> ${label}</span><span class="tag">${icon("clock")}${time}</span></div>`;
  }
  function source() {
    return `<p class="source">Dados do curso: <a href="${sources.ppc}" target="_blank" rel="noopener noreferrer">PPC 2026</a> e <a href="${sources.course}" target="_blank" rel="noopener noreferrer">página oficial da FT</a>. Para sua turma, confira o catálogo e o edital vigentes.</p>`;
  }
  function saveButton(name) {
    let yes = state.interests.has(name);
    return `<button class="savebtn" data-interest="${esc(name)}" aria-pressed="${yes}">${icon(yes ? "check" : "bookmark")}${yes ? "Guardado no meu resumo" : "Guardar no meu resumo"}</button>`;
  }
  function nextrow(i) {
    return `<div class="nextrow">${saveButton(modules[i].name)}<button class="btn" data-go="${i < 4 ? modules[i + 1].id : "challenge"}">${i < 4 ? "Explorar " + modules[i + 1].name.toLowerCase() : "Experimentar o desafio"}${icon("arrow")}</button></div>`;
  }
  function footer() {
    return `<footer class="pagefoot"><span>Projeto acadêmico · SI202 · FT/Unicamp · 2026</span><span>Sem cadastro. Escolhas apenas nesta sessão.</span><button data-action="restart">Recomeçar</button></footer>`;
  }
  // Conteúdo dos cinco módulos principais.
  function overview() {
    return `${sectiontop("01", "Conheça o curso", "~30 s")}<div class="hero"><div><h1>Tecnologia para<br><em>resolver problemas.</em></h1><p>Descubra o que você pode aprender, criar e transformar em Análise e Desenvolvimento de Sistemas.</p><p class="micro">Cinco paradas rápidas. Comece por onde sua curiosidade levar.</p></div><div class="coursecard"><div class="eyebrow">Tecnologia em</div><h2>Análise e Desenvolvimento de Sistemas</h2><div class="badge">${icon("book")}Graduação pública e gratuita</div><div class="cardline"></div><div class="location"><div><b>FT · Unicamp</b><small>Campus I · Limeira, SP</small></div><span class="bigicon">${icon("pin")}</span></div></div></div><div class="stats"><div class="stat"><div class="statlabel">${icon("clock")}DURAÇÃO</div><strong>3 anos</strong><small>6 semestres · PPC 2026</small></div><div class="stat"><div class="statlabel">${icon("moon")}PERÍODO</div><strong>Noturno</strong><small>Aulas à noite</small></div><div class="stat"><div class="statlabel">${icon("people")}VAGAS</div><strong>50</strong><small>Previstas no PPC 2026</small></div><div class="stat"><div class="statlabel">${icon("book")}FORMAÇÃO</div><strong>2.010 h</strong><small>Carga horária do curso</small></div></div><div class="split"><div class="card"><div class="headingrow"><span class="iconbox">${icon("code")}</span><h2>Muito além de escrever código</h2></div><div class="factrow">${icon("check")}<div><b>Entender um problema</b><span>Ouvir pessoas e descobrir o que precisa melhorar.</span></div></div><div class="factrow">${icon("check")}<div><b>Construir uma solução</b><span>Conectar programação, dados e trabalho em equipe.</span></div></div><div class="factrow">${icon("check")}<div><b>Testar e evoluir</b><span>Verificar se o sistema funciona para quem vai usá-lo.</span></div></div></div><div class="card softcard"><div class="headingrow"><span class="iconbox">${icon("bulb")}</span><h3>“Preciso saber programar?”</h3></div><p>Não. O curso não exige conhecimento prévio de informática para ingressar.</p><p class="small">Curiosidade, disposição para aprender e prática ajudam a construir essa base ao longo do caminho.</p><button class="textlink" data-go="learning">Veja por onde você começa →</button></div></div>${nextrow(0)}${source()}`;
  }
  function areaDetail() {
    let a = areas[state.area];
    return `<div class="areadetail"><div><h2>${a.name}</h2><p>${a.desc}</p><div class="pills">${a.tags.map((x) => `<span class="pill">${x}</span>`).join("")}</div></div><div class="sample"><span class="eyebrow">Imagine na prática</span><p>${a.example}</p>${saveButton(a.name)}</div></div>`;
  }
  function learning() {
    return `${sectiontop("02", "O que você aprende", "~40 s")}<h1>Uma formação.<br><em>Muitas conexões.</em></h1><p class="intro">Toque em uma área para descobrir como ela ajuda a resolver problemas.</p><div class="areas" role="group" aria-label="Áreas de formação">${areas.map((a, i) => `<button class="area ${i === state.area ? "active" : ""}" data-area="${i}" aria-pressed="${i === state.area}" aria-controls="areaDetail"><span class="iconbox">${icon(a.icon)}</span><span><b>${a.name}</b><small>${a.sub}</small></span></button>`).join("")}</div><div class="card" id="areaDetail" aria-live="polite">${areaDetail()}</div><div class="note">${icon("info")}<span>Este mapa agrupa temas para facilitar a descoberta. A matriz completa e a sequência de disciplinas estão no PPC.</span></div>${nextrow(1)}${source()}`;
  }
  function projectDetail() {
    let p = projects[state.project];
    return `<div class="headingrow"><span class="iconbox">${icon(p.icon)}</span><h2>${p.name}: como pensar a solução</h2></div><div class="steps"><div><div class="stepnum">01 / ENTENDER</div><p>${p.problem}</p></div><div><div class="stepnum">02 / CONSTRUIR</div><p>${p.solution}</p></div><div><div class="stepnum">03 / TESTAR</div><p>${p.test}</p></div></div>${saveButton(p.name)}`;
  }
  function projectView() {
    return `${sectiontop("03", "Da ideia à prática", "~35 s")}<h1>Um problema real.<br><em>Uma ideia que funciona.</em></h1><p class="intro">Explore três exemplos ilustrativos de soluções que usam conhecimentos de ADS.</p><div class="projects">${projects.map((p, i) => `<article class="card project"><div class="projecthead">${icon(p.icon)}<span>${p.tag}</span></div><div class="projectbody"><h3>${p.name}</h3><p>${p.desc}</p><button class="btn secondary" data-project="${i}" aria-pressed="${i === state.project}" aria-controls="projectDetail">${i === state.project ? "Exemplo selecionado" : "Explorar a solução"}${icon("arrow")}</button></div></article>`).join("")}</div><div class="card exampledetail" id="projectDetail" aria-live="polite">${projectDetail()}</div>${nextrow(2)}<p class="source">Exemplos criados para esta experiência; não representam projetos reais da Unicamp.</p>`;
  }
  function careerView() {
    return `${sectiontop("04", "Caminhos de carreira", "~30 s")}<h1>Onde esse conhecimento<br><em>pode te levar?</em></h1><p class="intro">Tecnologia faz parte de diferentes setores. Guarde os caminhos que despertam sua curiosidade.</p><div class="careers">${careers.map((c) => `<article class="card"><div class="careerheading"><span class="iconbox">${icon(c.icon)}</span><button data-interest="${esc(c.name)}" aria-label="${state.interests.has(c.name) ? "Remover" : "Guardar"} ${c.name} no resumo" aria-pressed="${state.interests.has(c.name)}">${icon(state.interests.has(c.name) ? "check" : "bookmark")}</button></div><h3>${c.name}</h3><p>${c.desc}</p></article>`).join("")}</div><div class="card softcard" style="margin-top:20px"><div class="headingrow"><span class="iconbox">${icon("briefcase")}</span><h2>E durante a graduação?</h2></div><p>Estágios e iniciação científica aproximam formação, mercado e pesquisa.</p><p class="small">Explore oportunidades, prepare projetos para apresentar e consulte as orientações da FT. Cada seleção tem seus requisitos; o curso não garante uma vaga.</p></div>${nextrow(3)}${source()}`;
  }
  function campus() {
    return `${sectiontop("05", "Campus e ingresso", "~35 s")}<h1>Sua próxima etapa<br><em>pode começar em Limeira.</em></h1><p class="intro">Conheça o lugar do curso e os canais para planejar seu ingresso.</p><div class="split"><div class="campusbox">${icon("pin")}<p class="eyebrow">Campus I · Interior de São Paulo</p><h2>Faculdade de Tecnologia</h2><p>A FT está em Limeira. Considere deslocamento, moradia e sua rotina ao planejar a graduação.</p><div class="campusitems"><div>${icon("code")} Laboratórios</div><div>${icon("book")} Biblioteca</div><div>${icon("people")} Vida universitária</div><div>${icon("bulb")} Pesquisa e extensão</div></div><address>Rua Paschoal Marmo, 1888<br>Jardim Nova Itália · Limeira, SP</address><a class="btn lime" href="${sources.ft}" target="_blank" rel="noopener noreferrer">Conhecer a FT ${icon("external")}<span class="visuallyhidden">(abre em nova aba)</span></a></div><div class="card"><div class="headingrow"><span class="iconbox">${icon("arrow")}</span><h2>Como entrar?</h2></div><p style="font-size:14px">Acompanhe os processos da Unicamp e verifique as modalidades e regras disponíveis para seu ano.</p><div class="linklist">${external(sources.admission, "<span>Comvest<small>Processos seletivos, regras e calendário</small></span>")}${external(sources.course, "<span>Página oficial de TADS<small>Apresentação e informações do curso</small></span>")}${external(sources.ppc, "<span>Projeto pedagógico 2026<small>Formação e matriz curricular · PDF</small></span>")}</div><div class="note" style="margin-bottom:0">${icon("globe")}<span>Os links oficiais precisam de internet.</span></div></div></div><div class="faq"><h2>Dúvidas que ajudam a decidir</h2><details><summary>Tecnólogo é uma graduação?</summary><p>Sim. TADS é um curso superior de tecnologia, com foco aplicado. Não é um curso técnico de nível médio.</p></details><details><summary>TADS é igual a Ciência ou Engenharia de Computação?</summary><p>São formações diferentes. Aqui, o foco é analisar e desenvolver sistemas. Para comparar cursos, examine a matriz, a duração, o período e o campus de cada um nos respectivos canais oficiais.</p></details><details><summary>Posso estudar à noite e trabalhar durante o dia?</summary><p>O curso é noturno, mas atividades e estudos também exigem tempo fora das aulas. Avalie sua disponibilidade e os horários das disciplinas antes de organizar essa rotina.</p></details></div>${nextrow(4)}${source()}`;
  }
  // Desafio: ordenar as etapas de uma reserva e receber feedback.
  const orderSteps = [
    "Identificar o livro escolhido",
    "Consultar se há um exemplar disponível",
    "Confirmar a reserva do exemplar disponível",
    "Exibir o comprovante da reserva",
  ];
  function orderHtml() {
    return state.order
      .map(
        (id, i) =>
          `<li><span class="position">0${i + 1}</span><span class="text">${orderSteps[id]}</span><span class="orderbuttons"><button data-move="${i},-1" aria-label="Mover para cima: ${orderSteps[id]}" ${i === 0 ? "disabled" : ""}>${icon("up")}</button><button data-move="${i},1" aria-label="Mover para baixo: ${orderSteps[id]}" ${i === 3 ? "disabled" : ""}>${icon("down")}</button></span></li>`,
      )
      .join("");
  }
  function feedbackHtml() {
    if (!state.feedback) return "";
    return state.feedback === "correct"
      ? `<div class="feedback correct"><b>Boa! Cada etapa prepara a próxima.</b><p>Você identifica o livro, verifica se ele está disponível, confirma a reserva e só então mostra o comprovante. Isso é organizar um algoritmo.</p></div>`
      : `<div class="feedback"><b>Quase! Pense nas dependências.</b><p>Antes de confirmar, é preciso consultar a disponibilidade do livro escolhido. O comprovante deve aparecer depois da confirmação. Ajuste a sequência e tente novamente.</p></div>`;
  }
  function challenge() {
    return `${sectiontop("EXTRA", "Um desafio rápido", "~30 s")}<h1>Seu primeiro algoritmo<br><em>não precisa de código.</em></h1><p class="intro">Ajude uma biblioteca a organizar uma reserva. Qual deve ser a ordem das ações?</p><div class="challengegrid"><div class="card"><h2>Organize as quatro etapas</h2><p style="font-size:14px">Use as setas para mudar a ordem. Considere uma reserva em que há um exemplar disponível.</p><ol class="orderlist" id="orderList">${orderHtml()}</ol><div id="feedback" aria-live="polite">${feedbackHtml()}</div><div class="actionrow"><button class="btn" data-action="verify">Verificar sequência ${icon("check")}</button><button class="btn secondary" data-action="shuffle">Tentar de novo</button></div></div><aside class="card softcard challengeaside"><span class="iconbox" style="margin-bottom:17px">${icon("bulb")}</span><h2>Uma dica para começar</h2><p style="font-size:14px">O computador segue instruções. Ele precisa receber cada informação antes de usá-la.</p><ol><li>O que precisa ser conhecido primeiro?</li><li>O que deve ser verificado antes de confirmar?</li><li>Qual ação encerra o processo?</li></ol><p class="small">É uma experimentação, não um teste de aptidão. Resolver problemas é algo que você desenvolve com prática.</p></aside></div><div class="nextrow"><button class="textlink" data-go="campus">Voltar ao curso</button><button class="btn" data-go="summary">${state.challengeDone ? "Ver meu resumo" : "Pular para meu resumo"}${icon("arrow")}</button></div>`;
  }
  // Resumo dos módulos visitados e interesses selecionados.
  function summaryView() {
    let seen = modules.filter((m) => state.visited.has(m.id));
    return `${sectiontop("SEU PERCURSO", "Meu resumo", seen.length + " de 5 módulos")}<div class="summaryhero"><div><span class="eyebrow">Leve sua curiosidade adiante</span><h2>Uma visão do seu caminho.</h2><p>Você explorou ${seen.length} ${seen.length === 1 ? "módulo" : "módulos"}${state.interests.size ? " e guardou " + state.interests.size + " " + (state.interests.size === 1 ? "interesse" : "interesses") : ""}. Este resumo reúne suas escolhas, sem definir um perfil ou decidir por você.</p></div><button class="btn lime" data-action="download">${icon("download")}Baixar resumo</button></div><div class="split"><div><h2>O que você explorou</h2><div class="summarylist">${seen.map((m) => `<div class="summaryitem"><b>${m.name}</b><p>${m.summary}</p></div>`).join("")}</div></div><div><div class="card"><div class="headingrow"><span class="iconbox">${icon("bookmark")}</span><h2>Seus interesses</h2></div>${state.interests.size ? `<div class="pills">${[...state.interests].map((x) => `<span class="interestchip">${esc(x)}<button data-interest="${esc(x)}" aria-label="Remover ${esc(x)} do resumo">×</button></span>`).join("")}</div>` : '<p class="empty">Ainda não guardou um interesse? Use os marcadores dos módulos para adicionar o que chamou sua atenção.</p>'}</div><div class="card softcard" style="margin-top:17px"><h3>Três coisas para lembrar</h3><div class="factrow">${icon("clock")}<div><b>6 semestres</b><span>Integralização prevista no PPC 2026.</span></div></div><div class="factrow">${icon("pin")}<div><b>FT em Limeira</b><span>Campus I da Unicamp, período noturno.</span></div></div><div class="factrow">${icon("code")}<div><b>Desenvolver sistemas</b><span>Entender problemas, criar e testar soluções.</span></div></div></div><div class="note">${icon(state.challengeDone ? "check" : "bulb")}<span>${state.challengeDone ? "Desafio de lógica concluído. Você organizou seu primeiro algoritmo!" : "Seu desafio de lógica ainda está disponível."} <button class="textlink" data-go="challenge">${state.challengeDone ? "Rever desafio" : "Experimentar"}</button></span></div></div></div><div class="nextrow"><button class="btn secondary" data-go="${modules.find((m) => !state.visited.has(m.id))?.id || "overview"}">${state.visited.size < 5 ? "Continuar explorando" : "Revisitar o curso"}${icon("arrow")}</button><a class="btn" href="${sources.admission}" target="_blank" rel="noopener noreferrer">Consultar ingresso ${icon("external")}<span class="visuallyhidden">(abre em nova aba)</span></a></div>${source()}`;
  }
  // Atualização da tela, navegação e indicador de progresso.
  function render() {
    document.getElementById("navigation").innerHTML = modules
      .map(
        (m, i) =>
          `<button data-go="${m.id}" class="${state.view === m.id ? "active" : ""}" ${state.view === m.id ? 'aria-current="page"' : ""}><span class="navnum">0${i + 1}</span>${m.name}<span class="check" aria-label="${state.visited.has(m.id) ? "visitado" : "não visitado"}">${state.visited.has(m.id) ? "✓" : ""}</span></button>`,
      )
      .join("");
    document.getElementById("progress").value = state.visited.size;
    document.getElementById("progressText").textContent =
      state.visited.size + " de 5";
    document.getElementById("savedCount").textContent = state.interests.size
      ? "(" + state.interests.size + ")"
      : "";
    const views = {
      overview,
      learning,
      projects: projectView,
      careers: careerView,
      campus,
      challenge,
      summary: summaryView,
    };
    main.innerHTML =
      '<div class="view">' + views[state.view]() + footer() + "</div>";
    document.title =
      (modules.find((m) => m.id === state.view)?.name ||
        (state.view === "challenge" ? "Desafio de lógica" : "Meu resumo")) +
      " · TADS em 3 minutos";
  }
  function navigate(id, focus = true) {
    if (![...modules.map((m) => m.id), "challenge", "summary"].includes(id))
      throw new Error("Módulo inválido.");
    state.view = id;
    if (modules.some((m) => m.id === id)) state.visited.add(id);
    render();
    if (focus) {
      main.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }
  const allowedInterests = new Set([
    ...modules.map((m) => m.name),
    ...areas.map((a) => a.name),
    ...projects.map((p) => p.name),
    ...careers.map((c) => c.name),
  ]);
  // Interesses guardados apenas enquanto a página permanece aberta.
  function toggleInterest(name) {
    if (!allowedInterests.has(name)) throw new Error("Interesse inválido.");
    const added = !state.interests.has(name);
    if (added) state.interests.add(name);
    else state.interests.delete(name);
    render();
    const matches = [...document.querySelectorAll("[data-interest]")];
    matches
      .find((b) => b.dataset.interest === name)
      ?.focus({ preventScroll: true });
    toast(added ? "Adicionado ao seu resumo." : "Removido do seu resumo.");
    return added;
  }
  function moveStep(i, dir) {
    if (
      !Number.isInteger(i) ||
      ![-1, 1].includes(dir) ||
      i < 0 ||
      i > 3 ||
      i + dir < 0 ||
      i + dir > 3
    )
      throw new Error("Movimento inválido.");
    [state.order[i], state.order[i + dir]] = [
      state.order[i + dir],
      state.order[i],
    ];
    state.feedback = null;
    document.getElementById("orderList").innerHTML = orderHtml();
    document.getElementById("feedback").innerHTML = "";
    const target = document.querySelector(`[data-move="${i + dir},${dir}"]`);
    if (target && !target.disabled) target.focus({ preventScroll: true });
    else
      document
        .querySelector(`[data-move="${i + dir},${-dir}"]`)
        ?.focus({ preventScroll: true });
    toast("Etapa movida para a posição " + (i + dir + 1) + ".");
  }
  function verify() {
    const correct = state.order.every((x, i) => x === i);
    state.feedback = correct ? "correct" : "retry";
    if (correct) state.challengeDone = true;
    render();
    document
      .querySelector('[data-action="verify"]')
      ?.focus({ preventScroll: true });
    return {
      correct,
      explanation: correct
        ? "Identificar, consultar disponibilidade, confirmar e exibir comprovante."
        : "Consulte a disponibilidade antes de confirmar e exiba o comprovante por último.",
    };
  }
  // Geração e download do resumo em texto.
  function summaryText() {
    return [
      "TADS EM 3 MINUTOS — MEU RESUMO",
      "",
      "Curso: Tecnologia em Análise e Desenvolvimento de Sistemas",
      "FT/Unicamp · Campus I · Limeira, SP",
      "Duração: 6 semestres (3 anos) · Noturno",
      "Carga horária: 2.010 horas · 50 vagas (PPC 2026)",
      "",
      "MÓDULOS EXPLORADOS",
      ...modules
        .filter((m) => state.visited.has(m.id))
        .map((m) => "- " + m.name + ": " + m.summary),
      "",
      "INTERESSES QUE GUARDEI",
      ...(state.interests.size
        ? [...state.interests].map((x) => "- " + x)
        : ["Nenhum interesse guardado."]),
      "",
      "DESAFIO DE LÓGICA",
      state.challengeDone
        ? "Concluído: identificar o livro, consultar disponibilidade, confirmar a reserva e exibir o comprovante."
        : "Ainda não concluído.",
      "",
      "PRÓXIMOS PASSOS",
      "Página do curso: " + sources.course,
      "Projeto pedagógico 2026: " + sources.ppc,
      "Ingresso: " + sources.admission,
      "",
      "Confira as regras e o catálogo para seu ano de ingresso.",
      "Projeto acadêmico da disciplina SI202. Não é uma página oficial da Unicamp.",
    ].join("\n");
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([summaryText()], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "meu-resumo-tads.txt";
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast("Seu resumo está pronto para guardar.");
  }
  // Um único ouvinte atende os botões, inclusive os criados dinamicamente.
  document.addEventListener("click", (e) => {
    const b = e.target.closest(
      "button[data-go],button[data-area],button[data-project],button[data-interest],button[data-move],button[data-action]",
    );
    if (!b) return;
    if (b.dataset.go) {
      navigate(b.dataset.go);
      return;
    }
    if (b.dataset.area !== undefined) {
      state.area = Number(b.dataset.area);
      render();
      document
        .querySelector(`[data-area="${state.area}"]`)
        .focus({ preventScroll: true });
      return;
    }
    if (b.dataset.project !== undefined) {
      state.project = Number(b.dataset.project);
      render();
      document
        .querySelector(`[data-project="${state.project}"]`)
        .focus({ preventScroll: true });
      return;
    }
    if (b.dataset.interest) {
      toggleInterest(b.dataset.interest);
      return;
    }
    if (b.dataset.move) {
      const [i, d] = b.dataset.move.split(",").map(Number);
      moveStep(i, d);
      return;
    }
    if (b.dataset.action === "verify") verify();
    if (b.dataset.action === "shuffle") {
      state.order = [2, 0, 3, 1];
      state.feedback = null;
      render();
      document
        .querySelector('[data-action="shuffle"]')
        .focus({ preventScroll: true });
      toast("Sequência reiniciada.");
    }
    if (b.dataset.action === "download") download();
    if (b.dataset.action === "restart") {
      if (
        (state.visited.size > 1 ||
          state.interests.size ||
          state.challengeDone) &&
        !window.confirm(
          "Recomeçar vai limpar os interesses e o progresso desta sessão. Deseja continuar?",
        )
      )
        return;
      state.visited = new Set(["overview"]);
      state.interests.clear();
      state.area = 0;
      state.project = 0;
      state.order = [2, 0, 3, 1];
      state.feedback = null;
      state.challengeDone = false;
      navigate("overview");
      toast("Tudo pronto para uma nova descoberta.");
    }
  });
  render();
  if (document.modelContext?.registerTool) {
    const lifecycle = new AbortController();
    const tools = [
      {
        name: "navigate_tads_module",
        title: "Explorar um módulo de TADS",
        description:
          "Abre um módulo e o marca como visitado no percurso da sessão.",
        inputSchema: {
          type: "object",
          properties: {
            module: {
              type: "string",
              enum: [...modules.map((m) => m.id), "challenge", "summary"],
            },
          },
          required: ["module"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false },
        execute: (input) => {
          if (!input || typeof input.module !== "string")
            throw new Error("Informe um módulo válido.");
          navigate(input.module);
          return { module: state.view, visited: [...state.visited] };
        },
      },
      {
        name: "read_tads_summary",
        title: "Ler o resumo do visitante",
        description:
          "Retorna os módulos visitados, os interesses guardados e o estado do desafio, sem alterar as escolhas.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        annotations: { readOnlyHint: true },
        execute: () => ({
          visited: [...state.visited],
          interests: [...state.interests],
          challengeCompleted: state.challengeDone,
        }),
      },
    ];
    for (const tool of tools) {
      try {
        Promise.resolve(
          document.modelContext.registerTool(tool, {
            signal: lifecycle.signal,
          }),
        ).catch(() => {});
      } catch {}
    }
    window.addEventListener("pagehide", () => lifecycle.abort(), {
      once: true,
    });
  }
})();
