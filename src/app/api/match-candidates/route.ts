import { NextResponse } from 'next/server';

// types
type JobDescription = {
  text: string;
};

type Candidate = {
  id: string;
  name: string;
  skills: string[];
  experience: number;
  background: string;
  vectorData?: number[];
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body as JobDescription;
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Job description text is required' },
        { status: 400 }
      );
    }

    const openaiEmbedding = await generateOpenAIEmbedding(text);
    const matchedCandidates = await queryVectorDatabase(openaiEmbedding, 3);

    return NextResponse.json({ 
      candidates: matchedCandidates,
      totalMatches: matchedCandidates.length
    });
    
  } catch (error) {
    console.error('Error in match-candidates route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

async function generateOpenAIEmbedding(text: string): Promise<number[]> {
  // Simulated vector for now can be replaced with actual OpenAI API call 
  return new Array(1536).fill(0).map(() => Math.random());
}

async function queryVectorDatabase(embedding: number[], limit: number): Promise<Candidate[]> {
      // Mocked vector DB result
  return [
    {
      id: 'cand-001',
      name: 'Alex Johnson',
      skills: ['React', 'TypeScript', 'NextJS'],
      experience: 5,
      background: 'Worked at mid-size fintech startups'
    },
    {
      id: 'cand-002',
      name: 'Jamie Smith',
      skills: ['Angular', 'JavaScript', 'CSS'],
      experience: 7,
      background: 'Previous experience at large tech companies'
    },
    {
      id: 'cand-003',
      name: 'Taylor Wong',
      skills: ['Vue', 'TypeScript', 'GraphQL'],
      experience: 4,
      background: 'Agency and consulting background'
    }
  ];
}
