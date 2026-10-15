import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});
const socketMindindex = pc.index(process.env.PINECONE_INDEX);

export async function createMemory({ vector, metadata, messageId }) {
    await socketMindindex.upsert({
        records: [
            {
                id: messageId,
                values: vector,
                metadata,
            },
        ],
    });
}

export async function queryMemory({ queryVector, limit = 5, metadata }) {
    const data = await socketMindindex.query({
        vector: queryVector,
        topK: limit,
        filter: metadata ? { metadata } : undefined,
    });

    return data.matches;
}
