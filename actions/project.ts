'use server';

import { client } from '@/lib/prisma';
import { onAuthenticateUser } from './user';

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: 'Usuário não autenticado!' };
    }

    const userProjects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    if (userProjects.length === 0) {
      return { status: 404, error: 'Nenhum Projeto Encontrado!' };
    }

    return { status: 200, data: userProjects };
  } catch (error) {
    console.log('Error:', error);
    return { status: 500, error: 'Interal server error!' };
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: 'Usuário não autenticado!' };
    }

    const userProjects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    });

    if (userProjects.length === 0) {
      return { status: 404, error: 'Sem Projetos Recentes!' };
    }

    return { status: 200, data: userProjects };
  } catch (error) {
    console.log('Error:', error);
    return { status: 500, error: 'Interal server error!' };
  }
};

export const recoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: 'Usuário não autenticado!' };
    }

    const updatedProject = await client.project.update({
      where: { id: projectId },
      data: { isDeleted: false },
    });

    if (!updatedProject) {
      return { status: 500, error: 'Falha ao recuperar o projeto!' };
    }

    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log('Error:', error);
    return { status: 500, error: 'Interal server error!' };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: 'Usuário não autenticado!' };
    }

    const updatedProject = await client.project.update({
      where: { id: projectId },
      data: { isDeleted: true },
    });

    if (!updatedProject) {
      return { status: 500, error: 'Falha ao excluir o projeto!' };
    }

    return { status: 200, data: updatedProject };
  } catch (error) {
    console.log('Error:', error);
    return { status: 500, error: 'Interal server error!' };
  }
};
