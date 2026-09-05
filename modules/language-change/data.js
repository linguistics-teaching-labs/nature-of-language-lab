export const claimNeeds = [
  {
    id: "define",
    label: "A clear, testable definition of what “worse” means",
    needed: true,
    feedback: "Without a measurable outcome, “worse” remains a value judgment rather than a testable claim."
  },
  {
    id: "comparison",
    label: "Comparable evidence from more than one period",
    needed: true,
    feedback: "A deterioration claim is about change over time, so it requires comparable observations across time."
  },
  {
    id: "contexts",
    label: "Evidence across speakers and communication settings",
    needed: true,
    feedback: "A pattern limited to one group or setting cannot establish a decline in English as a whole."
  },
  {
    id: "feed",
    label: "Several irritating examples from one social-media feed",
    needed: false,
    feedback: "A few selected examples can motivate a question, but they are neither representative nor sufficient evidence."
  },
  {
    id: "poll",
    label: "A poll asking whether people dislike new expressions",
    needed: false,
    feedback: "Attitudes are useful evidence about social evaluation, but disliking a form does not show that it reduces linguistic capacity."
  }
];

export const changeCases = [
  {
    id: "sound",
    tab: "Sound",
    kind: "Sound change",
    title: "The consonants that spelling remembers",
    prompt: "What can the history of knight and knee tell us about silent letters?",
    earlierLabel: "Earlier English",
    earlier: "The initial /k/ was pronounced in words such as knight and knee. Knight also contained a consonant represented by gh.",
    laterLabel: "Present-day mainstream English",
    later: "The initial /k/ is silent, and knight is pronounced /naɪt/ in mainstream varieties.",
    observation: "The change affected a recurring sound environment; it was not a random failure by individual speakers.",
    inference: "Systematic pronunciation change can leave older spelling behind.",
    caution: "This compact example does not represent every stage, dialect, or sound change in the history of English.",
    source: "Minkova, D. (2014). A Historical Phonology of English. Edinburgh University Press."
  },
  {
    id: "meaning",
    tab: "Meaning",
    kind: "Semantic change",
    title: "When a familiar word shifts its work",
    prompt: "If a word changes meaning, has the language lost the older concept?",
    earlierLabel: "Earlier use",
    earlier: "Awful could describe something that inspired awe or reverential wonder.",
    laterLabel: "Common present-day use",
    later: "Awful most often evaluates something as very bad or unpleasant.",
    observation: "The conventional meaning shifted while speakers retained other ways to express awe and reverence.",
    inference: "A lexical meaning can change without reducing the language’s overall expressive capacity.",
    caution: "Meanings often overlap during change; a two-stage summary should not be read as an abrupt replacement.",
    source: "Oxford English Dictionary, “awful,” adj. and adv.; meanings summarized for instruction."
  },
  {
    id: "grammar",
    tab: "Grammar",
    kind: "Grammaticalization",
    title: "Going somewhere—and going to do something",
    prompt: "Is gonna merely careless deletion, or does it follow a grammatical pattern?",
    earlierLabel: "Motion construction",
    earlier: "I am going to the library describes movement toward a destination.",
    laterLabel: "Future-oriented construction",
    later: "I am going to read can express an intention or anticipated event; informal gonna occurs in this use.",
    observation: "Gonna is constrained: I’m gonna read is possible, while *I’m gonna the library is not the corresponding motion expression.",
    inference: "Reduction accompanies a structured difference between grammatical functions.",
    caution: "Register matters. A form can be systematic in conversation without being expected in every formal writing context.",
    source: "Hopper, P. J., & Traugott, E. C. (2003). Grammaticalization (2nd ed.). Cambridge University Press."
  },
  {
    id: "digital",
    tab: "Digital context",
    kind: "Pragmatic variation",
    title: "What a period can signal in a text",
    prompt: "Can the same punctuation mark do different social work in different media?",
    earlierLabel: "One-word reply without a period",
    earlier: "A text-message reply such as yeah may be read as relatively neutral in an informal exchange.",
    laterLabel: "One-word reply with a period",
    later: "In one experiment, text-message replies such as yeah. were rated as less sincere than the same replies without a period.",
    observation: "The effect appeared for simulated text messages but not for handwritten notes in that study.",
    inference: "Readers can develop medium-specific pragmatic expectations; punctuation need not lose its grammatical function to gain a social one.",
    caution: "One experimental pattern does not determine how every person, age group, culture, or conversation interprets a period.",
    source: "Gunraj, D. N., Drumm-Hewitt, A. M., Dashow, E. M., Upadhyay, S. S. N., & Klin, C. M. (2016). Texting insincerely: The role of the period in text messaging. Computers in Human Behavior, 55, 1067–1075.",
    sourceUrl: "https://doi.org/10.1016/j.chb.2015.11.038"
  }
];

