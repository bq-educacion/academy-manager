import { MutationAddSentenceArgs } from "../../../api_bo/src/types.ts";

export const Mutation = {
  addSentence: (_: unknown, args: MutationAddSentenceArgs): string => {
    return args.sentence;
  },
};
