import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import editStyle from "./styles/editLink.scss"

// 👇 Cambia esto por tu usuario/repo de GitHub cuando lo subas.
const GITHUB_USER = "pmarquezg20"
const GITHUB_REPO = "pedromarquezg-site"
const GITHUB_BRANCH = "main"

const EditLink: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const filePath = fileData.filePath
  if (!filePath) return null
  const editUrl = `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/edit/${GITHUB_BRANCH}/${filePath}`
  return (
    <a class="edit-link" href={editUrl} target="_blank" rel="noopener noreferrer" title="Editar esta nota en GitHub">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
      </svg>
      <span>Editar</span>
    </a>
  )
}

EditLink.css = editStyle

export default (() => EditLink) satisfies QuartzComponentConstructor
