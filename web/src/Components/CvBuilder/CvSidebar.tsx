import { useState } from 'react';
import { DataPair } from '../../../models/api';

interface CvSidebarProps {
    title: string;
    templates: Array<DataPair>
    themes: Array<DataPair>;
    onSubmit(template: number, theme: number): void
    onTemplateChanged(newTemplate: number): void;
    onThemeChanged(newTheme: number): void;
}

function CvSidebar({ title, templates, themes, onSubmit, onTemplateChanged, onThemeChanged }: CvSidebarProps){
    const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
    const [selectedTheme, setSelectedTheme] = useState<number>(0);

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
            <select name="templates-select" defaultValue="0" onChange={e => changeTemplate(Number(e.target.value))}>
                {mappedTemplates}
            </select>
         </label>
         <label htmlFor="themes-select">
            <span>Theme</span>
            <select name="themes-select" defaultValue="0" onChange={e => changeTheme(Number(e.target.value))}>
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