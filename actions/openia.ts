'use server';

import { client } from '@/lib/prisma';
import { ContentItem, ContentType, Slide } from '@/lib/types';
import { currentUser } from '@clerk/nextjs/server';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';

const openAi = new OpenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const existingLayouts = [
  {
    id: uuidv4(),
    slideName: 'Cartão em branco',
    type: 'blank-card',
    className: 'p-8 mx-auto flex justify-center items-center min-h-[200px]',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Coluna',
      content: [
        {
          id: uuidv4(),
          type: 'title' as ContentType,
          name: 'Título',
          content: '',
          placeholder: 'Cartão sem título',
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: 'Destaque à esquerda',
    type: 'accentLeft',
    className: 'min-h-[300px]',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Coluna',
      restrictDropTo: true,
      content: [
        {
          id: uuidv4(),
          type: 'resizable-column' as ContentType,
          name: 'Coluna redimensionável',
          restrictToDrop: true,
          content: [
            {
              id: uuidv4(),
              type: 'image' as ContentType,
              name: 'Imagem',
              content:
                'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              alt: 'Título',
            },
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: 'Coluna',
              content: [
                {
                  id: uuidv4(),
                  type: 'heading1' as ContentType,
                  name: 'Título 1',
                  content: '',
                  placeholder: 'Título 1',
                },
                {
                  id: uuidv4(),
                  type: 'paragraph' as ContentType,
                  name: 'Parágrafo',
                  content: '',
                  placeholder: 'Comece a digitar aqui',
                },
              ],
              className: 'w-full h-full p-8 flex justify-center items-center',
              placeholder: 'Título 1',
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: 'Destaque à direita',
    type: 'accentRight',
    className: 'min-h-[300px]',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Coluna',
      content: [
        {
          id: uuidv4(),
          type: 'resizable-column' as ContentType,
          name: 'Coluna redimensionável',
          restrictToDrop: true,
          content: [
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: 'Coluna',
              content: [
                {
                  id: uuidv4(),
                  type: 'heading1' as ContentType,
                  name: 'Título 1',
                  content: '',
                  placeholder: 'Título 1',
                },
                {
                  id: uuidv4(),
                  type: 'paragraph' as ContentType,
                  name: 'Parágrafo',
                  content: '',
                  placeholder: 'Comece a digitar aqui',
                },
              ],
              className: 'w-full h-full p-8 flex justify-center items-center',
              placeholder: 'Título 1',
            },
            {
              id: uuidv4(),
              type: 'image' as ContentType,
              name: 'Imagem',
              restrictToDrop: true,
              content:
                'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              alt: 'Título',
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: 'Imagem e texto',
    type: 'imageAndText',
    className: 'min-h-[200px] p-8 mx-auto flex justify-center items-center',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Coluna',
      content: [
        {
          id: uuidv4(),
          type: 'resizable-column' as ContentType,
          name: 'Imagem e texto',
          className: 'border',
          content: [
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: 'Coluna',
              content: [
                {
                  id: uuidv4(),
                  type: 'image' as ContentType,
                  name: 'Imagem',
                  className: 'p-3',
                  content:
                    'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  alt: 'Título',
                },
              ],
            },
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: 'Coluna',
              content: [
                {
                  id: uuidv4(),
                  type: 'heading1' as ContentType,
                  name: 'Título 1',
                  content: '',
                  placeholder: 'Título 1',
                },
                {
                  id: uuidv4(),
                  type: 'paragraph' as ContentType,
                  name: 'Parágrafo',
                  content: '',
                  placeholder: 'Comece a digitar aqui',
                },
              ],
              className: 'w-full h-full p-8 flex justify-center items-center',
              placeholder: 'Título 1',
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: 'Texto e imagem',
    type: 'textAndImage',
    className: 'min-h-[200px] p-8 mx-auto flex justify-center items-center',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Coluna',
      content: [
        {
          id: uuidv4(),
          type: 'resizable-column' as ContentType,
          name: 'Texto e imagem',
          className: 'border',
          content: [
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: '',
              content: [
                {
                  id: uuidv4(),
                  type: 'heading1' as ContentType,
                  name: 'Título 1',
                  content: '',
                  placeholder: 'Título 1',
                },
                {
                  id: uuidv4(),
                  type: 'paragraph' as ContentType,
                  name: 'Parágrafo',
                  content: '',
                  placeholder: 'Comece a digitar aqui',
                },
              ],
              className: 'w-full h-full p-8 flex justify-center items-center',
              placeholder: 'Título 1',
            },
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: 'Coluna',
              content: [
                {
                  id: uuidv4(),
                  type: 'image' as ContentType,
                  name: 'Imagem',
                  className: 'p-3',
                  content:
                    'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  alt: 'Título',
                },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: 'Duas colunas',
    type: 'twoColumns',
    className: 'p-4 mx-auto flex justify-center items-center',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Coluna',
      content: [
        {
          id: uuidv4(),
          type: 'title' as ContentType,
          name: 'Título',
          content: '',
          placeholder: 'Cartão sem título',
        },
        {
          id: uuidv4(),
          type: 'resizable-column' as ContentType,
          name: 'Texto e imagem',
          className: 'border',
          content: [
            {
              id: uuidv4(),
              type: 'paragraph' as ContentType,
              name: 'Parágrafo',
              content: '',
              placeholder: 'Comece a digitar...',
            },
            {
              id: uuidv4(),
              type: 'paragraph' as ContentType,
              name: 'Parágrafo',
              content: '',
              placeholder: 'Comece a digitar...',
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: 'Duas colunas com títulos',
    type: 'twoColumnsWithHeadings',
    className: 'p-4 mx-auto flex justify-center items-center',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Coluna',
      content: [
        {
          id: uuidv4(),
          type: 'title' as ContentType,
          name: 'Título',
          content: '',
          placeholder: 'Cartão sem título',
        },
        {
          id: uuidv4(),
          type: 'resizable-column' as ContentType,
          name: 'Texto e imagem',
          className: 'border',
          content: [
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: 'Coluna',
              content: [
                {
                  id: uuidv4(),
                  type: 'heading3' as ContentType,
                  name: 'Título 3',
                  content: '',
                  placeholder: 'Título 3',
                },
                {
                  id: uuidv4(),
                  type: 'paragraph' as ContentType,
                  name: 'Parágrafo',
                  content: '',
                  placeholder: 'Comece a digitar...',
                },
              ],
            },
            {
              id: uuidv4(),
              type: 'column' as ContentType,
              name: 'Coluna',
              content: [
                {
                  id: uuidv4(),
                  type: 'heading3' as ContentType,
                  name: 'Título 3',
                  content: '',
                  placeholder: 'Título 3',
                },
                {
                  id: uuidv4(),
                  type: 'paragraph' as ContentType,
                  name: 'Parágrafo',
                  content: '',
                  placeholder: 'Comece a digitar...',
                },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: 'Três colunas',
    type: 'threeColumns',
    className: 'p-4 mx-auto flex justify-center items-center',
    content: {
      id: uuidv4(),
      type: 'column' as ContentType,
      name: 'Coluna',
      content: [
        {
          id: uuidv4(),
          type: 'title' as ContentType,
          name: 'Título',
          content: '',
          placeholder: 'Cartão sem título',
        },
        {
          id: uuidv4(),
          type: 'resizable-column' as ContentType,
          name: 'Texto e imagem',
          className: 'border',
          content: [
            {
              id: uuidv4(),
              type: 'paragraph' as ContentType,
              name: 'Parágrafo',
              content: '',
              placeholder: 'Comece a digitar...',
            },
            {
              id: uuidv4(),
              type: 'paragraph' as ContentType,
              name: 'Parágrafo',
              content: '',
              placeholder: 'Comece a digitar...',
            },
            {
              id: uuidv4(),
              type: 'paragraph' as ContentType,
              name: 'Parágrafo',
              content: '',
              placeholder: 'Comece a digitar...',
            },
          ],
        },
      ],
    },
  },
];

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
      model: 'gemini-2.0-flash-001',
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

const generateImageUrl = async (prompt: string): Promise<string> => {
  try {
    const improvePrompt = `
      Crie uma imagem altamente realista e profissional com base na seguinte descrição. A imagem deve parecer capturada na vida real, com atenção aos detalhes, iluminação e textura.
      Descrição: ${prompt}

      Notas Importantes:
      - A imagem deve passar num estilo fotorrealista e visualmente
      convincente.
      - Certifique-se de que todos os textos, sinais ou textos visíveis na imagem em português.
      - Preste especial atenção à iluminação, sombras e texturas para fazer a imagem o mais realista possível.
      - Evite elementos que pareçam abstratos, caricaturais ou excessivamente artístico. A imagem deve ser adequada para apresentações profissionais.
      - Centrar-se na descrição precisa do conceito descrito, incluindo objetos específicos, ambiente, humor e contexto. Manter relevância para a descrição fornecida.

      Exemplos de casos de Utilização: apresentações empresariais, diapositivos educativos, projetos profissionais.
    `;

    const dalleResponse = await openAi.images.generate({
      prompt: improvePrompt,
      n: 1,
      size: '1024x1024',
    });
    const url = dalleResponse.data && dalleResponse.data[0]?.url;
    console.log('dalleResponse', url);

    return url || 'https://via.placeholder.com/1024';
  } catch (error) {
    console.log('Erro ao gerar imagem:', error);
    return 'https://via.placeholder.com/1024';
  }
};

const findImageComponents = (layout: ContentItem): ContentItem[] => {
  const images = [];
  if (layout.type === 'image') {
    images.push(layout);
  }

  if (Array.isArray(layout.content)) {
    layout.content.forEach((item) => {
      images.push(...findImageComponents(item as ContentItem));
    });
  } else if (layout.content && typeof layout.content === 'object') {
    images.push(...findImageComponents(layout.content));
  }
  return images;
};

const replaceImagePlaceholder = async (layout: Slide) => {
  const imageComponents = findImageComponents(layout.content);

  for (const component of imageComponents) {
    component.content = await generateImageUrl(component.alt || 'placeholder image');
  }
};

const getLayoutsByJSON = async (outlineArray: string[]) => {
  const prompt = `
  Você é uma IA altamente criativa que gera
  Layouts baseados em JSON para apresentações. Eu vou
  fornecer-lhe uma série de contornos, e para
  cada esboço, 1 você deve gerar um único e
  disposição criativa. Use os layouts existentes como
  exemplos de estrutura e concepção, e gerar
  desenhos únicos baseados no contorno fornecido.

  ### Orientações:
  1. Escrever layouts com base no esboço específico
  fornecido.
  2. Utilizar projetos diversos e envolventes, garantindo
  cada layout é único.
  3. Aderir à estrutura dos layouts existentes
  mas adicione novos estilos ou componentes, se necessário.
  4. Preencha os dados do espaço reservado nos campos de conteúdo
  quando necessário.
  5. Gerar espaços reservados de imagem exclusivos para o
  propriedade 'conteúdo' dos componentes da imagem e também
  texto alternativo de acordo com o contorno.
  6. Garantir a formatação adequada e o alinhamento do esquema
  para a saída JSON.

  ### Layouts De Exemplo:
  ${JSON.stringify(existingLayouts, null, 2)}

  ### Matriz De Contorno:
  ${JSON.stringify(outlineArray)}

  Para cada entrada na matriz de contorno, gere:
  - Um layout JSON exclusivo com designs criativos.
  - Conteúdo devidamente preenchido, incluindo
  espaços reservados para componentes de imagem.
  —Dados JSON claros e bem estruturados.
  Para Imagens
  - O texto alternativo deve descrever claramente a imagem
  e de forma concisa.
  - Focalizar o(s) objecto (s) principal (s) da imagem e
  quaisquer detalhes relevantes, tais como cores, formas,
  pessoas ou objectos.
  - Assegurar que o texto alternativo se alinha com o contexto de
  o diapositivo de apresentação em que será utilizado (p. ex.,
  profissional, educacional, empresarial) .
  - Evite usar termos como " imagem de "ou" imagem
  de, "
  em vez disso, concentre-se diretamente no conteúdo
  e significado.
  1
  Produza os layouts no formato JSON. Garantir lá
  não há layouts duplicados em toda a matriz.`;

  try {
    console.log('gerando layouts');

    const complition = await openAi.chat.completions.create({
      model: 'gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'Você gera layouts baseados em JSON para apresentações.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 5000,
      temperature: 0.7,
    });

    const responseContent = complition.choices[0].message.content;
    if (!responseContent) {
      return { status: 400, error: 'Não foi possível gerar os layouts' };
    }

    let jsonReponse;
    try {
      jsonReponse = JSON.parse(responseContent.replace(/```json\n|```/g, ''));
      await Promise.all(jsonReponse.map(replaceImagePlaceholder));
    } catch (error) {
      console.log('error', error);
      return { status: 500, error: 'Formatado json enviado pela IA inválido' };
    }

    return { status: 200, data: jsonReponse };
  } catch (error) {
    console.log('Error', error);
    return { status: 500, error: 'Interal server error!' };
  }
};

export const generateLayouts = async (projectId: string, theme: string) => {
  try {
    if (!projectId) {
      return { status: 400, error: 'Project ID não encontrado!' };
    }

    const checkUser = await currentUser();

    if (!checkUser) {
      return { status: 403, error: 'Usuário não autenticado!' };
    }

    const user = await client.user.findUnique({
      where: {
        clerkId: checkUser.id,
      },
    });

    if (!user || !user.subscription) {
      return {
        status: 403,
        error: !user?.subscription
          ? 'Usuário não possui uma assinatura!'
          : 'Usuário não encontrado!',
      };
    }

    const project = await client.project.findUnique({
      where: {
        id: projectId,
        isDeleted: false,
      },
    });

    if (!project) {
      return { status: 404, error: 'Projeto não encontrado!' };
    }

    if (project.outlines && project.outlines.length > 0) {
      return { status: 400, error: 'Projeto já possui esboços!' };
    }

    const layouts = await getLayoutsByJSON(project.outlines);

    if (layouts.status !== 200) {
      return layouts;
    }

    await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        slides: layouts.data,
        themeName: theme,
      },
    });

    return { status: 200, data: layouts.data };
  } catch (error) {
    console.log('Error:', error);
    return { status: 500, error: 'Interal server error!', data: [] };
  }
};
