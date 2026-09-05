export const features = [
  { id: "semanticity", label: "Semanticity", question: "Do signals reliably stand for something?" },
  { id: "displacement", label: "Displacement", question: "Can communication refer beyond the immediate here and now?" },
  { id: "productivity", label: "Productivity", question: "Can communicators create and understand novel combinations?" },
  { id: "duality", label: "Duality of patterning", question: "Do meaningless units combine into meaningful forms?" },
  { id: "transmission", label: "Cultural transmission", question: "Does social learning shape the system?" }
];

export const systems = [
  {
    id: "human", label: "Human language",
    features: {
      semanticity: ["clear", "Words and constructions conventionally carry meanings."],
      displacement: ["clear", "Speakers routinely discuss absent, past, future, and hypothetical events."],
      productivity: ["clear", "Finite resources support open-ended novel utterances."],
      duality: ["clear", "Sound or sign units recombine into meaningful forms."],
      transmission: ["clear", "Children acquire community-specific languages through social interaction."]
    }
  },
  {
    id: "bees", label: "Honeybee dance",
    features: {
      semanticity: ["clear", "Dance properties correlate with food direction and distance."],
      displacement: ["clear", "The dance directs others to a resource away from the hive."],
      productivity: ["limited", "Direction and distance vary, but the message domain is restricted."],
      duality: ["not-demonstrated", "Evidence does not show a second level of recombinable meaningless units."],
      transmission: ["limited", "Innate organization and experience-dependent calibration both matter."]
    }
  },
  {
    id: "vervets", label: "Vervet alarm calls",
    features: {
      semanticity: ["limited", "Distinct calls elicit predator-appropriate responses, but interpretation remains debated."],
      displacement: ["not-demonstrated", "Calls concern immediate threats rather than distant or hypothetical ones."],
      productivity: ["not-demonstrated", "A small call inventory does not show open-ended combination."],
      duality: ["not-demonstrated", "Recombination of meaningless units has not been established."],
      transmission: ["limited", "Young animals refine appropriate call use through development."]
    }
  },
  {
    id: "apes", label: "Language-trained apes",
    features: {
      semanticity: ["clear", "Individuals can learn stable sign-object or symbol-referent associations."],
      displacement: ["limited", "Some reports suggest reference beyond the immediate setting, but evidence is narrow."],
      productivity: ["limited", "Novel sequences occur, though their structure and spontaneity are contested."],
      duality: ["not-demonstrated", "Learned signs do not establish a phonological-like combinatorial level."],
      transmission: ["clear", "The symbols are acquired through intensive interaction and training."]
    }
  }
];

export const evidenceItems = [
  { id: "recording", required: true, text: "Record signals and the contexts in which they occur." },
  { id: "response", required: true, text: "Test whether receivers respond differently under controlled conditions." },
  { id: "novel", required: true, text: "Test unfamiliar situations or combinations rather than rehearsed examples only." },
  { id: "famous", required: false, text: "Rely on one famous animal’s most impressive performance." },
  { id: "humanlike", required: false, text: "Count behaviors that merely look human-like to an observer." }
];

export const conclusions = [
  { id: "calibrated", text: "Animal systems share particular design features with human language, but overlap on selected features does not establish an equivalent full system." },
  { id: "none", text: "Animals do not communicate meaningfully in any way." },
  { id: "same", text: "Any meaningful animal signal is therefore the same as human language." }
];
