document.getElementById("analyzerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(`https://v3.football.api-sports.io/fixtures?date=${date}`, {
      method: "GET",
      headers: {
        "x-apisports-key": "4134a9c84f774a1808307613b06f64b0"  // 🔁 Replace this
      }
    });

    const data = await response.json();
    
    if (data.response && data.response.length > 0) {
      resultsDiv.innerHTML = data.response.map(match => `
        <p><strong>${match.teams.home.name}</strong> vs <strong>${match.teams.away.name}</strong> - ${match.league.name}</p>
      `).join("");
    } else {
      resultsDiv.innerHTML = "No matches found for this date.";
    }

  } catch (error) {
    resultsDiv.innerHTML = "Error fetching data.";
    console.error(error);
  }
});
