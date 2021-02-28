# encoding: utf-8
# language: pt-br
Funcionalidade: Home page, com visualização da barra de atividades, usuário logado, boas vindas e calendário da semana

Cenario: Visualizar que estou logado
Dado que esteja logado na Job Interview
Quando eu estiver na Home page
Então devo visualizar meu nome de usuário na aba superior da página
E devo visualizar minha foto
E devo visualizar o botão "Opções"
E devo visualizar o botão "Sair"

Cenario: Visualizar a barra de atividades
Dado que esteja logado na Job Interview
Quando eu clicar no botão "Opções"
Então devo visualizar minha barra de atividades
E devo ver a opção Minhas Entrevistas
E devo ver a opção Meu calendário
E devo ver a opção Candidatos
E devo ver a opção Meus Questionários

Cenario: Mensagem de boas vindas
Dado que eu esteja logado na Job Interview
Quando eu estiver na Home page
Então devo visualizar uma mensagem personalizada de boas vindas
E devo visualzar quantas entrevistas agendadas eu possuo

Cenario: Calendário da semana
Dado que eu esteja logado na Job Interview
Quando eu estiver na Home page
Então devo visualizar um calendário com os dias da semana vigente
E devo visualizar minhas entrevistas agendadas para semana

Cenario: Entrevistas da semana
Dado que eu esteja logado na Job Interview
Quando eu estiver na Home page
