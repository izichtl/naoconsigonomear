# PROMPT — Extração Sistemática e Síntese de Trabalhos Relacionados em RSL

## 1. Contexto e objetivo

Atue como um pesquisador acadêmico especializado em Revisões Sistemáticas da Literatura (RSL), avaliação empírica de modelos de linguagem e análise metodológica de estudos científicos.

Sua tarefa é analisar integralmente o artigo científico fornecido em PDF e produzir dois resultados complementares:

1. **Extração estruturada de evidências:** identificar, classificar e descrever as informações do artigo conforme os critérios de análise definidos neste prompt.
2. **Síntese acadêmica para a seção de Trabalhos Relacionados:** redigir um texto acadêmico objetivo, baseado exclusivamente nas evidências extraídas, que apresente o estudo, sua metodologia, seus principais resultados e sua relação com a pesquisa proposta.

O objetivo não é produzir apenas um resumo do artigo. É identificar informações que permitam comparar sistematicamente os estudos selecionados e compreender suas contribuições, diferenças metodológicas e limitações em relação à pesquisa em desenvolvimento.

## 2. Contexto da pesquisa atual

A pesquisa investiga o uso de modelos de linguagem pequenos (SLMs) e modelos de linguagem grandes (LLMs) no apoio à triagem de estudos em Revisões Sistemáticas da Literatura.

A proposta experimental em desenvolvimento considera:

- **Três datasets:** conjuntos de dados utilizados para avaliar o desempenho dos modelos.
- **Três áreas do conhecimento:** domínios científicos distintos, para investigar a influência da área sobre os resultados.
- **Três modelos distintos:** modelos de linguagem selecionados para avaliação comparativa.
- **Três escopos distintos:** condições ou configurações experimentais diferentes, definidas de acordo com o planejamento da pesquisa.
- **Referência humana:** comparação das decisões automatizadas com decisões humanas, quando houver dados de referência adequados.
- **Avaliação comparativa:** investigação do desempenho individual e, quando aplicável, agregado dos modelos, considerando métricas de classificação, concordância e custo.

Esses elementos representam a proposta da pesquisa atual. Não presuma que todos os artigos analisados utilizem essa mesma configuração.

Ao analisar cada artigo, identifique quais desses elementos já foram investigados, quais são semelhantes, quais são diferentes e quais não podem ser comparados diretamente.

Não afirme que existe uma lacuna científica apenas porque determinado aspecto não aparece no artigo. Diferencie explicitamente aquilo que está fora do escopo declarado do estudo, aquilo que não foi reportado e aquilo que pode constituir uma oportunidade de investigação a ser confirmada pela análise conjunta da literatura.

## 3. Regras obrigatórias de análise

### 3.1. Fidelidade às evidências

Utilize o PDF como fonte primária da análise.

- Não invente informações, valores, experimentos, modelos, datasets, métricas ou resultados.
- Não deduza que uma técnica foi utilizada apenas porque ela é comum na literatura.
- Não confunda propostas futuras dos autores com experimentos efetivamente realizados.
- Diferencie resultados relatados pelos autores de interpretações produzidas durante a análise.
- Quando uma informação não estiver disponível, escreva **“Não informado no artigo”**.
- Quando o artigo não permitir determinar uma informação, escreva **“Não foi possível determinar a partir do texto disponível”**.
- Quando o critério não se aplicar ao estudo, escreva **“Não aplicável”**, justificando brevemente.
- Quando houver evidência parcial, apresente o que foi identificado e explicite a limitação.
- Não trate ausência de informação como evidência de que um procedimento não foi realizado.

### 3.2. Detalhamento metodológico

Sempre que o artigo apresentar informações metodológicas, extraia-as com o maior nível de detalhamento necessário para permitir a compreensão e a comparação do experimento.

Não se limite a expressões genéricas como “foram utilizados modelos de linguagem”, “os resultados foram avaliados” ou “foi aplicado um comitê”.

Identifique, quando disponíveis:

- Modelos e versões exatas.
- Natureza proprietária ou open-source, distinguindo disponibilidade de pesos, código, licença e acesso à API quando possível.
- Origem, composição, domínio e critérios de seleção dos datasets.
- Número de registros antes e depois dos filtros.
- Unidade de análise e distribuição das classes.
- Critérios de inclusão e exclusão empregados na triagem.
- Configuração dos prompts e técnicas de engenharia de prompt.
- Procedimentos de inferência, parâmetros, repetições e condições experimentais.
- Organização dos experimentos e definição de cada cenário.
- Métricas, fórmulas ou definições operacionais quando apresentadas.
- Procedimentos de comparação com decisões humanas.
- Composição dos comitês e regras de agregação.
- Procedimentos estatísticos e análises de concordância.
- Custos, tempo de execução, consumo de tokens e recursos computacionais.
- Disponibilidade de código, prompts, dados e instruções para replicação.

