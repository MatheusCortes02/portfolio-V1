import type { Projeto } from "./tipos";

/**
 * Trabalhos feitos para clientes.
 * Hana Decor, Bebê Tricot, São Jorge e Brasigran: período como desenvolvedor front-end na
 * Morro Alto Creative Office (aparecem com crédito à agência, autorizado pelo Matheus).
 * Diggi Saúde (sem link) e o site da própria Morro Alto (capturas da versão `site-institucional`, em desenvolvimento; link para
 * morroalto.co, a versão no ar): pedidos de 2026-10-23.
 * Páginas de links da SumWise, do Scardua Lab e da Dra. Jânia (EST-70): pedido de 2026-10-26, crédito à agência.
 * Mister Cook: a nota da vault registra o projeto como cliente da Acex Partners, por isso fica sem crédito.
 * Todos os fatos vêm das notas da vault Obsidian (90 - Projetos) ou do código; capturas conferidas em 2026-10-20.
 */

const creditoMorroAlto = {
  pt: "Cliente da Morro Alto Creative Office",
  en: "Client of Morro Alto Creative Office",
};

const verOnline = { pt: "Ver online", en: "Visit site" };

export const projetosClientes: Projeto[] = [
  // Fonte: Projetos Analisados/site-hanadecor.md:12 (pedido e conversão), :18-23 (trilha B, SDD, testes),
  // :29 (site antigo em WordPress), :57 (revisões viraram testes), :61-71 (4 seções, 12 placas, funil, modal),
  // :270-276 (no ar pela VPS desde 2026-09-21; WordPress em lp.); docs/specs/002-deploy-vps.md e 003-paginas-antigas.md
  // do repositório Downloads/hanadecor. Capturas da cópia local do branch `publicacao` (fadcee1, o que está no ar):
  // o anticópia do servidor (middleware.js) responde ao Chrome headless com uma página vazia.
  {
    slug: "hanadecor",
    profissional: true,
    papel: { pt: "Desenvolvimento na agência · especificação e 42 testes", en: "Agency development · a spec and 42 tests" },
    titulo: { pt: "Hana Decor", en: "Hana Decor" },
    categoria: "frontend",
    ano: "2026",
    credito: creditoMorroAlto,
    resumo: {
      pt: "Nova página inicial da Hana Decor, empresa de revestimentos naturais, construída em HTML, CSS e JavaScript puros para substituir o site em WordPress e levar o visitante ao orçamento pelo WhatsApp.",
      en: "A new home page for Hana Decor, a natural stone finishes company, built in plain HTML, CSS and JavaScript to replace its WordPress site and lead visitors to a quote request on WhatsApp.",
    },
    desafio: {
      pt: "A página antiga tinha problemas de estrutura, como dois títulos principais e imagens de 1 a 2 MB. Ao mesmo tempo, o funil de orçamento já alimentava o CRM, uma planilha e o Google Tag Manager, e precisava continuar funcionando exatamente como antes.",
      en: "The old page had structural problems, such as two main headings and images of 1 to 2 MB. At the same time, the quote funnel already fed the CRM, a spreadsheet and Google Tag Manager, and it had to keep working exactly as before.",
    },
    solucao: {
      pt: "A cliente considerava genérico o site em WordPress. Reconstruí a página inicial em HTML, CSS e JavaScript puros, mantendo as cores, as fontes e os textos que ela reconhecia como seus. Criei um mostruário com as 12 placas reais da marca e uma janela de produto com fotos e ficha técnica, sem alterar o simulador de orçamento. Cada revisão pedida virou um teste automático, 42 no total.",
      en: "The client found her WordPress site generic. I rebuilt the home page in plain HTML, CSS and JavaScript, keeping the colors, fonts and copy she recognized as her own. I created a showcase of the brand's 12 real sample boards and a product dialog with photos and technical details, leaving the quote simulator untouched. Every requested revision became an automated test, 42 in total.",
    },
    resultado: {
      pt: "O site está no ar em hanadecor.com.br desde setembro de 2026, num servidor virtual (VPS), com cabeçalhos de segurança e proteção contra cópia automatizada. Os endereços antigos do WordPress passaram a redirecionar para um subdomínio, sem perder os parâmetros das campanhas de anúncio.",
      en: "The site has been live at hanadecor.com.br since September 2026, on a virtual private server, with security headers and protection against automated copying. The old WordPress addresses now redirect to a subdomain without losing the ad campaign parameters.",
    },
    extra: {
      titulo: { pt: "O que eu faria diferente", en: "What I would do differently" },
      texto: {
        pt: "Fiz cinco versões num dia. Na segunda, troquei cores, fontes e a abertura seguindo um manual da marca que encontrei no meio do trabalho, e essa versão foi recusada ponto por ponto. Hoje, numa remodelação, eu partiria da identidade que o cliente já reconhece como dele e levaria um manual novo ao cliente como pergunta antes de mudar qualquer coisa.",
        en: "I made five versions in one day. In the second, I changed the colors, fonts and hero to follow a brand manual I found mid-project, and that version was rejected point by point. Today, in a redesign, I would start from the identity the client already sees as their own and bring a newly found manual to them as a question before changing anything.",
      },
    },
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Playwright", "Docker", "Google Tag Manager"],
    links: [{ rotulo: verOnline, url: "https://hanadecor.com.br/" }],
    capturas: [
      {
        arquivo: "/midia/capturas/hanadecor/inicio-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Página inicial da Hana Decor no computador: banheiro revestido de seixos claros ao fundo e o título Seixos Telados centralizado.",
          en: "Hana Decor home page on desktop: a bathroom clad in light pebble tiles behind the centered headline Seixos Telados.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/hanadecor/inicio-02.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Seção Nossos produtos, com o mostruário das 12 placas de seixos em grade e o selo de detalhes em cada foto.",
          en: "Our products section, with the 12 pebble sample boards in a grid and a details badge on each photo.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/hanadecor/inicio-03.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Faixa de cubas de pedra com fotos do ensaio da marca e início da seção Hijau & Hitam.",
          en: "Strip of stone basins photographed by the brand, followed by the start of the Hijau & Hitam section.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/hanadecor/modal-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Modal de produto do Seixo White Bali, com foto de aplicação, miniaturas, ficha técnica e botão de orçamento.",
          en: "Product modal for the White Bali pebble, with an installation photo, thumbnails, technical details and a quote button.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/hanadecor/inicio-celular-01.jpg",
        largura: 780,
        altura: 1688,
        alt: {
          pt: "Página inicial da Hana Decor no celular, com menu compacto e botão fixo do WhatsApp.",
          en: "Hana Decor home page on a phone, with a compact menu and a floating WhatsApp button.",
        },
        tipo: "celular",
      },
    ],
  },


  // Fonte: site-saojorge.md:12-15 (cliente, feira, rota /feira), :31 (stack), :39 (narrativa em 3 atos),
  // :52 (nicho sem movimento por rolagem), :56 (proporção de cores como partitura de seções),
  // :107-116 (mídia detectada pelo nome; reprodutor de sequências em canvas com poster no movimento reduzido),
  // :151-157 (bilíngue, WhatsApp comercial, preloader com brasão 3D, crédito no rodapé).
  // Publicação conferida em 2026-10-20: https://www.saojorge.group/ responde 200 com o mesmo título e o crédito
  // "Desenvolvido por Morro Alto Creative Office" (a nota deixava o domínio como hipótese).
  {
    slug: "sao-jorge",
    profissional: true,
    papel: { pt: "Desenvolvimento na agência e produção das sequências de imagem", en: "Agency development and production of the image sequences" },
    titulo: { pt: "São Jorge Group", en: "São Jorge Group" },
    categoria: "frontend",
    ano: "2026",
    credito: creditoMorroAlto,
    resumo: {
      pt: "Site institucional bilíngue da São Jorge Group, mineradora baiana do Cristal São Jorge, com uma narrativa conduzida pela rolagem.",
      en: "A bilingual corporate website for São Jorge Group, a Bahia-based mining company that produces San Giorgio Crystal, with a scroll-driven narrative.",
    },
    desafio: {
      pt: "A São Jorge Group extrai e beneficia um cristal de quartzo usado em pisos, paredes e bancadas. Na pesquisa de referências do setor de rochas, quase nenhum concorrente usava movimento ligado à rolagem, então a forma de apresentar o material virou o principal diferencial.",
      en: "São Jorge Group quarries and processes a quartz crystal used for floors, walls and countertops. While researching the stone industry, I found that almost no competitor used scroll-linked motion, so the way the material was presented became the main differentiator.",
    },
    solucao: {
      pt: "Para a estreia da mineradora numa feira comercial, construí em Next.js um site em três atos: a jazida, a matéria e o domínio do processo. O centro do site é um reprodutor de sequências de imagens, como nas páginas de produto da Apple, que avança com a rolagem e vira imagem fixa para quem prefere menos movimento. Também produzi as sequências e fiz a versão em inglês.",
      en: "For the mining company's debut at a trade show, I built a Next.js site in three acts: the quarry, the material and mastery of the process. At its core is an image-sequence player, like Apple's product pages, that advances as you scroll and becomes a still image for people who prefer less motion. I also produced the sequences and built the English version.",
    },
    resultado: {
      pt: "O site está publicado em saojorge.group, em português e inglês, com contato comercial pelo WhatsApp e formulário. Os textos ficam em arquivos separados dos componentes, e as mídias são reconhecidas pelo nome do arquivo, então novas fotos e sequências entram no site sem alterar o código das telas.",
      en: "The site is live at saojorge.group in Portuguese and English, with sales contact via WhatsApp and a contact form. Copy lives in files separate from the components, and media is picked up by file name, so new photos and sequences go in without touching the page code.",
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Lenis", "Canvas"],
    links: [{ rotulo: verOnline, url: "https://www.saojorge.group/" }],
    capturas: [
      {
        arquivo: "/midia/capturas/sao-jorge/inicio-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Abertura do site da São Jorge Group no computador: jazida com máquinas ao fundo e o título A terra levou milhões de anos para criar. Nós levamos ao mundo.",
          en: "São Jorge Group site opening on desktop: the quarry with machinery in the background and the headline The earth took millions of years to create it. We take it to the world.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/sao-jorge/inicio-02.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Seção Origem, com o texto sobre a jazida no interior da Bahia e o brasão da marca em marca-d'água.",
          en: "Origin section, with copy about the quarry in inland Bahia and the brand's coat of arms as a watermark.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/sao-jorge/secao-08.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Quadro da sequência da seção A Pedra: balcão de bar revestido com o cristal iluminado por trás.",
          en: "Frame from the scroll sequence in The Stone section: a bar counter clad in backlit crystal.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/sao-jorge/secao-18.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Galeria A pedra aplicada, com o cristal em uma cozinha de alto padrão e no balcão de um hall de hotel.",
          en: "The applied stone gallery, showing the crystal in a high-end kitchen and on a hotel lobby counter.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/sao-jorge/inicio-celular-01.jpg",
        largura: 780,
        altura: 1688,
        alt: {
          pt: "Abertura do site no celular, com seletor de idioma por bandeiras e o título sobre fundo carvão.",
          en: "Site opening on a phone, with a flag-based language switcher and the headline on a charcoal background.",
        },
        tipo: "celular",
      },
    ],
  },

  // Fonte: Projetos Analisados/sistema-brasigran.md:26-37 (infra Docker na VPS), :56-57 (remover usuário com
  // histórico, setor "Em breve"), :61 (testes escritos antes do código), :66 (campo duplicado), :72-77 (cache e
  // normalização de vídeos), :88-102 (stack exata), :128 (registro de atividade), :154-166 (portal, fluxo do
  // colaborador e do admin), :170-184 (protótipo com api.js + mock.js removível).
  // Capturas: login do portal publicado (sem entrar) e, em 2026-10-22, o app real (Downloads/Brasigran/Brasigran,
  // branch feat/migracao-supabase-para-vps) rodando localmente com Postgres 17 em Docker e dados FICTÍCIOS: pessoas,
  // e-mails, vídeos, manuais, progresso e registros inventados; os vídeos são gerados das fotos do próprio repositório.
  // Nenhum backup ou dado de produção foi usado.
  {
    slug: "brasigran",
    profissional: true,
    papel: { pt: "Desenvolvimento na agência · especificação e testes escritos antes do código", en: "Agency development · specs and tests written before the code" },
    titulo: { pt: "Portal de treinamento Brasigran", en: "Brasigran training portal" },
    categoria: "fullstack",
    ano: "2026",
    credito: creditoMorroAlto,
    resumo: {
      pt: "Portal interno de treinamento da Brasigran Granitos, com área do colaborador e painel administrativo, que evoluiu de um protótipo estático para uma aplicação Next.js com backend próprio.",
      en: "An internal training portal for Brasigran Granitos, with an employee area and an admin panel, which evolved from a static prototype into a Next.js application with its own backend.",
    },
    desafio: {
      pt: "Os colaboradores precisavam assistir aos vídeos e manuais do seu setor, com o progresso acompanhado, e a empresa precisava administrar usuários e conteúdos num painel. Como o sistema guarda dados de funcionários, login e permissões tinham de ser conferidos no servidor; a checagem no navegador não bastava.",
      en: "Employees needed to watch the videos and manuals for their sector with their progress tracked, and the company needed to manage users and content from a panel. Since the system stores employee data, sign-in and permissions had to be checked on the server; a browser-side check was not enough.",
    },
    solucao: {
      pt: "Para treinar os colaboradores da Brasigran por setor de produção, validei as telas num protótipo antes de escrever o backend. Depois desenvolvi a aplicação em Next.js e TypeScript, com banco PostgreSQL, login com senhas protegidas e interface em cinco idiomas, tudo em contêineres Docker numa VPS. Um vídeo 4K travava sempre no mesmo ponto: converti para 1080p e criei uma rotina que ajusta os vídeos novos.",
      en: "To train Brasigran's employees by production sector, I validated the screens in a prototype before writing the backend. I then built the application in Next.js and TypeScript, with a PostgreSQL database, sign-in with protected passwords and a five-language interface, running in Docker on a VPS. A 4K video kept stalling at the same point, so I converted it to 1080p and added a job that adjusts new videos.",
    },
    resultado: {
      pt: "O portal está no ar e em uso pelos colaboradores, com acesso restrito. As entregas mais recentes trouxeram o aviso Em breve para setores ainda sem vídeos, a remoção de usuários sem apagar o histórico, um registro de atividade do painel e avisos que mostram qual campo do cadastro está repetido. Cada uma foi especificada com testes escritos antes do código.",
      en: "The portal is live and used by employees, with restricted access. Recent releases added a Coming soon label for sectors without videos, user removal that keeps the history, an activity log for the panel and messages that show which sign-up field is duplicated. Each one was specified with tests written before the code.",
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Drizzle ORM",
      "MinIO",
      "Docker",
      "next-intl",
      "Vitest",
    ],
    extra: {
      titulo: { pt: "O que eu faria diferente", en: "What I would do differently" },
      texto: {
        pt: "Uma entrega foi para produção sem rodar os testes nem o build e deixou todos os setores como Em breve, até alguém notar no uso. Hoje eu só publicaria com testes, verificação de código e build aprovados, faria o deploy automático aplicar as mudanças no banco e manteria um backup fora da VPS.",
        en: "One release went to production without running the tests or the build, and it marked every sector as Coming soon until someone noticed in use. Today I would only publish with passing tests, linting and build, have the automatic deploy apply database changes and keep a backup outside the VPS.",
      },
    },
    links: [],
    restrito: true,
    capturas: [
      {
        arquivo: "/midia/capturas/brasigran/painel-colaborador-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Área do colaborador: saudação, resumo de setores concluídos e em andamento e os setores de produção em cartões com fotos e barra de progresso, com dados fictícios.",
          en: "Employee area: greeting, a summary of completed and in-progress sectors, and production sectors as photo cards with progress bars, using fictitious data.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/brasigran/setor-videos-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Página do setor Marmoraria: player de vídeo servido pela própria plataforma, percentual concluído e playlist com os vídeos marcados como assistidos.",
          en: "Marble Work sector page: video player served by the platform itself, completion percentage and a playlist with videos marked as watched.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/brasigran/setores-ingles-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Os mesmos setores com a interface em inglês, mostrando setores concluídos, em andamento e marcados como Em breve por ainda não terem vídeos.",
          en: "The same sectors with the interface in English, showing completed and in-progress sectors and sectors marked Coming soon because they have no videos yet.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/brasigran/admin-painel-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Painel administrativo: usuários ativos, engajados, vídeos e setores, gráfico de engajamento por tipo de funcionário e alcance geral.",
          en: "Admin dashboard: active and engaged users, videos and sectors, a chart of engagement by employee type and overall reach.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/brasigran/admin-usuarios-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Gestão de usuários em lista, com busca, filtro por perfil, status e ações de relatório, edição, setores liberados, permissão de administrador, senha e remoção, com nomes fictícios.",
          en: "User management as a list, with search, role filter, status and actions for report, editing, allowed sectors, admin permission, password and removal, with fictitious names.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/brasigran/admin-relatorio-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Relatório de um colaborador fictício: tempo no sistema, número de acessos, visualizações e cada vídeo assistido com setor, data e quantidade de vezes.",
          en: "Report for a fictitious employee: time spent in the system, number of sign-ins, views and each video watched with sector, date and play count.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/brasigran/admin-registros-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Registros de atividade do painel agrupados por dia, com quem criou, atualizou ou removeu cada usuário, vídeo, manual ou setor.",
          en: "Admin activity log grouped by day, showing who created, updated or removed each user, video, manual or sector.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/brasigran/admin-videos-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Lista de vídeos por setor no painel, com miniatura tirada do próprio vídeo, descrição e duração.",
          en: "Admin video list grouped by sector, with a thumbnail taken from the video itself, description and duration.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/brasigran/login-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Tela de entrada do portal publicado, no computador, com o título Capacitação Profissional e o aviso de acesso restrito.",
          en: "Sign-in screen of the live portal on desktop, with the headline Professional Training and a restricted access notice.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/brasigran/setor-celular-01.jpg",
        largura: 780,
        altura: 1688,
        alt: {
          pt: "Página de setor no celular, com o percentual concluído, as abas de vídeos e manuais e o player.",
          en: "Sector page on a phone, with the completion percentage, the videos and manuals tabs and the player.",
        },
        tipo: "celular",
      },
      {
        arquivo: "/midia/capturas/brasigran/painel-celular-01.jpg",
        largura: 780,
        altura: 1688,
        alt: {
          pt: "Área do colaborador no celular, com o resumo de progresso, a busca de setores e o primeiro setor concluído.",
          en: "Employee area on a phone, with the progress summary, the sector search and the first completed sector.",
        },
        tipo: "celular",
      },
      {
        arquivo: "/midia/capturas/brasigran/login-celular-01.jpg",
        largura: 780,
        altura: 1688,
        alt: {
          pt: "Tela de entrada do portal no celular, com seletor de idioma e alternância de tema.",
          en: "Portal sign-in screen on a phone, with a language selector and a theme toggle.",
        },
        tipo: "celular",
      },
    ],
  },


  // EST-45. Fonte: Projetos Analisados/site-diggi-saude.md:12 (plataforma de benefícios, não é plano de saúde, cadastro
  // pelo WhatsApp), :16 (pedido original), :24-27 (stack, 3 dependências, fontes locais), :29 (repositório morroalto/diggi),
  // :30 (Vercel em subdomínio, domínio definitivo não decidido), :52-53 (4 planos, modal, CPF com dígito verificador,
  // dois consentimentos), :198 (Em breve riscado e rotulado), :228 e :297 (contraste calculado), :245 (sem script de
  // terceiro, banner de cookies removido), :266 (dados no link wa.me, política não descreve), :292 (conteúdo separado,
  // retorno do cliente nos dois sites), :31-32 (sem testes nem spec). Crédito: rodapé "Desenvolvido por Morro Alto
  // Creative Office". Sem link, a pedido do Matheus (2026-10-23). Capturas do `npm run dev` local (main, cb13a6c) em
  // 2026-10-23; os campos do formulário mostram só os exemplos do próprio site.
  {
    slug: "diggi-saude",
    profissional: true,
    papel: { pt: "Desenvolvimento na agência", en: "Agency development" },
    titulo: { pt: "Diggi Saúde", en: "Diggi Saúde" },
    categoria: "frontend",
    ano: "2026",
    credito: creditoMorroAlto,
    resumo: {
      pt: "Landing de conversão da Diggi Saúde, plataforma de benefícios de saúde de Vitória (ES), pensada primeiro para o celular e voltada à escolha de um dos quatro planos.",
      en: "A conversion landing page for Diggi Saúde, a health benefits platform from Vitória, Brazil, designed mobile first to lead visitors to one of four plans.",
    },
    desafio: {
      pt: "A Diggi oferece telemedicina 24 horas, consulta com especialista e desconto em medicamentos, mas não é plano de saúde, e a página precisava deixar isso claro. O pedido incluía preços detalhados, abas de benefícios e um formulário com nome, telefone, CPF e e-mail em conformidade com a LGPD.",
      en: "Diggi offers 24-hour telemedicine, specialist appointments and medicine discounts, but it is not a health plan, and the page had to make that clear. The brief included detailed prices, benefit tabs and a form for name, phone, CPF and email compliant with Brazil's data protection law (LGPD).",
    },
    solucao: {
      pt: "Construí em Next.js, com apenas três dependências de produção, a landing que vende os quatro planos da Diggi Saúde, pensada primeiro para o celular. Cada plano abre uma janela com a cobertura completa, e benefícios ainda indisponíveis aparecem riscados, com o aviso Em breve. O formulário confere se o CPF é válido, separa o consentimento obrigatório do opcional e abre o WhatsApp de vendas com o cadastro já preenchido.",
      en: "I built the mobile-first landing page that sells Diggi Saúde's four plans in Next.js, with only three production dependencies. Each plan opens a dialog with its full coverage, and benefits not yet available appear struck through and labeled Coming soon. The form checks that the CPF is valid, separates required from optional consent and opens the sales WhatsApp with the sign-up already filled in.",
    },
    resultado: {
      pt: "A página está no ar em endereço provisório, enquanto o domínio definitivo não é decidido. Como os textos ficam separados dos componentes, apliquei numa só rodada as revisões do cliente nesta página e na versão para empresas. O site não carrega scripts de terceiros e, por isso, dispensa o aviso de cookies.",
      en: "The page is live at a temporary address while the final domain is decided. Because the copy is kept apart from the components, I applied the client's revisions to this page and to the business version in a single round. The site loads no third-party scripts, so it needs no cookie banner.",
    },
    extra: {
      titulo: { pt: "O que eu faria diferente", en: "What I would do differently" },
      texto: {
        pt: "O cadastro abre o WhatsApp com nome, CPF e e-mail escritos no próprio link, que fica guardado no histórico do navegador, e a política de privacidade não descreve esse caminho. O projeto também começou sem especificação nem testes. Hoje eu enviaria o cadastro a um servidor que registre o consentimento e escreveria os critérios de aceite antes do código.",
        en: "The sign-up opens WhatsApp with name, CPF and email written into the link itself, which stays in the browser history, and the privacy policy does not describe that path. The project also started without a spec or tests. Today I would send the sign-up to a server that records consent and write the acceptance criteria before the code.",
      },
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    links: [],
    capturas: [
      {
        arquivo: "/midia/capturas/diggi-saude/inicio-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Abertura da landing da Diggi Saúde no computador: fundo roxo, o título Médico 24 horas no seu celular e o botão Assinar a partir de R$ 27,80.",
          en: "Diggi Saúde landing page opening on desktop: a purple background, the headline Doctor 24 hours on your phone and the Subscribe from R$ 27.80 button.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/diggi-saude/planos-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Seção Quatro planos. Escolha o seu, com os cartões das linhas Plus e Top, individual e familiar, e o preço mensal de cada um.",
          en: "Four plans. Choose yours section, with the Plus and Top cards, individual and family, and the monthly price of each.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/diggi-saude/cobertura-modal-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Janela de cobertura do plano Diggi Plus Individual, com os benefícios incluídos, os itens marcados como Em breve e o botão Contratar plano.",
          en: "Coverage dialog for the Diggi Plus Individual plan, with the included benefits, items marked Coming soon and the Get this plan button.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/diggi-saude/galeria-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Seção Como o cuidado acontece, com mosaico de fotos sobre consulta pelo celular, rede credenciada e remédio com desconto, e o selo Sem carência.",
          en: "How care happens section, with a photo mosaic about phone consultations, partner clinics and discounted medicine, and a No waiting period seal.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/diggi-saude/cadastro-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Formulário de cadastro sobre fundo roxo, com nome, celular, CPF e e-mail, consentimento obrigatório separado do opcional e aviso de proteção de dados.",
          en: "Sign-up form on a purple background, with name, mobile, CPF and email fields, required consent separate from optional consent and a data protection notice.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/diggi-saude/inicio-celular-01.jpg",
        largura: 780,
        altura: 1688,
        alt: {
          pt: "Abertura da landing no celular, com o título, os quatro diferenciais e o botão com o preço a partir de R$ 27,80.",
          en: "Landing page opening on a phone, with the headline, the four key benefits and the button showing the starting price of R$ 27.80.",
        },
        tipo: "celular",
      },
    ],
  },




];
