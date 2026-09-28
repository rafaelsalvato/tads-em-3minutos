"use strict";
// Catálogos de conteúdo e fontes. A renderização fica em app.js.
(() => {
  const icons = {
    code: "m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18",
    clock: "M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
    pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    moon: "M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10",
    book: "M12 5v16M3 3c4-1 7 0 9 2 2-2 5-3 9-2v16c-4-1-7 0-9 2-2-2-5-3-9-2z",
    check: "m5 12 4 4L19 6",
    arrow: "M4 12h16m-6-6 6 6-6 6",
    bookmark: "M6 3h12v18l-6-4-6 4z",
    bulb: "M9 18h6m-5 3h4M8 15a7 7 0 1 1 8 0c-1 1-1 2-1 3H9c0-1 0-2-1-3",
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    data: "M3 6c0-5 18-5 18 0s-18 5-18 0Zm0 0v12c0 5 18 5 18 0V6M3 12c0 5 18 5 18 0",
    layers: "m12 2 10 6-10 6L2 8zm-10 12 10 6 10-6M2 18l10 6 10-6",
    network: "M9 3h6v6H9zM2 16h6v6H2zM16 16h6v6h-6zM12 9v4M5 16v-3h14v3",
    chart: "M4 3v18h18M8 16v-5m5 5V6m5 10v-8",
    briefcase: "M3 7h18v14H3zM8 7V3h8v4M3 12l9 3 9-3M10 14h4",
    external: "M14 3h7v7m0-7L10 14M10 3H3v18h18v-7",
    up: "m6 15 6-6 6 6",
    down: "m6 9 6 6 6-6",
    download: "M12 3v12m-5-5 5 5 5-5M3 15v6h18v-6",
    info: "M12 11v6m0-11v1M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
    people:
      "M16 21v-3c0-5-14-5-14 0v3M13 7A4 4 0 1 1 5 7a4 4 0 0 1 8 0Zm4-3c5 0 5 7 0 7m2 4c4 0 4 4 4 6",
    globe:
      "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM2 12h20M12 2c6 6 6 14 0 20-6-6-6-14 0-20",
    shield: "M12 2 3 6v7c0 6 9 9 9 9s9-3 9-9V6zm-5 10 3 3 7-7",
  };

  const modules = [
    {
      id: "overview",
      name: "O curso",
      title: "O curso, em poucas palavras",
      summary:
        "Graduação em tecnologia com foco em desenvolver sistemas e resolver problemas.",
    },
    {
      id: "learning",
      name: "O que você aprende",
      title: "Um mapa da sua formação",
      summary:
        "Programação, dados, software, infraestrutura, matemática e gestão se conectam na formação.",
    },
    {
      id: "projects",
      name: "Da ideia à prática",
      title: "Da ideia à prática",
      summary:
        "Um sistema nasce de uma necessidade: entender, desenvolver e testar fazem parte do processo.",
    },
    {
      id: "careers",
      name: "Caminhos de carreira",
      title: "Caminhos de carreira",
      summary:
        "Desenvolvimento, análise de sistemas, dados e qualidade são caminhos possíveis de atuação.",
    },
    {
      id: "campus",
      name: "Campus e ingresso",
      title: "Campus e ingresso",
      summary:
        "A FT está no Campus I da Unicamp em Limeira. Consulte os processos de ingresso nos canais oficiais.",
    },
  ];
  const areas = [
    {
      name: "Programação",
      sub: "Dar vida às ideias",
      icon: "code",
      desc: "Organizar instruções, construir algoritmos e desenvolver aplicações.",
      tags: ["Algoritmos", "Web e dispositivos móveis"],
      example: "Como fazer um aplicativo encontrar um livro pelo título?",
    },
    {
      name: "Dados",
      sub: "Organizar informação",
      icon: "data",
      desc: "Modelar e consultar bancos de dados para transformar registros em informação útil.",
      tags: ["Modelagem", "Bancos de dados"],
      example:
        "Como relacionar livros, leitores e empréstimos sem perder informações?",
    },
    {
      name: "Engenharia de software",
      sub: "Construir com qualidade",
      icon: "layers",
      desc: "Entender necessidades, projetar, testar e manter sistemas.",
      tags: ["Requisitos", "Testes e qualidade"],
      example:
        "Como descobrir o que uma biblioteca precisa antes de escrever o código?",
    },
    {
      name: "Infraestrutura",
      sub: "Conectar os sistemas",
      icon: "network",
      desc: "Compreender redes, sistemas operacionais e a base que sustenta as aplicações.",
      tags: ["Redes", "Sistemas operacionais"],
      example:
        "O que precisa funcionar para acessar o catálogo de outro computador?",
    },
    {
      name: "Matemática",
      sub: "Desenvolver o raciocínio",
      icon: "chart",
      desc: "Usar fundamentos matemáticos e estatísticos na solução de problemas.",
      tags: ["Cálculo", "Álgebra e estatística"],
      example:
        "Como comparar estratégias e interpretar o movimento de empréstimos?",
    },
    {
      name: "Gestão e inovação",
      sub: "Pensar além do código",
      icon: "bulb",
      desc: "Conectar tecnologia, projetos e necessidades de organizações e pessoas.",
      tags: ["Projetos", "Empreendedorismo"],
      example:
        "Qual melhoria vale a pena entregar primeiro, com o tempo disponível?",
    },
  ];
  const projects = [
    {
      name: "Biblioteca sem filas",
      icon: "book",
      tag: "SERVIÇOS",
      desc: "Encontrar um livro e reservá-lo sem ir até o balcão.",
      problem: "Leitores não sabem se o livro está disponível.",
      solution: "Um catálogo com busca e reserva de exemplares.",
      test: "Confirmar que um exemplar indisponível não pode ser reservado.",
    },
    {
      name: "Estoque organizado",
      icon: "data",
      tag: "COMÉRCIO",
      desc: "Ajudar uma pequena loja a acompanhar seus produtos.",
      problem: "A loja perde vendas por não saber o que está acabando.",
      solution: "Um controle de entradas, saídas e alertas de estoque.",
      test: "Verificar se cada venda reduz corretamente a quantidade disponível.",
    },
    {
      name: "Agenda que funciona",
      icon: "clock",
      tag: "COTIDIANO",
      desc: "Evitar dois agendamentos no mesmo horário.",
      problem: "Duas pessoas podem escolher o mesmo horário.",
      solution: "Uma agenda que consulta a disponibilidade antes de confirmar.",
      test: "Testar duas solicitações para a mesma vaga e impedir a duplicidade.",
    },
  ];
  const careers = [
    {
      name: "Desenvolvimento de software",
      icon: "code",
      desc: "Criar e manter aplicações para a web, dispositivos móveis e outros contextos.",
    },
    {
      name: "Análise de sistemas",
      icon: "layers",
      desc: "Entender necessidades e transformá-las em requisitos e soluções.",
    },
    {
      name: "Bancos de dados",
      icon: "data",
      desc: "Organizar informações e apoiar o uso de dados por aplicações.",
    },
    {
      name: "Qualidade de software",
      icon: "shield",
      desc: "Testar comportamentos e ajudar a tornar sistemas mais confiáveis.",
    },
  ];
  const sources = {
    course: "https://www3.ft.unicamp.br/pt-br/graduacao/cursos/tads",
    ppc: "https://www3.ft.unicamp.br/sites/default/files/graduacao/PPC_TADS_2026_0.pdf",
    ft: "https://www3.ft.unicamp.br/",
    admission: "https://www.comvest.unicamp.br/",
  };

  window.TADS_DATA = { icons, modules, areas, projects, careers, sources };
})();
