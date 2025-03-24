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
document.querySelector('#run-code').addEventListener('click', function() {
  const code = editor.getValue();
  const language = document.querySelector('#id_language').value;
  
  // Add blip effect to run button
  this.classList.add('active');
  setTimeout(() => this.classList.remove('active'), 300);
  
  const iframe = document.querySelector('#preview-frame');
  
  // Create a new iframe to avoid state persistence issues
  const newIframe = document.createElement('iframe');
  newIframe.id = 'preview-frame';
  newIframe.style.width = '100%';
  newIframe.style.height = '100%';
  newIframe.style.border = 'none';
  
  // Replace old iframe
  iframe.parentNode.replaceChild(newIframe, iframe);
  
  if (language === 'html') {
      // Direct HTML rendering
      newIframe.onload = function() {
          try {
              newIframe.contentWindow.document.open();
              newIframe.contentWindow.document.write(code);
              newIframe.contentWindow.document.close();
          } catch(e) {
              console.error('Error rendering HTML:', e);
              showExecutionError(e);
          }
      };
      
      // Trigger load event
      newIframe.src = 'about:blank';
      setActiveTab('preview');
  }
  else if (language === 'css') {
      // CSS preview with wrapper
      const html = `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>CSS Preview</title>
              <style>${code}</style>
              <style>
                  body {
                      font-family: system-ui, sans-serif;
                      padding: 20px;
                      background: #f7f7f7;
                  }
                  .demo-elements {
                      display: grid;
                      gap: 20px;
                      max-width: 600px;
                      margin: 0 auto;
                  }
                  .header {
                      background: #6B5B95;
                      color: white;
                      padding: 10px 20px;
                      border-radius: 4px;
                      margin-bottom: 20px;
                  }
              </style>
          </head>
          <body>
              <div class="header">
                  <h1>CSS Preview</h1>
                  <p>Your styles are applied to these elements:</p>
              </div>
              <div class="demo-elements">
                  <div>
                      <h2>Heading Level 2</h2>
                      <p>This is a paragraph with <a href="#">a link</a> and some <strong>bold text</strong> inside it.</p>
                  </div>
                  
                  <div>
                      <h3>Form Elements</h3>
                      <form>
                          <div style="margin-bottom: 10px;">
                              <label for="input">Text Input:</label>
                              <input type="text" id="input" placeholder="Type something...">
                          </div>
                          <div style="margin-bottom: 10px;">
                              <label for="select">Select:</label>
                              <select id="select">
                                  <option>Option 1</option>
                                  <option>Option 2</option>
                              </select>
                          </div>
                          <button type="button">Button</button>
                      </form>
                  </div>
                  
                  <div class="test-box" style="border: 1px dashed #ccc; padding: 15px;">
                      <h3>Test Box</h3>
                      <p>This is a container that you can style.</p>
                  </div>
              </div>
          </body>
          </html>
      `;
      
      newIframe.onload = function() {
          try {
              newIframe.contentWindow.document.open();
              newIframe.contentWindow.document.write(html);
              newIframe.contentWindow.document.close();
          } catch(e) {
              console.error('Error rendering CSS:', e);
              showExecutionError(e);
          }
      };
      
      newIframe.src = 'about:blank';
      setActiveTab('preview');
  }
  else if (language === 'js') {
      // JS execution environment
      const html = `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>JavaScript Execution</title>
              <style>
                  body {
                      font-family: monospace;
                      padding: 20px; 
                      background-color: #2D243F;
                      color: #FFF5E1;
                  }
                  .output-container {
                      background: #6B5B95;
                      border: 2px solid #E0B1CB;
                      border-radius: 4px;
                      padding: 15px;
                      margin-top: 20px;
                      overflow: auto;
                      max-height: 400px;
                  }
                  .output-line {
                      margin: 5px 0;
                      font-family: monospace;
                      white-space: pre-wrap;
                  }
                  .error { color: #FF6B6B; }
                  h1 { color: #FFB7C5; margin-bottom: 5px; }
                  #canvas-container { 
                      margin-top: 20px;
                      background: rgba(255, 255, 255, 0.1);
                      border-radius: 4px;
                      overflow: hidden;
                  }
                  .blink {
                      animation: blink 1s step-end infinite;
                  }
                  @keyframes blink {
                      50% { opacity: 0; }
                  }
                  .controls {
                      margin: 10px 0;
                      padding: 10px;
                      background: rgba(255, 255, 255, 0.1);
                      border-radius: 4px;
                  }
                  button {
                      background: #E0B1CB;
                      color: #2D243F;
                      border: none;
                      padding: 5px 10px;
                      margin-right: 10px;
                      cursor: pointer;
                  }
              </style>
          </head>
          <body>
              <h1>JavaScript Output <span class="blink">_</span></h1>
              <p>Running your awesome code:</p>
              
              <div class="controls">
                  <button id="btn-clear">Clear Output</button>
                  <button id="btn-run">Run Again</button>
              </div>
              
              <div id="canvas-container"></div>
              <div id="output" class="output-container"></div>
              
              <script>
                  // Set up output handling
                  const output = document.getElementById('output');
                  const canvasContainer = document.getElementById('canvas-container');
                  
                  // Clear button
                  document.getElementById('btn-clear').addEventListener('click', function() {
                      output.innerHTML = '';
                  });
                  
                  // Run button
                  document.getElementById('btn-run').addEventListener('click', function() {
                      // Clear output
                      output.innerHTML = '';
                      
                      // Clear any canvases
                      canvasContainer.innerHTML = '';
                      
                      // Run the code again
                      runUserCode();
                  });
                  
                  // Override console methods
                  const originalLog = console.log;
                  const originalWarn = console.warn;
                  const originalError = console.error;
                  
                  console.log = function(...args) {
                      originalLog.apply(console, args);
                      addToOutput(args, 'log');
                  };
                  
                  console.warn = function(...args) {
                      originalWarn.apply(console, args);
                      addToOutput(args, 'warn');
                  };
                  
                  console.error = function(...args) {
                      originalError.apply(console, args);
                      addToOutput(args, 'error');
                  };
                  
                  function addToOutput(args, type) {
                      const line = document.createElement('div');
                      line.className = 'output-line ' + type;
                      
                      if (type === 'error') {
                          line.classList.add('error');
                          line.textContent = '❌ ' + args.join(' ');
                      } else if (type === 'warn') {
                          line.textContent = '⚠️ ' + args.join(' ');
                      } else {
                          line.textContent = '> ' + args.join(' ');
                      }
                      
                      output.appendChild(line);
                      output.scrollTop = output.scrollHeight;
                  }
                  
                  // Handle canvas creation
                  function hookCanvasCreation() {
                      const originalCreate = document.createElement;
                      document.createElement = function(tagName) {
                          const element = originalCreate.call(document, tagName);
                          
                          // If canvas was created, append it to our container
                          if (tagName.toLowerCase() === 'canvas') {
                              canvasContainer.appendChild(element);
                          }
                          
                          return element;
                      };
                  }
                  
                  // Run user code function
                  function runUserCode() {
                      hookCanvasCreation();
                      
                      try {
                          ${code}
                      } catch(error) {
                          console.error('Error: ' + error.message);
                      }
                  }
                  
                  // Initial execution
                  runUserCode();
              </script>
          </body>
          </html>
      `;
      
      newIframe.onload = function() {
          try {
              newIframe.contentWindow.document.open();
              newIframe.contentWindow.document.write(html);
              newIframe.contentWindow.document.close();
          } catch(e) {
              console.error('Error executing JavaScript:', e);
              showExecutionError(e);
          }
      };
      
      newIframe.src = 'about:blank';
      setActiveTab('preview');
  }
  else {
      // Python or other server-side languages
      const consoleOutput = document.querySelector('.console-output');
      consoleOutput.innerHTML = `<p>> RUNNING ${language.toUpperCase()} CODE...</p>`;
      consoleOutput.innerHTML += `<p class="code-display">${escapeHtml(code)}</p>`;
      consoleOutput.innerHTML += `<p>> PROCESSING... BEEP BOOP... 🤖</p>`;
      
      setTimeout(() => {
          consoleOutput.innerHTML += `<p>> Sorry, can't execute ${language.toUpperCase()} directly in your browser!</p>`;
          consoleOutput.innerHTML += `<p>> But imagine your code doing amazing things... 🚀</p>`;
          
          // For Python, show a fun animation
          if (language === 'py') {
              consoleOutput.innerHTML += `
              <pre class="ascii-art">
  _________
 /         /|
/         / |
/         /  |
/_________/   |       Python!
|         |  /
|         | /
|_________|/
              </pre>
              `;
          }
      }, 1500);
      
      setActiveTab('console');
  }
});

