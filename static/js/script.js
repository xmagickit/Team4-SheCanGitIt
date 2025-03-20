function fetchAffirmation() {
    let mood = document.getElementById('mood').value;
    fetch(`/get_affirmation/?mood=${encodeURIComponent(mood)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('affirmation').textContent = data.affirmation;
        })
        .catch(error => console.error('Error fetching affirmation:', error));
}