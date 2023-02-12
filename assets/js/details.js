let tableLoad = $('#tableLoad');
let untouchedData = [];             //To maintain the loaded data intact
let dataHolder = [];                //To use data across the functions
let dataHeaders = [];               //To store the file headers
let reg_num = /^-?[0-9]\d*(\.\d+)?$/;   //Regex to check positive, negative, decimal numbers
let current_page = 0;               //To keep track of the pages (used for pagination)

// Get file details on load
function getData() {
    let fileID = $('#fileID').val();

    $.ajax({
        type: 'get',
        url: `/getDetails/${fileID}`,
        success: (data) => {
            let { fileData } = data;

            dataHolder = fileData.data;
            dataHeaders = fileData.headers;

            if (dataHolder.length <= 100) {
                $('.page_navigation').hide();
            }

            pasteHeaders();
            pasteRows();

            untouchedData = dataHolder.map((a) => a);

        }, error: (error) => {
            console.log(error.responseText);
        }
    })

}

getData();

function pasteHeaders() {
    let prepareHeaders = '<thead>';

    for (h of dataHeaders) {
        prepareHeaders += `<th>
        <div class="sortButtons"> 
            <div class="sortAsc" onclick="sortCol('${h}',true)"></div> 
            <div class="sortDec" onclick="sortCol('${h}',false)"></div> 
        </div>
            ${h} 
        </th>`;
    }

    prepareHeaders += `</thead>`;

    tableLoad.append(prepareHeaders);
}

function pasteRows(sortBool) {
    let tableBody = ``;

    $('#page_no').html(`Page no : ${current_page + 1}`);

    if (!sortBool)
        tableBody = `<tbody id="tableBody">`;

    let record_count = 0;

    for (let track = current_page * 100; track < dataHolder.length; track++) {
        record_count++;
        let i = 0;
        tableBody += `<tr>`;
        for (b in dataHolder[track]) {
            tableBody += `<td data-label="${dataHeaders[i++]}">${dataHolder[track][b]}</td>`
        }
        tableBody += `</tr>`;
        if (record_count == 100) { break; }
    }

    if (!sortBool) {
        tableBody += `</tbody>`;
        tableLoad.append(tableBody);
    } else {
        $('#tableBody').append(tableBody);
    }

}

function sortCol(head, ifAsc) {
    let ifNum = reg_num.test(dataHolder[0][head]);
    dataHolder = sortBy(dataHolder, head, ifNum, ifAsc);

    $("#tableBody").empty();
    current_page = 0;
    pasteRows(true);
}

function sortBy(jsonArray, key, ifNum, ifAsc) {
    if (jsonArray) {
        let sortedArray = jsonArray.sort(function (left, right) {
            let a = left[key];
            let b = right[key];
            if (ifNum) {
                a = parseFloat(a);
                b = parseFloat(b);
            }

            if (ifAsc) {
                if (a !== b) {
                    if (a > b || a === void 0) return 1;
                    if (a < b || b === void 0) return -1;
                }
                return 0;
            } else {
                if (a !== b) {
                    if (a > b || a === void 0) return -1;
                    if (a < b || b === void 0) return 1;
                }
                return 0;
            }
        });
        return sortedArray;
    }
}

function startPage() {
    current_page = 0;
    $("#tableBody").empty();
    pasteRows(true);
}

function nextPage() {
    if ((current_page + 1) * 100 < dataHolder.length) {
        current_page++;
        $("#tableBody").empty();
        pasteRows(true);
    }
}

function prevPage() {
    if (current_page - 1 >= 0) {
        current_page--;
        $("#tableBody").empty();
        pasteRows(true);
    }
}

function endPage() {
    current_page = parseInt(dataHolder.length / 100) - 1;
    $("#tableBody").empty();
    pasteRows(true);
}

// Funtion to search the data across second coloum of every file
$(function () {
    $('#searchBox').submit((e) => {

        e.preventDefault();
        let header = dataHeaders[1];
        let searchKey = $('#searchText').val().toLowerCase();
        if (searchKey) {
            dataHolder = untouchedData.filter((entry) => {
                return entry[header].toLowerCase().includes(searchKey);
            })

            $('#tableBody').empty();
            current_page = 0;
            if (dataHolder.length < 100) {
                $('.page_navigation').hide();
            }
            pasteRows(true);

        } else {

            $('#tableBody').empty();
            dataHolder = untouchedData.map((a) => a);
            if (dataHolder.length > 100) {
                $('.page_navigation').show();
            }
            current_page = 0;
            pasteRows(true);

        }
    })
})