# Contributing

Contributions that improve clarity, accessibility, linguistic accuracy, or browser compatibility are welcome.

## Module conventions

Each module should:

1. begin with a contestable language claim or a focused analytic question;
2. identify a small set of observable learning objectives;
3. ask learners to inspect evidence before reaching a conclusion;
4. distinguish observation, interpretation, social evaluation, and evidential limits;
5. run entirely in the browser without user accounts, API keys, or generative models;
6. avoid collecting personal communications or other student data;
7. use editable, appropriately licensed teaching content; and
8. remain usable with a keyboard, at 200% text enlargement, and on a narrow screen.

New modules should live in their own directory under `modules/`. Keep instructional content close to the module and place only genuinely shared styles or scripts in `assets/`. Add the module's sequence, subject category, title, concepts, and relative URL to `modules/catalog.js`; the collection page and shared navigation use that catalog.

The `category` field must match an entry in `moduleCategories`. The `sequence` field controls catalog order but should not be embedded in the module's permanent URL or title.

## Content review

Historical and cross-linguistic examples should identify their source and state important limits. Use constructed or de-identified examples when an activity could otherwise reproduce private communication or stereotype a language community. Label synthetic data and simplified models prominently.

## Testing a change

Run the automated checks with:

```bash
npm test
```

Also confirm that the collection page and affected module load through a local web server, remain keyboard-operable, and do not introduce horizontal scrolling on a narrow screen.
