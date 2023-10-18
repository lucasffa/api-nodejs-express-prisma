# Middlewares

### Responsabilidade:
Interceptar e processar requisições e respostas, fornecendo funcionalidades adicionais como autenticação, tratamento de erros, logs, etc.

### Função:
Atuar como intermediários entre o recebimento de uma requisição e a resposta final, permitindo a execução de lógicas específicas em diferentes etapas do ciclo de vida da requisição.

### Interação:
Os middlewares são geralmente acionados após o roteamento da requisição e antes de chegar ao controlador específico. Dependendo de sua função, podem modificar a requisição, a resposta ou ambos. Também podem interromper o fluxo de uma requisição (por exemplo, se um usuário não estiver autenticado) ou passar para o próximo middleware ou controlador usando a função next().