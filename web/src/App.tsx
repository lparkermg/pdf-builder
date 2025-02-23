import { useEffect, useState } from 'react'
import './App.css'
import SelectorSections from './Components/SelectorsSections'
import { TemplateResponse, ThemeResponse } from '../models/api'
import * as api from '../api/api';
import ContentSections from './Components/ContentSections'
import * as fs from 'fs';

function App() {
  const [themes, setThemes] = useState<ThemeResponse>({themes:[]})
  const [templates, setTemplates] = useState<TemplateResponse>({templates: []})

  const [selectedTemplate, setSelectedTemplate] = useState<number>(0)
  const [selectedTheme, setSelectedTheme] = useState<number>(0)

  const [content, setContent] = useState<string[]>([])
  const [sidebar, setSidebar] = useState<string[]>([])

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

  function onTemplateSelected(id: number){
    setSelectedTemplate(id)
  }

  function onThemeSelected(id: number){
    setSelectedTheme(id)
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

  async function onDataSubmit(){
    const data = await api.postCv({ template: selectedTemplate, theme: selectedTheme, content: content, sidebar: sidebar});

    fs.writeFile("document.pdf", data, (err) => {
      if (err){
        console.error({ err });
      }
    });
  }

  return (
    <>
      <div>
        <SelectorSections themes={themes} templates={templates} onThemeSelected={onThemeSelected} onTemplateSelected={onTemplateSelected} />
        <ContentSections title="Content" content={content} onContentChanged={updateContentSection} onNewSectionAdded={addNewContentSection} />
        <ContentSections title="Sidebar" content={sidebar} onContentChanged={updateSidebarSection} onNewSectionAdded={addNewSidebarSection} />
      </div>
      <div className="card">
        <button onClick={onDataSubmit}>
          Submit Data
        </button>
      </div>
    </>
  )
}

export default App
