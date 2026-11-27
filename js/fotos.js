/* =========================================================
   ABATIRO — fotografias do site
   ---------------------------------------------------------
   Cada espaço de foto do site tem um nome (à esquerda).
   Para colocar uma foto:
     1. copie o arquivo para a pasta  assets/img/
        (de preferência .jpg ou .webp, até ~1600 px de largura);
     2. escreva o nome do arquivo entre aspas no espaço certo,
        por exemplo:   hero: "rua-centro.jpg",
   Enquanto um espaço estiver como null, o site mostra o
   bloco de cor no lugar da foto, como nas telas do projeto.

   `alt` é a descrição da foto para leitores de tela.
   `pos` (opcional) ajusta o enquadramento, ex.: "50% 30%".
   ========================================================= */

window.ABATIRO_FOTOS = {
  /* Página inicial */
  "hero":          { arquivo: "abatiro-hero.jpg", alt: "Manifestante com o rosto coberto por um pano e um estandarte de madeira, destacado em laranja com a espiral do Abatiro", pos: "50% 40%" },
  "quem-somos":    { arquivo: "abatiro-familias-ato.jpg", alt: "Famílias e jovens reunidos em um ato no centro de Curitiba, com uma pessoa destacada pela espiral laranja", pos: "60% 35%" },

  /* Manifesto — um espaço por "Foto sugerida" do texto */
  "manifesto-abertura": { arquivo: "abatiro-foto-06-praca.jpg", alt: "Multidão sentada diante de um monumento no centro de Curitiba, com uma estátua destacada em laranja", pos: "50% 60%" },
  "manifesto-p02":      { arquivo: "abatiro-estudantes-noite.jpg", alt: "Rua do centro à noite, cheia de jovens, com uma bandeira estudantil erguida", pos: "50% 55%" },
  "manifesto-p03":      { arquivo: "abatiro-foto-03-multidao.jpg", alt: "Multidão em frente a um monumento, com um grupo e uma faixa destacados em laranja", pos: "50% 65%" },
  "manifesto-p04":      { arquivo: "abatiro-foto-08-faixa.jpg", alt: "Jovem em pé ao lado de uma faixa laranja em uma praça arborizada", pos: "30% 50%" },
  "manifesto-p06":      { arquivo: "abatiro-foto-05-estatua.jpg", alt: "Escultura de pedra de uma mulher, em tom avermelhado, com a espiral laranja ao fundo", pos: "50% 30%" },
  "manifesto-p07":      { arquivo: "abatiro-mulheres-indigenas.jpg", alt: "Mulheres indígenas caminhando em um ato no centro da cidade", pos: "55% 50%" },
  "manifesto-p08":      { arquivo: "abatiro-foto-01-xequere.jpg", alt: "Mulheres com xequerês em uma roda de música na rua, uma delas destacada em laranja", pos: "55% 40%" },
  "manifesto-p09":      { arquivo: "abatiro-foto-06-praca.jpg", alt: "Grupo reunido na praça diante de um monumento", pos: "30% 80%" },
  "manifesto-p10":      { arquivo: "abatiro-colagem-lambe.jpg", alt: "Jovens colando lambe-lambes juntos em um tapume de madeira no centro", pos: "35% 50%" },
  "manifesto-p11":      { arquivo: "abatiro-cartazes-marco-temporal.jpg", alt: "Cartazes pintados à mão pela causa indígena, um deles contra o marco temporal", pos: "50% 50%" },
  "manifesto-p12":      { arquivo: "abatiro-colagem-lambe.jpg", alt: "Jovens colando lambe-lambes com rolo de cola em um tapume", pos: "70% 45%" },
  "manifesto-p13":      { arquivo: "abatiro-parada-laranja.jpg", alt: "Público de costas diante de um palco montado em frente a um prédio histórico", pos: "50% 80%" },
  "manifesto-p14":      { arquivo: "abatiro-retrato-cachimbo.jpg", alt: "Retrato em preto e branco de um homem indígena com faixa na cabeça e cachimbo, numa praça do centro", pos: "60% 40%" },
  "manifesto-p15":      { arquivo: "abatiro-familias-ato.jpg", alt: "Jovem destacado pela espiral laranja no meio de um ato, olhando o celular", pos: "85% 30%" },
  "manifesto-p16":      { arquivo: "abatiro-foto-06-praca.jpg", alt: "Praça ocupada por pessoas diante de um monumento, com uma estátua destacada em laranja", pos: "80% 40%" },

  /* Coletivos (o nome do espaço está em data.js, campo `foto`) */
  "coletivo-roda-do-bairro":      { arquivo: "abatiro-foto-03-multidao.jpg", alt: "Pessoas reunidas em frente a um monumento no centro", pos: "50% 70%" },
  "coletivo-horta-comum":         { arquivo: "abatiro-horta.jpg", alt: "Horta comunitária em preto e branco, com canteiros cercados de galhos trançados", pos: "40% 55%" },
  "coletivo-tambor-e-tinta":      { arquivo: "abatiro-bateria.jpg", alt: "Mãos tocando caixa e surdo numa bateria de rua, em tom vinho com a espiral laranja", pos: "50% 62%" },
  "coletivo-rede-lilas":          { arquivo: "abatiro-mulheres-indigenas.jpg", alt: "Duas mulheres indígenas com cocares de palha e pinturas no rosto, destacadas em vinho com a espiral laranja", pos: "35% 45%" },
  "coletivo-ocupa-ciclo":         { arquivo: "abatiro-foto-06-praca.jpg", alt: "Rua e praça ocupadas por pessoas no centro de Curitiba", pos: "20% 60%" },
  "coletivo-voz-da-quebrada":     { arquivo: "abatiro-foto-05-estatua.jpg", alt: "Escultura de uma mulher em tom avermelhado com a espiral laranja", pos: "50% 35%" },
  "coletivo-cursinho-de-esquina": { arquivo: "abatiro-estudantes-noite.jpg", alt: "Estudantes à noite com uma bandeira do movimento estudantil", pos: "40% 40%" },
  "coletivo-casa-aberta":         { arquivo: "abatiro-parada-laranja.jpg", alt: "Pessoa de costas com boné e casaco laranja diante de um palco em evento de rua", pos: "50% 88%" },
  "coletivo-teto-e-chao":         { arquivo: "abatiro-foto-08-faixa.jpg", alt: "Faixa laranja estendida em uma praça", pos: "65% 55%" },

  /* Atos */
  "ato-mutirao-de-plantio":  { arquivo: "abatiro-horta.jpg", alt: "Canteiros de uma horta comunitária em preto e branco", pos: "60% 60%" },
  "ato-roda-de-conversa":    { arquivo: "abatiro-familias-ato.jpg", alt: "Pessoas reunidas conversando em um ato", pos: "50% 45%" },
  "ato-oficina-lambe-lambe": { arquivo: "abatiro-colagem-lambe.jpg", alt: "Oficina de lambe-lambe: pessoas colando cartazes em um tapume", pos: "40% 50%" },
  "ato-pedalada":            { arquivo: "abatiro-foto-08-faixa.jpg", alt: "Praça com pessoas e uma faixa laranja estendida no calçamento", pos: "80% 70%" },
  "ato-moradia-digna":       { arquivo: "abatiro-foto-03-multidao.jpg", alt: "Concentração de pessoas em frente a um monumento", pos: "50% 60%" },
  "ato-aula-publica":        { arquivo: "abatiro-estudantes-noite.jpg", alt: "Estudantes reunidos à noite com uma bandeira do movimento estudantil", pos: "40% 40%" },
  "ato-memoria-e-musica":    { arquivo: "abatiro-bateria.jpg", alt: "Bateria de samba tocando na calçada de petit-pavê", pos: "45% 55%" },
  "ato-caminhada-lilas":     { arquivo: "abatiro-boneca-ato.jpg", alt: "Mulher sorridente erguendo uma boneca de pano em um ato numa praça arborizada", pos: "50% 60%" }
};
