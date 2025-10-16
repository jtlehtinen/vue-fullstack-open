## Diagrams

You can use your browser's developer tools to export network traffic as a HAR file, making it easy to process programmatically.

## 0.4: New note diagram

User opens https://studies.cs.helsinki.fi/exampleapp/notes, creates a new note and submits it.

> **Note:** This diagram demonstrates the [**Post/Redirect/Get**](https://en.wikipedia.org/wiki/Post/Redirect/Get) pattern.

```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: GET /exampleapp/notes
  activate server
  server-->>browser: HTML document
  deactivate server

  browser->>server: GET /exampleapp/main.css
  activate server
  server-->>browser: CSS file
  deactivate server

  browser->>server: GET /exampleapp/main.js
  activate server
  server-->>browser: JavaScript file
  deactivate server

  browser->>server: GET /exampleapp/data.json (XHR from main.js)
  activate server
  server-->>browser: Notes JSON
  deactivate server

  Note right of browser: main.js renders the notes
  Note right of browser: User submits new note via form

  browser->>server: POST /exampleapp/new_note (note=<the-user-provided-note>)
  activate server
  server-->>browser: 302 Redirect to /exampleapp/notes
  deactivate server

  browser->>server: GET /exampleapp/notes
  activate server
  server-->>browser: HTML document
  deactivate server

  browser->>server: GET /exampleapp/main.css
  activate server
  server-->>browser: CSS file
  deactivate server

  browser->>server: GET /exampleapp/main.js
  activate server
  server-->>browser: JavaScript file
  deactivate server

  browser->>server: GET /exampleapp/data.json (XHR from main.js)
  activate server
  server-->>browser: Updated notes JSON
  deactivate server
```
