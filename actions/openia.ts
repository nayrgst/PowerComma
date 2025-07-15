'use server';

export const generateMagIAPrompt = async (userPrompt: string) => {
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
    Não inclua nenhum outro texto ou explicação fora do JSON.
`;
};
