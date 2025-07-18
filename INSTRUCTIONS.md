DOs
- Always prefer normal class methods
- Use a wrapper arrow function to preserve this context
- When generating code, always follow the formatting rules specified in the .editorconfig file in this workspace.
- Always prefer self-closing elements in .vue files

DONTs
- Do not use arrow functions for class methods
- Do not use .bind(this)
- Do not include the styles section in .vue files

README Generation Instructions
- Always start with a clear bundle name as the main heading (e.g., `# dn_<bundle-name>`, take bundle name from the manifest.json).
- Add a short summary describing the bundle's purpose.
- Provide a **Usage** section with step-by-step instructions for adding and configuring the bundle in a map.apps app.
- Include a table listing available tools, their IDs, components, and descriptions.
- Add a **Configuration Reference** section:
  - Show a sample configuration block in JSON format.
  - Document each configuration property in a table: Property, Type, Possible Values, Default, Description.
- If relevant, add instructions for customizing widget configuration and reference official documentation links.
- Use clear Markdown formatting: headings, tables, code blocks, and bullet points.
- Do not include style sections, personal comments, or unrelated information.
- Follow the formatting rules specified in the `.editorconfig` file in this workspace.
- Use concise, clear bundle descriptions (e.g., “provides attribute-based filtering capabilities for layers”).
- Keep the configuration sample minimal and relevant to the main features.
- Use simple, direct property tables with only the most important options.
- Prefer short, actionable sentences in usage and customization sections.
- Link to official documentation for advanced customization, rather than duplicating content.
