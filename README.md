# 🥰🤪😎🤔👍👏🎁🥳2️⃣0️⃣2️⃣1️⃣🙏☠️🗣
# Emoji Language - Projeto de Compiladores

### Prof. Isidro, 2021.Q2

## Integrantes

	André Yuji Sakuma - 11201920463
	Felipe Oliveira Silva - 11201822479
	Felipe de Souza Tiozo - 11201822483
	Gabriela Ayumi Ueda - 11201811619
	Leandro de Souza Mattos - 11049914
	Vitor Bobig Diricio - 11201811376
	
	
## Como Usar

Rodar o comando abaixo no terminal para clonar o repositório para o seu computador:
```
git clone https://github.com/felipetiozo/emoji-language.git
```

Instalar o [Node.js](https://nodejs.org/en/) na versão >12 e o [Yarn](https://yarnpkg.com/).

Rodar no terminal:
```
yarn install
```

Para compilar o código de .emoji para .py, rode:
```
node index.js -f <nome do arquivo>.emoji
```
	
☺️🎉🥳🎁 Pronto, o compilador será executado e o código compilado na pasta `out`


## Exemplo de código (.emoji)

```
🔡 text = "hello world"
🔢 number = 2
🔢 number2 = number
🔣 decimal = 2.3

number = 52

text = "asdasd"

🤔 text == "hello world" {
  🖨 "ola mundo"
}

🤔 number == 2 {
  🖨 "seu numero é igual à 2"
}
😧 {
  number = 2
  🖨 "dasdas"
}

🔄 number2 < number {
  number = number + 1
}

➡️ entrada

🖨 entrada

```

## Saída do código (.py)

```
text = "hello world"
number = 2
number2 = number
decimal undefined 2.3
number = 52
text = "asdasd"
if text == "hello world":
	print("ola mundo")
	
if number == 2:
	print("seu numero é igual à 2")
	
else:
	number = 2
	print("dasdas")
	
while number2 < number:
	number = round(number + 1)
	
entrada = input()
print(entrada)
```
	
## Regras obrigatórias

**1. Possui dois tipos de variaveis**

**2. Possui a estrutura If.. else**

**3. Verificar atribuição de variáveis (erro semântico) - compatibilidade de tipos**

**4. Operações Aritméticas executadas corretamente**

**5. Atribuições realizadas corretamente**

**6. Possui operações de Entrada e Saída O compilador reconhece se o código irá precisar de entrada e insere um scanner para leitura limitado apenas para float:**

**7. Aceita números decimais**

**8. Verificar se a variável já foi previamente declarada**


## Limitações
	- ao declarar uma variável, é necessário passar um valor válido
	- não é possível usar condicionais dentro do while e de outras condicionais
	- não é possível usar um while dentro de uma condicional
	- o tipo integer e o tipo decimal suportam apenas 1 operação
	- só é possível fazer um input com o tipo string
	- só é possível imprimir strings, a não ser que o valor esteja dentro de uma variável


