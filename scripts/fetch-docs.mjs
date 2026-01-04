import { writeFileSync } from 'fs';
import { join } from 'path';
import DOMPurify from 'isomorphic-dompurify';

const DOC_ID = '1iTnwT3i0wABxKH__FIHDy4zi8ob5bqUISmBGMTR2_7w';
const DOC_EXPORT_URL = `https://docs.google.com/document/d/${DOC_ID}/export?format=html`;

async function fetchAndProcessDoc() {
  console.log('Fetching Google Doc...');
  const response = await fetch(DOC_EXPORT_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch document');
  }

  const html = await response.text();

  // Add custom class to red colored text (summary headers) BEFORE sanitizing
  // In raw Google Docs HTML, c1 class is the red underlined text
  console.log('Adding custom classes to headers...');
  const htmlWithCustomClass = html.replace(
    /<span([^>]*)class="c1"([^>]*)>/gi,
    '<span$1class="c1 summary-header"$2>'
  );

  // Extract and filter styles
  const styleMatch = htmlWithCustomClass.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  const fullStyles = styleMatch ? styleMatch[1] : '';

  const filteredStyles = fullStyles
    .split('}')
    .map(rule => {
      const [selector, properties] = rule.split('{');
      if (!properties) return '';

      const relevantProps = properties
        .split(';')
        .filter(prop => {
          const trimmed = prop.trim().toLowerCase();
          return trimmed.startsWith('font-weight') || trimmed.startsWith('font-style');
        })
        .join(';');

      return relevantProps ? `${selector}{${relevantProps}}` : '';
    })
    .filter(rule => rule.trim())
    .join('');

  // Sanitize HTML
  console.log('Sanitizing HTML...');
  const sanitized = DOMPurify.sanitize(htmlWithCustomClass, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
      'span', 'div', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3',
      'h4', 'h5', 'h6', 'blockquote', 'pre', 'code', 'table',
      'tr', 'td', 'th', 'tbody', 'thead'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id'],
    KEEP_CONTENT: true,
  });

  const finalHtml = filteredStyles
    ? `<style type="text/css">${filteredStyles}</style>${sanitized}`
    : sanitized;

  // Save to public folder
  const outputPath = join(process.cwd(), 'public', 'docs', 'summary.html');
  writeFileSync(outputPath, finalHtml, 'utf-8');
  console.log(`✓ Saved processed document to ${outputPath}`);
}

fetchAndProcessDoc().catch(console.error);
