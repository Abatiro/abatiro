/* =========================================================
   ABATIRO — dados do site
   ---------------------------------------------------------
   Para cadastrar, editar ou remover coletivos e atos, altere
   apenas as listas abaixo. As páginas se atualizam sozinhas.

   Todos os coletivos e atos abaixo são EXEMPLOS FICTÍCIOS,
   como nas telas do projeto. Marque `demo: false` quando um
   item for real.

   Cores de card disponíveis: "vinho", "verde", "laranja",
   "creme", "vermelho".
   Datas dos atos: formato "AAAA-MM-DD" e hora "HH:MM".
   ========================================================= */

window.ABATIRO_DATA = {
  coletivos: [
    {
      id: "roda-do-bairro",
      nome: "Roda do Bairro",
      causa: "Direito à cidade",
      resumo: "Rodas de conversa abertas sobre o que falta e o que sobra no território.",
      sobre: "Rodas de conversa abertas sobre o que falta e o que sobra no território: transporte, iluminação, praças e espaços de convivência.",
      local: "Boqueirão, Curitiba",
      cor: "vinho",
      foto: "coletivo-roda-do-bairro",
      contato: null,
      demo: true
    },
    {
      id: "horta-comum",
      nome: "Horta Comum",
      causa: "Meio ambiente",
      resumo: "Mutirões para cultivar hortas e canteiros em espaços públicos.",
      sobre: "Mutirões para cultivar hortas e canteiros em espaços públicos, com mudas, ferramentas e muita mão na massa.",
      local: "Bom Retiro, Curitiba",
      cor: "verde",
      foto: "coletivo-horta-comum",
      contato: null,
      demo: true
    },
    {
      id: "tambor-e-tinta",
      nome: "Tambor e Tinta",
      causa: "Cultura",
      resumo: "Oficinas de percussão e pintura de muros com a juventude do bairro.",
      sobre: "Oficinas de percussão e pintura de muros com a juventude do bairro.",
      local: "São Francisco, Curitiba",
      cor: "laranja",
      foto: "coletivo-tambor-e-tinta",
      contato: null,
      demo: true
    },
    {
      id: "rede-lilas",
      nome: "Rede Lilás",
      causa: "Direitos das mulheres",
      resumo: "Rede de apoio, formação e acolhimento entre mulheres da região.",
      sobre: "Rede de apoio, formação e acolhimento entre mulheres da região.",
      local: "Portão, Curitiba",
      cor: "creme",
      foto: "coletivo-rede-lilas",
      contato: null,
      demo: true
    },
    {
      id: "ocupa-ciclo",
      nome: "Ocupa Ciclo",
      causa: "Mobilidade urbana",
      resumo: "Pedaladas e ações por ruas mais seguras para quem anda a pé e de bicicleta.",
      sobre: "Pedaladas e ações por ruas mais seguras para quem anda a pé e de bicicleta.",
      local: "Água Verde, Curitiba",
      cor: "vinho",
      foto: "coletivo-ocupa-ciclo",
      contato: null,
      demo: true
    },
    {
      id: "voz-da-quebrada",
      nome: "Voz da Quebrada",
      causa: "Igualdade racial",
      resumo: "Rodas, aulas abertas e eventos pela valorização da cultura negra.",
      sobre: "Rodas, aulas abertas e eventos pela valorização da cultura negra.",
      local: "Cajuru, Curitiba",
      cor: "vermelho",
      foto: "coletivo-voz-da-quebrada",
      contato: null,
      demo: true
    },
    {
      id: "cursinho-de-esquina",
      nome: "Cursinho de Esquina",
      causa: "Educação",
      resumo: "Aulas populares gratuitas para quem prepara o vestibular.",
      sobre: "Aulas populares gratuitas para quem prepara o vestibular.",
      local: "Rebouças, Curitiba",
      cor: "creme",
      foto: "coletivo-cursinho-de-esquina",
      contato: null,
      demo: true
    },
    {
      id: "casa-aberta",
      nome: "Casa Aberta",
      causa: "LGBTQIA+",
      resumo: "Espaço de convivência, escuta e eventos culturais LGBTQIA+.",
      sobre: "Convivência, escuta e eventos.",
      local: "Centro, Curitiba",
      cor: "laranja",
      foto: "coletivo-casa-aberta",
      contato: null,
      demo: true
    },
    {
      id: "teto-e-chao",
      nome: "Teto e Chão",
      causa: "Moradia",
      resumo: "Orientação sobre direitos de quem aluga ou ocupa, e apoio a moradores.",
      sobre: "Orientação sobre direitos de quem aluga ou ocupa, e apoio a moradores.",
      local: "Sítio Cercado, Curitiba",
      cor: "verde",
      foto: "coletivo-teto-e-chao",
      contato: null,
      demo: true
    }
  ],

  atos: [
    {
      id: "mutirao-de-plantio",
      titulo: "Mutirão de plantio",
      data: "2026-11-27", hora: "09:00",
      causa: "Meio ambiente",
      resumo: "Plantio de mudas e limpeza de um canteiro público. Traga luva e água.",
      reivindicacao: "Mais verde e cuidado coletivo com os canteiros públicos do bairro.",
      local: "Praça no Bom Retiro",
      endereco: "Bom Retiro, Curitiba",
      coletivo: "horta-comum",
      foto: "ato-mutirao-de-plantio",
      demo: true
    },
    {
      id: "roda-de-conversa-no-territorio",
      titulo: "Roda de conversa no território",
      data: "2026-12-02", hora: "18:30",
      causa: "Direito à cidade",
      resumo: "Conversa aberta sobre transporte, iluminação e espaços de convivência.",
      reivindicacao: "Transporte, iluminação e espaços de convivência pensados com quem mora no bairro.",
      local: "Salão comunitário do Boqueirão",
      endereco: "Boqueirão, Curitiba",
      coletivo: "roda-do-bairro",
      foto: "ato-roda-de-conversa",
      demo: true
    },
    {
      id: "oficina-de-lambe-lambe",
      titulo: "Oficina de lambe-lambe",
      data: "2026-12-09", hora: "14:00",
      causa: "Cultura",
      resumo: "Aprenda a criar e colar cartazes. Material incluso.",
      reivindicacao: "Arte de rua como forma de ocupar e comunicar na cidade.",
      local: "Espaço cultural no São Francisco",
      endereco: "São Francisco, Curitiba",
      coletivo: "tambor-e-tinta",
      foto: "ato-oficina-lambe-lambe",
      demo: true
    },
    {
      id: "pedalada-por-ruas-seguras",
      titulo: "Pedalada por ruas seguras",
      data: "2026-12-18", hora: "08:30",
      causa: "Mobilidade urbana",
      resumo: "Pedalada coletiva pedindo ciclovias conectadas e travessias seguras.",
      reivindicacao: "Ciclovias conectadas e travessias seguras para pedestres e ciclistas.",
      local: "Concentração no Água Verde",
      endereco: "Água Verde, Curitiba",
      coletivo: "ocupa-ciclo",
      foto: "ato-pedalada",
      demo: true
    },
    {
      id: "ato-pela-moradia-digna",
      titulo: "Ato pela moradia digna",
      data: "2027-01-03", hora: "16:00",
      causa: "Moradia",
      resumo: "Concentração e caminhada por políticas de moradia e contra despejos.",
      reivindicacao: "Moradia digna e fim dos despejos sem alternativa.",
      local: "Concentração no Sítio Cercado",
      endereco: "Sítio Cercado, Curitiba",
      coletivo: "teto-e-chao",
      foto: "ato-moradia-digna",
      demo: true
    },
    {
      id: "aula-publica-de-rua",
      titulo: "Aula pública de rua",
      data: "2026-11-11", hora: "10:00",
      causa: "Educação",
      resumo: "Aula aberta de redação e atualidades para quem vai prestar vestibular.",
      reivindicacao: "Educação gratuita e acessível para quem se prepara para o vestibular.",
      local: "Praça no Rebouças",
      endereco: "Rebouças, Curitiba",
      coletivo: "cursinho-de-esquina",
      foto: "ato-aula-publica",
      demo: true
    },
    {
      id: "tarde-de-memoria-e-musica",
      titulo: "Tarde de memória e música",
      data: "2026-10-24", hora: "15:00",
      causa: "Igualdade racial",
      resumo: "Roda de samba, exposição de fotos e conversa sobre memória negra.",
      reivindicacao: "Valorização da memória e da cultura negra em Curitiba.",
      local: "Centro cultural no Cajuru",
      endereco: "Cajuru, Curitiba",
      coletivo: "voz-da-quebrada",
      foto: "ato-memoria-e-musica",
      demo: true
    },
    {
      id: "caminhada-lilas",
      titulo: "Caminhada Lilás",
      data: "2026-09-26", hora: "17:00",
      causa: "Direitos das mulheres",
      resumo: "Caminhada pelo fim da violência contra as mulheres.",
      reivindicacao: "Fim da violência contra as mulheres.",
      local: "Ponto de encontro no Portão",
      endereco: "Portão, Curitiba",
      coletivo: "rede-lilas",
      foto: "ato-caminhada-lilas",
      demo: true
    }
  ]
};
