document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "cs3pe3zjThS4APbDyCGULVCRVCHDXlW9"; // Your Giphy API key
    const DEFAULT_QUERY = "happy dog"; // Default search query
    const LIMIT = 15; // Number of GIFs to fetch
    const form = document.getElementById("search-form");
    const input = document.getElementById("search-input");
    const resultsContainer = document.getElementById("resultsContainer") // Function to fetch GIFs from Giphy API

    const fetchGIFs = async (query) => {
        const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=${LIMIT}`;
        try {
            const response = await fetch(API_URL); // Fetch data from Giphy API
            const { data } = await response.json(); // Convert response to JSON
            console.log (data)
            // Clear previous results
            resultsContainer.innerHTML = "";
            if (data.length === 0) {
                resultsContainer.innerHTML = "<p>No GIFs found. Try another search!</p>";
                return;
            }
            // Display the GIFs
            data.forEach((gif) => {
                const img = document.createElement("img");
                img.src = gif.images.fixed_height.url; // Use the GIF URL
                img.alt = gif.title || "GIF"; // Add alt text
                img.classList.add("gif"); // Add a class for styling
                resultsContainer.appendChild(img);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            resultsContainer.innerHTML = "<p>Failed to load GIFs. Please try again.</p>";
        }
    };
    // Fetch default GIFs on page load (happy dog, 15 GIFs)
    fetchGIFs();
    // Event listener for the search form
    form.addEventListener("submit", (event) => {
        console.log("handle submit")
        event.preventDefault(); // Prevent page refresh
        const query = input.value.trim(); // Get user input
        if (query) {
            fetchGIFs(query); // Fetch GIFs based on search
        } else {
            alert("Please enter a search term!");
        }
    });
})