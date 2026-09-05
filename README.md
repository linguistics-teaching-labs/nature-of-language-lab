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

## Available module

### Language Change: Evolution or Decay?

A five-step guided activity in which students:

- identify what evidence a claim of linguistic deterioration would require;
- compare systematic sound, semantic, grammatical, and pragmatic patterns;
- manipulate a transparent social-network diffusion model;
- distinguish language change, variation, endangerment, prescriptive judgment, and insufficient evidence; and
- construct a claim-evidence reasoning map without generating assignment prose.

The module uses a fictional innovation and synthetic network. It does not collect student writing, messages, or personal information.

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

- Edit `modules/language-change/data.js` to revise cases, evidence choices, diagnoses, reasoning options, and references.
- Edit `modules/language-change/simulation.js` to revise the transparent network-generation or adoption rules.
- Edit `modules/language-change/index.html` to revise instructions and reflection questions.
- Add one entry to `modules/catalog.js` when creating a new activity. The homepage and shared navigation both read from this catalog.

Keep permanent titles and directory names topic-based rather than tied to a semester's module numbering. See [CONTRIBUTING.md](CONTRIBUTING.md) for the module conventions.

## Citation

Citation metadata is provided in [`CITATION.cff`](CITATION.cff). GitHub can generate APA and BibTeX formats from the repository's **Cite this repository** control.

## License

- Source code is licensed under the [MIT License](LICENSE).
- Original instructional text and teaching data are licensed under [CC BY 4.0](LICENSE-CONTENT.md).
