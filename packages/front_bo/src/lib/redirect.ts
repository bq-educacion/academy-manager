import Router from "next/router";

export const redirect = (
  context: any, // eslint-disable-line
  url: Record<string, unknown> | string,
  as?: Record<string, unknown> | string,
  options?: Record<string, unknown>
) => {
  if (context.res) {
    context.res.writeHead(303, { Location: url });
    context.res.end();
  } else {
    Router.replace(url, as, options);
  }
};

export default redirect;
