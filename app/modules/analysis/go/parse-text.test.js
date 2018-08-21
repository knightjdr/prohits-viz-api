const parseText = require('./parse-text');

/* eslint-disable */
const text = `
#	signf	p-value	T	Q	Q&T	Q&T/Q	Q&T/T	term ID	t type	t group	t name	t depth	Q&T list
#
1	!	4.56e-14	29	10	7	0.700	0.241	KEGG:04392	keg	1	Hippo signaling pathway - multiple species	1	RASSF1,RASSF2,STK3
1	!	1.03e-12	20	10	6	0.600	0.300	REAC:R-HSA-2028269	rea	1	Signaling by Hippo	1	STK4,STK3,MOB1A,LATS1,SAV1,MOB1B
1	!	1.15e-08	37	25	6	0.240	0.162	GO:0035329	BP	1	hippo signaling	1	STK4,STK3,MOB1A
1	!	4.73e-04	10	25	3	0.120	0.300	GO:0070016	MF	1	armadillo repeat domain binding	1	STRN4,STRN,STRN3
1	!	7.66e-04	2	8	2	0.250	1.000	CORUM:6621	cor	1	NEK2A-SAV1-STK3 complex	1	STK3,SAV1
1	!	7.66e-04	2	8	2	0.250	1.000	CORUM:6404	cor	1	MST2-SAV1 complex	1	STK3,SAV1
1	!	1.29e-03	6002	25	20	0.800	0.003	GO:0007165	hp	1	signal transduction	1	RASSF1,STK4
1	!	2.33e-03	2724	25	14	0.560	0.005	GO:0035556	tf	1	intracellular signal transduction	1	RASSF1,STK4
#INFO:	PARAMETERS: organism = hsapiens
#INFO:	PARAMETERS: analytical = 1
#INFO:	PARAMETERS: significant = 1
#INFO:	PARAMETERS: user_thr = 1.00
#INFO:	User: http
#INFO:	Host: arak-prod
#INFO:	Time: 2018-8-21  17:42:26 
#INFO:	Version: r1750_e91_eg38
#WARNING:	Gene BIRA_CTTNBP2NL in query [1/5] is not recognized, skipping!
#WARNING:	Gene STRN3_HELA in query [1/9] is not recognized, skipping!
`;
/* eslint-enable */
const expected = {
  terms: [
    {
      depth: 1,
      genes: 'RASSF1, RASSF2, STK3',
      order: 0,
      q: 10,
      qt: 7,
      source: 'keg',
      pValue: '4.56e-14',
      t: 29,
      term: 'Hippo signaling pathway - multiple species',
      termID: 'KEGG:04392',
    },
    {
      depth: 1,
      genes: 'STK4, STK3, MOB1A, LATS1, SAV1, MOB1B',
      order: 1,
      q: 10,
      qt: 6,
      pValue: '1.03e-12',
      source: 'rea',
      t: 20,
      term: 'Signaling by Hippo',
      termID: 'REAC:R-HSA-2028269',
    },
    {
      depth: 1,
      genes: 'STK4, STK3, MOB1A',
      order: 2,
      q: 25,
      qt: 6,
      pValue: '1.15e-8',
      source: 'BP',
      t: 37,
      term: 'hippo signaling',
      termID: 'GO:0035329',
    },
    {
      depth: 1,
      genes: 'STRN4, STRN, STRN3',
      order: 3,
      q: 25,
      qt: 3,
      pValue: '4.73e-4',
      source: 'MF',
      t: 10,
      term: 'armadillo repeat domain binding',
      termID: 'GO:0070016',
    },
    {
      depth: 1,
      genes: 'STK3, SAV1',
      order: 4,
      q: 8,
      qt: 2,
      pValue: '7.66e-4',
      source: 'cor',
      t: 2,
      term: 'NEK2A-SAV1-STK3 complex',
      termID: 'CORUM:6621',
    },
    {
      depth: 1,
      genes: 'STK3, SAV1',
      order: 5,
      q: 8,
      qt: 2,
      pValue: '7.66e-4',
      source: 'cor',
      t: 2,
      term: 'MST2-SAV1 complex',
      termID: 'CORUM:6404',
    },
    {
      depth: 1,
      genes: 'RASSF1, STK4',
      order: 6,
      q: 25,
      qt: 20,
      pValue: '1.29e-3',
      source: 'hp',
      t: 6002,
      term: 'signal transduction',
      termID: 'GO:0007165',
    },
    {
      depth: 1,
      genes: 'RASSF1, STK4',
      order: 7,
      q: 25,
      qt: 14,
      pValue: '2.33e-3',
      source: 'tf',
      t: 2724,
      term: 'intracellular signal transduction',
      termID: 'GO:0035556',
    },
  ],
  warnings: [
    'Gene BIRA_CTTNBP2NL in query [1/5] is not recognized, skipping!',
    'Gene STRN3_HELA in query [1/9] is not recognized, skipping!',
  ],
  noResults: false,
};

describe('Parse gProfiler text response', () => {
  it('should handle response with text', () => (
    parseText(text).then((data) => {
      expect(data).toEqual(expected);
    })
  ));

  it('should handle no text response', () => {
    const noTextExpected = {
      noResults: true,
      terms: [],
      warnings: [],
    };
    return parseText().then((data) => {
      expect(data).toEqual(noTextExpected);
    });
  });
});