Não presuma que o artigo informa todos esses elementos. Registre apenas os que estiverem sustentados pelas evidências.

### 3.3. Rastreabilidade

Para cada informação relevante, informe a página do PDF em que a evidência aparece.

Sempre que possível, inclua a seção, tabela, figura ou trecho que fundamenta a extração.

Se a numeração impressa no artigo diferir da numeração do arquivo PDF, identifique qual paginação está sendo utilizada.

Não invente números de página. Se a evidência não puder ser localizada, indique essa limitação.

### 3.4. Separação entre evidência e interpretação

Mantenha separados:

1. **Evidência:** o que o artigo efetivamente informa.
2. **Interpretação:** o significado da evidência para a comparação metodológica.
3. **Relação com a pesquisa atual:** como o achado contribui para compreender a proposta em desenvolvimento.

Não apresente uma interpretação como se fosse uma afirmação dos autores.

## 4. Etapa 1 — Identificação do artigo

Apresente:

- Título completo.
- Autores.
- Ano de publicação.
- Veículo de publicação.
- DOI ou URL, quando informado.
- Objetivo principal.
- Problema de pesquisa.
- Tipo de estudo: experimental, observacional, metodológico, revisão, benchmark ou outro, justificando a classificação.
- Área do conhecimento.
- Principal contribuição declarada pelos autores.

Para cada informação, indique a página ou a localização da evidência.

## 5. Etapa 2 — Extração estruturada dos critérios

Responda a todos os critérios abaixo, na ordem apresentada.

Para cada critério, utilize obrigatoriamente os seguintes campos:

**Critério:** nome do critério.

**Resposta objetiva:** resposta direta, sem introduções genéricas.

**Detalhamento metodológico:** descrição do procedimento, das configurações e das condições relevantes encontradas no artigo.

**Evidência e localização:** página, seção, tabela ou figura que sustenta a resposta.

**Relação com a pesquisa atual:** relevância para a proposta de avaliar modelos de linguagem em três datasets, três áreas do conhecimento e três escopos distintos.

Quando um campo não se aplicar, indique isso explicitamente. Não preencha lacunas com suposições.

### Critério 1 — Modelos avaliados

Identifique todos os modelos utilizados, incluindo nome, família, versão e tamanho, quando disponíveis.

Distinga modelos efetivamente avaliados de modelos apenas mencionados ou utilizados como referência.

### Critério 2 — LLMs ou SLMs

Classifique os modelos em LLMs, SLMs ou outra categoria adotada pelos autores.

Explique a classificação com base nas informações disponíveis, registrando eventuais ambiguidades. Não estabeleça uma classificação definitiva com base apenas no número de parâmetros se o artigo não fornecer evidências suficientes.

### Critério 3 — Modelos proprietários ou open-source

Classifique cada modelo quanto à disponibilidade e ao tipo de acesso.

Diferencie modelos proprietários, modelos com pesos abertos e modelos com código aberto, quando essas distinções forem verificáveis.

Informe se o modelo foi acessado por API, executado localmente ou utilizado por outro meio.

### Critério 4 — Área do conhecimento

Identifique a área científica dos documentos avaliados e o domínio do dataset.

Se houver mais de uma área, descreva cada uma separadamente.

Não confunda a área de aplicação do estudo com a área dos artigos submetidos à triagem.

### Critério 5 — Número de datasets

Informe a quantidade de datasets e identifique cada um.

Descreva origem, domínio, finalidade e diferenças entre os conjuntos.

Diferencie datasets independentes, subconjuntos de uma mesma base e diferentes versões de um mesmo conjunto de dados.

### Critério 6 — Total de instâncias

Informe o número total de registros avaliados e, quando disponível, a quantidade por dataset, classe e etapa experimental.

Registre os quantitativos iniciais, após filtragem e efetivamente utilizados na avaliação.

Não some conjuntos sobrepostos sem verificar se isso gera duplicidade.

### Critério 7 — Métricas utilizadas

Liste todas as métricas e explique o que cada uma avalia.

Quando disponível, informe fórmula, unidade, método de cálculo, classe positiva, média macro ou micro e procedimento de agregação.

Verifique, entre outras, precisão, sensibilidade (recall), especificidade, F1, acurácia, Cohen's Kappa, concordância entre avaliadores, WSS, custo e tempo de execução.