// Helper function to show execution errors
function showExecutionError(error) {
  const consoleOutput = document.querySelector('.console-output');
  consoleOutput.innerHTML = `<p>> ERROR EXECUTING CODE:</p>`;
  consoleOutput.innerHTML += `<p class="error">${error.message || 'Unknown error'}</p>`;
  consoleOutput.innerHTML += `<p>> Try again after fixing the issue!</p>`;
  
  setActiveTab('console');
}
        
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

// Tech Legend Card data
const techLegendsData = {
  "Ada Lovelace": {
      year: "1843",
      image: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/220px-Ada_Lovelace_portrait.jpg')", 
      stats: {
          coding: 97,
          vision: 99,
          impact: 100
      },
      about: "The world's first programmer who wrote the first algorithm for Babbage's Analytical Engine. She predicted computers could go beyond calculations to create music and art.",
      funFact: "She was Lord Byron's daughter but never knew him - her mother pushed her into mathematics to prevent her from developing her father's 'dangerous poetic tendencies'.",
      quote: "The Analytical Engine weaves algebraic patterns, just as the Jacquard loom weaves flowers and leaves.",
      link: "https://en.wikipedia.org/wiki/Ada_Lovelace"
  },
  "Grace Hopper": {
      year: "1944",
      image: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Commodore_Grace_M._Hopper%2C_USN_%28covered%29.jpg/220px-Commodore_Grace_M._Hopper%2C_USN_%28covered%29.jpg')",
      stats: {
          coding: 95,
          vision: 98,
          impact: 98
      },
      about: "Pioneered computer programming languages that used English-like commands instead of machine code. Developed COBOL and the first compiler.",
      funFact: "She coined the term 'debugging' after removing an actual moth from a computer. She was also a U.S. Navy rear admiral!",
      quote: "It's easier to ask forgiveness than it is to get permission.",
      link: "https://en.wikipedia.org/wiki/Grace_Hopper"
  },
  "Katherine Johnson": {
      year: "1961",
      image: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Katherine_Johnson_1983.jpg/220px-Katherine_Johnson_1983.jpg')",
      stats: {
          coding: 93,
          vision: 95,
          impact: 99
      },
      about: "NASA mathematician whose orbital calculations were critical to the success of the first U.S. crewed spaceflights. Her work helped send astronauts to the moon.",
      funFact: "She was so accurate with her calculations that John Glenn requested she personally verify the electronic computer's results before his historic orbital mission.",
      quote: "Like what you do, and then you will do your best.",
      link: "https://en.wikipedia.org/wiki/Katherine_Johnson"
  }
};

