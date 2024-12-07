import { Plugin } from "@ai16z/eliza";
// import { factsProvider } from "./providers/facts.ts";
// import { timeProvider } from "./providers/time.ts";

// import { cognitionEvaluator } from "./evaluators/cognition.ts";
// import { characterEvaluator } from "./evaluators/character.ts";
import { lectureAction } from "./actions/lecture.ts";
export * as actions from "./actions";
export * as evaluators from "./evaluators";
export * as providers from "./providers";

export const cuckooPlugin: Plugin = {
    name: "cuckoo",
    description: "Agent with cuckoo actions and evaluators",
    actions: [lectureAction],
    evaluators: [],
    providers: [],
    // evaluators: [characterEvaluator, cognitionEvaluator],
    // providers: [timeProvider, factsProvider],
};
