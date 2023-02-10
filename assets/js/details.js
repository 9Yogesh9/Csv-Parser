let tableLoad = $('#tableLoad');
let dataHolder = [];
let dataHeaders = [];
let reg_num = /^-?[0-9]\d*(\.\d+)?$/;

function getData() {
    let fileID = $('#fileID').val();

    $.ajax({
        type: 'get',
        url: `/getDetails/${fileID}`,
        success: (data) => {
            let { fileData } = data;
            console.log(fileData);

            dataHolder = fileData.data;
            dataHeaders = fileData.headers;

            pasteHeaders();
            pasteRows();

        }, error: (error) => {
            console.log(error.responseText);
        }
    })

}

getData();

function pasteHeaders() {
    let prepareHeaders = '<thead>';

    for (h of dataHeaders) {
        prepareHeaders += `<th> ${h} 
        <button class="sortBtn" onclick="sortCol('${h}')"><img src="/images/sort.png" alt="sort" srcset=""></button>
        </th>`
    }

    prepareHeaders += `</thead>`;

    tableLoad.append(prepareHeaders);
}

function pasteRows(sortBool) {
    let tableBody = ``;

    if (!sortBool)
        tableBody = `<tbody id="tableBody">`;

    for (a of dataHolder) {
        let i = 0;
        tableBody += `<tr>`;
        for (b in a) {
            tableBody += `<td data-label="${dataHeaders[i]}">${a[b]}</td>`
        }
        tableBody += `</tr>`;
    }

    if (!sortBool) {
        tableBody += `</tbody>`;
        tableLoad.append(tableBody);
    } else {
        $('#tableBody').append(tableBody);
    }

}

function sortCol(head) {
    let ifNum = reg_num.test(dataHolder[0][head]);
    dataHolder = sortBy(dataHolder, head, ifNum);

    $("#tableBody").empty();
    pasteRows(true);
}

function sortBy(jsonArray, key, ifNum) {
    if (jsonArray) {
        let sortedArray = jsonArray.sort(function (left, right) {
            let a = left[key];
            let b = right[key];
            if (ifNum) {
                a = parseFloat(a);
                b = parseFloat(b);
            }
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return 0;
        });
        return sortedArray;
    }
}