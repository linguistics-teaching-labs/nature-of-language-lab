export const relationCases = [
  {
    id: "terrier",
    first: "Maya adopted a terrier.",
    second: "Maya adopted a dog.",
    answer: "entailment",
    explanation: "If the first sentence is true, the second must be true because a terrier is a kind of dog."
  },
  {
    id: "stopped",
    first: "Lee stopped smoking.",
    second: "Lee used to smoke.",
    answer: "presupposition",
    explanation: "The first sentence presents Lee’s earlier smoking as background information that is normally taken for granted."
  },
  {
    id: "some",
    first: "Some students passed.",
    second: "Not all students passed.",
    answer: "implicature",
    explanation: "In many contexts, some suggests ‘not all,’ but a speaker can cancel that suggestion without logical contradiction."
  }
];

export const diagnosticCases = [
  {
    id: "cancel-some",
    text: "Some students passed—in fact, all of them did.",
    answer: "cancellable",
    explanation: "The continuation may be stylistically marked, but it can cancel the not-all inference. That supports an implicature analysis."
  },
  {
    id: "deny-dog",
    text: "Maya adopted a terrier—but she did not adopt a dog.",
    answer: "contradiction",
    explanation: "Denying the broader category conflicts with what terrier entails."
  },
  {
    id: "deny-smoking",
    text: "Lee stopped smoking—although Lee had never smoked.",
    answer: "background-clash",
    explanation: "The continuation directly rejects the background assumption triggered by stopped."
  }
];

export const contextCases = [
  {
    id: "dinner",
    utterance: "Can you pass the salt?",
    context: "Two friends are eating dinner. The salt is beside the addressee.",
    answer: "request",
    explanation: "The ability question conventionally functions as a polite request in this setting."
  },
  {
    id: "assessment",
    utterance: "Can you raise your left arm?",
    context: "A physical therapist is assessing a patient’s current range of movement.",
    answer: "ability",
    explanation: "Here the speaker needs evidence about ability, even though performing the action also supplies the answer."
  },
  {
    id: "classroom",
    utterance: "It is getting noisy in here.",
    context: "An instructor pauses while several groups continue talking after time is called.",
    answer: "directive",
    explanation: "The observation can function indirectly as a directive to reduce the noise."
  }
];

export const conclusions = [
  { id: "dictionary", text: "Sentence meaning is fully determined by dictionary definitions, regardless of context." },
  { id: "anything", text: "Because context matters, an utterance can mean anything a listener imagines." },
  { id: "layers", text: "Linguistic form constrains meaning, while background assumptions and context support additional inferences." }
];
