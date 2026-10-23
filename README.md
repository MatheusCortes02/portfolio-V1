<div align="center">

<img src=".github/readme/nota-frente.webp" alt="Nota MC: cédula em gravura verde com o nome Matheus Cortes, o valor UM ENGENHEIRO, o medalhão com o monograma MC e o Convento da Penha na janela oval" width="100%">

<br>

<sub><code>SÉRIE A</code> &nbsp;·&nbsp; <code>MC 000001 A</code> &nbsp;·&nbsp; <code>VITÓRIA · ESPÍRITO SANTO · MMXXVI</code></sub>

# Matheus Cortes

**Portfólio pessoal** &nbsp;·&nbsp; Engenharia de Software (UVV) &nbsp;·&nbsp; Cibersegurança

<br>

<img alt="Next.js 16.4.2" src="https://img.shields.io/badge/Next.js-16.4.2-24442C?style=flat-square&labelColor=121411&logo=nextdotjs&logoColor=F1EFE4">
<img alt="React 19.3.1" src="https://img.shields.io/badge/React-19.3.1-24442C?style=flat-square&labelColor=121411&logo=react&logoColor=F1EFE4">
<img alt="TypeScript 6.0.3" src="https://img.shields.io/badge/TypeScript-6.0.3-24442C?style=flat-square&labelColor=121411&logo=typescript&logoColor=F1EFE4">
<img alt="Vitest 5.0.5" src="https://img.shields.io/badge/Vitest-5.0.5-24442C?style=flat-square&labelColor=121411&logo=vitest&logoColor=F1EFE4">
<img alt="CSS próprio" src="https://img.shields.io/badge/CSS-pr%C3%B3prio-24442C?style=flat-square&labelColor=121411&logo=css&logoColor=F1EFE4">

</div>

<br>

> **Pagará ao portador desta a quantia de um engenheiro.**
>
> Este site é uma cédula: papel cor de marfim, tinta verde de talho-doce, guilhoché, títulos góticos e números de série.
> Cada seção é uma parte do documento, e cada projeto abre como um estudo de caso.

<br>

## ✦ A cédula por dentro

<table>
<tr>
<td width="68%"><img src=".github/readme/captura-computador.webp" alt="Abertura do site no computador"></td>
<td width="32%"><img src=".github/readme/captura-celular.webp" alt="Abertura do site no celular"></td>
</tr>
</table>

| | Seção | O que tem |
|:-:|---|---|
| **I** | Abertura | Nome, frase que se decifra como um número de série e currículo para baixar |
| **II** | Registro do cofre | Ficha de entrada do visitante, montada no próprio navegador e sem gravar nada |
| **III** | Projetos | 15 trabalhos com filtro por categoria; cada um abre um estudo de caso com o que eu fiz, o desafio, o resultado e o que eu faria diferente |
| **IV** | Sobre | Ficha "Quem sou", autenticada por um selo MC gravado na hora |
| **V** | Certificações | Emissor, categoria, descrição e competências de cada uma |
| **VI** | Write-ups | Análises de segurança escritas como relatório |
| **VII** | Atividade | Contribuições públicas do perfil no GitHub |
| **VIII** | Contato | Formulário que entrega a mensagem por e-mail |

<br>

## ✦ Detalhes de impressão

<table>
<tr>
<td valign="top" width="50%">

**Movimento**
- Animações próprias em gravura, modeladas e renderizadas no Blender
- Cada uma toca quando aparece e repete a cada nova passagem
- Rolagem suave com Lenis e entradas escalonadas
- Tudo desligado com `prefers-reduced-motion`

**Acessibilidade**
- Abas do estudo de caso no padrão da WAI-ARIA (setas, Home e End)
- Menu e modal em `<dialog>`, com o foco devolvido ao fechar
- Link para pular ao conteúdo e textos alternativos em todas as capturas

</td>
<td valign="top" width="50%">

**Busca e IA**
- Metadados, Open Graph e JSON-LD (`ProfilePage` e `Person`)
- `sitemap.xml`, `robots.txt`, `llms.txt` e `llms-full.txt`
- Versões em português (`/`) e em inglês (`/en`)

**Segurança**
- Content Security Policy e cabeçalhos de segurança no `next.config.ts`
- Proxy que recusa raspadores conhecidos e libera robôs de busca
- Nenhum segredo no repositório: a chave do formulário fica no `.env.local`

</td>
</tr>
</table>

<br>

## ✦ Estrutura

```
src/
├── app/            rotas em dois idiomas, robots, sitemap, llms.txt e estilos
├── componentes/    página, navegação, modal do estudo de caso e animações
├── conteudo/       textos, projetos, certificações e tecnologias (pt e en)
└── lib/            regras puras: SEO, rolagem, idioma, contato, bloqueio, animações
```

Os comportamentos seguem critérios de aceite com identificador (`EST-01`, `EST-02`…), e os testes levam o mesmo identificador no nome.

<br>

## ✦ Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # testes (Vitest)
npm run lint     # ESLint
npm run build    # build de produção
npm run start    # serve o build
```

O formulário de contato usa o Web3Forms. Para receber as mensagens, crie um `.env.local` com:

```bash
NEXT_PUBLIC_WEB3FORMS_KEY=sua-chave
```

<br>

<div align="center">

<img src=".github/readme/nota-verso.webp" alt="Verso da Nota MC: um terminal diante do mar de Vitória, um maço de notas e o olho no medalhão, com a legenda Confie, mas verifique" width="100%">

<sub><b>CONFIE, MAS VERIFIQUE</b></sub>

</div>

<br>

## ✦ Direitos

© 2026 Matheus Cortes. Todos os direitos reservados.

O código está público para consulta e avaliação. Reutilização, cópia ou redistribuição, total ou parcial, do código, dos textos, da identidade visual, das imagens e das animações exigem autorização. As capturas de projetos de clientes pertencem aos respectivos titulares, e as gravuras antigas usadas como base estão em domínio público.
