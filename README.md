# pacificdigitalventures.org

Marketing site for Pacific Digital Ventures LLC, served by GitHub Pages from the `main` branch.

## Layout

- `index.html` — the whole site: markup, styles and scripts are inline so there is no build step.
- `assets/` — favicon, touch icon, Open Graph image and portfolio screenshots.
- `CNAME` — custom domain binding for GitHub Pages.

## Editing

Open `index.html` and edit the section you need. Sections are marked with `<!-- ===== NAME ===== -->` comments:
nav, hero, trust row, products, web studio, approach, about, contact, footer.

Product cards live under `#products`. Each card has a status pill (`live`, `pilot`, `soon`) and a short feature list.

The VocaTranslate demo phrases in the hero are in the `phrases` array near the bottom of the file.

## Previewing locally

Any static server works, for example:

```
python3 -m http.server 8000
```

then open http://localhost:8000.
