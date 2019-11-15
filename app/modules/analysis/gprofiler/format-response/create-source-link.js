const links = {
  'GO:BP': {
    substring: 0,
    url: 'http://amigo.geneontology.org/amigo/term/',
  },
  'GO:CC': {
    substring: 0,
    url: 'http://amigo.geneontology.org/amigo/term/',
  },
  'GO:MF': {
    substring: 0,
    url: 'http://amigo.geneontology.org/amigo/term/',
  },
  HP: {
    substring: 0,
    url: 'https://hpo.jax.org/app/browse/term/',
  },
  KEGG: {
    substring: 5,
    url: 'https://www.genome.jp/dbget-bin/www_bget?map',
  },
  MIRNA: {
    substring: 6,
    url: 'http://www.mirbase.org/cgi-bin/mirna_entry.pl?acc=',
  },
  REAC: {
    substring: 5,
    url: 'https://www.reactome.org/content/detail/',
  },
  WP: {
    substring: 3,
    url: 'https://www.wikipathways.org/index.php/Pathway:',
  },
};

const createSourceLink = (id, source) => {
  const linkInfo = links[source];
  return linkInfo ? `${linkInfo.url}${id.substring(linkInfo.substring)}` : '';
};

module.exports = {
  createSourceLink,
  links,
};
