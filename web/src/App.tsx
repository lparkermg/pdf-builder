import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SelectorSections from './Components/SelectorsSections'
import { TemplateResponse, ThemeResponse } from '../models/api'
import * as api from '../api/api';

function App() {
  const [themes, setThemes] = useState<ThemeResponse>({themes:[]})
  const [templates, setTemplates] = useState<TemplateResponse>({templates: []})

  const [selectedTemplate, setSelectedTemplate] = useState(0)
  const [selectedTheme, setSelectedTheme] = useState(0)

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

  function onDataSubmit(){
    api.postCv({ template: selectedTemplate, theme: selectedTheme, content: [], sidebar: []});
  }

  return (
    <>
      <div>
        <SelectorSections themes={themes} templates={templates} onThemeSelected={onThemeSelected} onTemplateSelected={onTemplateSelected} />
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onDataSubmit} disabled={true}>
          Submit Data
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
