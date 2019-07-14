import css from 'styled-jsx/css';
import theme from './theme';

export default css.global`
  @font-face {
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 300;
    font-display: block;
    src: url('../static/fonts/quicksand-v9-latin-ext_latin-300.eot'); /* IE9 Compat Modes */
    src: local('Quicksand Light'), local('Quicksand-Light'),
        url('../static/fonts/quicksand-v9-latin-ext_latin-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('../static/fonts/quicksand-v9-latin-ext_latin-300.woff2') format('woff2'), /* Super Modern Browsers */
        url('../static/fonts/quicksand-v9-latin-ext_latin-300.woff') format('woff'), /* Modern Browsers */
        url('../static/fonts/quicksand-v9-latin-ext_latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
        url('../static/fonts/quicksand-v9-latin-ext_latin-300.svg#Quicksand') format('svg'); /* Legacy iOS */
  }

  @font-face {
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 500;
    font-display: block;
    src: url('../static/fonts/quicksand-v9-latin-ext_latin-500.eot'); /* IE9 Compat Modes */
    src: local('Quicksand Medium'), local('Quicksand-Medium'),
        url('../static/fonts/quicksand-v9-latin-ext_latin-500.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('../static/fonts/quicksand-v9-latin-ext_latin-500.woff2') format('woff2'), /* Super Modern Browsers */
        url('../static/fonts/quicksand-v9-latin-ext_latin-500.woff') format('woff'), /* Modern Browsers */
        url('../static/fonts/quicksand-v9-latin-ext_latin-500.ttf') format('truetype'), /* Safari, Android, iOS */
        url('../static/fonts/quicksand-v9-latin-ext_latin-500.svg#Quicksand') format('svg'); /* Legacy iOS */
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  body {
    margin: 0;
    border: 0;
    padding: 0;
    font-family: ${theme.font.family};
    font-weight: 300;
    font-size: ${theme.font.size.medium};
  }

  @media (max-width: ${theme.dim.break.small}) {
    body {
      font-size: ${theme.font.size.small};
    }
  }

  h1 {
    font-weight: 300;
  }

  th {
    font-weight: 400;
  }

  a {
    border: 0;
    color: ${theme.palette.secondary};
  }

  a:hover {
    color: ${theme.palette.accent};
  }

  button {
    margin: 0;
    border: 0;
    padding: 0;
    color: ${theme.palette.accent};
    background: none;
  }

  button a {
    border: 0;
  }

  button:hover {
    color: ${theme.palette.secondary};
    outline: none;
    cursor: pointer;
  }

  button:focus {
    color: ${theme.palette.accent};
    outline: none;
  }

  hr {
    margin: 0;
    border: 0;
    padding: 0;
    background: linear-gradient(
      to left,
      ${theme.palette.secondary}00,
      ${theme.palette.secondary}ff,
      ${theme.palette.secondary}00
    );
    height: 1px;
  }
`;
