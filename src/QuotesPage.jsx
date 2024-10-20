import { useEffect, useState } from "react";
import axios from "axios";

export function QuotesPage() {
  // State to store the quotes
  const [quotes, setQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const quotesPerPage = 15; // Number of quotes per page

  // Function to fetch quotes
  const getQuotes = () => {
    axios
      .get(
        "https://gist.githubusercontent.com/benchprep/dffc3bffa9704626aa8832a3b4de5b27/raw/quotes.json"
      )
      .then((response) => {
        setQuotes(response.data); // Set the quotes data in state
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
      });
  };

  // Fetch quotes when the component mounts
  useEffect(() => {
    getQuotes();
  }, []);

  // Calculate indexes for the quotes to display
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = quotes.slice(indexOfFirstQuote, indexOfLastQuote);

  // Handle pagination controls
  const handleNextPage = () => {
    if (currentPage < Math.ceil(quotes.length / quotesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main>
      <h1>Quotes go here</h1>
      <div>
        {currentQuotes.map((quote, index) => (
          <p key={index}>
            {quote.quote} ~ {quote.source}
          </p>
        ))}
      </div>

      {/* Pagination controls */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(quotes.length / quotesPerPage)}
        >
          Next
        </button>
      </div>
    </main>
  );
}
