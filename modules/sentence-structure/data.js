export const ambiguityCases = [
  {
    id: "telescope",
    sentence: "The student saw the professor with the telescope.",
    target: "Target reading: the student used the telescope to see.",
    answer: "instrument",
    readings: [
      { id: "instrument", label: "Instrument attachment", bracket: "[The student] [saw [the professor] [with the telescope]].", paraphrase: "The telescope was the instrument used in seeing." },
      { id: "professor", label: "Noun-phrase attachment", bracket: "[The student] [saw [the professor with the telescope]].", paraphrase: "The professor had the telescope." }
    ]
  },
  {
    id: "visiting",
    sentence: "Visiting relatives can be boring.",
    target: "Target reading: the activity of making visits can be boring.",
    answer: "activity",
    readings: [
      { id: "activity", label: "Activity reading", bracket: "[[Visiting relatives] can be boring].", paraphrase: "To visit relatives can be boring." },
      { id: "people", label: "People reading", bracket: "[[Visiting] relatives] can be boring.", paraphrase: "Relatives who are visiting can be boring." }
    ]
  },
  {
    id: "studio",
    sentence: "The journalist interviewed the actor in the studio.",
    target: "Target reading: the actor—not necessarily the interview—was in the studio.",
    answer: "actor",
    readings: [
      { id: "event", label: "Event attachment", bracket: "[The journalist] [interviewed [the actor] [in the studio]].", paraphrase: "The interview took place in the studio." },
      { id: "actor", label: "Noun-phrase attachment", bracket: "[The journalist] [interviewed [the actor in the studio]].", paraphrase: "The actor was located in the studio." }
    ]
  }
];

export const testCases = [
  { id: "replace", text: "The student saw her.", answer: "professor", explanation: "Replacing ‘the professor with the telescope’ by ‘her’ treats that sequence as one noun phrase, supporting the professor-has-it reading." },
  { id: "front", text: "With the telescope, the student saw the professor.", answer: "instrument", explanation: "Moving the prepositional phrase to the front preserves the instrument reading and separates it from the object noun phrase." }
];

export const judgmentCases = [
  { id: "green", sentence: "Colorless green ideas sleep furiously.", answer: "grammatical-odd", explanation: "The word sequence follows English syntactic patterns even though the combination is difficult to interpret literally." },
  { id: "solved", sentence: "*The students can solved the puzzle.", answer: "ungrammatical", explanation: "After modal can, English requires the plain verb form solve, not solved." },
  { id: "sandwich", sentence: "The child ate the sandwich.", answer: "grammatical-clear", explanation: "The sentence is structurally well formed and has a readily available interpretation." }
];

export const conclusions = [
  { id: "illogical", text: "If a sentence is ambiguous, the language is structurally illogical." },
  { id: "same", text: "The same string must have the same syntactic organization for every interpretation." },
  { id: "structure", text: "Different structures can support different readings even when the visible word sequence is unchanged." }
];
