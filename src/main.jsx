// src/main.jsx
import './css/mdx.css'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Lesson01 from './01_Component.mdx'
import Lesson02 from './02_UseState.mdx'
import Lesson03 from './03_ButtonEventHandler.mdx'
import Lesson04 from './04_FormEventHandler.mdx'
import Lesson05 from './05_Array.mdx'
import Lesson06 from './06_UseStateAndArray.mdx'
import Lesson07 from './07_Checkboxen.mdx'

const components = { React }

// Define the lessons with their corresponding components and titles
const lessons = {
    '1': { component: Lesson01, title: 'Komponente' },
    '2': { component: Lesson02, title: 'useState' },
    '3': { component: Lesson03, title: 'ButtonEventhandler' },
    '4': { component: Lesson04, title: 'FormEventhandler' },
    '5': { component: Lesson05, title: 'array' },
    '6': { component: Lesson06, title: 'UseState and array' },
    '7': { component: Lesson07, title: 'Checkbox' }
}

function App() {
    const lessonIds = Object.keys(lessons)

    const [currentLessonIndex, setCurrentLessonIndex] = useState(() => {
        try {
            const saved = parseInt(localStorage.getItem('currentLessonIndex'), 10)
            if (Number.isNaN(saved)) return 0
            // clamp to valid range
            return Math.min(Math.max(saved, 0), lessonIds.length - 1)
        } catch {
            return 0
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem('currentLessonIndex', String(currentLessonIndex))
        } catch {
            // ignore write errors (e.g., private mode)
        }
    }, [currentLessonIndex])

    const currentLessonId = lessonIds[currentLessonIndex]
    const CurrentLesson = lessons[currentLessonId].component

    return (
        <div style={{ padding: '16px', fontFamily: 'sans-serif' }}>
            <h3 style={{ marginBottom: '8px' }}>React Einstieg – Live Lessons</h3>
            <nav style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
                {Object.entries(lessons).map(([id, { title }], index) => (
                    <button
                        key={id}
                        onClick={() => setCurrentLessonIndex(index)}
                        aria-pressed={currentLessonIndex === index}
                    >
                        {`Lesson ${id}: ${title}`}
                    </button>
                ))}
            </nav>
            <hr/>
            <CurrentLesson components={components} />
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
