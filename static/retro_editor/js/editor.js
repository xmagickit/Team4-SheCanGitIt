// retro_editor/static/retro_editor/js/editor.js

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
            
            // Add blip effect
            const cursor = document.querySelector('#current-language');
            cursor.classList.add('active');
            setTimeout(() => cursor.classList.remove('active'), 300);
            
            // Fetch a new tip based on language
            fetchRandomTip(e.target.value);
        });
        
        // Update cursor position in status bar
        editor.on('cursorActivity', function() {
            const cursor = editor.getCursor();
            document.querySelector('.status-info').textContent = 
                `LINE: ${cursor.line + 1} | COL: ${cursor.ch + 1} | ${document.querySelector('#id_language').value.toUpperCase()}`;
        });
        
        // Run/Preview code
// In retro_editor/static/retro_editor/js/editor.js
// Update the run button event listener:

// Run/Preview code
document.querySelector('#run-code').addEventListener('click', function() {
  const code = editor.getValue();
  const language = document.querySelector('#id_language').value;
  
  // Add blip effect to run button
  this.classList.add('active');
  setTimeout(() => this.classList.remove('active'), 300);
  
  // Simple preview for HTML
  if (language === 'html') {
      const iframe = document.querySelector('#preview-frame');
      
      // Clear the iframe first
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write('');
      iframe.contentWindow.document.close();
      
      // Add the code with slight delay to ensure clean environment
      setTimeout(() => {
          iframe.contentWindow.document.open();
          iframe.contentWindow.document.write(code);
          iframe.contentWindow.document.close();
      }, 100);
      
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
              <div class="preview-container" style="padding: 20px; font-family: monospace;">
                  <h1>CSS Preview</h1>
                  <p>This is a paragraph with your CSS applied to the page.</p>
                  <button>Button Element</button>
                  <a href="#">Link Element</a>
                  <div class="test-box" style="margin-top: 20px; padding: 20px; border: 1px dashed #ccc;">Div Element</div>
              </div>
          </body>
          </html>
      `;
      
      // Clear first
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write('');
      iframe.contentWindow.document.close();
      
      // Add with delay
      setTimeout(() => {
          iframe.contentWindow.document.open();
          iframe.contentWindow.document.write(html);
          iframe.contentWindow.document.close();
      }, 100);
      
      setActiveTab('preview');
  }
  else if (language === 'js') {
      // For JavaScript, provide a simple HTML environment with the script
      const iframe = document.querySelector('#preview-frame');
      
      // Create a container div and add it to the output div if needed
      const html = `
          <!DOCTYPE html>
          <html>
          <head>
              <style>
                  body { 
                      font-family: monospace; 
                      padding: 20px; 
                      background-color: #2D243F;
                      color: #FFF5E1;
                  }
                  .output { 
                      background: #6B5B95; 
                      padding: 10px; 
                      border: 2px solid #E0B1CB;
                      margin-top: 20px;
                      color: #FFF5E1;
                      font-family: monospace;
                      white-space: pre-wrap;
                      min-height: 100px;
                  }
                  h1 { color: #FFB7C5; font-family: monospace; }
                  #canvas-container { margin-top: 20px; }
              </style>
          </head>
          <body>
              <h1>JavaScript Output</h1>
              <p>Check out the awesome results of your code below:</p>
              <div class="output" id="output"></div>
              <div id="canvas-container"></div>
              
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
                  
                  // Create an output div for canvas
                  window.addEventListener('DOMContentLoaded', function() {
                      const outputDiv = document.getElementById('output');
                      if (!outputDiv.parentElement) {
                          document.body.appendChild(outputDiv);
                      }
                  });
                  
                  // Execute the user code
                  try {
                      ${code}
                  } catch(error) {
                      console.log('⚠️ Error: ' + error.message);
                  }
              </script>
          </body>
          </html>
      `;
      
      // Clear first
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write('');
      iframe.contentWindow.document.close();
      
      // Add with delay
      setTimeout(() => {
          iframe.contentWindow.document.open();
          iframe.contentWindow.document.write(html);
          iframe.contentWindow.document.close();
      }, 100);
      
      setActiveTab('preview');
  }
  else {
      // For other languages, show execution in "console"
      const consoleOutput = document.querySelector('.console-output');
      consoleOutput.innerHTML = `<p>> RUNNING ${language.toUpperCase()} CODE...</p>`;
      consoleOutput.innerHTML += `<p class="code-display">${escapeHtml(code)}</p>`;
      consoleOutput.innerHTML += `<p>> PROCESSING... BEEP BOOP... 🤖</p>`;
      
      setTimeout(() => {
          consoleOutput.innerHTML += `<p>> Sorry, can't execute ${language.toUpperCase()} in your browser! This would work in a full stack environment.</p>`;
          consoleOutput.innerHTML += `<p>> But hey, your code looks totally rad! 💯</p>`;
      }, 1500);
      
      setActiveTab('console');
  }
});
        
        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function() {
                // Add blip effect
                this.classList.add('active');
                setTimeout(() => this.classList.remove('active'), 300);
                
                const tabName = this.getAttribute('data-tab');
                setActiveTab(tabName);
            });
        });
    }
    
    // File explorer interaction
    document.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', function() {
            // Add blip effect
            this.classList.add('active');
            setTimeout(() => this.classList.remove('active'), 300);
            
            document.querySelectorAll('.file-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Pioneer links
    document.querySelectorAll('.pioneer-item').forEach(pioneer => {
        pioneer.addEventListener('click', function() {
            // Add blip effect
            this.classList.add('active');
            setTimeout(() => this.classList.remove('active'), 300);
            
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
    
    // Add blip effects to buttons
    document.querySelectorAll('.retro-button').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.classList.add('active');
            setTimeout(() => this.classList.remove('active'), 300);
        });
    });
    
    // Random glitch effect for home page
    if (document.querySelector('.glitch')) {
        setInterval(() => {
            const glitchElements = document.querySelectorAll('.glitch');
            const randomIndex = Math.floor(Math.random() * glitchElements.length);
            glitchElements[randomIndex].classList.remove('glitch');
            setTimeout(() => {
                glitchElements[randomIndex].classList.add('glitch');
            }, 50);
        }, 3000);
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