export const diagnosticLabels = [
  { id: "change", label: "Language change" },
  { id: "variation", label: "Language variation" },
  { id: "endangerment", label: "Language endangerment" },
  { id: "judgment", label: "Prescriptive judgment" },
  { id: "insufficient", label: "Insufficient evidence" }
];

export const diagnosticScenarios = [
  {
    id: "regular-sound",
    text: "Historical records show that a pronunciation shift repeatedly affected words with the same sound in the same environment.",
    answer: "change",
    explanation: "A recurring difference across periods and linguistic environments is evidence of systematic language change."
  },
  {
    id: "habitual-be",
    text: "In African American Language, She be working on Saturdays can mark a recurring situation, contrasting with She working right now.",
    answer: "variation",
    explanation: "The contrast illustrates a rule-governed grammatical distinction in a language variety, not an absence of grammar."
  },
  {
    id: "transmission",
    text: "A community reports that fluent speakers have declined from about 1,200 to 250, and few children are learning the language at home.",
    answer: "endangerment",
    explanation: "A sharp decline in speakers and intergenerational transmission concerns language vitality, not ordinary structural change alone."
  },
  {
    id: "ugly",
    text: "A columnist calls a new abbreviation lazy, ugly, and improper but identifies no loss of meaning or communicative function.",
    answer: "judgment",
    explanation: "The statement expresses a norm and an attitude. It does not yet provide evidence that the language has deteriorated."
  },
  {
    id: "three-posts",
    text: "Someone finds three misspelled public posts and concludes that English grammar is collapsing everywhere.",
    answer: "insufficient",
    explanation: "The examples are selected, few, and about spelling rather than the whole grammar. They cannot support the population-level conclusion."
  }
];

export const reasoningOptions = {
  evidence: [
    { id: "", label: "Choose the evidence" },
    { id: "systematic", label: "Comparable observations reveal patterned changes across time and contexts." },
    { id: "anecdotes", label: "Several posts contain forms that some readers dislike." },
    { id: "dictionary", label: "A dictionary added many new words this year." }
  ],
  criterion: [
    { id: "", label: "Choose the test of deterioration" },
    { id: "capacity", label: "Define decline as a demonstrated loss of communicative capacity across settings." },
    { id: "older", label: "Treat every departure from an older norm as decline." },
    { id: "dislike", label: "Treat widespread dislike as proof of linguistic damage." }
  ],
  alternative: [
    { id: "", label: "Choose an alternative explanation" },
    { id: "adaptation", label: "New forms may signal register, relationship, stance, or a recurring grammatical distinction." },
    { id: "technology", label: "Technology necessarily makes every message shorter and less meaningful." },
    { id: "none", label: "No alternative explanation is needed." }
  ],
  conclusion: [
    { id: "", label: "Choose the warranted conclusion" },
    { id: "qualified", label: "The evidence supports language change and contextual innovation, not a general decline in English." },
    { id: "collapse", label: "English grammar is collapsing because new forms exist." },
    { id: "unchanged", label: "English has not changed in any important way." }
  ]
};

export const sourceNotes = [
  "Labov, W. (2001). Principles of Linguistic Change, Volume 2: Social Factors. Blackwell.",
  "Milroy, J., & Milroy, L. (1985). Linguistic change, social network and speaker innovation. Journal of Linguistics, 21(2), 339–384.",
  "McCulloch, G. (2019). Because Internet: Understanding the New Rules of Language. Riverhead Books.",
  "UNESCO Ad Hoc Expert Group on Endangered Languages. (2003). Language Vitality and Endangerment."
];
