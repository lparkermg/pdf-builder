import { useEffect, useState } from 'react'
import './App.css'
import SelectorSections from './Components/SelectorsSections'
import { TemplateResponse, ThemeResponse } from '../models/api'
import * as api from '../api/api';
import ContentSections from './Components/Generic/ContentSections'
import DownloadLink from './Components/DownloadLink';
import Nav from './Components/Generic/Nav';
import CvSidebar from './Components/CvBuilder/CvSidebar';
import CvContentArea from './Components/CvBuilder/CvContentArea';

function App() {
  const [themes, setThemes] = useState<ThemeResponse>({themes:[]})
  const [templates, setTemplates] = useState<TemplateResponse>({templates: []})

  const [content, setContent] = useState<string[]>([])
  const [sidebar, setSidebar] = useState<string[]>([])

  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [pdfLink, setPdfLink] = useState<string>("")

  useEffect(() => {
    fetchAvailableDetails();
  }, [])

  async function fetchAvailableDetails(){
    try{
      const themeRes = await api.getThemes();
      const templateRes = await api.getTemplates();

      setThemes(themeRes);
      setTemplates(templateRes);
    } catch (error){
      console.error({error, err:"failed"});
    }
  }

  function addNewContentSection(){
    const contentClone = [...content];
    contentClone.push("");
    setContent(contentClone);
  }

  function updateContentSection(index: number, newContent: string){
    const contentClone = [...content];
    contentClone[index] = newContent;
    setContent(contentClone);
  }

  function addNewSidebarSection(){
    const sidebarClone = [...sidebar];
    sidebarClone.push("");
    setSidebar(sidebarClone);
  }

  function updateSidebarSection(index: number, newContent: string){
    const sidebarClone = [...sidebar];
    sidebarClone[index] = newContent;
    setSidebar(sidebarClone);
  }

  async function generateCv(template: number, theme: number){
    const data = await api.postCv({ template, theme, content: content, sidebar: sidebar});

    if (data){
      setPdfLink(data);
      setHasGenerated(true);
    }
  }

  return (
    <>
      <Nav />
      <section>
        <CvSidebar title="CV Settings" templates={templates.templates} themes={themes.themes} onSubmit={(template, theme) => generateCv(template, theme)} />
        <CvContentArea />
      </section>

    </>
  )
}

export default App
