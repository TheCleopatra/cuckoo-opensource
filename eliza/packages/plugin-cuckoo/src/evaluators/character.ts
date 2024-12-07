import {
    composeContext,
    generateText,
    parseJsonArrayFromText as parseJsonFromText,
} from "@ai16z/eliza";
import {
    IAgentRuntime,
    Memory,
    ModelClass,
    type State,
    Evaluator,
} from "@ai16z/eliza";

const characterTemplate = `TASK: Update Character Traits
Analyze the conversation and update the character's traits based on the new information provided.

# INSTRUCTIONS
- Review the conversation and identify any new information about the character's personality, behavior, or preferences
- Update the character traits if there is new information
- Only include traits that need to be updated

# START OF ACTUAL TASK INFORMATION

{{recentMessages}}

TASK: Analyze the conversation and update the character traits. Respond with a JSON object containing the updates.

Response format:
\`\`\`json
{
  "personality": {
    "openness": number,      // 0-1, how open to new experiences
    "conscientiousness": number,  // 0-1, how organized and responsible
    "extraversion": number,   // 0-1, how outgoing and energetic
    "agreeableness": number, // 0-1, how friendly and compassionate
    "neuroticism": number    // 0-1, how anxious and sensitive
  },
  "mbti": {
    "energy": number,        // 0-1, 0=Introversion(I), 1=Extraversion(E)
    "information": number,   // 0-1, 0=Sensing(S), 1=Intuition(N)
    "decisions": number,     // 0-1, 0=Thinking(T), 1=Feeling(F)
    "lifestyle": number      // 0-1, 0=Perceiving(P), 1=Judging(J)
  },
  "interests": string[],     // array of interests/hobbies
  "values": string[],        // array of core values
  "communication_style": {
    "formality": number,     // 0-1, how formal in communication
    "directness": number,    // 0-1, how direct in communication
    "enthusiasm": number     // 0-1, how enthusiastic in communication
  }
}
\`\`\``;

async function handler(
    runtime: IAgentRuntime,
    message: Memory,
    state: State | undefined
): Promise<void> {
    state = (await runtime.composeState(message)) as State;
    const context = composeContext({
        state,
        template:
            runtime.character.templates?.characterTemplate || characterTemplate,
    });

    const response = await generateText({
        runtime,
        context,
        modelClass: ModelClass.SMALL,
    });

    const parsed = parseJsonFromText(response) as any;
    if (!parsed) return;

    // 更新数据库中的角色特征
    await runtime.databaseAdapter.updateCharacterTraits(message.userId, {
        personality: parsed.personality ?? {},
        mbti: parsed.mbti ?? {},
        interests: parsed.interests ?? [],
        values: parsed.values ?? [],
        communication_style: parsed.communication_style ?? {},
    });
}

export const characterEvaluator: Evaluator = {
    name: "UPDATE_CHARACTER",
    similes: ["ANALYZE_CHARACTER", "UPDATE_PERSONALITY", "EVALUATE_CHARACTER"],
    description: "分析对话并更新角色的性格特征、兴趣和价值观等信息。",
    validate: async (
        runtime: IAgentRuntime,
        message: Memory
    ): Promise<boolean> => {
        // 每10条消息触发一次评估
        const messageCount = await runtime.messageManager.countMemories(
            message.roomId
        );
        return messageCount % 10 === 0;
    },
    handler,
    examples: [
        {
            context: "对话中展现了角色的性格特征变化",
            messages: [
                {
                    user: "{{user1}}",
                    content: { text: "我最近开始学习新的编程语言,感觉很有趣!" },
                },
                {
                    user: "{{user2}}",
                    content: { text: "这很好啊,学习新东西总是能带来成长。" },
                },
            ],
            outcome: `{
                "personality": {
                    "openness": 0.8
                },
                "interests": ["programming", "learning"],
                "values": ["growth", "education"]
            }`,
        },
    ],
};
