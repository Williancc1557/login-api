# Login api
API em que **qualquer desenvolvedor pode utiliza-la** em sua aplicação, ela está associada a uma database segura hosteada pela **heroku**.

Com essa rota você pode salvar login (email, senha) de qualquer usuário e ainda com auth usando token gerado pelo frameword **jwt**.

## Link da API = https://login-api-dev.herokuapp.com

# Rotas disponiveis para se utilizar

## Rota de registro `https://login-api-dev.herokuapp.com/users`

Para **realizar um registro** utilize essa rota com o método **POST**, 

`https://login-api-dev.herokuapp.com/users`

#### Estrutura do body:

```json
{
    "email": "",
    "password": "",
    "domain": "",
    "domainkey": ""
}
```
_Obs: Não perca seu **DOMAIN** nem seu **DOMAINKEY** em hipotese alguma!_

`email:` registrar email de algum usuário

`password:` senha do usuário

`domain:` seu domínio (se não tem um vai ser criado automaticamente)

`domainkey:` senha de acesso ao seu domínio



### Para que serve essa rota?

**Essa rota serve primordialmente para:**

- **registrar seu dominio** no banco de dados!
- **registrar uma conta** utilizando seu domínio.

## Rota para encontrar usuário `https://login-api-dev.herokuapp.com/users/:email/:domain/:domainkey`

- **:email, :domain, :domainkey** são parâmetros para você substituir de acordo com os seus dados.

**Exemplo de retorno:**

```json
{
  "user": {
    "email": "asdawd@wadawd.com",
    "password": "asdsadsa",
    "domain": "WILL",
    "domainkey": "croma"
  },
  "token": "eyJhciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGF3ZGRAd2FkYXdkLmNvbSIsImlhdCI6MTY0MDkwOTA2MCwiZXhwIjoxNjQwOTEyNjYwfQ.SjvkZOmwgc6IxwYk2J4Z5a2PBn1VZ1UBxH6z2ibouG0"
}
```

## Validador de token `https://login-api-dev.herokuapp.com/verifyauth/:token`

Com essa rota você consegue **verificar se um token está válido!**

Vai retornar `true` ou `false`.

** O token é válido por 5 horas **