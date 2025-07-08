import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@prisma/client';

import ProjectCard from '@/components/global/project-card';
import { containerVariants } from '@/lib/constants';

type Props = {
  projects: Project[];
};

const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, idx) => (
        <ProjectCard
          key={idx}
          projectId={project?.id}
          title={project?.title}
          createAt={project?.createdAt.toString()}
          isDelete={project?.isDeleted}
          slideData={project?.slides}
          themeName={project?.themeName}
        />
      ))}
    </motion.div>
  );
};

export default Projects;
