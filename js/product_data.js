// Function to fetch JSON data
function fetchProductData() {
    // Make an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../products.json', true);
  
    // Process the response
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Parse JSON data
        var productsData = JSON.parse(xhr.responseText);
        var products = productsData.products;
  
        // Accessing product by index
        var index = 1; 


        var product = products[index]; // Adjust index since arrays are 0-indexed
  
        
        // console.log(`Name: ${product.name}`);
        // console.log(`Description: ${product.description}`);
        // console.log(`Price: ${product.price}`);

        document.getElementById('productName').innerText = product.name
        document.getElementById('productDescription').innerText = product.description;
        document.getElementById('productPrice').innerText ='₹'+product.price;


      } else {
        console.error('Failed to load data. Status:', xhr.status);
      }
    };
  
    // Handle network errors
    xhr.onerror = function () {
      console.error('Network error occurred');
    };
  
    // Send the request
    xhr.send();
  }
  
  // Call the function to fetch product data
  fetchProductData();
  nextButton.addEventListener("click", async () => {
        const currentIndex = await scrollToNext() - 2;
        console.log("Next - Current index:", currentIndex);
    });

    prevButton.addEventListener("click", async () => {
        const currentIndex = await scrollToPrevious() - 2;
        console.log("Previous - Current index:", currentIndex);
    });