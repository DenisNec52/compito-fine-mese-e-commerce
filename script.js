// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ2M2NiZWEzM2ZjOTAwMTk2NTg0ZWEiLCJpYXQiOjE3MDg4ODMzMDEsImV4cCI6MTcxMDA5MjkwMX0.1D-LBvhbePOsPZg1BY3dTR_soCju1gtSGzJJehZF1HQ';
const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';

// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        data.forEach(updateHTML);
    } catch (error) {
        handleErrors(error.message);
    }
}
// Function to display data on the DOM
function updateHTML(post) {
    const resultsArea = document.getElementById('results-area');

    const card = document.createElement('div');
    card.classList.add('col');

    card.innerHTML = `
        <div class="card shadow-sm rounded" style="background-color: #1f2029">
            <img src="${post.imageUrl}" class="bd-placeholder-img card-img-top" width="100%" height="225" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
            <div class="card-body text-white">
                <h5 class="card-title">${post.name}</h5>
                <p class="card-text">${post.description}</p>
                <p class="card-text">Price: ${post.price}</p>
                <p class="card-text">Brand: ${post.brand}</p>
                <p class="card-text">Id: ${post._id}</p>
                <button class="btn btn-info btn-sm" onclick="editPost(${post.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deletePost(${post.id})">Delete</button>
            </div>
        </div>
    `;

    resultsArea.appendChild(card);
}
// Function to create a new post
async function createPost() {
  const name = document.getElementById('post-name').value;
  const description = document.getElementById('post-description').value;
  const brand = document.getElementById('post-brand').value;
  const imageUrl = document.getElementById('post-image').value;
  const price = document.getElementById('post-price').value;

  if (!name || !description || !price) {
    alert('Please fill in all required fields.');
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        brand,
        imageUrl,
        price,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    fetchData(); // Refresh data after creating a post

    // Clear input fields
    document.getElementById('post-name').value = '';
    document.getElementById('post-description').value = '';
    document.getElementById('post-brand').value = '';
    document.getElementById('post-image').value = '';
    document.getElementById('post-price').value = '';

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Function to edit a post
function editPost(postId) {
  // Implement the edit functionality based on your API
  // You may open a modal or navigate to a new page for editing
  console.log(`Edit post with ID: ${postId}`);
}

// Function to delete a post
async function deletePost(postId) {
  try {
    const response = await fetch(`${apiUrl}/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete post');
    }

    fetchData(); // Refresh data after deleting a post
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Initial fetch of data when the page loads
fetchData();
