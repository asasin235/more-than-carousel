const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  console.log(items[items.length -1]);
  console.log(items.length +1);
  console.log(e);
  console.log(e.target.matches('.prev'));
  e.target.matches('.next') && slider.append(items[0]);
  e.target.matches('.prev') && slider.append(items[items.length -1]);
}
document.addEventListener('click',activate,false);
window.addEventListener('keydown', function(e) {
  const items = document.querySelectorAll('.item');
  if (e.key === 'ArrowRight') {
    slider.append(items[0]);
  } else if (e.key === 'ArrowLeft') {
    slider.prepend(items[items.length - 1]);
  }
});
// Add event listener to all "Read More" buttons
document.querySelectorAll('.item button').forEach(button => {
  button.addEventListener('click', async function() {
    // Extract the title from the parent element
    const title = this.parentElement.querySelector('.title').textContent;

    // Make an API call to the GPT model
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        'prompt': title,
        'max_tokens': 60
      })
    });

    // Parse the response
    const data = await response.json();

    // Display the result from the GPT model
    alert(data.choices[0].text);
  });
});