let tableLoad = $('#tableLoad');
let dataHolder = [];
let dataHeaders = [];

function getData() {
    let fileID = $('#fileID').val();

    $.ajax({
        type:'get',
        url: `/getDetails/${fileID}`,
        success:(data)=>{
            let {fileData} = data;
            console.log(fileData);

            dataHolder = fileData.data;
            dataHeaders = fileData.headers;

            pasteHeaders();
            pasteRows();

        },error:(error)=>{
            console.log(error.responseText);
        }
    })

}

getData();

function pasteHeaders(){
    let prepareHeaders = '<thead>';

    for(h of dataHeaders){
        prepareHeaders += `<th> ${h} 
        <button class="sortBtn" onclick="sortCol('${h}')"><img src="/images/sort.png" alt="sort" srcset=""></button>
        </th>`
    }

    prepareHeaders += `</thead>`;

    tableLoad.append(prepareHeaders);
}

function pasteRows(sortBool){
    let tableBody = ``;
    console.log("triggered");
    
    if(!sortBool)
        tableBody = `<tbody id="tableBody">`;
    
    for(a of dataHolder){
        let i = 0;
        tableBody += `<tr>`;
        for(b in a){
            tableBody += `<td data-label="${dataHeaders[i]}">${a[b]}</td>`
        }
        tableBody += `</tr>`;
    }

    if(!sortBool){
        tableBody += `</tbody>`;
        tableLoad.append(tableBody);
    }else{
        $('#tableBody').append(tableBody);
    }

}

function sortCol(head){
    dataHolder = dataHolder.sort(function(a,b) {
        console.log(a.head, b.head)
        return a.head - b.head;
    });
    // console.log("sort_me", dataHolder);

    $("#tableBody").empty();
    pasteRows(true);
}