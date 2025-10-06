const votes = {
  JavaScript: 0,
  Python: 0,
  Java: 0
};

function vote(language) {
  votes[language]++;
  updateVotes();
}

function updateVotes() {
  document.getElementById('jsCount').textContent = votes.JavaScript;
  document.getElementById('pyCount').textContent = votes.Python;
  document.getElementById('javaCount').textContent = votes.Java;
}

// Simulate real-time voting every 2 seconds
setInterval(() => {
  const languages = ['JavaScript', 'Python', 'Java'];
  const randomLang = languages[Math.floor(Math.random() * languages.length)];
  votes[randomLang]++;
  updateVotes();
}, 2000);
