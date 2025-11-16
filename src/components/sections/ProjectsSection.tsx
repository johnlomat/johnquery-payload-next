import ProjectCard from '@/components/ui/ProjectCard'
import { HeadingTwo } from '@/components/ui/HeadingPreset'
import { ProjectProps } from '@/types/ProjectProps'
import { projectsService } from '@/services'

const ProjectsSection = async () => {
  const { docs: projectsData } = await projectsService.getAllProjects()

  // Debug logging
  console.log('First project:', JSON.stringify(projectsData[0], null, 2))

  return (
    <>
      <section className="relative space-y-20 bg-neutral-900 pt-24" id="projects">
        <div className="container flex flex-wrap space-y-6">
          <div className="flex w-full flex-col items-center space-y-20">
            <HeadingTwo className="border-gray-200 text-gray-200" title="Projects" />
          </div>
        </div>
        <div className="flex w-full flex-col flex-wrap md:flex-row">
          {projectsData.map((project: ProjectProps, index: number) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>
    </>
  )
}

export default ProjectsSection
