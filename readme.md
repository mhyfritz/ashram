# ashram: acronym search program

## Installation

```bash
yarn global add ashram
```

or

```bash
npm install -g ashram
```

## Usage

```bash
ashram --phrase 'my super awesome application'
...
merman
...
muesli
...
muscat
...
```

By default, acronyms are searched against [`word-list`](https://github.com/sindresorhus/word-list),
but you can also use your own file:

```bash
ashram --file <words.txt> --phrase ...
```

## Explanation

Given a phrase, `ashram` searches a list of words for acronyms of that phrase.
The acronyms have following constraints:

* the first letter of phrase and acronym have to match
* for every word in the phrase at least one character has to match in the acronym