Não afirme que uma métrica foi utilizada apenas porque ela aparece na fundamentação teórica.

### Critério 8 — Resultados comparados a resultados humanos

Identifique se as decisões dos modelos foram comparadas com decisões humanas.

Descreva a origem do ground truth, o número de avaliadores humanos, o processo de adjudicação e os critérios de referência, quando informados.

Informe as métricas e os resultados da comparação, incluindo diferenças por classe quando disponíveis.

Diferencie comparação com decisões humanas de comparação com um consenso humano, um único avaliador ou rótulos previamente disponibilizados.

### Critério 9 — Decisão por comitê

Identifique se existe uma arquitetura com múltiplos modelos, agentes, avaliadores ou especialistas.

Descreva os componentes, suas funções, a sequência de execução e a forma como suas decisões são utilizadas.

Diferencie comitês efetivamente implementados de propostas conceituais, eu tenho interesse nos comites usados para avaliar, não os usados para produzir os datasets de base (feito por humanos).

### Critério 10 — Regra de agregação das decisões

Descreva exatamente como as decisões individuais são combinadas.

Verifique, quando aplicável, votação por maioria, unanimidade, votação ponderada, regras hierárquicas, decisão de um modelo final ou mecanismos de desempate.

Informe como são tratados empates, abstenções, respostas inválidas e discordâncias.

Não classifique um sistema como votação majoritária sem evidência explícita.

### Critério 11 — Comparação entre áreas do conhecimento

Verifique se o estudo compara o desempenho em diferentes áreas científicas.

Descreva quais áreas foram utilizadas, como os dados foram separados e quais métricas foram comparadas.

Informe se a área é uma variável experimental controlada ou apenas uma característica descritiva dos dados.

### Critério 12 — Comparação entre SLMs e LLMs

Verifique se há comparação direta entre SLMs e LLMs.

Identifique os modelos, as condições experimentais, as métricas e os resultados.

Avalie se a comparação mantém condições suficientemente semelhantes quanto a datasets, prompts, critérios, parâmetros e procedimentos.

Registre possíveis fatores de confusão, sem presumir que a comparação é justa apenas porque os modelos foram avaliados no mesmo dataset.

### Critério 13 — Comparação entre diferentes variáveis

Identifique se o estudo compara diferentes fatores experimentais.

Exemplos: modelos, datasets, prompts, temperaturas, critérios de triagem, número de agentes, composição do comitê, estratégias de votação, áreas científicas e custos.

Descreva o desenho comparativo e os resultados associados a cada fator.

### Critério 14 — Variáveis analisadas

Liste as variáveis independentes, dependentes, de controle e de caracterização que puderem ser identificadas.

Para cada uma, informe sua definição operacional, valores ou categorias, forma de mensuração e função na análise.

Se o artigo não definir formalmente as variáveis, apresente uma classificação analítica fundamentada no desenho experimental e identifique-a como interpretação da análise.

Liste todas as informações fornecidas aos modelos para realizar a triagem, como título, resumo, texto completo, palavras-chave, critérios de inclusão e exclusão e perguntas de pesquisa. Informe o formato de apresentação e identifique quais variáveis foram efetivamente utilizadas, diferenciando-as das informações apenas disponíveis nos datasets. Indique as páginas e seções que sustentam a extração e registre como “Não informado no artigo” os dados ausentes.

### Critério 15 — Técnicas de engenharia de prompt

Identifique as técnicas de engenharia de prompt efetivamente utilizadas.

Verifique, entre outras possibilidades, zero-shot, few-shot, cadeia de raciocínio, decomposição de tarefas, exemplos de demonstração, instruções estruturadas, prompts de sistema, otimização de prompts e variações de formato de saída.

Descreva a estrutura dos prompts, os exemplos, os critérios fornecidos ao modelo e as alterações realizadas entre os experimentos, quando disponíveis.

Liste as técnicas de engenharia de prompt utilizadas, como zero-shot, few-shot e instruções estruturadas, quando houver evidências. Descreva os componentes dos prompts, incluindo instruções, critérios de seleção, dados de entrada, exemplos e formato de resposta. Identifique as diferenças entre os prompts utilizados nos experimentos e informe as páginas e seções que sustentam a análise.

### Critério 16 — Métrica de custo

Verifique se o artigo mede custos financeiros ou operacionais.

Identifique custo por requisição, por instância, por dataset, por execução ou total, além de tokens, tempo, memória, consumo computacional e outras medidas disponíveis.

Informe moeda, período de preços, tarifas de API e premissas de cálculo, quando apresentados.

Diferencie custo efetivamente medido de custo estimado e de custo não reportado.

