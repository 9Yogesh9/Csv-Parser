$(function () {
    $('#fileCreate').submit(() => {

        let file = $('#uploaded_file').val();
        if (file.slice(-4) !== '.csv') {
            $('#uploaded_file').val('');
            alert("Incorrect file format detected. Please upload only CSV files !")
            return false;
        } else {
            return true;
        }

    })
})