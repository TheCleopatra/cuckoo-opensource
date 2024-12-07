import {
    Action,
    elizaLogger,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@ai16z/eliza";
import { JsonRpcProvider, Wallet, Contract, parseUnits } from "ethers";

export const lectureAction: Action = {
    name: "LECTURE",
    similes: ["TEACH", "INSTRUCT", "EXPLAIN"],
    description:
        "An action used for lecturing. Based on the course content and conversation context, it determines whether to continue lecturing, wait for feedback, answer questions, or end the lecture. SHORT AND CONCISE, do not exceed 30 words",

    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "I want to learn the basics of blockchain" },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Blockchain is a distributed ledger technology.",
                    action: "LECTURE",
                },
            },
            {
                user: "{{user1}}",
                content: {
                    text: "Got it, so what is the relationship between blockchain and Bitcoin?",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Bitcoin is the first blockchain application.",
                    action: "LECTURE",
                    lectureReward: true,
                    lectureTxHash: "0x1234567890abcdef",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "I want to know what a smart contract is" },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "A smart contract is a piece of code on the blockchain.",
                    action: "LECTURE",
                },
            },
            {
                user: "{{user1}}",
                content: { text: "What can smart contracts be used for?" },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Smart contracts can be used in DeFi, NFT, and other fields.",
                    action: "LECTURE",
                    lectureReward: true,
                    lectureTxHash: "0xabcdef1234567890",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Please explain the concept of DeFi" },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "DeFi is a decentralized financial service system.",
                    action: "LECTURE",
                },
            },
            {
                user: "{{user1}}",
                content: { text: "What are the specific DeFi applications?" },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "They mainly include DEX, lending platforms, etc.",
                    action: "LECTURE",
                    lectureReward: true,
                    lectureTxHash: "0x7890abcdef123456",
                },
            },
        ],
    ],

    validate: async (
        _runtime: IAgentRuntime,
        _message: Memory
    ): Promise<boolean> => {
        // // Get the user's learning records
        // const learningRecords =
        //     await runtime.databaseAdapter.getLearningRecordsByUser(
        //         message.userId
        //     );

        // // Get the course ID from the message content
        // const courseId = message.content.courseId;
        // if (!courseId) {
        //     return false;
        // }

        // // Check the learning records for this course
        // const courseRecord = learningRecords.find(
        //     (record) => record.courseId === courseId
        // );

        // // If the course is completed, do not continue lecturing
        // if (courseRecord && courseRecord.status === "completed") {
        //     return false;
        // }

        return true;
    },

    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state?: State,
        options?: any,
        callback?: HandlerCallback
    ): Promise<void> => {
        elizaLogger.log("[DEBUGGING] lecture step 1");

        if (!state || !callback) return;

        elizaLogger.log("[DEBUGGING] lecture step 2");

        // const courseId = message.content.courseId as UUID;

        // // Get the course content
        // const course = await runtime.databaseAdapter.getCourseById(courseId);
        // if (!course) {
        //     return;
        // }

        elizaLogger.log("[DEBUGGING] lecture step 3");

        // Get the learning records
        // const learningRecord = await runtime.databaseAdapter
        //     .getLearningRecordsByUser(message.userId)
        //     .then((records) => records.find((r) => r.courseId === courseId));

        // Get recent conversation records
        const recentMessages = await runtime.messageManager.getMemories({
            roomId: message.roomId,
            count: 5,
        });

        elizaLogger.log("[DEBUGGING] lecture step 4");

        // Calculate the current round of conversation
        const lectureCount = recentMessages.filter(
            (m) => m.content.action === "LECTURE"
        ).length;

        const response = {
            text: "",
            action: "LECTURE",
            lectureReward: false,
            lectureTxHash: "",
        };

        elizaLogger.log("[DEBUGGING] lectureCount", lectureCount);
        elizaLogger.log("[DEBUGGING] message.userId", message.userId);
        // elizaLogger.log("[DEBUGGING] message.userAddress", message.userAddress);
        elizaLogger.log("[DEBUGGING] recentMessages", recentMessages);

        // If it is the third round of conversation, give a reward
        if (lectureCount >= 2) {
            try {
                const _sendReward = async () => {
                    const provider = new JsonRpcProvider(
                        process.env.POLYGON_MAINNET_INFURA_URL
                    );
                    const privateKey =
                        process.env.PRIVATE_KEY;
                    const wallet = new Wallet(privateKey, provider);
                    const usdcAddress =
                        "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
                    const usdcAbi = [
                        "function balanceOf(address owner) view returns (uint256)",
                        "function transfer(address to, uint amount) returns (bool)",
                    ];
                    const usdcContract = new Contract(
                        usdcAddress,
                        usdcAbi,
                        wallet
                    );

                    const amount = parseUnits("0.0001", 6); // USDC has 6 decimals

                    try {
                        // Check the recipient's USDC balance
                        const balance = await usdcContract.balanceOf(
                            process.env.demo_addr
                            // message.userAddress
                        );
                        elizaLogger.log("[DEBUGGING] balance", balance);
                        // const eligible = balance > 0;
                        const eligible = true;
                        if (!eligible) {
                            elizaLogger.log(
                                "Recipient already has USDC balance, no reward sent."
                            );
                        } else {
                            const tx = await usdcContract.transfer(
                                process.env.demo_addr,
                                // message.userAddress,
                                amount
                            );
                            elizaLogger.log("[DEBUGGING] tx", tx);
                            response.lectureTxHash = tx.hash;
                            elizaLogger.log("[DEBUGGING] txHash", tx.hash);
                            tx.wait()
                                .then(() => {
                                    elizaLogger.log(
                                        "[DEBUGGING] Transaction confirmed"
                                    );
                                })
                                .catch(console.error);
                        }
                    } catch (error) {
                        console.error("Failed to send reward:", error);
                    }
                };

                await _sendReward();
                response.lectureReward = true;
            } catch (error) {
                console.error("Failed to send reward:", error);
            }
        }

        // Generate response content based on context
        const lastUserMessage = recentMessages.find(
            (m) => m.userId === message.userId
        );
        if (lastUserMessage) {
            const userQuestion = lastUserMessage.content.text;
            response.text = `Based on your question "${userQuestion}", let me continue to explain the relevant content...`;
        } else {
            response.text = `Let's continue learning...`;
        }

        // Update learning progress
        // await runtime.databaseAdapter.updateLearningRecord({
        //     id: learningRecord?.id || (v4() as UUID),
        //     userId: message.userId,
        //     courseId,
        //     progress: Math.min((learningRecord?.progress || 0) + 33, 100),
        //     lastAccessedAt: new Date(),
        //     createdAt: learningRecord?.createdAt || new Date(),
        //     status: learningRecord?.status || "in_progress",
        // });

        await callback(response);
    },
};
