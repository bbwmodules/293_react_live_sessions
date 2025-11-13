// javascript
// src/components/LiveSandbox.jsx
import React, { useState, useEffect } from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

export default function LiveSandbox({
                                        code,
                                        componentName,
                                        renderCode,
                                        scope = {},
                                        noInline = false,
                                        storageKey = 'live-sandbox-code',
                                        editorStyle = {},
                                        previewStyle = {},
                                        sandboxStyle = {}
                                    }) {
    const mergedScope = { React, ...scope }

    const [userCode, setUserCode] = useState(() => {
        try {
            const saved = localStorage.getItem(storageKey)
            return saved != null ? saved : code
        } catch {
            return code
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, userCode)
        } catch {
            // ignore (e.g., private mode)
        }
    }, [storageKey, userCode])

    useEffect(() => {
        try {
            const saved = localStorage.getItem(storageKey)
            if (saved == null) {
                setUserCode(code)
            }
        } catch {
            // ignore
        }
    }, [code, storageKey])

    const finalCode = renderCode
        ? `${userCode}\n\n${renderCode}`
        : componentName
            ? `${userCode}\n\nrender(<${componentName} />);`
            : userCode

    const computedNoInline = noInline || Boolean(renderCode) || Boolean(componentName)

    function handleReset() {
        try {
            localStorage.removeItem(storageKey)
        } catch {
            // ignore
        }
        setUserCode(code)
    }

    const defaultSandboxStyle = {
        border: '1px solid #e1e4e8',
        borderRadius: 10,
        padding: 12,
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
    }

    const mergedSandboxStyle = { ...defaultSandboxStyle, ...sandboxStyle }

    return (
        <div style={mergedSandboxStyle}>
            <LiveProvider code={finalCode} scope={mergedScope} noInline={computedNoInline}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0 }}>Editor</h3>
                            <div>
                                <button onClick={handleReset} style={{ marginRight: 8 }}>Reset</button>
                            </div>
                        </div>
                        <LiveEditor
                            onChange={(newCode) => setUserCode(newCode)}
                            style={{
                                backgroundColor: '#f7f7f7',
                                fontSize: 14,
                                fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                                borderRadius: 8,
                                padding: 8,
                                ...editorStyle
                            }}
                        />
                        <LiveError style={{ color: 'red', marginTop: '8px' }} />
                    </div>

                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <h3 style={{ marginTop: 0 }}>Preview</h3>
                        <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', minHeight: '80px', ...previewStyle }}>
                            <LivePreview />
                        </div>
                    </div>
                </div>
            </LiveProvider>
        </div>
    )
}
