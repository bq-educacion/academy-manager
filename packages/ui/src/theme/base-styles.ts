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

  a {
    ${fonts.family.roboto};
    ${fonts.size.normal};
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: ${colors.colors.blue1};
    text-decoration: none;
    &:hover {
      cursor: pointer;
      color: ${colors.colors.blue60};
    }
    &:active {
      color: ${colors.colors.gray2};
    }
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
    color: ${colors.colors.black};
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }
  :not(.scrollbar)::-webkit-scrollbar {
    display: none;
  }
  .scrollbar::-webkit-scrollbar:vertical {
    display: block;
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 9999px;
    border: 3px solid transparent;
    background-clip: padding-box;
  }
`;

export default baseStyles;