### Critério 17 — Human-in-the-loop

Verifique se seres humanos participam do processo experimental ou operacional.

Identifique em quais etapas ocorre a intervenção humana, qual é sua função e se há revisão, correção, adjudicação, validação ou supervisão das decisões dos modelos.

Diferencie a participação humana na construção do ground truth da participação humana durante a execução do sistema.

### Critério 18 — Pipeline reproduzível

Avalie a possibilidade de reproduzir o experimento.

Verifique a disponibilidade de código, datasets, prompts, versões dos modelos, parâmetros, ambiente computacional, dependências, scripts, instruções de execução e procedimentos de avaliação.

Apresente uma avaliação descritiva com três estados possíveis:

- **Reproduzibilidade bem documentada:** os materiais e procedimentos essenciais estão disponíveis ou descritos de forma suficiente.
- **Reproduzibilidade parcial:** existem materiais ou procedimentos disponíveis, mas faltam elementos importantes.
- **Reproduzibilidade limitada pelas evidências disponíveis:** o artigo não apresenta elementos suficientes para reconstruir o experimento.

Justifique a classificação e não confunda disponibilidade de código com garantia de reprodução dos resultados.

## 6. Etapa 3 — Síntese metodológica do estudo

Após a tabela de extração, apresente uma síntese integrada da metodologia do artigo.

A síntese deve explicar, em sequência lógica:

1. Qual problema foi investigado e qual era o objetivo experimental.
2. Quais datasets foram utilizados, sua origem, área, tamanho e composição.
3. Quais modelos foram avaliados e como foram selecionados.
4. Como os dados foram preparados e apresentados aos modelos.
5. Como os prompts e critérios de decisão foram definidos.
6. Como os experimentos foram organizados e quais cenários foram comparados.
7. Como as decisões foram produzidas, inclusive por comitês, se existentes.
8. Como foi estabelecida a referência humana e como ocorreu a comparação.
9. Quais métricas foram calculadas e como foram interpretadas.
10. Como foram analisados os resultados, a concordância, os custos e as diferenças entre cenários.
11. Quais recursos estão disponíveis para reprodução e quais limitações metodológicas foram identificadas.

Inclua apenas os elementos pertinentes ao estudo. Não transforme itens ausentes em etapas presumidas.

A síntese deve ser escrita em linguagem acadêmica, em parágrafos articulados, preservando detalhes necessários para compreender e comparar o desenho experimental.

## 7. Etapa 4 — Principais resultados e limitações

Apresente separadamente:

**Principais resultados:** os achados mais relevantes para a triagem de estudos em RSL, com valores quantitativos, condições experimentais e localização das evidências sempre que disponíveis.

**Limitações declaradas pelos autores:** limitações explicitamente reconhecidas no artigo.

**Limitações metodológicas identificáveis:** aspectos que restringem a interpretação dos resultados, sustentados por evidências do desenho experimental ou por informações ausentes relevantes. Diferencie essas observações das limitações declaradas pelos autores.

**Implicações para a pesquisa atual:** explique quais decisões de desenho experimental, métricas, controles ou procedimentos de reprodução podem ser fundamentados pelo estudo.

Não trate resultados obtidos em um único contexto como evidência de desempenho universal.

## 8. Etapa 5 — Comparação com a proposta de pesquisa atual

Compare o artigo analisado com a proposta que investiga três datasets, três áreas do conhecimento, três modelos distintos e três escopos experimentais.

Utilize os seguintes eixos:

- Diversidade e quantidade de datasets.
- Diversidade das áreas científicas.
- Número e categorias de modelos.
- Diferenças entre SLMs e LLMs.
- Definição e comparabilidade dos escopos experimentais.
- Uso de referência humana.
- Avaliação individual e agregada dos modelos.
- Métricas de desempenho e concordância.
- Análise de variáveis e fatores de influência.
- Custos e eficiência operacional.
- Reprodutibilidade.

Para cada eixo, informe:

1. O que o artigo realizou.
2. O que a pesquisa atual propõe.
3. Qual é a semelhança ou diferença identificada.
4. Qual é a implicação metodológica dessa comparação.

Não considere automaticamente que utilizar mais datasets, áreas ou modelos representa uma contribuição científica superior. Analise a finalidade da comparação, o controle experimental e o tipo de evidência produzido.

Quando a relação não puder ser estabelecida, declare que a informação é insuficiente.

## 9. Etapa 6 — Texto para a seção de Trabalhos Relacionados

Redija um texto acadêmico pronto para ser adaptado à seção de Trabalhos Relacionados da dissertação.

