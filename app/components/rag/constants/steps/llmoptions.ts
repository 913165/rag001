export const llmOptions = [
    {
      id: 'openai',
      name: 'OpenAI',
      models: ['GPT-4', 'GPT-3.5'],
      description: 'Industry standard for text embedding and generation'
    },
    {
      id: 'anthropic',
      name: 'Anthropic Claude',
      models: ['Claude-3 Opus', 'Claude-3 Sonnet', 'Claude-3 Haiku'],
      description: 'Advanced language model with strong reasoning capabilities'
    },
    {
      id: 'cohere',
      name: 'Cohere',
      models: ['Command', 'Command-Light'],
      description: 'Specialized in embeddings and multilingual support'
    },
    {
      id: 'mistral',
      name: 'Mistral AI',
      models: ['Mistral-7B', 'Mixtral-8x7B'],
      description: 'Open-weights models with strong performance'
    },
    {
      id: 'llama',
      name: 'LlamaV2',
      models: ['Llama-2-70b', 'Llama-2-13b', 'Llama-2-7b'],
      description: 'Open source model with various size options'
    },
    {
      id: 'vertex',
      name: 'Google Vertex AI',
      models: ['Gemini Pro', 'PaLM 2'],
      description: 'Enterprise-grade models with strong security features'
    }
  ];