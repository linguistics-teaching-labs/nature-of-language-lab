# Nature of Language Lab

Interactive, evidence-centered activities for critical thinking about language.

**Live collection:** [Nature of Language Lab](https://linguistics-teaching-labs.github.io/nature-of-language-lab/)

**Repository:** [linguistics-teaching-labs/nature-of-language-lab](https://github.com/linguistics-teaching-labs/nature-of-language-lab)

The project is designed for general-education linguistics courses. Students examine observable patterns, test the assumptions behind familiar language claims, and connect evidence to appropriately qualified conclusions. Every activity runs locally in the browser without an account, installation, external API, or generative model.

## Intended use and limitations

This project is designed for instruction and exploratory analysis. Its historical cases, social-network model, and examples are deliberately compact so learners can inspect the reasoning. They are not complete descriptions of language histories or communities, empirical forecasts of linguistic behavior, or evidence for consequential decisions.

The intended-use statement describes the scope of the activities; it does not narrow the permissions granted by the project's open-source and open-content licenses.

## Project co-owners

- [Wei Lai](https://github.com/weilaiPhonetics)
- [Desen Lin](https://github.com/desenlin)

## Module catalog

All nine modules are available:

- **[Language Change: Evolution or Decay?](https://linguistics-teaching-labs.github.io/nature-of-language-lab/modules/language-change/)** — test deterioration claims, inspect patterned change, and model social diffusion.
- **[Animal Communication Evidence Lab](https://linguistics-teaching-labs.github.io/nature-of-language-lab/modules/animal-communication/)** — compare evidence for design features across communication systems.
- **[Language and Thought: How Strong Is the Claim?](https://linguistics-teaching-labs.github.io/nature-of-language-lab/modules/language-thought/)** — distinguish association, context-bound influence, and linguistic determinism.
- **[How Languages Package Meaning](https://linguistics-teaching-labs.github.io/nature-of-language-lab/modules/language-comparison/)** — compare structural strategies without ranking languages.
- **[Spelling Reform Sandbox](https://linguistics-teaching-labs.github.io/nature-of-language-lab/modules/spelling-reform/)** — simulate reform proposals and evaluate dialect, reading, and transition trade-offs.
- **[Dialect Rule Detective](https://linguistics-teaching-labs.github.io/nature-of-language-lab/modules/english-variation/)** — infer rules in English varieties and identify standard-language ideology.
- **[Form, Function, and Gender Stereotypes](https://linguistics-teaching-labs.github.io/nature-of-language-lab/modules/language-gender/)** — separate multifunctional forms from gendered listener expectations.
- **[Digital Tone and Context Explorer](https://linguistics-teaching-labs.github.io/nature-of-language-lab/modules/digital-tone/)** — compare context-dependent interpretations of digital cues.
- **[Claim and Evidence Inspector](https://linguistics-teaching-labs.github.io/nature-of-language-lab/modules/claim-evidence/)** — match course claims with measures, comparisons, alternatives, and warranted conclusions.

Every activity uses synthetic or compact teaching data, runs entirely in the browser, and does not collect student responses.

## Run locally

Because the project uses JavaScript modules, serve the repository with any simple local web server. For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

No packages or build step are required. The optional automated checks use Node's built-in test runner:

```bash
npm test
```

## Adapt the activity

- Edit a module's `data.js` to revise its cases, evidence choices, and feedback without changing interaction logic.
- Edit `modules/language-change/simulation.js` to revise the transparent network-generation or adoption rules.
- Edit each module's `index.html` to revise instructions, learning objectives, and reflection questions.
- Add one entry to `modules/catalog.js` when creating a new activity. The homepage and shared navigation both read from this catalog.

Keep permanent titles and directory names topic-based rather than tied to a semester's module numbering. See [CONTRIBUTING.md](CONTRIBUTING.md) for the module conventions.

## Citation

Citation metadata is provided in [`CITATION.cff`](CITATION.cff). GitHub can generate APA and BibTeX formats from the repository's **Cite this repository** control.

## License

- Source code is licensed under the [MIT License](LICENSE).
- Original instructional text and teaching data are licensed under [CC BY 4.0](LICENSE-CONTENT.md).
