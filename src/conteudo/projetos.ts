import dimensoes from "./dimensoes.json";
import type { Captura, Categoria, Projeto, Texto } from "./tipos";
import { projetosClientes } from "./projetos-clientes";

const DIM = dimensoes as unknown as Record<string, [number, number]>;

function cap(arquivo: string, pt: string, en: string, tipo: Captura["tipo"] = "desktop"): Captura {
  const [largura, altura] = DIM[arquivo] ?? [1440, 900];
  return { arquivo, largura, altura, alt: { pt, en }, tipo };
}

const T = (pt: string, en: string): Texto => ({ pt, en });
const ONLINE = T("Ver online", "Visit site");
const CODIGO = T("Código no GitHub", "Code on GitHub");
const AGENCIA = T("Cliente da Morro Alto Creative Office", "Client of Morro Alto Creative Office");

/** Projetos pessoais, acadêmicos e da agência. Fontes: portfolio2/src/content/projects.ts, vault e repositórios. */
export const projetosProprios: Projeto[] = [
  {
    slug: "solvered",
    titulo: T("Solvered", "Solvered"),
    categoria: "fullstack",
    ano: "2024–2026",
    papel: T("Projeto pessoal, feito por mim do layout ao banco de dados", "Personal project, built by me from layout to database"),
    resumo: T("Loja virtual de roupas e tênis que começou como estudo de interface e virou aplicação completa.",
      "An online clothing and sneaker store that started as an interface study and became a full application."),
    desafio: T("Construir uma loja com aparência de marca de streetwear, catálogo organizado por categoria e por marca e navegação clara, sem usar plataforma pronta. Interface, carrinho, contas e banco de dados teriam de ser feitos por mim.",
      "Build a store that looks like a streetwear brand, with a catalogue organised by category and brand and clear navigation, without an off-the-shelf platform. The interface, cart, accounts and database all had to be built by me."),
    solucao: T("Comecei a Solvered como estudo de interface, em HTML, CSS e JavaScript, e depois a reescrevi em Next.js com TypeScript para que virasse uma loja de verdade. Construí páginas de produto, filtros, carrinho, página de avaliações e contas de usuário, com senhas protegidas por bcrypt, login por sessão (JWT) e os dados gravados num banco SQLite.",
      "I started Solvered as an interface study in HTML, CSS and JavaScript, then rewrote it in Next.js with TypeScript to turn it into a real store. I built product pages, filters, a cart, a reviews page and user accounts, with bcrypt-protected passwords, session login (JWT) and data stored in a SQLite database."),
    resultado: T("A loja está publicada, com catálogo, carrinho e login funcionando. Foi com ela que passei da interface para o desenvolvimento completo, cuidando também do servidor e do banco de dados.",
      "The store is live, with a working catalogue, cart and login. It is the project where I moved from interface work to full-stack development, taking on the server and the database as well."),
    extra: {
      titulo: T("O que eu faria diferente", "What I would do differently"),
      texto: T("Publiquei a loja na Netlify, onde o disco do servidor é temporário: o SQLite recria o banco a cada nova instância, e pedidos e contas se perdem. Hoje eu usaria desde o início um banco hospedado, como o Turso. A reescrita já tinha corrigido duas falhas da primeira versão: o preço passou a ser conferido no servidor, e o carrinho, a somar por item e tamanho.",
        "I deployed the store on Netlify, where the server disk is temporary: SQLite rebuilds the database on every new instance, so orders and accounts are lost. Today I would use a hosted database from day one, such as Turso. The rewrite had already fixed two flaws from the first version: prices are now checked on the server, and the cart adds up quantity per item and size."),
    },
    stack: ["Next.js", "TypeScript", "React", "SQLite", "JWT"],
    links: [{ rotulo: ONLINE, url: "https://solvered.netlify.app/" }, { rotulo: CODIGO, url: "https://github.com/MatheusCortes02/6-Site-de-roupa-SOLVERED" }],
    capturas: [
      cap("/midia/capturas/solvered/inicio-01.jpg", "Página inicial do Solvered", "Solvered home page"),
      cap("/midia/capturas/solvered/inicio-celular-01.jpg", "Solvered no celular", "Solvered on mobile", "celular"),
      cap("/midia/capturas/solvered/produtos-01.jpg", "Catálogo de produtos", "Product catalogue"),
      cap("/midia/capturas/solvered/produto-01.jpg", "Página de produto", "Product page"),
      cap("/midia/capturas/solvered/feedbacks-01.jpg", "Página de avaliações", "Reviews page"),
    ],
    gravura: "15_mao_jogando_moeda",
  },
  {
    slug: "dra-jania",
    titulo: T("Dra. Jânia Scardua", "Dr. Jânia Scardua"),
    categoria: "frontend",
    ano: "2026",
    credito: AGENCIA,
    papel: T("Trabalho na agência · desenvolvimento do site", "Agency work · site development"),
    profissional: true,
    resumo: T("Site de captação de pacientes para uma cirurgiã-dentista de Vila Velha, feito para campanhas no Google.",
      "A patient acquisition site for a dentist in Vila Velha, built for Google Ads campaigns."),
    desafio: T("Em tratamentos estéticos, a decisão de agendar depende de confiança. Quem chega por um anúncio precisa ver resultados reais e conhecer a profissional antes de chamar no WhatsApp, e a página tinha de conduzir a pessoa até esse contato.",
      "With aesthetic treatments, the decision to book depends on trust. Someone arriving from an ad needs to see real results and get to know the dentist before sending a WhatsApp message, and the page had to lead them to that contact."),
    solucao: T("A clínica anunciava no Google e precisava que essas visitas virassem agendamentos. Fiz uma página única em HTML, CSS e JavaScript, sem bibliotecas, com tratamentos, casos reais de antes e depois, depoimentos, perguntas frequentes e localização. Na primeira versão, o botão de agendar pedia nome e telefone e registrava de qual campanha a pessoa vinha. Depois, passou a abrir o WhatsApp direto.",
      "The clinic was running Google Ads and needed those visits to become appointments. I built a single page in plain HTML, CSS and JavaScript, with no libraries, covering treatments, real before-and-after cases, testimonials, FAQ and location. In the first version, the booking button asked for name and phone and recorded which campaign the visitor came from. Later, it opened WhatsApp directly."),
    resultado: T("O site está no ar em janiascardua.com.br. Incluí dados estruturados de clínica odontológica, que ajudam a clínica a aparecer nas buscas locais do Google, e cuidei da acessibilidade: atalho para pular ao conteúdo, foco do teclado controlado nas janelas e animações reduzidas para quem prefere menos movimento. Também fiz a página de links dela, publicada num contêiner Docker só leitura e sem privilégios na VPS.",
      "The site is live at janiascardua.com.br. I added dentist structured data, which helps the clinic show up in local Google searches, and took care of accessibility: a skip link, managed keyboard focus in dialogs and reduced animation for people who prefer less motion. I also built her link-in-bio page, deployed in a read-only, unprivileged Docker container on a VPS."),
    stack: ["HTML", "CSS", "JavaScript", "SEO local", "Docker"],
    // EST-88: a página de links (antes um projeto à parte) entra aqui
    links: [{ rotulo: ONLINE, url: "https://www.janiascardua.com.br/" }, { rotulo: T("Página de links", "Link-in-bio page"), url: "https://links.janiascardua.com.br/" }],
    capturas: [
      cap("/midia/capturas/dra-jania/inicio-01.jpg", "Abertura do site da Dra. Jânia", "Dr. Jânia site hero"),
      cap("/midia/capturas/dra-jania/inicio-celular-01.jpg", "Site da Dra. Jânia no celular", "Dr. Jânia site on mobile", "celular"),
      cap("/midia/capturas/dra-jania/inicio-02.jpg", "Casos reais", "Real cases"),
      cap("/midia/capturas/dra-jania/inicio-03.jpg", "Pilares do atendimento", "Care principles"),
      cap("/midia/capturas/dra-jania/inicio-04.jpg", "Apresentação da Dra. Jânia", "About Dr. Jânia"),
    ],
    gravura: "17_telefone_antigo",
  },
  {
    slug: "arca",
    titulo: T("Projeto Arca", "Arca Project"),
    categoria: "fullstack",
    ano: "2026",
    papel: T("Projeto pessoal, feito por mim", "Personal project, built by me"),
    resumo: T("Plataforma de resgate, cuidado e proteção animal, com cadastro de usuários e serviços.",
      "An animal rescue, care and protection platform with user and service registration."),
    desafio: T("O programa municipal de proteção animal oferecia resgate, castração, adoção e canal de denúncia. A plataforma precisava reunir essas ações num só lugar, com cadastro de usuários, para que cada pedido partisse de uma mesma conta.",
      "The municipal animal protection programme offered rescue, neutering, adoption and a reporting channel. The platform had to bring these services into one place, with user registration, so every request could start from the same account."),
    solucao: T("Para reunir os serviços de um programa de proteção animal, fiz primeiro um site público com painel do cidadão num único arquivo HTML, com JavaScript puro e Bootstrap. Essa versão está no GitHub. Depois refiz a plataforma publicada em React, com uma API em Python (FastAPI) e banco SQLite, e liguei o cadastro de usuários ao fluxo de cada serviço.",
      "To bring an animal protection programme's services together, I first built a public site and a citizen dashboard in a single HTML file, with plain JavaScript and Bootstrap. That version is on GitHub. I then rebuilt the published platform in React, with a Python API (FastAPI) and a SQLite database, and connected user accounts to the flow of each service."),
    resultado: T("A plataforma está publicada, com interface, API e banco de dados funcionando juntos. Foi o projeto que consolidou minha experiência em integrar essas três camadas.",
      "The platform is live, with interface, API and database working together. It is the project that consolidated my experience integrating those three layers."),
    stack: ["React", "FastAPI", "Python", "SQLite", "JavaScript", "Bootstrap"],
    extra: {
      titulo: T("O que eu faria diferente", "What I would do differently"),
      texto: T("Na primeira versão, as senhas ficavam em texto puro no navegador e os identificadores eram criados a partir do relógio, com risco de repetição. Hoje eu guardaria apenas o hash das senhas, no servidor, deixaria o banco gerar os identificadores e apagaria o código antigo em vez de escondê-lo com CSS.",
        "In the first version, passwords were stored in plain text in the browser and IDs were created from the clock, with a risk of duplicates. Today I would store only password hashes, on the server, let the database generate the IDs and delete old code instead of hiding it with CSS."),
    },
    links: [{ rotulo: ONLINE, url: "https://seven-projeto-arca-1.onrender.com/" }, { rotulo: CODIGO, url: "https://github.com/MatheusCortes02/Projeto-Arca" }],
    capturas: [
      cap("/midia/capturas/arca/abertura-01.jpg", "Abertura do Projeto Arca", "Arca Project hero"),
      cap("/midia/capturas/arca/inicio-02.jpg", "Quem somos e números do programa", "About and programme figures"),
      cap("/midia/capturas/arca/inicio-03.jpg", "Serviços", "Services"),
      cap("/midia/capturas/arca/inicio-04.jpg", "Contato", "Contact"),
    ],
    gravura: "20_leao_dominio_publico",
  },
  {
    slug: "morro-alto-os",
    titulo: T("Sistema da Morro Alto", "Morro Alto System"),
    categoria: "fullstack",
    ano: "2026",
    credito: T("Sistema interno da Morro Alto Creative Office", "Internal system of Morro Alto Creative Office"),
    restrito: true,
    // EST-52 (2026-10-23): Supabase e hospedagem na Lovable foram escolhas da agência, não do Matheus.
    papel: T("Desenvolvimento durante meu período na agência · Supabase e hospedagem na Lovable foram escolhas da agência, não minhas", "Built during my time at the agency · Supabase and hosting on Lovable were the agency's choices, not mine"),
    profissional: true,
    resumo: T("Sistema interno da agência que reúne pautas, clientes, financeiro, reuniões em vídeo, pesquisa de satisfação e uma assistente com IA.",
      "The agency's internal system, bringing together content tasks, clients, finance, video meetings, satisfaction surveys and an AI assistant."),
    desafio: T("A operação estava dividida entre planilhas, grupos de conversa e ferramentas separadas. As pautas passavam por social media, gestor de pautas e equipe de criação, e cada cargo precisa ver e fazer coisas diferentes. Como o sistema guarda dados de clientes e valores financeiros, o controle de acesso tinha de ser rigoroso.",
      "Operations were split across spreadsheets, chat groups and separate tools. Content tasks moved between social media, the content manager and the creative team, and each role needs to see and do different things. Since the system holds client data and financial figures, access control had to be strict."),
    solucao: T("Para reunir a operação da agência num só lugar, desenvolvi um sistema em React e TypeScript sobre Supabase, com permissões por cargo aplicadas no próprio banco de dados. Nele ficam pautas com prazos, financeiro com importação de extratos, reuniões em vídeo com gravação e ata, pesquisa de satisfação e a Oly, assistente com IA que sugere as prioridades do dia. Cada mudança partiu de uma especificação com testes.",
      "To bring the agency's operations into one place, I built a system in React and TypeScript on Supabase, with role-based permissions enforced in the database itself. It holds content tasks with deadlines, finance with statement import, video meetings with recording and minutes, a satisfaction survey and Oly, an AI assistant that suggests the day's priorities. Every change started from a specification with tests."),
    resultado: T("O sistema está em uso diário pela equipe, com acesso restrito. O repositório soma 103 especificações, 182 arquivos de teste e 267 migrações de banco de dados. As telas foram capturadas com uma conta de teste, e nomes de clientes, títulos de pautas e reuniões e valores aparecem desfocados de propósito.",
      "The system is in daily use by the team, with restricted access. The repository holds 103 specifications, 182 test files and 267 database migrations. The screens were captured with a test account, and client names, task and meeting titles and amounts are deliberately blurred."),
    extra: {
      titulo: T("O que eu faria diferente", "What I would do differently"),
      texto: T("Usar o Supabase e hospedar o sistema na Lovable não foram decisões minhas: as duas escolhas vieram da agência. Eu não hospedaria na Lovable. Ela publica sozinha cada alteração do ramo principal e não aplica as migrações do repositório, então cada mudança no banco precisava ser colada à mão. Eu usaria uma hospedagem com publicação controlada e migrações aplicadas automaticamente.",
        "Using Supabase and hosting the system on Lovable were not my decisions: both choices came from the agency. I would not host it on Lovable. It publishes every change on the main branch by itself and does not apply the repository's migrations, so every database change had to be pasted in by hand. I would use hosting with controlled releases and migrations applied automatically."),
    },
    stack: ["TanStack Start", "React", "TypeScript", "Supabase", "Cloudflare RealtimeKit", "Anthropic API", "Tailwind CSS", "Playwright"],
    links: [],
    capturas: [
      cap("/midia/capturas/morro-alto-os/sistema-inicio.jpg", "Início com as entregas do mês, pautas abertas e atrasos, com dados fictícios", "Home with the month's deliveries, open tasks and delays, with fictitious data"),
      cap("/midia/capturas/morro-alto-os/sistema-inicio-celular.jpg", "Início no celular, com dados fictícios", "Home on mobile, with fictitious data", "celular"),
      cap("/midia/capturas/morro-alto-os/sistema-financeiro.jpg", "Painel financeiro do mês, com valores fictícios", "Monthly finance dashboard, with fictitious amounts"),
      cap("/midia/capturas/morro-alto-os/sistema-pautas.jpg", "Quadro de pautas do gestor, em lista, com clientes fictícios", "Content manager's task board in list view, with fictitious clients"),
      cap("/midia/capturas/morro-alto-os/sistema-meet.jpg", "Meet: indicadores e reuniões recentes, com nomes fictícios", "Meet: indicators and recent meetings, with fictitious names"),
      cap("/midia/capturas/morro-alto-os/sistema-csat.jpg", "CSAT: check-in mensal e saúde de cada cliente, com dados fictícios", "CSAT: monthly check-in and health of each client, with fictitious data"),
      cap("/midia/capturas/morro-alto-os/sistema-oly.jpg", "Oly, a assistente com IA, com alertas e sugestões do dia, com dados fictícios", "Oly, the AI assistant, with the day's alerts and suggestions, with fictitious data"),
    ],
    gravura: "18_ampulheta_versao_1",
  },
  // EST-86 (2026-10-27): "quero que coloque o chat.morroalto.co [...] porém sem link, e quero que o formato seja parecido
  // com sistema morro alto". Fontes: vault 90 - Projetos/Projetos Analisados/sistema-morroalto-connect.md:348-361
  // (avaliação, ~127 políticas num só portão, início do chat) e sistema-morroalto-dash.md:20 ("o chat é só exterior");
  // _logs/prompts-2026-10.md:28887 (ele decidiu: "deve ficar na vps [...] postgresql, next, tailwind").
  // Repositório Desktop/morro-alto-chat-vps (master 8baec3a, 2026-10-26): package.json:20-33 (stack);
  // docs/decisoes-vps.md:13-14 (Docker, Caddy, RLS, nada do Connect), :22-29 (sessão revogável, sem cadastro público),
  // :43-49 (tempo real), :55-62 (anexos no Garage); referencia/docs/PRD.md:26-32 (WhatsApp, clientes dos EUA, contas
  // externas); docs/specs/vps-012-entrar-pelo-sys.md:1-3; commit a00dc73 (sem verificação em duas etapas em produção).
  // Contagens por `git ls-files` sem referencia/: 22 specs, 134 arquivos de teste, 20 migrations. Capturas: só /login.
  {
    slug: "morro-alto-chat",
    titulo: T("Morro Alto Chat", "Morro Alto Chat"),
    categoria: "fullstack",
    ano: "2026",
    credito: T("Sistema da Morro Alto Creative Office", "System of Morro Alto Creative Office"),
    restrito: true,
    papel: T("Desenvolvimento durante meu período na agência · servidor próprio, Next.js e PostgreSQL foram escolhas minhas", "Built during my time at the agency · its own server, Next.js and PostgreSQL were my choices"),
    profissional: true,
    resumo: T("Chat da agência com os clientes do exterior, com um espaço separado para cada cliente, mensagens em tempo real e envio de arquivos.",
      "The agency's chat with its international clients, with a separate space for each client, real-time messages and file sharing."),
    desafio: T("A conversa com os clientes acontecia em grupos de WhatsApp. Os clientes do exterior, principalmente dos Estados Unidos, esperavam um ambiente profissional, em inglês, com histórico organizado e arquivos, sem instalar nada. Pela primeira vez, pessoas de fora da agência teriam conta e escreveriam num sistema dela, então um cliente nunca poderia ver a conversa de outro.",
      "Client conversations happened in WhatsApp groups. International clients, mostly in the United States, expected a professional space in English, with organised history and files, without installing anything. For the first time, people outside the agency would have accounts and write in one of its systems, so no client could ever see another client's conversation."),
    solucao: T("Decidi deixar o chat fora do sistema interno da agência, num servidor próprio, e o desenvolvi em Next.js e TypeScript com PostgreSQL. Cada cliente tem o seu espaço, e o isolamento entre eles é aplicado pelo próprio banco de dados. Fiz o login com sessões que podem ser encerradas na hora, mensagens em tempo real e anexos guardados num armazenamento próprio. A equipe entra por um botão no sistema interno.",
      "I chose to keep the chat outside the agency's internal system, on its own server, and built it in Next.js and TypeScript with PostgreSQL. Each client has its own space, and the isolation between them is enforced by the database itself. I built login with sessions that can be revoked instantly, real-time messages and attachments kept in self-hosted storage. The team signs in through a button in the internal system."),
    resultado: T("O chat está no ar e não tem cadastro aberto: o cliente só entra por convite. O repositório soma 22 especificações, 134 arquivos de teste e 20 migrações de banco de dados. Para proteger as conversas dos clientes, aqui aparece só a tela de entrada.",
      "The chat is live and has no open sign-up: clients only get in by invitation. The repository holds 22 specifications, 134 test files and 20 database migrations. To protect client conversations, only the sign-in screen is shown here."),
    extra: {
      titulo: T("Por que fora do sistema interno", "Why outside the internal system"),
      texto: T("A avaliação feita antes de começar mostrou o risco: no banco do sistema interno, uma única regra decide quem é da equipe e protege cerca de 127 permissões, e o chat traria contas de fora que escrevem. Um erro de permissão no chat chegaria ao financeiro e às pautas. Por isso o chat tem banco, login e servidor próprios, sem nenhuma credencial do sistema interno.",
        "The assessment done before starting showed the risk: in the internal system's database, a single rule decides who is staff and guards about 127 permissions, and the chat would bring outside accounts that write. A permission bug in the chat could reach finance and content tasks. So the chat has its own database, login and server, with no credentials from the internal system."),
    },
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Tailwind CSS", "Docker", "Caddy", "Garage (S3)"],
    links: [],
    capturas: [
      cap("/midia/capturas/morro-alto-chat/login-01.jpg", "Tela de entrada do Morro Alto Chat, a única tela pública", "Morro Alto Chat sign-in screen, the only public screen"),
      cap("/midia/capturas/morro-alto-chat/login-celular-01.jpg", "Tela de entrada do Morro Alto Chat no celular", "Morro Alto Chat sign-in screen on mobile", "celular"),
    ],
    gravura: "09_carta_lacrada_pombo",
  },
  {
    slug: "robo-sumo",
    titulo: T("Robô de mini sumô", "Mini sumo robot"),
    categoria: "hardware",
    ano: "2026",
    credito: T("Guerreiros de Realengo · InovaWeek UVV", "Guerreiros de Realengo · InovaWeek UVV"),
    // EST-55 (2026-10-23): ele fez a maior parte, principalmente a montagem, incluindo a soldagem.
    papel: T("Equipe de 5 na InovaWeek · fiz a maior parte: montagem e soldagem, firmware, modelo 3D e manual", "Team of 5 at InovaWeek · I did most of it: assembly and soldering, firmware, 3D model and manual"),
    resumo: T("Robô autônomo de mini sumô, com manual de montagem para toda a equipe.",
      "An autonomous mini sumo robot with an assembly manual for the whole team."),
    desafio: T("Montar um robô autônomo capaz de encontrar o adversário e empurrá-lo para fora da arena. A equipe, de cinco pessoas, não tinha experiência em eletrônica, e o projeto partia de um chassi que já estava impresso em 3D.",
      "Build an autonomous robot able to find its opponent and push it out of the ring. The five-person team had no electronics experience, and the project started from a chassis that had already been 3D printed."),
    solucao: T("Fiz a maior parte do robô de mini sumô, principalmente a montagem, incluindo a soldagem da eletrônica. Escrevi o firmware do ESP32, o microcontrolador que lê os sensores de distância e de linha e aciona os motores. Para planejar a montagem, usei um modelo 3D no Blender, e documentei tudo num manual por blocos, com a fiação placa por placa, em português e inglês.",
      "I did most of the mini sumo robot, especially the assembly, including soldering the electronics. I wrote the firmware for the ESP32, the microcontroller that reads the distance and line sensors and drives the motors. To plan the assembly, I used a 3D model in Blender, and I documented everything in a block-by-block manual with board-by-board wiring, in Portuguese and English."),
    resultado: T("O manual está publicado, com os arquivos de impressão, o firmware e um vídeo de montagem, e serve de guia de montagem para toda a equipe.",
      "The manual is published with the print files, the firmware and an assembly video, and it serves as the build guide for the whole team."),
    stack: ["ESP32", "C++", "Blender", "HTML"],
    links: [{ rotulo: T("Manual de montagem", "Assembly manual"), url: "https://matheuscortes02.github.io/Guerreiros-de-Realengo-Robo-sumo/" }, { rotulo: CODIGO, url: "https://github.com/MatheusCortes02/Guerreiros-de-Realengo-Robo-sumo" }],
    capturas: [
      cap("/midia/capturas/robo-sumo/render-c1_hero.png", "Render do robô montado", "Render of the assembled robot", "render"),
      cap("/midia/capturas/robo-sumo/manual-celular-01.jpg", "Manual no celular", "Manual on mobile", "celular"),
      cap("/midia/capturas/robo-sumo/render-c3_eletronica.png", "Render da eletrônica", "Electronics render", "render"),
      cap("/midia/capturas/robo-sumo/render-c6_motores.png", "Render dos motores", "Motors render", "render"),
      cap("/midia/capturas/robo-sumo/manual-01.jpg", "Manual de montagem por blocos", "Block-by-block assembly manual"),
      cap("/midia/capturas/robo-sumo/manual-02.jpg", "Blocos do manual", "Manual blocks"),
    ],
    gravura: "16_robo_mini_sumo",
  },
  {
    slug: "cofre-de-tokens",
    titulo: T("Gerador e Cofre de Tokens", "Token Generator and Vault"),
    categoria: "seguranca",
    ano: "2026",
    papel: T("Projeto pessoal de estudo, feito por mim", "Personal study project, built by me"),
    resumo: T("Ferramenta de terminal em Python que gera tokens seguros e guarda cada um num cofre protegido por senha.",
      "A Python command-line tool that generates secure tokens and keeps them in a password-protected vault."),
    desafio: T("Praticar dois fundamentos de segurança: gerar segredos que ninguém consiga prever e garantir que só o dono da conta consiga vê-los, mesmo com o programa já aberto.",
      "Practise two security fundamentals: generating secrets nobody can predict and making sure only the account owner can see them, even with the program already open."),
    solucao: T("Para estudar segurança na prática, escrevi em Python uma ferramenta de terminal com contas de usuário, gerador de tokens e um cofre. Os tokens vêm do módulo secrets, feito para aleatoriedade de uso criptográfico, e o cofre só mostra o conteúdo depois de pedir a senha outra vez. Os dados ficam gravados num arquivo JSON.",
      "To study security hands-on, I wrote a Python command-line tool with user accounts, a token generator and a vault. Tokens come from the secrets module, which is built for cryptographic randomness, and the vault only shows its contents after asking for the password again. Data is saved to a JSON file."),
    resultado: T("O programa funciona do cadastro à abertura do cofre, e as telas mostradas aqui são de uma execução real, feita para este portfólio. Uma delas expõe a principal falha do projeto, explicada em O que eu faria diferente.",
      "The program works from sign-up to opening the vault, and the screens shown here come from a real run made for this portfolio. One of them exposes the project's main flaw, explained in What I would do differently."),
    extra: {
      titulo: T("O que eu faria diferente", "What I would do differently"),
      texto: T("A terceira tela mostra o ponto fraco: a senha fica em texto puro no arquivo contas.json. Hoje eu guardaria apenas o hash da senha com sal (bcrypt ou Argon2), faria a comparação em tempo constante, para que o tempo de resposta não dê pistas, e cifraria os tokens no disco.",
        "The third screen shows the weak spot: the password is stored in plain text in contas.json. Today I would store only a salted hash (bcrypt or Argon2), compare it in constant time so response times give nothing away, and encrypt the tokens on disk."),
    },
    stack: ["Python", "secrets", "JSON"],
    links: [{ rotulo: CODIGO, url: "https://github.com/MatheusCortes02/3-Projeto-Gerador-e-Cofre-de-tokens" }],
    capturas: [
      cap("/midia/capturas/cofre-de-tokens/terminal-1-01.jpg", "Criação de conta e geração de token", "Account creation and token generation", "terminal"),
      cap("/midia/capturas/cofre-de-tokens/terminal-2-01.jpg", "Abertura do cofre", "Opening the vault", "terminal"),
      cap("/midia/capturas/cofre-de-tokens/terminal-3-01.jpg", "contas.json com a senha em texto puro", "contas.json with the plain-text password", "terminal"),
    ],
    gravura: "13_cadeado_e_chave",
  },
  {
    slug: "controle-de-acesso-video",
    titulo: T("Controle de acesso em player de vídeo embutido", "Access control in an embedded video player"),
    categoria: "seguranca",
    ano: "2026",
    credito: T("Write-up · divulgação responsável", "Write-up · responsible disclosure"),
    resumo: T("Estudo de caso de uma falha de controle de acesso em uma plataforma de cursos.",
      "A case study of an access-control flaw on a course platform."),
    desafio: T("Entender como um player de vídeo embutido por iframe decide quem pode assistir a uma aula.",
      "Understand how a video player embedded through an iframe decides who can watch a lesson."),
    solucao: T("Com apoio de IA, analisei o tráfego da página e o fluxo de streaming (HLS). A verificação de acesso existia na página, mas não na entrega do vídeo, que respondia sem checar a sessão.",
      "With the help of AI, I analysed the page traffic and the streaming flow (HLS). Access was checked on the page, but not on the video delivery, which answered without checking the session."),
    resultado: T("Write-up com o raciocínio, a causa e a correção recomendada: endereços assinados de curta duração e verificação da sessão no próprio servidor de vídeo. Nome da plataforma e endereços reais foram omitidos.",
      "A write-up with the reasoning, the cause and the recommended fix: short-lived signed URLs and session checks on the video server itself. The platform name and real addresses were left out."),
    stack: ["Segurança web", "HLS", "Análise de tráfego", "IA"],
    links: [{ rotulo: T("Ler no GitHub", "Read on GitHub"), url: "https://github.com/MatheusCortes02/hls-iframe-access-writeup" }],
    capturas: [],
    gravura: "12_camera_seguranca",
  },
  {
    slug: "jogo-estatistica",
    titulo: T("Jogo de Fundamentos da Estatística", "Statistics Fundamentals Game"),
    categoria: "jogos",
    ano: "2026",
    // EST-87 (2026-10-27, Matheus: "esse jogo eu fiz ele inteiro e fez parte de um trabalho da faculdade" e "eu fiz somente os jogos,
    // no Wordwall e em Python"): a parte dele no trabalho foram os jogos; o de Python é todo dele
    credito: T("Trabalho da faculdade · UVV", "University assignment · UVV"),
    papel: T("Trabalho da faculdade (UVV) · minha parte foram os jogos: um no Wordwall e este, em Python, que fiz inteiro", "University assignment (UVV) · my part was the games: one on Wordwall and this one, in Python, which I built entirely"),
    resumo: T("Jogo educativo que ensina moda, média, mediana e desvio padrão com perguntas cronometradas.",
      "An educational game that teaches mode, mean, median and standard deviation with timed questions."),
    desafio: T("Tornar o estudo de estatística básica mais leve e interativo do que a teoria sozinha, praticando moda, média, mediana e desvio padrão.",
      "Make studying basic statistics lighter and more interactive than theory alone, by practising mode, mean, median and standard deviation."),
    solucao: T("Num trabalho da faculdade, minha parte foram os jogos: um no Wordwall e este, que fiz inteiro em Python, com a biblioteca Pygame: perguntas cronometradas sobre estatística básica, com níveis de dificuldade, pontuação e modos claro e escuro. Para que rodasse no navegador, compilei o jogo para a web com o pygbag e o publiquei no itch.io.",
      "In a university assignment, my part was the games: one on Wordwall and this one, which I built entirely in Python with the Pygame library: timed questions on basic statistics, with difficulty levels, scoring and light and dark modes. To make it run in the browser, I compiled it for the web with pygbag and published it on itch.io."),
    resultado: T("O jogo está publicado no itch.io e roda direto no navegador, sem instalação. Ao fim de cada partida, mostra um ranking de desempenho.",
      "The game is live on itch.io and runs straight in the browser, with nothing to install. At the end of each round it shows a performance ranking."),
    stack: ["Python", "Pygame", "pygbag"],
    links: [{ rotulo: T("Jogar no itch.io", "Play on itch.io"), url: "https://matheusbarreto02.itch.io/jogofundamentos" }],
    capturas: [
      cap("/midia/capturas/jogo-estatistica/portfolio2-stats-game.png", "Tela do jogo", "Game screen"),
      cap("/midia/capturas/jogo-estatistica/itch-01.jpg", "Página do jogo no itch.io", "Game page on itch.io"),
    ],
    gravura: "14_computador_antigo",
  },
];

