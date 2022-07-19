import { css } from "@emotion/react";
import colors from "./colors";
import fonts from "./fonts";

const baseStyles = css`
  /* Typography */
  body {
    ${fonts.family.roboto}
    ${fonts.size.normal}
  }

  h1 {
    ${fonts.size.huge}
  }

  h2 {
    ${fonts.size.large}
  }

  h3 {
    ${fonts.size.medium}
  }

  h4 {
    ${fonts.size.normal}
  }

  /* Color */
  * {
    color: inherit;
  }

  /* Style reset */
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    border: 0;
    margin: 0;
    padding: 0;
    scrollbar-width: none;
    vertical-align: baseline;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  html,
  body {
    border: 0;
    color: ${colors.black};
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }
`;

export default baseStyles;