// Initialize Tech Legend Cards
document.addEventListener('DOMContentLoaded', function() {
  // Set up pioneer card functionality
  const pioneerItems = document.querySelectorAll('.pioneer-item');
  const techLegendCard = document.getElementById('tech-legend-card');
  const cardInner = techLegendCard.querySelector('.card-inner');
  
  // Show card when clicking on a pioneer
  pioneerItems.forEach(item => {
    item.addEventListener('click', function(e) {
        // Prevent default navigation
        e.preventDefault();
        e.stopPropagation();
        
        // Get pioneer name
        const pioneerName = this.textContent;
        
        // Show card with pioneer data
        if (techLegendsData[pioneerName]) {
            const data = techLegendsData[pioneerName];
            
            // Update card content
            document.getElementById('legend-year').textContent = data.year;
            document.getElementById('legend-image').style.backgroundImage = data.image;
            document.getElementById('legend-name').textContent = pioneerName;
            document.getElementById('stat-coding').textContent = data.stats.coding;
            document.getElementById('stat-vision').textContent = data.stats.vision;
            document.getElementById('stat-impact').textContent = data.stats.impact;
            document.getElementById('legend-about').textContent = data.about;
            document.getElementById('legend-funfact').textContent = data.funFact;
            document.getElementById('legend-quote').textContent = data.quote;
            document.getElementById('legend-link').href = data.link;
            
            // Show the card
            techLegendCard.style.display = 'flex';
            
            // Reset to front side
            cardInner.classList.remove('flipped');
        }
    });
});
  
  // Flip card when clicking on it
  cardInner.addEventListener('click', function() {
      this.classList.toggle('flipped');
  });
  
  // Close button
  techLegendCard.querySelector('.tech-card-close').addEventListener('click', function(e) {
      e.stopPropagation();
      techLegendCard.style.display = 'none';
  });
  
  // Prevent link click from flipping card
  techLegendCard.querySelector('.tech-card-more').addEventListener('click', function(e) {
      e.stopPropagation();
  });
  
  // Close on background click
  techLegendCard.addEventListener('click', function(e) {
      if (e.target === this) {
          this.style.display = 'none';
      }
  });
});


