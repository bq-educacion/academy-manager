import React, { createContext, FC, useContext, useEffect } from "react";

export type TranslateFn = (
  id: string,
  variables?: (number | string)[]
) => string;

export const TranslateContext = createContext<TranslateFn>((id: string) => id);

const findByString = (object: any, selector: string) => { // eslint-disable-line
  if (!selector) {
    return;
  }

  const ids = selector
    .replace(/\[(\w+)\]/g, ".$1")
    .replace(/^\./, "")
    .split(".");

  return ids.reduce((o, id) => {
    if (typeof o === "object" && id in o) {
      return o[id];
    } else {
      return;
    }
  }, object);
};

export const translateFn = (
  id: string,
  variables?: (number | string)[],
  messages?: any, // eslint-disable-line
  defaultMessages?: any // eslint-disable-line
) => {
  let translation: string = findByString(messages, id);
  if (!translation && defaultMessages) {
    translation = findByString(defaultMessages, id);
  }
  if (translation) {
    if (variables) {
      variables.forEach((variable) => {
        translation = translation.replace("%v%", `${variable}`);
      });
    }
    return translation;
  }
  return id;
};

export interface ITranslateProviderProps {
  defaultMessages?: any; // eslint-disable-line
  messages: any; // eslint-disable-line
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const TranslateProvider: FC<ITranslateProviderProps> = ({
  defaultMessages,
  messages,
  fallback,
  children,
}) => {
  useEffect(() => {
    !defaultMessages &&
      // eslint-disable-next-line no-console
      console.warn(
        "Set default messages is recommend when more than one language is supported"
      );
  }, []);

  return (
    <TranslateContext.Provider
      value={(id: string, variables?: (number | string)[]) =>
        translateFn(id, variables, messages, defaultMessages)
      }
    >
      {messages ? children : fallback}
    </TranslateContext.Provider>
  );
};

export const Translate = TranslateContext.Consumer;

export const useTranslate = () => useContext(TranslateContext);
