const textInput = document.getElementById('textInput');
const repeatCount = document.getElementById('repeatCount');
const separatorText = document.getElementById('separatorText');
const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');

// Generate Repeated Text and Open in New Tab
function generateText() {
  const text = textInput.value.trim();
  const count = parseInt(repeatCount.value, 10);
  const separator = separatorText.value || ' ';

  if (!text || isNaN(count) || count <= 0) {
    alert('Please provide valid inputs.');
    return;
  }

  const repeatedText = Array(count).fill(text).join(separator);

  // Open the output in a new tab
  const newWindow = window.open('', '_parent');
  newWindow.document.write(`
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Repeated Text</title>
      </head>
      <body style="background-color: #1a202c; color: #e2e8f0; font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="font-size: 24px;">Generated Text</h1>
        <textarea class="w-full p-3 rounded text-gray-200" rows="4" readonly id="outputText" style="background-color: #2d3748; padding: 20px; border-radius: 8px;">${repeatedText}</textarea>
        <button id="copyBtn" class="w-full" style="margin-top: 20px; padding: 10px 20px; background-color: #48bb78; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Copy to Clipboard
        </button>
      </body>
    </html>
  `);

  // Ensure the event listener for copy button is added after a short delay to ensure content is loaded
  setTimeout(() => {
    const copyBtn = newWindow.document.getElementById('copyBtn');
    const outputText = newWindow.document.getElementById('outputText');

    // Copy to Clipboard Functionality in New Tab
    copyBtn.addEventListener('click', () => {
      if (!outputText.value) {
        alert('Nothing to copy!');
        return;
      }

      navigator.clipboard
        .writeText(outputText.value)
        .then(() => alert('Copied to clipboard!'))
        .catch(() => alert('Failed to copy.'));
    });
  }, 500); // Delay to allow content to load and event listener to be attached
}

// Reset All Fields
function resetFields() {
  textInput.value = '';
  repeatCount.value = '';
  separatorText.value = '';
}

// Event Listeners
generateBtn.addEventListener('click', generateText);
resetBtn.addEventListener('click', resetFields);