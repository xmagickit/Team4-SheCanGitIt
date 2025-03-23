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
                          <p>This is a paragraph with your