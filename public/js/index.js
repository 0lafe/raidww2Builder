const selectedSkills = [...Array(40)]

const getSkills = async () => {
  const response = await fetch("../js/skills.json")
  const data = await response.json();
  return data
}

const getSkillData = async () => {
  const response = await fetch("../js/skill_data.json")
  const data = await response.json();
  return data
}

const handleSelect = (e) => {
 if (!e.currentTarget.value.enabled && !selectedSkills[e.currentTarget.value.row]) {
    e.currentTarget.value.enabled = true
    e.currentTarget.className = e.currentTarget.className.replace('sk_icon', 'selected_sk_icon')
    selectedSkills[e.currentTarget.value.row] = true
  }
}

const handleRightClick = (e) => {
  e.preventDefault()
  if (e.currentTarget.value.enabled) {
    e.currentTarget.value.enabled = false
    selectedSkills[e.currentTarget.value.row] = false
    e.currentTarget.className = e.currentTarget.className.replace('selected_sk_icon', 'sk_icon')
  }
}

const handleHover = (e) => {

}

const top_row = document.getElementById('top_row')
const middle_row = document.getElementById('middle_row')
const bottom_row = document.getElementById('bottom_row')

const rows = [top_row, middle_row, bottom_row]

getSkills().then((skills) => {
  getSkillData().then(skillData => {
    skills.assault.map((skill_row, index) => {
      [0, 1, 2].map(i => {
        const skill_container = document.createElement('td')
        if (skill_row[i]) {
          const skill = document.createElement('div')
          skill.className = `${skill_row[i]} sk_icon skill_size tooltip`
          skill.onclick = handleSelect
          skill.addEventListener('contextmenu', handleRightClick, false);
          skill.id = skill_row[i]
          skill.value = {
            enabled: false,
            row: index
          }

          const tooltip = document.createElement('span')
          tooltip.className = 'tooltiptext'
          tooltip.innerText = skill_row[i]
          skill.appendChild(tooltip)

          skill_container.appendChild(skill)
        }
        rows[i].appendChild(skill_container)
      })
    })
  })
})
