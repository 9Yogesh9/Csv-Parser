// function submitForm(){
//     let fileCreate = $('#fileCreate');
    
//     fileCreate.submit((e) => {
//         console.log("tried submitting !");
//         e.preventDefault();
//         $.ajax({
//             type: 'post',
//             url: '/get_file',
//             data: fileCreate.serialize(),
//             success: (data) => {
//                 console.log("file",data);
//                 // paste_new_project(data.data.project);
//                 // toggle_form();
//                 // $(newProjectForm).trigger("reset");
//             },
//             error: (error) => { console.log(error.responseText); }
//         })
//     })
// }

// submitForm();