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
const cognitionTemplate = `TASK: Evaluate the user's Web3 knowledge level
Analyze the conversation content and assess the user's cognitive level in various Web3 domains.

# Evaluation Instructions
- Review the conversation content to identify Web3-related knowledge demonstrated by the user
- Assess the user's cognitive level in various domains based on their statements
- Only update domain scores supported by new information
- Record specific knowledge points demonstrated by the user

# Begin Evaluation

{{recentMessages}}

Task: Analyze the conversation and evaluate the user's Web3 cognitive level. Please return the evaluation results in JSON format.

Scoring Format:
\`\`\`json
{
  "basic_knowledge": {
    "blockchain": number,      // 0-1, Basic blockchain knowledge
    "consensus": number,       // 0-1, Understanding of consensus mechanisms
    "cryptography": number,    // 0-1, Knowledge of cryptography
    "tokenomics": number,      // 0-1, Understanding of tokenomics
    "network_types": number    // 0-1, Characteristics of public/consortium/private chains
  },
  "technical_knowledge": {
    "smart_contracts": number, // 0-1, Smart contract development
    "web3_stack": number,      // 0-1, Web3 technology stack
    "security": number,        // 0-1, Security knowledge
    "scaling": number,         // 0-1, Scaling solutions
    "cross_chain": number,     // 0-1, Cross-chain technology
    "storage": number          // 0-1, Decentralized storage
  },
  "defi_knowledge": {
    "protocols": number,      // 0-1, Understanding of DeFi protocols
    "trading": number,        // 0-1, Trading knowledge
    "yield": number,          // 0-1, Yield farming
    "risks": number,          // 0-1, Risk awareness
    "stablecoins": number,    // 0-1, Stablecoin mechanisms
    "derivatives": number     // 0-1, Derivatives
  },
  "ecosystem_knowledge": {
    "governance": number,     // 0-1, DAO governance
    "nft": number,            // 0-1, NFT ecosystem
    "gaming": number,         // 0-1, GameFi
    "social": number,         // 0-1, SocialFi
    "metaverse": number,      // 0-1, Metaverse
    "identity": number        // 0-1, Decentralized identity
  },
  "regulatory_knowledge": {
    "compliance": number,     // 0-1, Compliance awareness
    "taxation": number,       // 0-1, Tax policies
    "licensing": number,      // 0-1, Licensing requirements
    "privacy": number         // 0-1, Privacy protection
  },
  "demonstrated_knowledge": string[], // Specific knowledge points demonstrated by the user
  "knowledge_gaps": string[],         // Identified knowledge gaps
  "learning_suggestions": string[]    // Learning suggestions
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
        template: cognitionTemplate,
    });

    const response = await generateText({
        runtime,
        context,
        modelClass: ModelClass.SMALL,
    });

    const updates = parseJsonFromText(response);
    if (!updates) return;

    // 存储评估结果到内存系统
    await runtime.messageManager.createMemory({
        type: "cognition_assessment",
        roomId: message.roomId,
        userId: message.userId,
        agentId: runtime.agentId,
        content: { text: JSON.stringify(updates) },
        unique: false,
    });
}

export const cognitionEvaluator: Evaluator = {
    name: "UPDATE_COGNITION",
    similes: [
        "ANALYZE_KNOWLEDGE",
        "UPDATE_WEB3_LEVEL",
        "EVALUATE_UNDERSTANDING",
    ],
    description: "分析对话内容并评估用户在Web3各个领域的认知水平。",
    validate: async (
        runtime: IAgentRuntime,
        message: Memory
    ): Promise<boolean> => {
        // 每20条消息触发一次评估
        const messageCount = await runtime.messageManager.countMemories(
            message.roomId
        );
        return messageCount % 20 === 0;
    },
    handler,
    examples: [
        {
            context: "对话中展现了用户的Web3知识水平",
            messages: [
                {
                    user: "{{user1}}",
                    content: {
                        text: "我觉得Layer2的ZK rollup比Optimistic rollup在安全性和性能上都更有优势,但实现难度更大。",
                    },
                },
                {
                    user: "{{user2}}",
                    content: {
                        text: "是的,ZK rollup的零知识证明可以即时确认交易,但电路设计和证明��成都很复杂。",
                    },
                },
            ],
            outcome: `{
                "technical_knowledge": {
                    "scaling": 0.8,
                    "security": 0.7
                },
                "basic_knowledge": {
                    "blockchain": 0.7
                },
                "demonstrated_knowledge": [
                    "理解Layer2扩容方案的区别",
                    "了解零知识证明技术"
                ],
                "learning_suggestions": [
                    "深入学习ZK rollup的技术实现",
                    "了解更多Layer2解决方案的应用场景"
                ]
            }`,
        },
    ],
};
