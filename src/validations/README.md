# Validações

### Responsabilidade:
Garantir que os dados recebidos nas requisições estejam corretos e conformes com as especificações antes de prosseguir para o processamento.

### Função:
Realizar checagens nos dados de entrada para assegurar sua integridade, formato e conformidade com os requisitos. Alertar e impedir o prosseguimento de requisições que contêm dados inválidos.

### Interação:
As validações são executadas logo após o recebimento da requisição e antes de qualquer processamento. Se os dados da requisição passarem nas validações, o fluxo segue normalmente para os controladores e serviços. Se não, uma resposta de erro é enviada diretamente ao cliente.