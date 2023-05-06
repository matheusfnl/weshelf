# weshelf

## Faça um Fork do proejto

Tutorial bacana do moço gente boa (https://www.youtube.com/watch?v=q-QTbNu8Ybc)

## Clonando o projeto

1) Primeiro crie uma pasta onde o projeto será armazenado
2) Clone o projeto
```bash
git clone https://github.com/matheusfnl/weshelf.git weshelf
```
3) Entre na pasta do projeto
```bash
cd weshelf
```
4) Instale as bibliotecas
```bash
npm install
```
5) Crie as branches necessárias
```bash
git checkout -b develop
```
A **develop** vai ser a branch onde o código atualizado vai estar armazenado, porém não é a main (github), dessa forma vamos evitar o envio de código incorreto.

 
## Iniciando o servidor
```bash
npm run dev
```
O servidor *provavelmente* vai estar no seu ```localhost:3000/```


## Como iniciar uma tarefa
Antes de iniciar uma tarefa, dê um objetivo para ela, ao invés de "Criar a tela de *talcoisa*", divida essa tela em partes, faça o código de cada parte separadamente, isso torna mais facil de resolver possíveis conflitos de código, além de ser mais organizado.

#### Exemplo de desenvolvimento da tarefa: criar menu 
Antes de qualquer coisa certifique-se de estar na branch develop (!!)
```bash
git checkout develop
```
1) Crie uma nova branch local para aquela tarefa em especifico
```bash
git checkout -b nome-da-branch
```
O nome da branch é relacionado a tarefa que você está realizando, portanto o ideal para a tarefa **criar menu** seria ```cria-menu-do-weshelf``` ou algo parecido. Após criar a branch, você pode começar a codar sua tarefa.

2) Após finalizada, adicione os arquivos
```bash
# adicionando todos os arquivos de uma vez
git add .
# ou adicionar um arquivo por vez
git add *nomedoarquivo* 
```

3) Agora realize o commit dos arquivos, se você adicionar um arquivo apos o commit, outro commit vai ser necessário. Realize quantos commits quiser :D
```bash
git commit -m nome-do-commit
```

5) Mescle o código atualizado da develop no seu código

Tenha certeza de ter feito o commit antes de realizar esse passo
```bash
git checkout develop
git pull
git checkout nome-da-branch
git merge develop
```
Caso dê conflitos de código, vai ser necessário corrigir os conflitos e voltar ao passo 2.

4) Envie o arquivo para o github
```bash
git push origin develop
# caso apareça uma mensagem pendindo para realizar o push com um outro código, copie e cole o código proposto
```

5) Vá para o github e crie uma Pull Request para isso siga o tutorial dese moço gente boa a partir do tempo *5:06* (https://www.youtube.com/watch?v=Du04jBWrv4A)
