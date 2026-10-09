# Isabella — 15 Anos

Convite digital mobile-first criado para a celebração dos 15 anos de Isabella.

## ✨ Experiência

- composição vertical pensada para compartilhamento no WhatsApp
- atmosfera noturna romântica com moldura prateada
- pétalas e partículas luminosas animadas
- envelope elegante com animação de abertura
- contagem regressiva para 15 de novembro de 2026, às 15h
- confirmação de presença com mensagem pronta no WhatsApp
- suporte a redução de movimento para acessibilidade

## 🌙 Visual

A direção combina azul-meia-noite, prata clara, dourado quente e pétalas em rosa muito suave. A paisagem foi produzida especialmente para o convite, mantendo a área central limpa para a leitura.

## 🚀 Executando localmente

Requer Node.js 22 ou superior.

```bash
npm install
npm run dev
```

Depois, acesse o endereço exibido pelo terminal.

## 🔗 Convite publicado

[Visualizar convite](https://isabela-15-anos.lendariomito.chatgpt.site)

---

Projeto de Felipe Araujo.

## Compartilhar a arte do convite

A arte está em `public/convite-isabella.jpg`. O botão Compartilhar convite abre o compartilhamento do aparelho quando o navegador permite enviar arquivos. A pessoa escolhe o WhatsApp e o destinatário. Baixar convite permite salvar a imagem e enviá-la manualmente. Cancelar o compartilhamento não confirma a presença nem envia uma mensagem.

### Ocultar o compartilhamento com foto

No arquivo `app/invitation-config.ts`, altere:

```ts
export const SHOW_PHOTO_SHARING = false;
```

Salve, faça commit e envie para a branch de produção. Isso oculta Compartilhar convite e Baixar convite nas duas áreas e evita carregar a arte. Os botões Confirmar presença continuam funcionando. Para reativar, use `true`.

Ocultar os botões não apaga a imagem do site. Para retirar também o arquivo publicado, remova `public/convite-isabella.jpg` e publique a alteração. Versões antigas podem continuar no histórico do Git.
