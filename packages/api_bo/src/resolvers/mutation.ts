import { MutationAddSentenceArgs } from "../types.ts";

export const Mutation = {
  addSentence: (_: unknown, args: MutationAddSentenceArgs): string => {
    return args.sentence;
  },
};
