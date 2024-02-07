document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('areaForm');
    const errorMsg = document.getElementById('errorMessage');
    const candidatesList = document.getElementById('candidatesList');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const area = formData.get('area');

            try {
                const response = await fetch(`/candidates/${area}`);
                const data = await response.json();

                if (data.message) {
                    console.error('Error from server:', data.message);
                    errorMsg.textContent = data.message;
                    errorMsg.style.display = 'block';
                    candidatesList.style.display = 'none';
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                } else {
                    errorMsg.style.display = 'none';
                    displayCandidates(data);
                }
            } catch (error) {
                console.error('Error fetching candidates:', error);
                // Handle the error or provide a message to the user
            }
        });
    }

    function displayCandidates(candidates) {
        candidatesList.innerHTML = '';
        candidates.forEach(candidate => {
            const listItem = document.createElement('li');
            listItem.textContent = `${candidate.name} - ${candidate.constituency}`;
            candidatesList.appendChild(listItem);
        });
    }
});