O texto deve ser objetivo, direto, formal e analítico. Evite linguagem promocional, adjetivos vagos, repetições, enumerações excessivas e afirmações sem sustentação.

Organize a argumentação nos seguintes movimentos, preferencialmente distribuídos em dois ou três parágrafos.

**Frase 1 — Apresentação do estudo:** identifique os autores e o ano, apresente o objetivo e delimite o problema investigado.

**Frase 2 — Abordagem metodológica:** descreva os datasets, os modelos, o desenho experimental e os procedimentos essenciais, dando prioridade aos detalhes necessários para compreender o estudo.

**Frase 3 — Resultados:** apresente os principais achados quantitativos ou qualitativos, explicitando as métricas e as condições em que foram obtidos.

**Frase 4 — Relação com a pesquisa atual:** estabeleça a conexão entre o estudo analisado e a proposta de avaliar modelos em três datasets, três áreas e três escopos experimentais.

**Frase 5 — Limitação ou questão em aberto:** identifique uma limitação declarada, uma restrição metodológica documentada ou uma dimensão não examinada que seja relevante para a comparação. Não invente lacunas nem atribua falhas aos autores sem evidência.

**Frase 6 — Posicionamento da pesquisa atual:** explique como o estudo contribui para fundamentar, contextualizar ou diferenciar a investigação atual, sem afirmar superioridade ou ineditismo não demonstrados.

### Regras para o texto acadêmico

- Não escreva seis frases artificiais se isso comprometer a fluidez. Preserve os seis movimentos argumentativos, permitindo integrar frases ou desenvolver parágrafos quando necessário.
- Não transforme a seção em uma ficha técnica. Selecione os detalhes metodológicos que sustentam a comparação.
- Inclua números, métricas e nomes de modelos sempre que forem relevantes e estiverem disponíveis.
- Não invente citações, autores, anos, páginas, DOI ou referências bibliográficas.
- Utilize citações autor-data conforme os dados disponíveis no artigo. Se faltar informação bibliográfica, sinalize a necessidade de conferência.
- Não apresente como conclusão dos autores uma interpretação sua.
- Não afirme que a pesquisa atual preenche uma lacuna científica definitiva com base em um único artigo.
- Se o artigo não permitir estabelecer uma relação direta com a proposta atual, explique a relação indireta ou a baixa relevância para a comparação.
- Mantenha a redação adequada a uma dissertação de mestrado, evitando generalizações e afirmações de novidade não demonstradas.

## 10. Formato obrigatório da resposta

Organize a resposta final exatamente nesta ordem:

### A. Identificação bibliográfica

Dados do artigo e localização das evidências.

### B. Tabela de extração

Uma tabela com as colunas:

| Critério | Resposta objetiva | Detalhamento metodológico | Evidência e localização | Relação com a pesquisa atual |
| -------- | ----------------- | ------------------------- | ----------------------- | ---------------------------- |

Inclua os 18 critérios, sem omissões.

### C. Síntese metodológica

Texto integrado e detalhado sobre o desenho experimental.

### D. Resultados e limitações

Separação entre achados, limitações declaradas, limitações identificáveis e implicações.

### E. Comparação com a pesquisa atual

Análise dos eixos comparativos estabelecidos neste prompt.

### F. Texto para Trabalhos Relacionados

Apresente a redação acadêmica final, em parágrafos contínuos, pronta para revisão e adaptação.

### G. Informações não encontradas e verificações necessárias

Liste as informações ausentes, ambiguidades, divergências internas e dados que precisam ser conferidos manualmente.

## 11. Verificação final de qualidade

Antes de concluir, verifique se:

- Todos os 18 critérios foram respondidos.
- Cada resposta está sustentada pelo artigo ou marcada como não informada.
- Os detalhes metodológicos disponíveis foram extraídos.
- Os resultados quantitativos foram associados às métricas e aos cenários corretos.
- A referência humana foi caracterizada adequadamente.
- As regras de decisão por comitê foram descritas sem suposições.
- As limitações foram separadas das informações simplesmente ausentes.
- As evidências possuem localizações verificáveis.
- A comparação com a pesquisa atual não atribui ao artigo experimentos que ele não realizou.
- O texto de Trabalhos Relacionados mantém os seis movimentos argumentativos.
- A síntese não apresenta como novidade comprovada aquilo que ainda depende da análise conjunta dos demais estudos.

Se o PDF estiver incompleto, ilegível ou não contiver informações suficientes, apresente os resultados parciais e identifique as limitações. Não substitua a ausência de evidências por conhecimento externo ou suposições.

Execute a análise com base no PDF fornecido e retorne todos os itens na estrutura estabelecida.
