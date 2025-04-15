# Chat App

Este projeto consiste em um chat funcional, inspirado no Bate-Papo UOL. O sistema foi implementado utilizando apenas **JavaScript puro** (sem bibliotecas externas), com um layout responsivo para dispositivos móveis. A principal funcionalidade do chat é permitir que os usuários entrem em salas, enviem mensagens públicas ou reservadas, e interajam com outros participantes.

## Funcionalidades

- **Entrada na sala:**
  - O usuário é solicitado a inserir seu nome.
  - O nome é verificado no servidor para garantir que não há duplicidade.
  - Após a validação, o usuário entra na sala de bate-papo.
  
- **Exibição de mensagens:**
  - Mensagens públicas e reservadas são exibidas com diferentes cores de fundo.
  - Mensagens de status, como "Entrou na sala" e "Saiu da sala", têm fundo cinza.
  - Mensagens reservadas para um usuário têm fundo vermelho e são visíveis apenas para o destinatário.
  - A cada 3 segundos, o chat é atualizado com as mensagens mais recentes.

- **Envio de mensagens:**
  - O usuário pode enviar mensagens públicas ou reservadas para um destinatário específico.
  - Caso o envio de mensagem falhe (por exemplo, se o usuário saiu da sala), o sistema reinicia e solicita novamente o nome.

- **Seleção de participantes:**
  - O usuário pode visualizar a lista de participantes da sala e selecionar quem será o destinatário de uma mensagem.
  - A lista de participantes é atualizada a cada 10 segundos.

## Tecnologias

- **HTML** - Estrutura do conteúdo.
- **CSS** - Estilos responsivos.
- **JavaScript** - Lógica do chat e interação com a API.




