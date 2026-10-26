export const pt = {
  carregando: { texto: "Imprimindo a nota" },
  meta: {
    titulo: "Matheus Cortes — Engenheiro de software em formação e estudante de cibersegurança",
    descricao: "Portfólio de Matheus Cortes: engenheiro de software em formação na UVV e estudante de segurança ofensiva.",
  },
  nav: {
    projetos: "Projetos", sobre: "Sobre", certificacoes: "Certificações", writeups: "Write-ups", atividade: "Atividade", contato: "Contato",
    inicio: "Início", menu: "Menu", fechar: "Fechar", idioma: "Idioma", virar: "Virar a nota", topo: "Voltar ao topo",
    pular: "Pular para o conteúdo", principal: "Navegação principal", rodape: "Navegação do rodapé",
  },
  hero: {
    sobretitulo: "Portfólio",
    funcao: "Engenheiro de software em formação",
    frase: "Entre a criação e o terminal.",
    apresentacao: "Desenvolvo sistemas e interfaces e estudo segurança ofensiva para entender como eles falham.",
    verProjetos: "Ver projetos", falarComigo: "Falar comigo",
    metadados: ["Vitória, ES", "Engenharia de Software, UVV", "2º período"],
    baixarCurriculo: "Baixar currículo", perfisRotulo: "Perfis profissionais",
  },
  numeros: { projetos: "projetos", contribuicoes: "contribuições no último ano", repositorios: "repositórios públicos", trilhas: "trilhas de segurança" },
  registro: {
    tituloCofre: "Registro de entrada do cofre",
    titulo: "Registro de entrada", data: "Data", origem: "Origem", local: "Local", provedor: "Provedor",
    nota: "A consulta é feita ao serviço externo ipwho.is; este site não guarda nada.",
    registrar: "Registrar minha entrada", ipMascarado: "IP parcialmente oculto",
    consultando: "consultando…", naoIdentificada: "origem não identificada", carimbo: "Entrada registrada",
  },
  projetos: {
    sobretitulo: "Estudos de caso",
    titulo: "Projetos",
    lead: "Trabalhos pessoais, acadêmicos e feitos para clientes da agência: front-end, sistemas completos, hardware e segurança. Cada um abre como estudo de caso, com o desafio, o que eu fiz e o resultado.",
    todos: "Todos",
    categorias: { fullstack: "Full-stack", frontend: "Front-end", seguranca: "Segurança", hardware: "Hardware", jogos: "Jogos" },
    abrir: "Abrir estudo de caso", desafio: "O desafio", solucao: "O que eu fiz", resultado: "O resultado", tecnologias: "Tecnologias",
    fechar: "Fechar", anterior: "Projeto anterior", proximo: "Próximo projeto", fotoAnterior: "Foto anterior", fotoProxima: "Próxima foto", restrito: "Acesso restrito", semCaptura: "Estudo de caso escrito; sem telas públicas.",
    profissional: "Trabalho profissional", proprio: "Projeto próprio",
    nenhum: "Nenhum projeto neste tipo.", verMais: "Ver mais projetos", verMenos: "Ver menos",
  },
  sobre: {
    sobretitulo: "Quem sou",
    titulo: "Sobre mim",
    paragrafos: [
      "Tenho 19 anos e estou no 2º período de Engenharia de Software na UVV. De maio a outubro de 2026, trabalhei com desenvolvimento web na Morro Alto – Creative Office, em meio período, com manutenção de sites, criação de landing pages e integração de automações usando ferramentas de IA.",
      "Tenho contato com computadores desde criança, e meu primeiro contato com programação foi aos 11 anos. Na mesma época, assistia a vídeos sobre hackers e sobre grupos que marcaram a história da internet com invasões conhecidas; foi isso que me encantou e me fez querer seguir pela segurança da informação. Hoje estudo redes, Linux e análise de tráfego para entender como os sistemas falham e como protegê-los.",
      "Levo para cada projeto criatividade no desenho, ética no que faço e ambição no que quero alcançar.",
    ],
    fatos: {
      formacao: "Formação", formacaoValor: "Engenharia de Software · UVV · 2º período",
      foco: "Foco", focoValor: "Desenvolvimento web · Cibersegurança",
    },
    oQueFaco: {
      titulo: "O que eu faço",
      itens: [
        // EST-71/EST-74: generalista e na medida (uma frase e 2 pontos), sem nome de projeto nem de ferramenta
        { titulo: "Interfaces", texto: "Sites e interfaces do layout à publicação: rápidos, bons no celular e acessíveis.",
          pontos: ["Sites institucionais, landing pages e páginas de links para clientes reais", "Atenção a desempenho, SEO e acessibilidade em cada entrega"] },
        { titulo: "Sistemas", texto: "Aplicações web de ponta a ponta, da regra de negócio ao sistema em uso.",
          pontos: ["Login, permissões por cargo, banco de dados e integrações, inclusive com IA", "Especificação e testes automatizados escritos antes do código"] },
        { titulo: "Segurança", texto: "Estudo segurança ofensiva para construir sistemas mais difíceis de quebrar.",
          pontos: ["Redes, Linux, análise de tráfego e falhas em aplicações web", "Write-ups em formato de relatório, com divulgação responsável"] },
      ],
    },
    trajetoria: {
      titulo: "Trajetória",
      itens: [
        { periodo: "2026 – atual · 2º período", titulo: "Engenharia de Software", local: "Universidade Vila Velha (UVV)", texto: "Algoritmos, estruturas de dados, redes e fundamentos de sistemas.", destaques: [] },
        { periodo: "mai. de 2026 – out. de 2026 · 6 meses", titulo: "Desenvolvimento web", local: "Morro Alto – Creative Office · Meio período · Vila Velha, Espírito Santo, Brasil · No local", texto: "Sites, landing pages, páginas de links e sistemas para clientes da agência e para a própria Morro Alto, com manutenção, publicação e automações com IA.",
          destaques: [
            "Sistema interno da agência (pautas, financeiro, reuniões e assistente com IA), em uso diário pela equipe",
            "Portal da Brasigran em cinco idiomas e nova página da Hana Decor, no lugar do WordPress",
            "Especificação e testes escritos antes do código nos projetos maiores",
          ] },
        { periodo: "2026 · 2 meses", titulo: "InovaWeek UVV", local: "Guerreiros de Realengo", texto: "Numa equipe de cinco, fiz a maior parte do robô autônomo de mini sumô.",
          destaques: [
            "Montagem e soldagem da eletrônica",
            "Firmware em C++ para o ESP32, que lê os sensores e aciona os motores",
            "Modelo 3D e manual de montagem bilíngue, usado como guia pela equipe",
          ] },
      ],
    },
    tecnologias: {
      titulo: "Tecnologias",
      grupos: [
        { nome: "Linguagens", itens: ["TypeScript", "JavaScript", "Python", "C++", "SQL", "HTML", "CSS"] },
        { nome: "Front-end", itens: ["React", "Next.js", "Tailwind CSS"] },
        { nome: "Back-end e dados", itens: ["Node.js", "FastAPI", "PostgreSQL", "SQLite", "Drizzle ORM"] },
        { nome: "Segurança", itens: ["Linux", "Windows", "Redes TCP/IP", "Modelo OSI", "DNS", "HTTP", "Análise de tráfego", "Nmap", "Burp Suite", "TryHackMe"] },
        { nome: "Ferramentas", itens: ["Git", "GitHub", "Docker", "Playwright", "Vitest", "ESP32"] },
      ],
    },
    cv: "Currículo",
  },
  certificacoes: {
    sobretitulo: "Formação complementar",
    titulo: "Certificações",
    lead: "Cursos concluídos com certificado, em segurança, inteligência artificial e ferramentas do dia a dia.",
  },
  writeups: {
    sobretitulo: "Segurança",
    titulo: "Write-ups",
    lead: "Estudos de caso de segurança escritos com divulgação responsável: o raciocínio, a causa e a correção, sem expor o alvo.",
    abrir: "Ler estudo de caso", github: "Ver no GitHub",
  },
  atividade: {
    sobretitulo: "GitHub",
    titulo: "Atividade",
    lead: "O mesmo quadro do meu perfil no GitHub, atualizado uma vez por dia. Conta commits, pull requests e issues.",
    contribuicoes: "Contribuições no último ano", maiorSequencia: "Maior sequência", diasAtivos: "Dias com atividade",
    linguagens: "Linguagens nos repositórios públicos", recentes: "Repositórios recentes", lidoEm: "lido em", menos: "Menos", mais: "Mais",
    dia: "dia", dias: "dias", contribuicao: "contribuição", contribuicoesEm: "contribuições em", semDescricao: "Sem descrição",
    semana: ["", "Seg", "", "Qua", "", "Sex", ""],
    meses: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  },
  contato: {
    sobretitulo: "Contato",
    titulo: "Vamos conversar",
    lead: "Estou aberto a estágio em cibersegurança e em desenvolvimento. Escreva e eu respondo pelo e-mail.",
    nome: "Nome", email: "E-mail", mensagem: "Mensagem", enviar: "Enviar mensagem", enviando: "Enviando…",
    sucesso: "Mensagem enviada. Obrigado pelo contato!", erro: "Não foi possível enviar agora. Use o e-mail ao lado.",
    indisponivel: "O envio pelo site ainda não está ligado. Use o e-mail ao lado.",
    perfis: "Perfis", placeholderNome: "Seu nome", placeholderEmail: "voce@exemplo.com", placeholderMensagem: "Escreva sua mensagem",
  },
  rodape: {
    frase: "Entre a criação e o terminal.",
    direitos: "Todos os direitos reservados.",
  },
};

export type Dicionario = typeof pt;
