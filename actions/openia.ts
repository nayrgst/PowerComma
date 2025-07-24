'use server';

import { client } from '@/lib/prisma';
import { ContentItem, ContentType, Slide } from '@/lib/types';
import { currentUser } from '@clerk/nextjs/server';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

// const existingLayouts = [
//   {
//     id: uuidv4(),
//     slideName: 'Cartão em branco',
//     type: 'blank-card',
//     className: 'p-8 mx-auto flex justify-center items-center min-h-[200px]',
//     content: {
//       id: uuidv4(),
//       type: 'column' as ContentType,
//       name: 'Coluna',
//       content: [
//         {
//           id: uuidv4(),
//           type: 'title' as ContentType,
//           name: 'Título',
//           content: '',
//           placeholder: 'Cartão sem título',
//         },
//       ],
//     },
//   },

//   {
//     id: uuidv4(),
//     slideName: 'Destaque à esquerda',
//     type: 'accentLeft',
//     className: 'min-h-[300px]',
//     content: {
//       id: uuidv4(),
//       type: 'column' as ContentType,
//       name: 'Coluna',
//       restrictDropTo: true,
//       content: [
//         {
//           id: uuidv4(),
//           type: 'resizable-column' as ContentType,
//           name: 'Coluna redimensionável',
//           restrictToDrop: true,
//           content: [
//             {
//               id: uuidv4(),
//               type: 'image' as ContentType,
//               name: 'Imagem',
//               content:
//                 'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//               alt: 'Título',
//             },
//             {
//               id: uuidv4(),
//               type: 'column' as ContentType,
//               name: 'Coluna',
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: 'heading1' as ContentType,
//                   name: 'Título 1',
//                   content: '',
//                   placeholder: 'Título 1',
//                 },
//                 {
//                   id: uuidv4(),
//                   type: 'paragraph' as ContentType,
//                   name: 'Parágrafo',
//                   content: '',
//                   placeholder: 'Comece a digitar aqui',
//                 },
//               ],
//               className: 'w-full h-full p-8 flex justify-center items-center',
//               placeholder: 'Título 1',
//             },
//           ],
//         },
//       ],
//     },
//   },

//   {
//     id: uuidv4(),
//     slideName: 'Destaque à direita',
//     type: 'accentRight',
//     className: 'min-h-[300px]',
//     content: {
//       id: uuidv4(),
//       type: 'column' as ContentType,
//       name: 'Coluna',
//       content: [
//         {
//           id: uuidv4(),
//           type: 'resizable-column' as ContentType,
//           name: 'Coluna redimensionável',
//           restrictToDrop: true,
//           content: [
//             {
//               id: uuidv4(),
//               type: 'column' as ContentType,
//               name: 'Coluna',
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: 'heading1' as ContentType,
//                   name: 'Título 1',
//                   content: '',
//                   placeholder: 'Título 1',
//                 },
//                 {
//                   id: uuidv4(),
//                   type: 'paragraph' as ContentType,
//                   name: 'Parágrafo',
//                   content: '',
//                   placeholder: 'Comece a digitar aqui',
//                 },
//               ],
//               className: 'w-full h-full p-8 flex justify-center items-center',
//               placeholder: 'Título 1',
//             },
//             {
//               id: uuidv4(),
//               type: 'image' as ContentType,
//               name: 'Imagem',
//               restrictToDrop: true,
//               content:
//                 'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//               alt: 'Título',
//             },
//           ],
//         },
//       ],
//     },
//   },

//   {
//     id: uuidv4(),
//     slideName: 'Imagem e texto',
//     type: 'imageAndText',
//     className: 'min-h-[200px] p-8 mx-auto flex justify-center items-center',
//     content: {
//       id: uuidv4(),
//       type: 'column' as ContentType,
//       name: 'Coluna',
//       content: [
//         {
//           id: uuidv4(),
//           type: 'resizable-column' as ContentType,
//           name: 'Imagem e texto',
//           className: 'border',
//           content: [
//             {
//               id: uuidv4(),
//               type: 'column' as ContentType,
//               name: 'Coluna',
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: 'image' as ContentType,
//                   name: 'Imagem',
//                   className: 'p-3',
//                   content:
//                     'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//                   alt: 'Título',
//                 },
//               ],
//             },
//             {
//               id: uuidv4(),
//               type: 'column' as ContentType,
//               name: 'Coluna',
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: 'heading1' as ContentType,
//                   name: 'Título 1',
//                   content: '',
//                   placeholder: 'Título 1',
//                 },
//                 {
//                   id: uuidv4(),
//                   type: 'paragraph' as ContentType,
//                   name: 'Parágrafo',
//                   content: '',
//                   placeholder: 'Comece a digitar aqui',
//                 },
//               ],
//               className: 'w-full h-full p-8 flex justify-center items-center',
//               placeholder: 'Título 1',
//             },
//           ],
//         },
//       ],
//     },
//   },

