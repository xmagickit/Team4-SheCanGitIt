document.addEventListener('DOMContentLoaded', function() {
  // Initialize CodeMirror
  const codeTextarea = document.querySelector('.code-editor');
  if (codeTextarea) {
      const editor = CodeMirror.fromTextArea(codeTextarea, {
          mode: getLanguageMode(document.querySelector('#id_language').value),
          theme: 'midnight',
          lineNumbers: true,
          autoCloseBrackets: true,
          matchBrackets: true,
          indentUnit: 2,
          tabSize: 2,
          lineWrapping: true,
          extraKeys: {
              "Tab": function(cm) {
                  cm.replaceSelection("  ", "end");
              }
          }
      });
      
      // Update editor when language changes
      document.querySelector('#id_language').addEventListener('change', function(e) {
          const mode = getLanguageMode(e.target.value);
          editor.setOption('mode', mode);
          document.querySelector('#current-language').textContent = e.target.value.toUpperCase();
          
          // Fetch a new tip based on language
          fetchRandomTip(e.target.value);
      });
      
      // Update cursor position in status bar
      editor.on('cursorActivity', function() {
          const cursor = editor.getCursor();
          document.querySelector('.status-info').textContent = 
              `Line: ${cursor.line + 1} | Col: ${cursor.ch + 1} | ${document.querySelector('#id_language').value.toUpperCase()}`;
      });
      
      // Run/Preview code
      document.querySelector('#run-code').addEventListener('click', function() {
          const code = editor.getValue();
          const language = document.querySelector('#id_language').value;
          
          // Simple preview for HTML and CSS
          if (language === 'html') {
              const iframe = document.querySelector('#preview-frame');
              iframe.contentWindow.document.open();
              iframe.contentWindow.document.write(code);
              iframe.contentWindow.document.close();
              
              // Switch to preview tab
              setActiveTab('preview');
          }
          else if (language === 'css') {
              // For CSS, create a simple HTML wrapper with the CSS applied
              const iframe = document.querySelector('#preview-frame');
              const html = `
                  <!DOCTYPE html>
                  <html>
                  <head>
                      <style>${code}</style>
                  </head>
                  <body>
                      <div class="preview-container">
                          <h1>CSS Preview</h1>
                          <p>This is a paragraph with your CSS applied to the page.</p>
                            <button>Button Element</button>
                            <a href="#">Link Element</a>
                            <div class="test-box">Div Element</div>
                        </div>
                    </body>
                    </html>
                `;
                iframe.contentWindow.document.open();
                iframe.contentWindow.document.write(html);
                iframe.contentWindow.document.close();
                
                setActiveTab('preview');
            }
            else if (language === 'js') {
                // For JavaScript, provide a simple HTML environment with the script
                const iframe = document.querySelector('#preview-frame');
                const html = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body { font-family: sans-serif; padding: 20px; }
                            .output { 
                                background: #f0f0f0; 
                                padding: 10px; 
                                border: 1px solid #ccc;
                                margin-top: 20px;
                            }
                            h1 { color: var(--retro-purple, #6B5B95); }
                        </style>
                    </head>
                    <body>
                        <h1>JavaScript Output</h1>
                        <p>Open browser console (F12) to see additional output.</p>
                        <div class="output" id="output"></div>
                        <script>
                            // Redirect console.log to the output div
                            const originalLog = console.log;
                            console.log = function(...args) {
                                originalLog.apply(console, args);
                                const output = document.getElementById('output');
                                output.innerHTML += args.map(arg => {
                                    if (typeof arg === 'object') {
                                        return JSON.stringify(arg, null, 2);
                                    }
                                    return arg;
                                }).join(' ') + '<br>';
                            };
                            
                            // Execute the user code
                            try {
                                ${code}
                            } catch(error) {
                                console.log('Error: ' + error.message);
                            }
                        </script>
                    </body>
                    </html>
                `;
                iframe.contentWindow.document.open();
                iframe.contentWindow.document.write(html);
                iframe.contentWindow.document.close();
                
                setActiveTab('preview');
            }
            else {
                // For other languages, show execution in "console"
                const consoleOutput = document.querySelector('.console-output');
                consoleOutput.innerHTML = `<p>Running ${language.toUpperCase()} code...</p>`;
                consoleOutput.innerHTML += `<p class="code-display">${escapeHtml(code)}</p>`;
                consoleOutput.innerHTML += `<p>[Server-side execution would happen in a production environment]</p>`;
                
                setActiveTab('console');
            }
        });
        
        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                setActiveTab(tabName);
            });
        });
    }
    
    // File explorer interaction
    document.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.file-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Pioneer links
    document.querySelectorAll('.pioneer-item').forEach(pioneer => {
        pioneer.addEventListener('click', function() {
            // Link to HerStory app
            const pioneerName = this.getAttribute('data-pioneer') || this.textContent;
            window.location.href = '/her_story/?pioneer=' + encodeURIComponent(pioneerName);
        });
    });
    
    // Close tip popup
    if (document.querySelector('.close-tip')) {
        document.querySelector('.close-tip').addEventListener('click', function() {
            document.querySelector('.pioneer-tip').style.display = 'none';
        });
    }
});

// Helper functions
function getLanguageMode(language) {
    const modes = {
        'html': 'htmlmixed',
        'css': 'css',
        'js': 'javascript',
        'py': 'python'
    };
    return modes[language] || 'htmlmixed';
}

function setActiveTab(tabName) {
    // Update tab active state
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
    });
    
    // Show/hide content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('hidden', content.id !== `${tabName}-content`);
    });
}

function showPioneerTip(pioneer, content) {
    const tipPopup = document.getElementById('tip-popup');
    document.getElementById('pioneer-name').textContent = pioneer;
    document.getElementById('tip-content').textContent = content;
    tipPopup.style.display = 'block';
    
    // Auto-hide after 15 seconds
    setTimeout(() => {
        tipPopup.style.display = 'none';
    }, 15000);
}

function fetchRandomTip(language) {
    fetch(`/retro-editor/api/tip/?language=${language}`)
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                showPioneerTip(data.pioneer, data.content);
            }
        })
        .catch(error => console.error('Error fetching tip:', error));
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}