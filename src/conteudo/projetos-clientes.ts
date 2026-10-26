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

  // Fonte: Projetos Analisados/site-linktree-bebe-tricot.md:12 (o que é, três destinos, sem JavaScript),
  // :20-21 (HTML + CSS, Lora e Manrope), :24 e :76-79 (publicação no CRM, imagens da biblioteca de mídia),
  // :33 (UTM preservadas), :47-74 (design, foco, movimento reduzido), :93-95 (HTML autossuficiente, mídia por ID).
  // Endereço publicado conferido em 2026-10-20 (HTTP 200, título "Bebê Tricot | Nossos links", ~9 KB);
  // a nota registrava que a URL final não estava anotada.
  {
    slug: "bebe-tricot",
    profissional: true,
    papel: { pt: "Adaptação e publicação no CRM da marca", en: "Adapted and published in the brand's CRM" },
    titulo: { pt: "Bebê Tricot: página de links", en: "Bebê Tricot: link-in-bio page" },
    categoria: "frontend",
    ano: "2026",
    credito: creditoMorroAlto,
    resumo: {
      pt: "Página de links da Bebê Tricot, marca de roupas de tricô para bebês, publicada dentro do CRM da própria marca.",
      en: "A link-in-bio page for Bebê Tricot, a brand of knitted baby clothes, published inside the brand's own CRM.",
    },
    desafio: {
      pt: "A página precisava levar a três destinos, a loja online, o cadastro de lojistas e o perfil da marca, sem perder os parâmetros de campanha dos links. Ela seria publicada como conteúdo dentro do CRM, que não serve os arquivos de uma pasta de projeto.",
      en: "The page had to lead to three destinations, the online store, the retailer sign-up form and the brand's profile, without losing the campaign parameters in the links. It would be published as content inside the CRM, which does not serve files from a project folder.",
    },
    solucao: {
      pt: "Para a página de links do Instagram da marca, usei só HTML e CSS, sem JavaScript, com a loja online em destaque e dois botões secundários. A dupla de fontes Lora e Manrope e a paleta lilás e azulada combinam com roupas de bebê. Para publicar dentro do CRM, deixei tudo num único arquivo, com as imagens vindas da biblioteca de mídia do próprio CRM.",
      en: "For the brand's Instagram link page, I used HTML and CSS only, no JavaScript, with the online store featured and two secondary buttons. I paired the Lora and Manrope typefaces with a lilac and soft blue palette suited to baby clothing. To publish it inside the CRM, I put everything in a single file, with images loaded from the CRM's own media library.",
    },
    resultado: {
      pt: "A página está no ar dentro do CRM e pesa cerca de 9 KB. Como as imagens são buscadas na biblioteca de mídia, trocar uma foto lá atualiza a página sem nenhuma mudança no código.",
      en: "The page is live inside the CRM and weighs about 9 KB. Because the images come from the media library, replacing a photo there updates the page without any code change.",
    },
    extra: {
      titulo: { pt: "O que eu faria diferente", en: "What I would do differently" },
      texto: {
        pt: "A versão colada no CRM ficou fora do repositório, e a página não teve especificação nem testes. Os ícones da aba do navegador apontam para caminhos que não existem no CRM. Hoje eu manteria no repositório exatamente a versão publicada e enviaria os ícones como mídia do CRM.",
        en: "The version pasted into the CRM never made it into the repository, and the page had no spec or tests. The browser tab icons point to paths that do not exist in the CRM. Today I would keep the exact live version in the repository and upload the icons as CRM media.",
      },
    },
    stack: ["HTML", "CSS"],
    links: [{ rotulo: verOnline, url: "https://crm.bebetricot.com.br/links" }],
    capturas: [
      {
        arquivo: "/midia/capturas/bebe-tricot/inicio-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Página de links da Bebê Tricot no computador: cartão translúcido com o logotipo, a loja online em destaque e os botões Seja um lojista e Nosso dia a dia.",
          en: "Bebê Tricot link page on desktop: a translucent card with the logo, the online store featured, and the Become a retailer and Our daily life buttons.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/bebe-tricot/inicio-celular-01.jpg",
        largura: 780,
        altura: 1688,
        alt: {
          pt: "Página de links da Bebê Tricot no celular, com o cartão da loja online e a foto de um bebê com roupa de tricô lilás.",
          en: "Bebê Tricot link page on a phone, with the online store card and a photo of a baby in a lilac knitted outfit.",
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

  // Fonte: Projetos Analisados/site-mister-cook.md:12 (restaurante, campeão Abrasel 2025, duas fases, cliente da
  // Acex Partners), :19 e :24 (stack e design system em PDF de 25 páginas), :27-32 (conversão por WhatsApp e rota,
  // sem preço por item), :148 (ícones próprios), :162-176 (acessibilidade e SEO), :193-208 (correções do cliente,
  // fotos em WebP 2492 KB -> 1200 KB), :210-213 (sitemap, robots, perfil do Google).
  // Publicação conferida em 2026-10-20: https://www.mistercook.com.br/ responde 200 (build Next) com o mesmo título;
  // a ficha da nota ainda dizia "não publicado". Sem `credito`: a nota não indica cliente da Morro Alto.
  {
    slug: "mister-cook",
    profissional: true,
    papel: { pt: "Trabalho para cliente da Acex Partners", en: "Work for an Acex Partners client" },
    titulo: { pt: "Mister Cook", en: "Mister Cook" },
    categoria: "frontend",
    ano: "2026",
    resumo: {
      pt: "Site institucional do Mister Cook, restaurante a quilo de Vitória (ES) campeão nacional do concurso da Abrasel em 2025, acompanhado de um design system em PDF.",
      en: "A corporate website for Mister Cook, a pay-by-weight restaurant in Vitória, Brazil, and national champion of the 2025 Abrasel contest, delivered together with a PDF design system.",
    },
    desafio: {
      pt: "O site precisava transformar buscas como “melhor a quilo em Vitória” em visitas, reservas de eventos e conversas pelo WhatsApp. Havia também uma restrição de conteúdo: nenhum prato podia mostrar preço fixo, porque no restaurante a quilo quem define o valor é a balança.",
      en: "The site had to turn searches like “best pay-by-weight restaurant in Vitória” into visits, event bookings and WhatsApp conversations. There was also a content constraint: no dish could show a fixed price, because at a pay-by-weight restaurant the scale sets the price.",
    },
    solucao: {
      pt: "O restaurante tinha acabado de ganhar o título nacional da Abrasel. Primeiro diagramei um design system na identidade da marca, entregue em PDF de 25 páginas. Depois construí o site em Next.js, numa página única com o prêmio como fio condutor e ícones desenhados no traço do símbolo da marca. Cuidei da acessibilidade e do SEO local, com dados estruturados e vínculo com o perfil do restaurante no Google.",
      en: "The restaurant had just won the national Abrasel title. I first laid out a design system in the brand's identity, delivered as a 25-page PDF. Then I built a single-page Next.js site, with the award as its common thread and icons drawn in the style of the brand's symbol. I also handled accessibility and local SEO, with structured data and a link to the restaurant's Google profile.",
    },
    resultado: {
      pt: "O site está publicado em mistercook.com.br. Converti as fotos para WebP com até 1200 px, e o peso delas caiu de cerca de 2,5 MB para 1,2 MB; a imagem de compartilhamento passou de 2 MB para 24 KB. O sitemap e o vínculo com o perfil do Google entraram na mesma rodada.",
      en: "The site is live at mistercook.com.br. I converted the photos to WebP at up to 1200 px, cutting their weight from about 2.5 MB to 1.2 MB, and the share image went from 2 MB to 24 KB. The sitemap and the link to the Google profile came in the same round.",
    },
    extra: {
      titulo: { pt: "O que eu faria diferente", en: "What I would do differently" },
      texto: {
        pt: "Parte do conteúdo veio de pesquisa na internet e estava errada: o restaurante não faz delivery nem serve comida japonesa, a tilápia foi apenas o prato do concurso e as carnes nobres só saem às sextas e aos sábados. Hoje, cardápio e canais de venda só entram no site depois de confirmados pelo cliente e conferidos na página pronta.",
        en: "Some of the content came from web research and was wrong: the restaurant has no delivery or Japanese food, the tilapia was only the contest dish and premium cuts are served only on Fridays and Saturdays. Today the menu and sales channels only go on the site after the client confirms them, checked on the finished page.",
      },
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    links: [{ rotulo: verOnline, url: "https://www.mistercook.com.br/" }],
    capturas: [
      {
        arquivo: "/midia/capturas/mister-cook/inicio-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Abertura do site do Mister Cook no computador: fundo vinho com padrão de escamas, o título O melhor restaurante a quilo do Brasil abre às 11h e a foto do chef com a placa de campeão nacional de 2025.",
          en: "Mister Cook site opening on desktop: a burgundy background with a scale pattern, the headline The best pay-by-weight restaurant in Brazil opens at 11 a.m., and a photo of the chef holding the 2025 national champion plaque.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/mister-cook/inicio-02.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Seção do prêmio, com o selo circular Melhor a quilo do Brasil, Abrasel 2025, sobre fundo mostarda.",
          en: "Award section, with the circular Best pay-by-weight in Brazil, Abrasel 2025 seal on a mustard background.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/mister-cook/secao-05.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Cardápio com os cartões de churrasco e de pratos do mar e etiquetas com os dias em que cada prato é servido.",
          en: "Menu with barbecue and seafood cards and tags showing the days each dish is served.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/mister-cook/secao-09.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Galeria de pratos em carrossel e início da seção de eventos e comemorações.",
          en: "Dish gallery carousel and the start of the events and celebrations section.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/mister-cook/inicio-celular-01.jpg",
        largura: 780,
        altura: 1688,
        alt: {
          pt: "Abertura do site no celular, com os botões do cardápio do dia, de como chegar e do WhatsApp.",
          en: "Site opening on a phone, with buttons for today's menu, directions and WhatsApp.",
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

  // EST-45. Fonte: Projetos Analisados/site-morro-alto.md:12-18 (landing de captação reescrita em Next), :56-69 (formulário
  // em 2 etapas, SQL/MQL pela faixa de faturamento), :86-90 (74 vídeos, 264 MB, setInterval de 650 ms), :96-101 (poster
  // primeiro, teto de 6/2, IntersectionObserver com histerese), :108 (loops 264 MB -> 11,1 MB), :378 e :412-414 (logo
  // quebrado em produção achado na migração), :387 (sem verificação visual em navegador), :434-438 (produção em julho),
  // :546-553 (VPS com Docker, robots e sitemap desde 2026-09-14), :576 (branch site-institucional não publicado).
  // Versão institucional: morro-alto-next/PLANO-SITE-INSTITUCIONAL.md:63-113 (auditoria contra o Branding Book 2026:
  // paleta fechada, três fontes, serifa removida) e src/lib/consentimento.ts:4-7 (três categorias, guia da ANPD).
  // Capturas da árvore de trabalho do branch `site-institucional` (0cbe386 + alterações locais de 19 a 21/10/2026),
  // copiada para uma pasta temporária e rodada com `next dev` em 2026-10-23. O link leva à versão no ar (EST-50).
  {
    slug: "morro-alto-site",
    profissional: true,
    papel: { pt: "Desenvolvimento na agência", en: "Agency development" },
    titulo: { pt: "Site da Morro Alto", en: "Morro Alto website" },
    categoria: "frontend",
    ano: "2026",
    credito: { pt: "Site da Morro Alto Creative Office", en: "Website of Morro Alto Creative Office" },
    resumo: {
      pt: "Site da própria agência, que nasceu como landing de captação e está virando site institucional, com início, serviços, quem somos, cases e contato. A versão mostrada é a nova, ainda em desenvolvimento.",
      en: "The agency's own website, which began as a lead capture landing page and is becoming a corporate site with home, services, about, cases and contact pages. The version shown is the new one, still in development.",
    },
    desafio: {
      pt: "O paredão tinha 74 vídeos, 264 MB de arquivos e uma rotina que conferia a posição de todos eles a cada 650 ms. Depois, a página precisava crescer para um site institucional fiel ao novo manual da marca, enquanto o site no ar usava cores fora da paleta e tinha abandonado a fonte serifada obrigatória.",
      en: "The wall had 74 videos, 264 MB of files and a routine that checked the position of every one of them every 650 ms. Later, the page had to grow into a corporate site faithful to the new brand book, while the live site used off-palette colors and had dropped the mandatory serif typeface.",
    },
    solucao: {
      pt: "A landing da agência travava por causa do paredão de vídeos da abertura. Reescrevi a página em Next.js e mudei a regra do paredão: cada vídeo começa como imagem e só tocam os que estão na tela, até seis no computador e dois no celular. Na versão institucional, auditei o site contra o novo manual da marca e montei as páginas novas.",
      en: "The agency's landing page froze because of the video wall in its hero. I rewrote the page in Next.js and changed how the wall works: every video starts as an image and only the ones on screen play, up to six on desktop and two on phones. For the corporate version, I audited the site against the new brand book and built the new pages.",
    },
    resultado: {
      pt: "Os vídeos do paredão caíram de 264 MB para 11,1 MB. A versão de captação está no ar desde julho de 2026 e, desde setembro, roda em Docker numa VPS, com formulário em duas etapas que classifica cada contato pela faixa de faturamento. A versão institucional das capturas está em desenvolvimento num ramo separado, e o link leva ao site no ar.",
      en: "The wall's videos dropped from 264 MB to 11.1 MB. The lead capture version has been live since July 2026 and, since September, runs in Docker on a VPS, with a two-step form that ranks each lead by revenue bracket. The corporate version in the screenshots is in development on a separate branch, and the link goes to the live site.",
    },
    extra: {
      titulo: { pt: "O que eu faria diferente", en: "What I would do differently" },
      texto: {
        pt: "A primeira reescrita foi entregue sem conferência visual no navegador, e um logotipo quebrado continuou em produção, sem ninguém notar, até a migração. Hoje eu conferiria cada página antes de publicar e teria uma checagem automática de que todo arquivo citado no código existe.",
        en: "The first rewrite was delivered without a visual check in a browser, and a broken logo stayed in production unnoticed until the migration. Today I would check every page before publishing and run an automated check that every file referenced in the code exists.",
      },
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Docker"],
    links: [{ rotulo: verOnline, url: "https://morroalto.co/" }],
    capturas: [
      {
        arquivo: "/midia/capturas/morro-alto-site/inicio-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Abertura da versão nova do site da Morro Alto no computador: título Sua marca pronta para crescer, com estratégia de verdade, ao lado do paredão de vídeos de clientes e da faixa de logotipos.",
          en: "Opening of the new Morro Alto website on desktop: the headline Your brand ready to grow, with real strategy, next to the wall of client videos and the logo strip.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/morro-alto-site/servicos-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Página de serviços: Nove serviços, três frentes, um time só, com as colunas Marca, Conteúdo e Crescimento e o que cada serviço inclui.",
          en: "Services page: Nine services, three fronts, one team, with the Brand, Content and Growth columns and what each service includes.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/morro-alto-site/quem-somos-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Página Quem somos: linha do tempo Cinco anos, uma virada de rota, de 2020 à meta para 2027.",
          en: "About page: the Five years, one change of course timeline, from 2020 to the goal for 2027.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/morro-alto-site/cases-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Página de cases: título Marcas que saíram do invisível para o inevitável e os primeiros cartões de clientes.",
          en: "Cases page: the headline Brands that went from invisible to inevitable and the first client cards.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/morro-alto-site/comparativo-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Tabela Freelancer ou agência tradicional? Nenhum dos dois, que compara a Morro Alto a equipe interna, agências, freelancers e IA em velocidade, estratégia, qualidade, escala e resultado.",
          en: "Freelancer or traditional agency? Neither table, comparing Morro Alto with an in-house team, agencies, freelancers and AI on speed, strategy, quality, scale and results.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/morro-alto-site/contato-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Página de contato: Uma conversa. Sem compromisso., os três passos do atendimento e o início do formulário em duas etapas.",
          en: "Contact page: A conversation. No strings attached., the three steps of the process and the start of the two-step form.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/morro-alto-site/inicio-celular-01.jpg",
        largura: 780,
        altura: 1688,
        alt: {
          pt: "Abertura no celular, com o título centralizado, o botão de diagnóstico gratuito e o paredão de vídeos em faixas horizontais.",
          en: "Opening on a phone, with the centered headline, the free assessment button and the video wall in horizontal strips.",
        },
        tipo: "celular",
      },
    ],
  },

  // EST-70. Fonte: Projetos Analisados/site-linktree-sumwise.md:12 (cliente, conceito de cupom/extrato), :15 (o site
  // institucional sumwise.com.br NÃO é deste trabalho), :23-24 (HTML + CSS + JS sem dependências, Poppins e IBM Plex Mono),
  // :26 e :122 (sem spec nem testes), :27 (Vercel), :35 e :41 (troca do WhatsApp em 2026-10-07, publicação automática),
  // :46-58 (7 lançamentos com ação, saldo de resultados, carimbo), :60 (código de barras), :61 (crédito "Desenvolvido por
  // Morro Alto Creative Office"), :66 (cores da logo), :81-90 (efeitos só em CSS), :93-96 (HTML com números finais, JS só
  // encena, movimento reduzido), :113 e :139 (CNAME criado no painel errado), :128 (og:image relativo).
  // Link pedido pelo Matheus em 2026-10-26: https://links.sumwise.com.br/. Em 2026-10-26 esse subdomínio ainda NÃO resolve
  // (NXDOMAIN no 8.8.8.8 e no 1.1.1.1, como a nota já registrava em :28 e :115); a página está no ar em
  // https://sumwiselinktree.vercel.app/ (HTTP 200, título "SumWise Consultoria · Links"), de onde saíram as capturas.
  // A nota deixa como hipótese (:37-38) que a criação inicial foi feita em outra máquina.
  {
    slug: "sumwise-links",
    profissional: true,
    papel: { pt: "Desenvolvimento na agência", en: "Agency development" },
    titulo: { pt: "SumWise: página de links", en: "SumWise: link-in-bio page" },
    categoria: "frontend",
    ano: "2026",
    credito: creditoMorroAlto,
    resumo: {
      pt: "Página de links da bio da SumWise Consultoria, de gestão financeira e BPO financeiro para postos de combustíveis, desenhada como um cupom fiscal que sai da impressora.",
      en: "A link-in-bio page for SumWise Consultoria, a financial management and outsourced finance (BPO) firm for fuel stations, designed as a receipt coming out of a printer.",
    },
    desafio: {
      pt: "A SumWise precisava reunir sete destinos numa só página: WhatsApp, agendamento de demonstração, Instagram, LinkedIn, site, e-mail e área do cliente, com o WhatsApp em primeiro lugar. Os números da empresa, como mais de 10 anos no mercado de postos e mais de 500 atendimentos, também tinham de aparecer.",
      en: "SumWise needed seven destinations on one page: WhatsApp, demo booking, Instagram, LinkedIn, website, email and the client area, with WhatsApp first. The company's numbers, such as more than 10 years in the fuel station market and more than 500 clients served, also had to be shown.",
    },
    solucao: {
      pt: "Transformei a página num extrato de finanças: o papel desce da fenda de uma impressora, cada link é um lançamento numerado com sua ação (Chamar, Agendar, Seguir, Entrar) e os números da empresa formam o saldo de resultados, com carimbo e código de barras. Fiz em HTML, CSS e JavaScript, sem dependências; a textura do papel, o serrilhado e o código de barras são só CSS, nas cores da logo.",
      en: "I turned the page into a financial statement: the paper slides out of a printer slot, each link is a numbered entry with its action (Call, Book, Follow, Sign in) and the company's numbers make up the results balance, with a stamp and a barcode. I built it in HTML, CSS and JavaScript with no dependencies; the paper texture, the serrated edge and the barcode are pure CSS, in the logo's colors.",
    },
    resultado: {
      pt: "A página está publicada na Vercel. O HTML já traz os números finais, e o JavaScript só encena a impressão, o carimbo e a contagem; sem JavaScript ou com movimento reduzido, ela aparece pronta. Quando a empresa trocou de WhatsApp, atualizei os links e a Vercel publicou a nova versão sozinha.",
      en: "The page is live on Vercel. The HTML already contains the final numbers, and JavaScript only stages the printing, the stamp and the count-up; without JavaScript or with reduced motion, it appears complete. When the company changed its WhatsApp number, I updated the links and Vercel published the new version on its own.",
    },
    extra: {
      titulo: { pt: "O que eu faria diferente", en: "What I would do differently" },
      texto: {
        pt: "A página não teve especificação nem testes, e a imagem de compartilhamento usa um caminho relativo, que o WhatsApp não aceita. No subdomínio, o registro foi criado num painel de DNS que não responde pelo domínio. Hoje eu escreveria os critérios de aceite antes do código e conferiria primeiro quais servidores de nome respondem pelo domínio.",
        en: "The page had no spec or tests, and the share image uses a relative path, which WhatsApp does not accept. For the subdomain, the record was created in a DNS panel that does not serve the domain. Today I would write the acceptance criteria before the code and first check which name servers actually answer for the domain.",
      },
    },
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
    links: [{ rotulo: verOnline, url: "https://sumwiselinktree.vercel.app/" }], // EST-77: até links.sumwise.com.br ter DNS
    capturas: [
      {
        arquivo: "/midia/capturas/sumwise-links/inicio-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Página de links da SumWise no computador: cupom de papel saindo de uma fenda escura, com a logo, a frase Soluções financeiras que movem o seu posto de combustível e sete lançamentos numerados, o primeiro, Falar no WhatsApp, em azul.",
          en: "SumWise link page on desktop: a paper receipt coming out of a dark slot, with the logo, the tagline Financial solutions that move your fuel station and seven numbered entries, the first, Talk on WhatsApp, in blue.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/sumwise-links/inicio-celular-01.jpg",
        largura: 780,
        altura: 1688,
        alt: {
          pt: "Página de links da SumWise no celular: o cupom ocupa a tela, com os botões de ação Chamar, Agendar, Seguir, Conectar, Visitar, Escrever e Entrar e o carimbo azul começando a aparecer embaixo.",
          en: "SumWise link page on a phone: the receipt fills the screen, with the Call, Book, Follow, Connect, Visit, Write and Sign in action buttons and the blue stamp starting to show at the bottom.",
        },
        tipo: "celular",
      },
    ],
  },

  // EST-70. Fonte: Projetos Analisados/site-linktree-scardua.md:12 (laboratório de prótese dentária, Vila Velha, "Dental
  // Design Excellence"), :19-21 (HTML + CSS + JS sem deps, Manrope, 472 KB com fotos em WebP), :22-23 (15 testes com
  // node --test, spec 001 com 4 revisões), :25 (Vercel), :35-38 (revisões; rev. 4 troca Resultados por Instagram), :41-42
  // (pedido e fotos só com o fundador), :49-50 (só preto e branco; verde e favicon de JPEG corrigidos), :51 (loader com o
  // símbolo em duas peças), :52 e :55 (carrossel: 11 próteses + 2 fotos dele, descartadas as com marca de outros), :53
  // (crédito "Desenvolvido por Morro Alto Creative Office"), :54 (favicon versionado pelo cache), :71 (spec e teste juntos).
  // Link pedido pelo Matheus em 2026-10-26: https://links.labscardua.com.br/. Em 2026-10-26 esse subdomínio ainda NÃO existe
  // (NXDOMAIN no 8.8.8.8 e no DNS autoritativo da Cloudflare; a nota, :26 e :75, diz que não havia domínio próprio); a
  // página está no ar em https://scardualab.vercel.app/ (HTTP 200, título "Scardua Lab — Links"), de onde saíram as capturas.
  {
    slug: "scardua-lab-links",
    profissional: true,
    papel: { pt: "Desenvolvimento na agência · especificação e 15 testes", en: "Agency development · a spec and 15 tests" },
    titulo: { pt: "Scardua Lab: página de links", en: "Scardua Lab: link-in-bio page" },
    categoria: "frontend",
    ano: "2026",
    credito: creditoMorroAlto,
    resumo: {
      pt: "Página de links da bio do Scardua Lab, laboratório de prótese dentária de Vila Velha (ES), com o fundador na capa, contato, localização, Instagram, site e um carrossel com as próteses do laboratório.",
      en: "A link-in-bio page for Scardua Lab, a dental prosthesis lab in Vila Velha, Brazil, with the founder on the cover, contact, location, Instagram, website and a carousel of the lab's prostheses.",
    },
    desafio: {
      pt: "A marca é só preto e branco, e o laboratório queria mostrar o próprio trabalho, as próteses. As fotos vinham de um ensaio profissional e de uma pasta com 283 imagens de resultados, várias com arroba ou marca de outros profissionais, que não podiam entrar na página.",
      en: "The brand is black and white only, and the lab wanted to show its own work, the prostheses. The photos came from a professional shoot and a folder of 283 result images, several carrying other professionals' handles or watermarks, which could not go on the page.",
    },
    solucao: {
      pt: "Fiz a página em HTML, CSS e JavaScript, sem dependências, com especificação e 15 testes automáticos. No topo, o fundador no corredor do laboratório; abaixo, quatro cartões e um carrossel de 11 próteses com rolagem nativa, em que o JavaScript cuida só dos pontos, das setas e da troca automática. Na abertura, as duas peças do símbolo oficial entram de cantos opostos e se encaixam.",
      en: "I built the page in HTML, CSS and JavaScript with no dependencies, plus a spec and 15 automated tests. At the top, the founder in the lab's corridor; below, four cards and a carousel of 11 prostheses with native scrolling, where JavaScript only handles the dots, arrows and autoplay. In the intro, the two pieces of the official symbol slide in from opposite corners and lock together.",
    },
    resultado: {
      pt: "A página está publicada na Vercel e pesa 472 KB no total, com as fotos em WebP. Passou por quatro revisões, a última trocando o cartão de resultados pelo do Instagram, e cada uma atualizou a especificação e os testes no mesmo commit.",
      en: "The page is live on Vercel and weighs 472 KB in total, with photos in WebP. It went through four revisions, the last replacing the results card with an Instagram card, and each one updated the spec and the tests in the same commit.",
    },
    extra: {
      titulo: { pt: "O que eu faria diferente", en: "What I would do differently" },
      texto: {
        pt: "Na primeira versão, usei um verde tirado de uma peça do enxoval e um favicon montado a partir de um JPEG, mas a marca é só preto e branco e tem arquivos oficiais no próprio site. Hoje eu partiria dos arquivos oficiais e trocaria o nome do favicon a cada mudança, porque o navegador o guarda pelo nome.",
        en: "In the first version, I used a green taken from one of the brand's stationery pieces and a favicon built from a JPEG, but the brand is black and white only and has official files on its own website. Today I would start from the official files and rename the favicon on every change, because browsers cache it by name.",
      },
    },
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Vercel"],
    links: [{ rotulo: verOnline, url: "https://scardualab.vercel.app/" }], // EST-77: até links.labscardua.com.br ter DNS
    capturas: [
      {
        arquivo: "/midia/capturas/scardua-lab-links/inicio-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Página de links do Scardua Lab no computador: fundo preto, foto do fundador Isaltino Scardua no corredor do laboratório, a logo com Dental Design Excellence e os cartões Contato, em branco, Localização e Instagram.",
          en: "Scardua Lab link page on desktop: a black background, a photo of founder Isaltino Scardua in the lab's corridor, the logo with Dental Design Excellence and the Contact card in white, followed by Location and Instagram.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/scardua-lab-links/inicio-celular-01.jpg",
        largura: 780,
        altura: 1688,
        alt: {
          pt: "Página de links do Scardua Lab no celular, com a foto do fundador ocupando a primeira dobra e os cartões de contato, localização, Instagram e site.",
          en: "Scardua Lab link page on a phone, with the founder's photo filling the first screen and the contact, location, Instagram and website cards.",
        },
        tipo: "celular",
      },
    ],
  },

  // EST-70. Fonte: Projetos Analisados/site-linktree-dra-jania.md:12 (o que é, links.janiascardua.com.br, separada da landing),
  // :20-21 (arquivo único sem dependências, Cormorant Garamond + Inter Tight), :23-24 (sem spec, testes nem git), :25 e
  // :100-104 (VPS, Docker + Caddy atrás do edge-caddy, só leitura, cap_drop ALL; domínio raiz na Vercel), :29-35 (pedido e
  // ajustes: ordem dos links, resultados viram carrossel, rodízio da capa), :37-47 (seis versões em 2026-09-29; botões-foto
  // rejeitados), :52 e :111 (só Agendar consulta preenchido), :56 (tokens herdados da landing), :84 e :124 (rodízio de 5
  // fotos, 4 s + 1,1 s), :87-88 (carrossel e popup do antes e depois), :92 (og e canonical absolutos), :107-108 (Caddy em
  // loop com a capability do binário), :129 (VPS é a única cópia). Crédito: rodapé da página publicada, index.html:555,
  // "Feito por Morro Alto — Creative Office". Endereço conferido em 2026-10-26: HTTP 200, título "Dra. Jânia Scardua — Links".
  {
    slug: "dra-jania-links",
    profissional: true,
    papel: { pt: "Desenvolvimento na agência e publicação na VPS", en: "Agency development and VPS deployment" },
    titulo: { pt: "Dra. Jânia Scardua: página de links", en: "Dr. Jânia Scardua: link-in-bio page" },
    categoria: "frontend",
    ano: "2026",
    credito: creditoMorroAlto,
    resumo: {
      pt: "Página de links da bio da Dra. Jânia Scardua, dentista de odontologia estética e reabilitação oral em Vila Velha (ES), separada do site principal e com casos de antes e depois.",
      en: "A link-in-bio page for Dr. Jânia Scardua, a dentist specializing in aesthetic dentistry and oral rehabilitation in Vila Velha, Brazil, separate from her main site and featuring before-and-after cases.",
    },
    desafio: {
      pt: "A página precisava levar ao agendamento pelo WhatsApp, ao Instagram, ao site e à localização e mostrar resultados sem mandar a pessoa para uma pasta do Drive. Também tinha de ficar num subdomínio da dentista, num servidor próprio, sem mexer no domínio principal, que continua na Vercel.",
      en: "The page had to lead to WhatsApp booking, Instagram, the website and the location, and show results without sending people to a Drive folder. It also had to live on a subdomain of the dentist's own domain, on a self-managed server, without touching the main domain, which stays on Vercel.",
    },
    solucao: {
      pt: "Usei as cores e as fontes do site da dentista num único arquivo HTML, sem dependências. A capa troca entre cinco fotos dela a cada quatro segundos, só o Agendar consulta vem preenchido, e os resultados viraram um carrossel de antes e depois que abre em janela. Publiquei num contêiner Docker com Caddy na VPS, só leitura e sem privilégios.",
      en: "I used the colors and fonts of the dentist's website in a single HTML file with no dependencies. The cover rotates through five photos of her every four seconds, only the Book an appointment button is filled in, and the results became a before-and-after carousel that opens in a dialog. I deployed it in a Docker container with Caddy on the VPS, read-only and without privileges.",
    },
    resultado: {
      pt: "A página está no ar em links.janiascardua.com.br desde setembro de 2026, com imagem de compartilhamento e endereços absolutos para a prévia no WhatsApp. Chegou à versão publicada depois de seis versões num só dia; uma delas, com botões feitos de foto, foi descartada porque não parecia clicável e cortava os rostos.",
      en: "The page has been live at links.janiascardua.com.br since September 2026, with a share image and absolute URLs for the WhatsApp preview. It reached the published version after six versions in a single day; one of them, with photo buttons, was dropped because it did not look clickable and cropped faces.",
    },
    extra: {
      titulo: { pt: "O que eu faria diferente", en: "What I would do differently" },
      texto: {
        pt: "A página não tem especificação, testes nem repositório: a única cópia fora do meu computador é a do servidor. O Caddy também entrou em reinício contínuo, porque o programa pedia uma permissão que o contêiner endurecido bloqueia. Hoje eu versionaria tudo desde o início e testaria o contêiner com as mesmas restrições antes de publicar.",
        en: "The page has no spec, tests or repository: the only copy outside my computer is the one on the server. Caddy also got stuck in a restart loop, because the binary requested a permission the hardened container blocks. Today I would version everything from the start and test the container with the same restrictions before publishing.",
      },
    },
    stack: ["HTML", "CSS", "JavaScript", "Docker", "Caddy"],
    links: [{ rotulo: verOnline, url: "https://links.janiascardua.com.br/" }],
    capturas: [
      {
        arquivo: "/midia/capturas/dra-jania-links/inicio-01.jpg",
        largura: 2880,
        altura: 1800,
        alt: {
          pt: "Página de links da Dra. Jânia Scardua no computador: folha bege sobre fundo carvão, foto dela na capa, o nome em serifa itálica, o botão escuro Agendar consulta e os links Instagram, Site oficial e Localização.",
          en: "Dr. Jânia Scardua link page on desktop: a beige sheet on a charcoal background, her photo on the cover, her name in an italic serif, the dark Book an appointment button and the Instagram, Official website and Location links.",
        },
        tipo: "desktop",
      },
      {
        arquivo: "/midia/capturas/dra-jania-links/inicio-celular-01.jpg",
        largura: 780,
        altura: 1688,
        alt: {
          pt: "Página de links da Dra. Jânia no celular, com o retrato dela dissolvendo no bege, a especialidade em letras espaçadas e o botão Agendar consulta.",
          en: "Dr. Jânia link page on a phone, with her portrait fading into beige, her specialty in spaced capitals and the Book an appointment button.",
        },
        tipo: "celular",
      },
    ],
  },
];
