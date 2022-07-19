import { css } from "@emotion/react";

const family = {
  roboto: css`
    font-family: Roboto;
  `
}

const size = {
  normal: css`
    font-size: 14px;
    line-height: 20px
  `,
  medium: css`
    font-size: 16px;
    line-height: 20px
  `,
  large: css`
    font-size: 18px;
    line-height: 25px
  `,
  huge: css`
    font-size: 25px;
    line-height: 30px
  `
};

export default {
  family,
  size
};