/** Destaques primeiro, na ordem de DESTAQUES (EST-30); o resto na ordem original. */
// EST-88 (2026-10-27): ordem da avaliação para cibersegurança; a Diggi Saúde ocupa a vaga do Cofre de Tokens até a v2
export const DESTAQUES = ["morro-alto-os", "brasigran", "solvered", "diggi-saude", "robo-sumo", "sao-jorge"];

const todos = [...projetosProprios, ...projetosClientes];
export const projetos: Projeto[] = [
  ...DESTAQUES.map((s) => todos.find((p) => p.slug === s)).filter((p): p is Projeto => !!p),
  ...todos.filter((p) => !DESTAQUES.includes(p.slug)),
];

export const CATEGORIAS: Categoria[] = ["fullstack", "frontend", "seguranca", "hardware", "jogos"];

export function filtrar(lista: Projeto[], categoria: Categoria | "todos"): Projeto[] {
  return categoria === "todos" ? lista : lista.filter((p) => p.categoria === categoria);
}

export function contagens(lista: Projeto[]): Record<Categoria | "todos", number> {
  const c = { todos: lista.length, fullstack: 0, frontend: 0, seguranca: 0, hardware: 0, jogos: 0 };
  for (const p of lista) c[p.categoria]++;
  return c;
}

/** EST-31: em "Todos", destaques + "Ver mais"; num tipo escolhido, todos os projetos dele, sem botão. */
export function visiveis(lista: Projeto[], categoria: Categoria | "todos", mais: boolean): { itens: Projeto[]; temMais: boolean; nDemais: number } {
  const filtrados = filtrar(lista, categoria);
  if (categoria !== "todos") return { itens: filtrados, temMais: false, nDemais: 0 };
  const { principais, demais } = separar(filtrados);
  return { itens: mais ? filtrados : principais, temMais: demais.length > 0, nDemais: demais.length };
}

/** EST-67: uma gravura de fundo a cada 2 projetos visíveis (no mínimo 1), para o fundo acompanhar "Ver mais". */
export function quantosFundos(nVisiveis: number): number {
  return Math.max(1, Math.ceil(nVisiveis / 2));
}

export function separar(lista: Projeto[]): { principais: Projeto[]; demais: Projeto[] } {
  return {
    principais: lista.filter((p) => DESTAQUES.includes(p.slug)),
    demais: lista.filter((p) => !DESTAQUES.includes(p.slug)),
  };
}