// Enhance the preview area
function enhancePreviewArea() {
  // Add fullscreen button
  const previewTab = document.querySelector('.tab[data-tab="preview"]');
  const previewContent = document.getElementById('preview-content');
  
  // Create fullscreen button
  const fullscreenBtn = document.createElement('button');
  fullscreenBtn.className = 'preview-fullscreen';
  fullscreenBtn.innerHTML = '⛶'; // Expand icon
  fullscreenBtn.title = 'Fullscreen preview';
  fullscreenBtn.style.marginLeft = '8px';
  fullscreenBtn.style.background = 'none';
  fullscreenBtn.style.border = 'none';
  fullscreenBtn.style.color = 'inherit';
  fullscreenBtn.style.cursor = 'pointer';
  fullscreenBtn.style.fontSize = '14px';
  
  // Add button next to preview tab
  previewTab.appendChild(fullscreenBtn);
  
  // Track fullscreen state
  let isFullscreen = false;
  
  // Fullscreen functionality
  fullscreenBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // Don't trigger tab switch
    
    if (!isFullscreen) {
      // Save original positions
      previewContent.dataset.originalWidth = previewContent.style.width || '';
      previewContent.dataset.originalHeight = previewContent.style.height || '';
      previewContent.dataset.originalPosition = previewContent.style.position || '';
      
      // Make fullscreen
      previewContent.style.position = 'fixed';
      previewContent.style.top = '0';
      previewContent.style.left = '0';
      previewContent.style.width = '100vw';
      previewContent.style.height = '100vh';
      previewContent.style.zIndex = '9999';
      previewContent.style.background = '#fff';
      
      // Update button
      fullscreenBtn.innerHTML = '⮌'; // Compress icon
      fullscreenBtn.title = 'Exit fullscreen';
      
      // Create close button inside preview
      const closeBtn = document.createElement('button');
      closeBtn.className = 'preview-close-btn';
      closeBtn.innerHTML = '✕';
      closeBtn.style.position = 'absolute';
      closeBtn.style.top = '10px';
      closeBtn.style.right = '10px';
      closeBtn.style.background = 'var(--retro-purple)';
      closeBtn.style.color = 'var(--retro-cream)';
      closeBtn.style.border = '2px solid var(--retro-highlight)';
      closeBtn.style.borderRadius = '4px';
      closeBtn.style.padding = '5px 10px';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.zIndex = '10000';
      
      closeBtn.addEventListener('click', function() {
        exitFullscreen();
      });
      
      previewContent.appendChild(closeBtn);
    } else {
      exitFullscreen();
    }
    
    isFullscreen = !isFullscreen;
  });
  
  function exitFullscreen() {
    // Restore original state
    previewContent.style.position = previewContent.dataset.originalPosition;
    previewContent.style.width = previewContent.dataset.originalWidth;
    previewContent.style.height = previewContent.dataset.originalHeight;
    previewContent.style.top = 'auto';
    previewContent.style.left = 'auto';
    previewContent.style.zIndex = 'auto';
    
    // Update button
    fullscreenBtn.innerHTML = '⛶';
    fullscreenBtn.title = 'Fullscreen preview';
    
    // Remove close button
    const closeBtn = previewContent.querySelector('.preview-close-btn');
    if (closeBtn) {
      previewContent.removeChild(closeBtn);
    }
  }
  
  // Add escape key handler for fullscreen
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isFullscreen) {
      exitFullscreen();
      isFullscreen = false;
    }
  });
  
  // Add resize handle for preview pane
  const resizeHandle = document.createElement('div');
  resizeHandle.className = 'preview-resize-handle';
  resizeHandle.style.position = 'absolute';
  resizeHandle.style.left = '0';
  resizeHandle.style.top = '0';
  resizeHandle.style.width = '5px';
  resizeHandle.style.height = '100%';
  resizeHandle.style.cursor = 'col-resize';
  
  previewContent.style.position = 'relative';
  previewContent.appendChild(resizeHandle);
  
  // Resize functionality
  let isResizing = false;
  let startX, startWidth;
  
  resizeHandle.addEventListener('mousedown', function(e) {
    isResizing = true;
    startX = e.clientX;
    
    // Get the output container's current width
    const outputContainer = document.querySelector('.output-container');
    startWidth = outputContainer.offsetWidth;
    
    // Prevent text selection during resize
    document.body.style.userSelect = 'none';
    
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', function(e) {
    if (!isResizing) return;
    
    // Calculate the distance moved
    const diffX = e.clientX - startX;
    
    // Get the editor and output containers
    const retroContent = document.querySelector('.retro-content');
    const outputContainer = document.querySelector('.output-container');
    
    // Calculate the new grid template
    let newOutputWidth = Math.max(300, startWidth - diffX);
    
    // Maximum width (don't let it take more than 60% of the screen)
    const maxWidth = retroContent.offsetWidth * 0.6;
    newOutputWidth = Math.min(newOutputWidth, maxWidth);
    
    // Update the grid template columns
    const sidebarWidth = document.querySelector('.sidebar').offsetWidth;
    const editorWidth = retroContent.offsetWidth - sidebarWidth - newOutputWidth;
    
    retroContent.style.gridTemplateColumns = `${sidebarWidth}px ${editorWidth}px ${newOutputWidth}px`;
  });
  
  document.addEventListener('mouseup', function() {
    if (isResizing) {
      isResizing = false;
      document.body.style.userSelect = '';
    }
  });
}

// Add preview enhancements when document is ready
document.addEventListener('DOMContentLoaded', function() {
  enhancePreviewArea();
});