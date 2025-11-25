import { HeadingTwo } from '@/components/ui/HeadingPreset'
import SkillItem from '@/components/ui/SkillItem'
import { skillsService } from '@/services'

const SkillsSection = async () => {
  const { docs: skillsData } = await skillsService.getAllSkills()

  const usingNow = skillsData.find((skill) => skill.title === 'Using now')
  const learning = skillsData.find((skill) => skill.title === 'Learning')
  const otherSkills = skillsData.find((skill) => skill.title === 'Other skills')

  return (
    <section className="py-24 font-montserrat" id="skills">
      <div className="container flex flex-wrap space-y-6">
        <div className="flex w-full flex-col items-center space-y-20">
          <HeadingTwo title="Skills" />

          <div className="w-full max-w-[52.75rem] text-left">
            <div className="mb-10 text-center text-[1.875rem] font-bold uppercase tracking-[0.5rem] text-neutral-900 lg:text-left">
              <h3>Using now:</h3>
            </div>
            <div className="flex flex-wrap gap-y-12">
              {usingNow?.technologies?.map((skill, index) => (
                <SkillItem key={index} {...skill} />
              ))}
            </div>
          </div>

          <div className="w-full max-w-[52.75rem] text-left">
            <div className="mb-10 text-center text-[1.875rem] font-bold uppercase tracking-[0.5rem] text-neutral-900 lg:text-left">
              <h3>Learning:</h3>
            </div>
            <div className="flex flex-wrap gap-y-12">
              {learning?.technologies?.map((skill, index) => (
                <SkillItem key={index} {...skill} />
              ))}
            </div>
          </div>

          <div className="w-full max-w-[52.75rem] text-left">
            <div className="mb-10 text-center text-[1.875rem] font-bold uppercase tracking-[0.5rem] text-neutral-900 lg:text-left">
              <h3>Other skills:</h3>
            </div>
            <div className="flex flex-wrap gap-y-12">
              {otherSkills?.technologies?.map((skill, index) => (
                <SkillItem key={index} {...skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
