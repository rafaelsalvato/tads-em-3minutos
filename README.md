# TADS em 3 minutos

O **TADS em 3 minutos** é um protótipo de experiência interativa para apresentar o curso de Tecnologia em Análise e Desenvolvimento de Sistemas da Faculdade de Tecnologia da Unicamp. A proposta é ajudar visitantes a conhecer, em uma interação breve, o curso, o campus e algumas possibilidades de atuação na área.

## Como executar

Baixe os arquivos do repositório e abra `index.html` em um navegador, mantendo a pasta `assets` no mesmo diretório. Não é necessário instalar dependências nem iniciar um servidor.

A experiência pode ser aberta localmente. Para acessar os links que levam a páginas oficiais, é necessária conexão com a internet.

## O que a experiência oferece

- Informações sobre o curso e sua localização;
- Conteúdos e áreas relacionados à formação;
- Exemplos de projetos e caminhos profissionais;
- Um desafio interativo;
- Seleção de interesses e geração de um resumo para download.

## Estrutura dos arquivos

| Arquivo | Função |
| --- | --- |
| `index.html` | Estrutura principal da página e carregamento dos recursos. |
| `assets/css/styles.css` | Estilos, componentes visuais e adaptação para diferentes tamanhos de tela. |
| `assets/js/data.js` | Dados utilizados nas telas, como áreas, projetos, carreiras e links. |
| `assets/js/app.js` | Navegação, interações, desafio e geração do resumo. |
| `assets/img/ft-logo.png` | Imagem utilizada na interface. |

Para atualizar informações exibidas na experiência, consulte `data.js` e os textos das telas em `app.js`. Alterações de aparência ficam em `styles.css`.

## Antes de apresentar

Recomendamos percorrer a experiência completa no dispositivo que será utilizado, conferir o desafio e o download do resumo e verificar se os links oficiais estão acessíveis. As informações sobre o curso também devem ser conferidas nas fontes institucionais antes de uma apresentação ao público.
