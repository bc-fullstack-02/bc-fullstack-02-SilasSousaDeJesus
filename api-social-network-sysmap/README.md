<div>
  <h2 align="center"> &rArr; Instruções  do uso &lArr;</h2>
</div>

<br>

 <h3>Para usar este projeto siga os seguintes passos: </h3>

  <ul >
    <h3>Com docker: </h3>
    <li>Faça um git clone ou baixe manualmente o projeto.</li>
    <li>Dentro da pasta BackEnd renomeio o arquivo .env_exemplo para .env</li>
    <li>Dentro do arquivo .env coloque sua chave do mongoDB logo apos MONGODB_URI= e sua secrete logo aós ACCESS_TOKEN_SECRET=</li>
    <li>Por fim o comando:" docker build -t parrot/dockernode . "  e em seguinda o comando: docker run -p 8000:8000 -d parrot/dockernode </li>
    _____________________________
    <br/>
    <h3>Sem docker: </h3>
    <li>Faça um git clone ou baixe manualmente o projeto.</li>
    <li>Dentro da pasta BackEnd renomeio o arquivo .env_exemplo para .env</li>
    <li>Dentro do arquivo .env coloque sua chave do mongoDB logo apos MONGODB_URI= e sua secrete logo aós ACCESS_TOKEN_SECRET=</li>
     <li>No seu VSCODE abra um terminal para pasta back-end e instala os modulos com o comando npm install</li>
    <li>Rode o comando: npm run start</li>
     <li>Tudo pronto!!</li>
  </ul>
</div>