//   {
//     id: uuidv4(),
//     slideName: 'Texto e imagem',
//     type: 'textAndImage',
//     className: 'min-h-[200px] p-8 mx-auto flex justify-center items-center',
//     content: {
//       id: uuidv4(),
//       type: 'column' as ContentType,
//       name: 'Coluna',
//       content: [
//         {
//           id: uuidv4(),
//           type: 'resizable-column' as ContentType,
//           name: 'Texto e imagem',
//           className: 'border',
//           content: [
//             {
//               id: uuidv4(),
//               type: 'column' as ContentType,
//               name: '',
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: 'heading1' as ContentType,
//                   name: 'Título 1',
//                   content: '',
//                   placeholder: 'Título 1',
//                 },
//                 {
//                   id: uuidv4(),
//                   type: 'paragraph' as ContentType,
//                   name: 'Parágrafo',
//                   content: '',
//                   placeholder: 'Comece a digitar aqui',
//                 },
//               ],
//               className: 'w-full h-full p-8 flex justify-center items-center',
//               placeholder: 'Título 1',
//             },
//             {
//               id: uuidv4(),
//               type: 'column' as ContentType,
//               name: 'Coluna',
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: 'image' as ContentType,
//                   name: 'Imagem',
//                   className: 'p-3',
//                   content:
//                     'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//                   alt: 'Título',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   },

//   {
//     id: uuidv4(),
//     slideName: 'Duas colunas',
//     type: 'twoColumns',
//     className: 'p-4 mx-auto flex justify-center items-center',
//     content: {
//       id: uuidv4(),
//       type: 'column' as ContentType,
//       name: 'Coluna',
//       content: [
//         {
//           id: uuidv4(),
//           type: 'title' as ContentType,
//           name: 'Título',
//           content: '',
//           placeholder: 'Cartão sem título',
//         },
//         {
//           id: uuidv4(),
//           type: 'resizable-column' as ContentType,
//           name: 'Texto e imagem',
//           className: 'border',
//           content: [
//             {
//               id: uuidv4(),
//               type: 'paragraph' as ContentType,
//               name: 'Parágrafo',
//               content: '',
//               placeholder: 'Comece a digitar...',
//             },
//             {
//               id: uuidv4(),
//               type: 'paragraph' as ContentType,
//               name: 'Parágrafo',
//               content: '',
//               placeholder: 'Comece a digitar...',
//             },
//           ],
//         },
//       ],
//     },
//   },

//   {
//     id: uuidv4(),
//     slideName: 'Duas colunas com títulos',
//     type: 'twoColumnsWithHeadings',
//     className: 'p-4 mx-auto flex justify-center items-center',
//     content: {
//       id: uuidv4(),
//       type: 'column' as ContentType,
//       name: 'Coluna',
//       content: [
//         {
//           id: uuidv4(),
//           type: 'title' as ContentType,
//           name: 'Título',
//           content: '',
//           placeholder: 'Cartão sem título',
//         },
//         {
//           id: uuidv4(),
//           type: 'resizable-column' as ContentType,
//           name: 'Texto e imagem',
//           className: 'border',
//           content: [
//             {
//               id: uuidv4(),
//               type: 'column' as ContentType,
//               name: 'Coluna',
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: 'heading3' as ContentType,
//                   name: 'Título 3',
//                   content: '',
//                   placeholder: 'Título 3',
//                 },
//                 {
//                   id: uuidv4(),
//                   type: 'paragraph' as ContentType,
//                   name: 'Parágrafo',
//                   content: '',
//                   placeholder: 'Comece a digitar...',
//                 },
//               ],
//             },
//             {
//               id: uuidv4(),
//               type: 'column' as ContentType,
//               name: 'Coluna',
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: 'heading3' as ContentType,
//                   name: 'Título 3',
//                   content: '',
//                   placeholder: 'Título 3',
//                 },
//                 {
//                   id: uuidv4(),
//                   type: 'paragraph' as ContentType,
//                   name: 'Parágrafo',
//                   content: '',
//                   placeholder: 'Comece a digitar...',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   },

