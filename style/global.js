import css from 'styled-jsx/css';
import theme from './theme';

export default css.global`
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
