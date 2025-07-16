'use server';

import OpenAI from 'openai';

export const generateMagIAPrompt = async (userPrompt: string) => {
  const openAi = new OpenAI({
    apiKey: process.env.GOOGLE_API_KEY,
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
  });

  const finalPrompt = `
  Crie um esboço coerente e relevante para o seguinte prompt: ${userPrompt}.
  O esboço deve consistir de pelo menos 6 pontos, com cada ponto escrito como uma única frase.
  Garanta que o esboço seja bem estruturado e diretamente relacionado ao tema.
  Todos os pontos do esboço devem estar em português claro e objetivo, evitando termos técnicos desnecessários, a menos que o usuário solicite.
  Retorne a saída no seguinte formato JSON:
    {
      "outlines": [
        "Point 1",
        "Point 2",
        "Point 3",
        "Point 4",
        "Point 5",
        "Point 6"
      ]
    }

    Garanta que o JSON seja válido e devidamente formatado.
    Não inclua nenhum outro texto ou explicação fora do JSON.`;

  try {
    const completion = await openAi.chat.completions.create({
      model: 'gemini-2.0-flash',
      messages: [
        {
          role: 'system',
          content: 'Você é uma IA útil que gera esboços para apresentações.',
        },
        {
          role: 'user',
          content: finalPrompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0.0,
    });

    const responseContent = completion.choices[0].message.content;
    if (responseContent) {
      const match = responseContent.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          const json = JSON.parse(match[0]);
          return { status: 200, data: json };
        } catch (error) {
          console.error('Erro ao processar a resposta extraída:', match[0], error);
          return { status: 500, error: 'Erro ao processar a resposta extraída' };
        }
      } else {
        console.error('Resposta não contém JSON válido:', responseContent);
        return { status: 500, error: 'Resposta não contém JSON válido' };
      }
    }

    return { status: 400, error: 'Não foi possível gerar o esboço' };
  } catch (error) {
    console.log('Error:', error);
    return { status: 500, error: 'Interal server error!' };
  }
};
