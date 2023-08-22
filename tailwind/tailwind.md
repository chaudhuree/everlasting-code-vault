## media query
```css
space-x-4 means margin left and right is 4px
gap-4 means gap between flex items is 4px
```

```css
min-h-screen means min-height: 100vh

xl:whitespace-nowrap means in xl screen text will not wrap in this case position should be relative and z-index should be higher
```

```css
break-words means if text is too long then it will break the word
```

```css
leading-7 means line-height: 1.75rem
```


```css
max-md means max-width: 768px
md means min-width: 768px

```

---

## in tailwind if we want to create our own custom class then do this

```css
@layer components {
  .max-container {
    max-width: 1440px;
    margin: 0 auto;
  }
}
```

## if i want to create own class using tailwind then do this

```css
@layer components {
  .btn {
    @apply px-4 py-2 rounded-md bg-blue-500 text-white;
  }
}
```

## paste this code in eslint file

```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": 0,
  },
};
```

## demo custom index.css file

```css
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Palanquin:wght@100;200;300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Palanquin:wght@100;200;300;400;500;600;700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

@layer components {
  .max-container {
    max-width: 1440px;
    margin: 0 auto;
  }

  .input {
    @apply sm:flex-1 max-sm:w-full text-base leading-normal text-slate-gray pl-5 max-sm:p-5 outline-none sm:border-none border max-sm:border-slate-gray max-sm:rounded-full;
  }
}

@layer utilities {
  .padding {
    @apply sm:px-16 px-8 sm:py-24 py-12;
  }

  .padding-x {
    @apply sm:px-16 px-8;
  }

  .padding-y {
    @apply sm:py-24 py-12;
  }

  .padding-l {
    @apply sm:pl-16 pl-8;
  }

  .padding-r {
    @apply sm:pr-16 pr-8;
  }

  .padding-t {
    @apply sm:pt-24 pt-12;
  }

  .padding-b {
    @apply sm:pb-24 pb-12;
  }

  .info-text {
    @apply font-montserrat text-slate-gray text-lg leading-7;
  }
}
```

## demo tailwind config file

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "16px"],  // use case font-xs
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"], // first one is fontsize and second one is line height
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"], // use case font-2xl
      "3xl": ["28px", "50px"],
      "4xl": ["48px", "58px"],
      "8xl": ["96px", "106px"],
    },
    extend: {
      fontFamily: {
        palanquin: ["Palanquin", "sans-serif"], //use case font-palanquin
        montserrat: ["Montserrat", "sans-serif"], // font-montserrat
      },
      colors: {
        'primary': "#ECEEFF", // use case bg-primary
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D", // use case text-slate-gray
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)", // use case bg-white-400
      },
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)", // use case shadow-3xl
      },
      backgroundImage: {
        hero: "url('assets/images/collection-background.svg')", // use case bg-hero
        card: "url('assets/images/thumbnail-background.svg')", // use case bg-card
      },
      screens: {
        wide: "1440px", // wide:px-16 sm:px-8 like this
      },
    },
  },
  plugins: [],
};
```
