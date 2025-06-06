import { useState } from 'react';
import { DataPair } from '../../../models/api';

interface CvSidebarProps {
    title: string;
    templates: Array<DataPair>
    themes: Array<DataPair>;
    defaultTemplate: number;
    defaultTheme: number;
    onSubmit(template: number, theme: number): void
    onTemplateChanged(newTemplate: number): void;
    onThemeChanged(newTheme: number): void;
}

function CvSidebar({ title, templates, themes, defaultTemplate, defaultTheme, onSubmit, onTemplateChanged, onThemeChanged }: CvSidebarProps){
    const [selectedTemplate, setSelectedTemplate] = useState<number>(defaultTemplate);
    const [selectedTheme, setSelectedTheme] = useState<number>(defaultTheme);

    const mappedTemplates = templates.map((v) => <option value={v.id}>{v.name}</option>)
    const mappedThemes = themes.map((v) => <option value={v.id}>{v.name}</option>)

    function changeTemplate(newTemplateId: number){
        setSelectedTemplate(newTemplateId)
        onTemplateChanged(newTemplateId)
    }

    function changeTheme(newThemeId: number){
        setSelectedTheme(newThemeId)
        onThemeChanged(newThemeId)
    }
    return (
    <div className="sidebar">
        <div className="top">
         <h2>{title}</h2>
         
         <label htmlFor="templates-select">
            <span>Template</span>
            <select name="templates-select" value={selectedTemplate} defaultValue={defaultTemplate} onChange={e => changeTemplate(Number(e.target.value))}>
                {mappedTemplates}
            </select>
         </label>
         <label htmlFor="themes-select">
            <span>Theme</span>
            <select name="themes-select" value={selectedTheme} defaultValue={defaultTheme} onChange={e => changeTheme(Number(e.target.value))}>
                {mappedThemes}
            </select>
         </label>
        </div>
        <div className="spacer" />
        <div className="btn-container">
            <button className="btn-cancel">Reset</button>
            <button className="btn-submit" onClick={() => onSubmit(selectedTemplate, selectedTheme)}>Generate</button>
        </div>
    </div>);
}

export default CvSidebar;