//   {
//     id: uuidv4(),
//     slideName: 'Três colunas',
//     type: 'threeColumns',
//     className: 'p-4 mx-auto flex justify-center items-center',
//     content: {
//       id: uuidv4(),
//       type: 'column' as ContentType,
//       name: 'Coluna',
//       content: [
//         {
//           id: uuidv4(),
//           type: 'title' as ContentType,
//           name: 'Título',
//           content: '',
//           placeholder: 'Cartão sem título',
//         },
//         {
//           id: uuidv4(),
//           type: 'resizable-column' as ContentType,
//           name: 'Texto e imagem',
//           className: 'border',
//           content: [
//             {
//               id: uuidv4(),
//               type: 'paragraph' as ContentType,
//               name: 'Parágrafo',
//               content: '',
//               placeholder: 'Comece a digitar...',
//             },
//             {
//               id: uuidv4(),
//               type: 'paragraph' as ContentType,
//               name: 'Parágrafo',
//               content: '',
//               placeholder: 'Comece a digitar...',
//             },
//             {
//               id: uuidv4(),
//               type: 'paragraph' as ContentType,
//               name: 'Parágrafo',
//               content: '',
//               placeholder: 'Comece a digitar...',
//             },
//           ],
//         },
//       ],
//     },
//   },
// ];

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
    Não inclua nenhum outro texto ou explicação fora do JSON.`;

  try {
    const completion = await openAi.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI that generates outlines for presentations.',
        },
        {
          role: 'user',
          content: finalPrompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0.8,
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
    Create a highly realistic, professional image based on the following description. The image should look as if captured in real life, with attention to detail, lighting, and texture.

    Description: ${prompt}

    Important Notes:
    - The image must be in a photorealistic style and visually compelling.
    - Ensure all text, signs, or visible writing in the image are in English.
    - Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
    - Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentations.
    - Focus on accurately depicting the concept described, including specific objects, environment, mood, and context. Maintain relevance to the description provided.

    Example Use Cases: Business presentations, educational slides, professional designs.
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

const replaceImagePlaceholders = async (layout: Slide) => {
  const imageComponents = findImageComponents(layout.content);

  for (const component of imageComponents) {
    component.content = await generateImageUrl(component.alt || 'placeholder image');
  }
};

const getLayoutsByJSON = async (outlineArray: string[]) => {
  const prompt = `### Guidelines
  You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate unique layouts and contents and give me the output in the JSON format expected.
  Our final JSON output is a combination of layouts and elements. The available LAYOUTS TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".
  The available CONTENT TYPES are "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "codeBlock", "tableOfContents", "divider", "column"

  Use these outlines as a starting point for the content of the presentations
    ${JSON.stringify(outlineArray)}

  The output must be an array of JSON objects.
    1. Write layouts based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
    2. Ensuring each layout is unique.
    3. Adhere to the structure of existing layouts
    4. Fill placeholder data into content fields where required.
    5. Generate unique image placeholders for the 'content' property of image components and also alt text according to the outline.
    6. Ensure proper formatting and schema alignment for the output JSON.
  7. First create LAYOUTS TYPES  at the top most level of the JSON output as follows ${JSON.stringify(
    [
      {
        slideName: 'Cartão em branco',
        type: 'blank-card',
        className: 'p-8 mx-auto flex justify-center items-center min-h-[200px]',
        content: {},
      },
    ]
  )}

  8.The content property of each LAYOUTS TYPE should start with “column” and within the columns content property you can use any  of the CONTENT TYPES I provided above. Resizable-column, column and other multi element contents should be an array because you can have more elements inside them nested. Static elements like title and paragraph should have content set to a string.Here is an example of what 1 layout with 1 column with 1 title inside would look like:
  ${JSON.stringify([
    {
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
  ])}


  9. Here is a final example of an example output for you to get an idea
  ${JSON.stringify([
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
      slideName: 'Coluna com destaque à esquerda',
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
                    placeholder: 'Comece a digitar...',
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
  ])}

   For Images
    - The alt text should describe the image clearly and concisely.
    - Focus on the main subject(s) of the image and any relevant details such as colors, shapes, people, or objects.
    - Ensure the alt text aligns with the context of the presentation slide it will be used on (e.g., professional, educational, business-related).
    - Avoid using terms like "image of" or "picture of," and instead focus directly on the content and meaning.

    Output the layouts in JSON format. Ensure there are no duplicate layouts across the array.
    Ensure that the JSON is valid and properly formatted. Do not include any other text or explanations outside the JSON.
  `;

  try {
    const completion = await openAi.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You generate JSON layouts for presentations.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 5000,
      temperature: 0.7,
    });

    const responseContent = completion?.choices?.[0].message.content;
    if (!responseContent) {
      return { status: 400, error: 'No content generated' };
    }

    let jsonResponse;

    try {
      jsonResponse = JSON.parse(responseContent.replace(/```json|```/g, ''));

      await Promise.all(jsonResponse.map(replaceImagePlaceholders));
    } catch (error) {
      console.error('Invalid JSON received:', responseContent, error);

      throw new Error('Invalid Json format recieved');
    }
    console.log('Layouts generated successfully');
    return { status: 200, data: jsonResponse };
  } catch (error) {
    console.error('ERROR', error);
    return { status: 500, error: 'Internal Server Error' };
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

    if (project.outlines && project.outlines.length === 0) {
      return { status: 400, error: 'Projeto não possui esboços!' };
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
