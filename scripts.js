const API_ENDPOINT = "https://h4cbtg3fzk.execute-api.us-east-1.amazonaws.com/Dev";

$(document).ready(function () {
    // Convert text to speech
    $('#sayButton').click(function () {
        const inputData = {
            voice: $('#voiceSelected').val(),
            text: $('#postText').val(),
        };

        $.ajax({
            url: API_ENDPOINT,
            type: 'POST',
            data: JSON.stringify(inputData),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                $('#postIDreturned').text("Post ID: " + response);
            },
            error: function () {
                alert("Error occurred while processing the request.");
            },
        });
    });

    // Search for audio posts
    $('#searchButton').click(function () {
        const postId = $('#postId').val();

        $.ajax({
            url: `${API_ENDPOINT}?postId=${postId}`,
            type: 'GET',
            success: function (response) {
                $('#posts tbody').empty();
                $.each(response, function (i, data) {
                    const player = data.url ? `<audio controls><source src="${data.url}" type="audio/mpeg"></audio>` : '';
                    const row = `<tr>
                        <td>${data.id}</td>
                        <td>${data.voice}</td>
                        <td>${data.text}</td>
                        <td>${data.status}</td>
                        <td>${player}</td>
                    </tr>`;
                    $('#posts tbody').append(row);
                });
            },
            error: function () {
                alert("Error retrieving the audio posts.");
            },
        });
    });

    // Update character counter for textarea
    $('#postText').on('keyup', function () {
        const length = $(this).val().length;
        $('#charCounter').text(`Characters: ${length}`);
    });
});

