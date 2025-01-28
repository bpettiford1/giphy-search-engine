document.getElementById("search-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const query = document.getElementById("search-input").value;
    const apiKey = "YOUR_GIPHY_API_KEY";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=9`;
  
    try {
      const response = await fetch(url);
      const { data } = await response.json();
  
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = "";
  
      data.forEach((gif) => {
        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        resultsDiv.appendChild(img);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
  